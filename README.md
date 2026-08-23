# INK ✒️

A vertical endless game — a mix of Breakout and pinball where you **draw the flipper with your finger**.
The ball bounces once off each stroke, then it's spent. The ink in the margin decides how much you can
draw. Climb, chain combos, chase points.

Everything in **a single HTML file**: physics, procedural level generation, synthesized sound effects and
generative music (Web Audio, zero assets), rendered on canvas in a squared-paper, ballpoint-pen aesthetic.

## Play

Open `index.html` in a mobile browser (built for portrait + touch, works with a mouse).

- **Draw strokes** — the ball bounces, the stroke is spent
- **Ink** in the left margin is your resource; ink blots and broken blocks refill it
- **Red kills** — spikes are game over
- **Combo**: everything the ball hits without a new stroke is worth more
- Time slows down while you draw

## Modes

- **Free climb** — endless, with checkpoints every 100 m and something new unlocked on every level up to 10
- **Daily challenge** — a course seeded from today's date (same for everyone), 500 m to the finish line,
  one daily rule (e.g. *Dry ink*, *Windy*), streak counter and a Wordle-style shareable result

Records, checkpoints and streak persist in `localStorage`.

## Development

The in-game tuning button exposes live physics values (gravity, kick, bounce, ink, slow-mo).

Headless test of the full game loop (load, start, drawing, daily, pause) against strict
DOM/Canvas/WebAudio stubs:

```bash
./tests/run.sh
```

## Status

Playable prototype in active development for [GameVolt.io](https://gamevolt.io).
