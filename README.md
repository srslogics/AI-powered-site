# SiteVantage

**Construction Intelligence by SRS Logics**

An interactive, single-site demonstration of construction monitoring: camera views, safety incidents, workforce presence, vehicles and equipment, progress comparisons, and reports.

## Deploy on Render

Use a **Static Site**. The application runs in the browser and needs no API keys, database, environment variables, or server process.

### Use the included Blueprint

1. In Render, select **New → Blueprint**.
2. Connect `srslogics/AI-powered-site` and select the `main` branch.
3. Use the root `render.yaml`, review the `sitevantage` static service, and deploy.

### Or create a Static Site manually

| Setting | Value |
| --- | --- |
| Repository | `https://github.com/srslogics/AI-powered-site` |
| Branch | `main` |
| Root Directory | Leave blank |
| Build Command | `npm run build` |
| Publish Directory | `dist` |
| Auto Deploy | On commit |

There is no start command or port setting for a Static Site. Navigation uses URL hashes such as `/#progress`, so a catch-all rewrite is not needed. Only `dist/` is published; the proposal and downloadable file stay outside the hosted application.

Render reference: [Static Sites](https://render.com/docs/static-sites), [Blueprint configuration](https://render.com/docs/blueprint-spec).

## Local preview

From the repository root:

```sh
npm run build
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:8080/`. Node.js 18 or later runs the validation and export scripts. No npm packages need to be installed. Python 3 is used only for this local preview command.

## Demo workflows

- Inspect eight sample camera locations and filter connection status.
- Open an incident, assign an owner, record a note, and resolve or reopen it.
- Simulate a safety alert and export the incident register.
- Review workforce, vehicle, and equipment sample records.
- Move the comparison slider between two illustrative construction stages.
- Export sample reports and reset the session.

This is a presentation demo. Camera images, AI events, counts, dates, and progress values are illustrative. No cameras, detection models, IoT devices, notifications, or external systems are connected. Incident changes are stored in browser session storage; they are not shared between users or durably saved to a server. The hosted demo has no login or access-control layer.

## Project files

| Path | Contents |
| --- | --- |
| `dist/` | Complete browser application and local image assets |
| `render.yaml` | Render Static Site configuration |
| `scripts/validate.mjs` | Deployment-file and JavaScript validation |
| `scripts/export-demo.mjs` | Rebuilds the standalone demo from `dist/` |
| `releases/SiteVantage_Demo.html` | Download and open directly in a browser |
| `docs/SRS_Logics_Construction_Intelligence_Proposal.pdf` | Client proposal |

After editing the application, regenerate the standalone file:

```sh
npm run export:demo
```

The repository contains the current application, assets, and final deliverables. Local tool metadata, temporary screenshots, caches, and intermediate working files are excluded.

Image attribution is available through **Image credits** in the application footer. Construction comparison imagery was generated for this demo.
