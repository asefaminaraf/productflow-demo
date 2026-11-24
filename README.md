# ProductFlow Demo

A no-build, browser-based product management workspace demo.

## Features
- Overview dashboard with live task and feedback counts
- Product roadmap and initiative creation
- Kanban-style backlog with task status updates
- PRD library with problem, objective, user story and acceptance criteria
- User feedback inbox with editable status
- Product analytics summary
- Browser local storage persistence
- Export workspace data to JSON
- Responsive layout for desktop and mobile

## Run locally
1. Download and unzip this project.
2. Open `index.html` in Chrome, Edge or Firefox.
3. Start creating initiatives, tasks, PRDs and feedback.

No installation, terminal, build command or API key is required.

## Publish with GitHub Pages
1. Create or sign in to a GitHub account at https://github.com/
2. Click **New repository**.
3. Name it `productflow-demo`.
4. Choose **Public** and create the repository.
5. In the repository, choose **Add file > Upload files**.
6. Upload `index.html`, `styles.css`, `app.js`, and this README file from this folder. Upload the files themselves, not the containing folder.
7. Click **Commit changes**.
8. Open **Settings > Pages**.
9. Under **Build and deployment**, choose **Deploy from a branch**.
10. Select branch **main** and folder **/(root)**, then click **Save**.
11. Wait a few minutes. Refresh the Pages section to find your published website link.

Your public link will look like:
`https://YOUR-GITHUB-USERNAME.github.io/productflow-demo/`

## Important demo limitation
This first version uses browser local storage. Each visitor gets their own independent data on their own device/browser. It does not provide shared multi-user accounts, cloud synchronization, server-side permissions, or secure private data storage. Do not enter real customer or business-sensitive data.

## Reset demo data
Clear this site's browser storage using your browser's site data settings. This resets the workspace to its sample data.

## Tech
HTML, CSS and vanilla JavaScript. No framework or backend.
