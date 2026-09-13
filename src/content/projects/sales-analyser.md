---
title: Sales Analyser
blurb: A CSV sales reporting tool built test-first, with fixtures for the malformed input real data actually contains.
status: complete
start: 2026-01
end: 2026-01
stack: [Python, pytest, CSV]
repo: https://github.com/adt-w/salesanalyser2025
highlights:
  - Reads sales transaction data from CSV, validates it, and generates an aggregate report of revenue and volume by product.
  - "Ships a test suite with dedicated fixtures for the failure cases that break naive parsers: empty files, header-only files, and rows carrying invalid quantity or amount values."
  - Keeps design rationale and coverage as separate written artefacts rather than folding them into the README, so the reasoning behind the implementation stays reviewable.
---
