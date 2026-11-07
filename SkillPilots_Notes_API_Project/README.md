# SkillPilots Notes API Project

A small full-stack notes application based on the task shown in the SkillPilots Career Path roadmap.

## Features
- Displays all notes from `GET /api/notes`.
- Adds a note using `POST /api/notes` with a JSON body.
- Validates title and content on the server.
- Saves notes in `notes.json`, so they remain after restarting the server.
- Shows success and error messages in the browser.

## Requirements
- Node.js (LTS recommended)
- Internet connection for the first-time Express installation

## Run the project in Kiro IDE or VS Code
1. Extract the ZIP file.
2. Open the extracted `SkillPilots_Notes_API_Project` folder in Kiro IDE.
3. Open the terminal: **Terminal → New Terminal**.
4. Install the dependency:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open this address in Chrome:
   `http://localhost:3000`

## API endpoints

### GET `/api/notes`
Returns an array containing all saved notes.

### POST `/api/notes`
Send JSON in this format:
```json
{
  "title": "My first note",
  "content": "I learned how GET and POST requests work."
}
```
Both fields are required. A successful request returns the created note with HTTP status `201`.

## Project structure
```text
SkillPilots_Notes_API_Project/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── notes.json
├── package.json
├── server.js
└── README.md
```

## Troubleshooting
- If `npm` is not recognized, install Node.js LTS and restart the terminal.
- If port 3000 is already in use, close the other app using it or change `PORT` in `server.js`.
- Keep the terminal running while using the website.
