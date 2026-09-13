---
title: AccessView
blurb: An accessibility-first mapping application that routes mobility-limited and senior residents along walkable paths and to the amenities they actually need.
status: active
start: 2026-09
end: null
featured: true
stack: [JavaScript, OpenLayers, OpenRouteService, Flask, GeoJSON]
repo: https://github.com/adt-w/AccessView
highlights:
  - Built an interactive OpenLayers map that surfaces accessible walking routes and nearby amenities (pharmacies, clinics, transit stops) by ingesting free OpenStreetMap and municipal open-data GeoJSON into styled, category-toggleable vector layers.
  - Reduced accessible route planning to two clicks by integrating the OpenRouteService API with its wheelchair and foot-walking profiles, rendering live turn-by-turn GeoJSON routes in the browser.
  - Runs at zero API cost by caching repeated requests against the free tier, which keeps it deployable by a community organisation with no budget.
  - Built against UN Sustainable Development Goal 11.2, access to safe and affordable transport, which is why the amenity layer sits alongside routing instead of in a separate view.
---

Actively being worked on. Conventional mapping tools optimise for distance and
rarely answer the question that decides whether a trip is possible at all:
whether the route has curb cuts, whether the elevator is working, whether there
is a washroom along the way.
