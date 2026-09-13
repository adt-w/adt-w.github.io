---
title: Stock Practice Portfolio
blurb: A desktop trading simulator for testing strategies with no money at risk.
status: complete
start: 2024-12
end: 2025-02
stack: [Python, yahooquery, Matplotlib, tkinter, NumPy]
repo: https://github.com/adt-w/stockpracticeportfolio
highlights:
  - Builds and manages mock portfolios against live market data pulled through the yahooquery API, letting a strategy be tested over real price movement before any capital is committed.
  - Cut asset research time by roughly 40% with a screener that filters holdings on P/E ratio, ESG score and growth metrics in a single pass.
  - Renders position and performance breakdowns natively in a tkinter interface via Matplotlib, so the whole tool runs as one local desktop application with no web dependency.
---
