#!/usr/bin/env bash
# Kör spelet headless i den strikta riggen (kräver node)
cd "$(dirname "$0")"
python3 -c "
import re;h=open('../index.html').read()
m=re.findall(r'<script>(.*?)</script>', h, re.S)
open('g.js','w').write(m[1])"
node strict-harness.js
