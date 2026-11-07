const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "notes.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readNotes() {
  try {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    console.error("Could not read notes:", error);
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2), "utf8");
}

// GET /api/notes - return all saved notes
app.get("/api/notes", (req, res) => {
  res.json(readNotes());
});

// POST /api/notes - validate and save a new note
app.post("/api/notes", (req, res) => {
  const title = String(req.body.title || "").trim();
  const content = String(req.body.content || "").trim();

  if (!title || !content) {
    return res.status(400).json({ error: "Please enter both a title and note content." });
  }

  const notes = readNotes();
  const note = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString()
  };

  notes.unshift(note);
  saveNotes(notes);
  res.status(201).json(note);
});

app.listen(PORT, () => {
  console.log(`Notes app is running at http://localhost:${PORT}`);
});
