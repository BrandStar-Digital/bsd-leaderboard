# BSD Leaderboard

Phase 1 preview of the BrandStar Digital AI Marketing Engine Leaderboard.

## Files

- **`webflow-shell.html`** — The shell HTML pasted into Webflow Custom Code. References the CSS and JS files in this repo via jsDelivr CDN.
- **`leaderboard.css`** — Full stylesheet matching the BrandStar v2.0 design system.
- **`data.js`** — Team roster, badges, agents, challenges. This is the file to edit when updating stub data.
- **`leaderboard.js`** — Application logic and rendering.

## How It Works

The HTML shell lives in Webflow. When a visitor loads the leaderboard page, Webflow serves the shell, which then loads `leaderboard.css`, `data.js`, and `leaderboard.js` from this GitHub repo via the jsDelivr CDN (free, globally cached, no account required).

To update the application:
1. Edit the file in GitHub (or via PR)
2. Commit to `main`
3. Changes propagate to jsDelivr within minutes (max 12 hours without cache purge)

## Phase 2 Migration

In Phase 2, the `data.js` file becomes an API call to a SharePoint List or Azure Function returning live data. The application code (`leaderboard.js`) is written so this swap is a single-function change:

```javascript
// Phase 1 (current)
const TEAM = window.BSD_TEAM;

// Phase 2 (live data)
const TEAM = await fetch('/api/leaderboard').then(r => r.json());
```

## Prepared by

Seth Rand, President, BrandStar Digital. Q2 2026. Internal use only.
