const form = document.getElementById("note-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notes-list");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit-btn");
const refreshButton = document.getElementById("refresh-btn");

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type || ""}`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
}

// GET /api/notes: load and display all notes
async function loadNotes() {
  notesList.innerHTML = '<p class="muted">Loading notes...</p>';
  try {
    const response = await fetch("/api/notes");
    if (!response.ok) throw new Error("Unable to load notes.");
    const notes = await response.json();

    if (!Array.isArray(notes) || notes.length === 0) {
      notesList.innerHTML = '<div class="empty">No notes yet. Add your first note using the form.</div>';
      return;
    }

    notesList.innerHTML = notes.map(note => `
      <article class="note">
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.content)}</p>
        <time>${escapeHTML(formatDate(note.createdAt))}</time>
      </article>
    `).join("");
  } catch (error) {
    notesList.innerHTML = '<div class="empty">Could not load notes. Make sure the server is running, then refresh.</div>';
  }
}

// POST /api/notes: submit a new note, then refresh the list
form.addEventListener("submit", async event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    showMessage("Please fill in both fields.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  showMessage("", "");

  try {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not save note.");

    form.reset();
    showMessage("Your note was saved successfully!", "success");
    await loadNotes();
  } catch (error) {
    showMessage(error.message || "Something went wrong.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "＋ Save note";
  }
});

refreshButton.addEventListener("click", loadNotes);
loadNotes();
