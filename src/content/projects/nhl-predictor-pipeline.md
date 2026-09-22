---
title: NHL Predictor Pipeline
blurb: A season-projection pipeline for the 2026-27 NHL season, and an honest account of why prior-season team strength barely predicts a single hockey game.
status: active
start: 2026-09
end: null
featured: true
stack: [Python, scikit-learn, pandas, NumPy]
repo: https://github.com/adt-w/NHL-Predictor-Pipeline
highlights:
  - Pairs MoneyPuck team analytics (expected goals, Corsi, high-danger shots) with game results from the public NHL API, trains a soft-voting ensemble of logistic regression and gradient boosting, and converts per-game win probabilities into projected records by division, conference and league.
  - "Enforces a strict leakage rule: a game in season N is only ever paired with team strength from season N−1, because a season's own end-of-year statistics have already seen the games being predicted."
  - Tested multi-season feature blending across four weightings and rejected it. Degradation was monotonic on every metric, traced to 20–30% annual roster turnover diluting a strong signal (season N predicts N+1 at r = +0.72; season N−2 at just +0.39).
  - Found `home_ice` to be a dead feature. It sits constant at 1, so StandardScaler zeroes it and the trees cannot split on it. Also retracted an earlier recommendation to shrink toward the league mean, after proving it a mathematical no-op that cancels out in the home-minus-away difference.
metrics:
  - label: Ensemble accuracy
    value: 53.7%
    note: against a 52.2% home-ice baseline
  - label: Edge over baseline
    value: +1.5pp
    note: ±1.38pp standard error at n=1,312
  - label: ROC-AUC
    value: "0.546"
    note: coin flip is 0.500
  - label: Games
    value: 5,248
    note: 3,936 train / 1,312 held-out test
---

Still in progress. The pipeline runs end to end, but the model is only slightly
better than guessing, and establishing that rigorously is what the project is
actually about. Every metric is quoted against its no-skill reference, and two
proposed improvements were tested and written up as failures instead of being
quietly dropped.
