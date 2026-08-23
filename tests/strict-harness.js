"use strict";
const fs = require("fs");
const html = fs.readFileSync("../index.html","utf8");
const realIds = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));

function param(name){
  return {
    value: 0,
    setValueAtTime(v,t){ if(!isFinite(v)||!isFinite(t)) throw new Error(name+".setValueAtTime: "+v); },
    exponentialRampToValueAtTime(v,t){ if(!(v>0)) throw new Error(name+".expRamp kräver >0, fick "+v); },
    linearRampToValueAtTime(){},
    setTargetAtTime(v,t,c){ if(!isFinite(v)) throw new Error(name+".setTargetAtTime: "+v); },
    cancelScheduledValues(){}
  };
}
function audioNode(name, extra){
  return Object.assign({ connect(n){ if(!n) throw new Error(name+".connect(null)"); }, disconnect(){} }, extra);
}
class StrictAudioContext {
  constructor(){ this.sampleRate = 48000; this.currentTime = 0; this.state = "running";
    this.destination = audioNode("destination"); }
  resume(){ return Promise.resolve(); }
  createGain(){ return audioNode("gain", {gain: param("gain")}); }
  createOscillator(){ return audioNode("osc", {type:"sine", frequency:param("freq"), detune:param("detune"),
    start(t){}, stop(t){}}); }
  createBiquadFilter(){ return audioNode("filter", {type:"lowpass", frequency:param("filterFreq"), Q:param("Q")}); }
  createBuffer(ch,len,sr){
    if (!Number.isInteger(len) || len<=0) throw new Error("createBuffer: ogiltig längd "+len);
    return { getChannelData(){ return new Float32Array(len); } };
  }
  createBufferSource(){ return audioNode("bufsrc", {buffer:null, loop:false, start(t){}, stop(t){}}); }
}

const ctxProps = new Set(["fillStyle","strokeStyle","lineWidth","globalAlpha","font","textAlign","textBaseline","lineCap","lineJoin"]);
const ctxFns = new Set(["createLinearGradient","setTransform","fillRect","strokeRect","clearRect","beginPath","closePath","moveTo","lineTo","arc","quadraticCurveTo","bezierCurveTo","rect","roundRect","fill","stroke","clip","save","restore","translate","rotate","scale","setLineDash","fillText","strokeText","measureText"]);
const ctx = new Proxy({}, {
  get(t,p){
    if (typeof p === "symbol") return undefined;
    if (ctxFns.has(p)) return p==="measureText" ? () => ({width:10}) : (p==="createLinearGradient" ? () => ({addColorStop(){}}) : () => {});
    if (ctxProps.has(p)) return t[p];
    throw new Error("okänd canvas-egenskap: "+String(p));
  },
  set(t,p,v){ if (!ctxProps.has(p)) throw new Error("okänd canvas-egenskap (set): "+String(p)); t[p]=v; return true; }
});

const handlers = {};
function makeEl(id){
  const h = handlers[id] = handlers[id] || {};
  return {
    id, hidden:false, textContent:"", value:"50", style:{}, width:0, height:0,
    addEventListener(ev,fn){ h[ev]=fn; },
    setPointerCapture(){},
    getBoundingClientRect(){ return {left:0,top:0,width:390,height:840}; },
    getContext(kind){ if(kind!=="2d") throw new Error("getContext: "+kind); return ctx; }
  };
}
const cache = {};
global.document = { addEventListener(){}, hidden:false, getElementById(id){
  if (!realIds.has(id)) return null;   // som i riktig webbläsare
  return cache[id] || (cache[id] = makeEl(id));
}};
let rafCb=null;
global.window = { addEventListener(){}, devicePixelRatio:2,
  matchMedia:()=>({matches:false}), AudioContext: StrictAudioContext };
global.requestAnimationFrame = cb => { rafCb = cb; };
global.performance = { now: () => tNow };
let tNow = 0;

require("./g.js");
console.log("LADDNING OK");
const stepFrames = n => { for(let i=0;i<n;i++){ tNow += 16.7; rafCb(tNow); } };
stepFrames(5); console.log("STARTSKÄRM OK");
handlers["startBtn"].click(); console.log("PLAY OK");
stepFrames(30); console.log("LOOP OK");
handlers["c"].pointerdown({clientX:180, clientY:600, pointerId:1});
for(let i=0;i<8;i++) handlers["c"].pointermove({clientX:180+i*14, clientY:602+i, pointerId:1});
handlers["c"].pointerup({pointerId:1});
console.log("RITNING OK");
stepFrames(400); console.log("LÅNG KÖRNING OK");
handlers["sndBtn"].click(); handlers["musBtn"].click(); handlers["tuneBtn"].click();
stepFrames(30); console.log("KNAPPAR OK");

// --- dagens utmaning ---
handlers["dailyBtn"].click();
console.log("DAILY START OK");
stepFrames(120);
console.log("DAILY LOOP OK");

// --- paus ---
handlers["pauseBtn"].click();
stepFrames(10);
handlers["resumePlayBtn"].click();
stepFrames(10);
handlers["pauseBtn"].click();
handlers["quitBtn"].click();
stepFrames(5);
console.log("PAUS OK");
