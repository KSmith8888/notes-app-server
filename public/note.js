//const notesSection = document.getElementById("notes-section");
const currentNotes = document.getElementById("current-notes");
const createNoteBtn = document.getElementById("create-note-button");
const createNoteModal = document.getElementById("create-note-modal");
const createNoteForm = document.getElementById("create-note-form");
const closeCreateNoteModalBtn = document.getElementById(
    "close-create-note-modal-button"
);
const createNoteContentInput = document.getElementById(
    "create-note-content-input"
);

function createDateString(timestamp) {
    const date = new Date(timestamp);
    const initialHours = date.getHours();
    const hoursAmPm = initialHours >= 12 ? "PM" : "AM";
    const hours = initialHours > 12 ? initialHours - 12 : initialHours;
    const initialMinutes = date.getMinutes();
    const minutes =
        initialMinutes > 9
            ? `${initialMinutes} ${hoursAmPm}`
            : `0${initialMinutes} ${hoursAmPm}`;
    const dateString = date.toDateString();
    const completeDateString = `Created at ${hours}:${minutes} ${dateString}`;
    return completeDateString;
}

function displayNotes(notes) {
    currentNotes.replaceChildren();
    if (Array.isArray(notes)) {
        notes.forEach((note) => {
            const noteArticle = document.createElement("article");
            const noteText = document.createElement("p");
            noteText.textContent = note.content;
            noteArticle.append(noteText);
            const noteDateString = document.createElement("p");
            noteDateString.textContent = createDateString(note.timestamp);
            noteArticle.append(noteDateString);
            const deleteNoteBtn = document.createElement("button");
            deleteNoteBtn.classList.add("button");
            deleteNoteBtn.textContent = "Delete";
            deleteNoteBtn.dataset.id = note.noteId;
            deleteNoteBtn.addEventListener("click", () => {
                deleteNote(deleteNoteBtn.dataset.id);
            });
            noteArticle.append(deleteNoteBtn);
            currentNotes.append(noteArticle);
        });
    }
}

createNoteBtn.addEventListener("click", () => {
    createNoteModal.showModal();
});

createNoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const currentUser = sessionStorage.getItem("user");
        if (!currentUser) {
            throw new Error("Error: not currently signed in");
        }
        const noteContent = createNoteContentInput.value;
        if (noteContent === "") {
            throw new Error("Note content was not provided");
        }
        const response = await fetch(
            `http://127.0.0.1:5173/api/v1/note/create`,
            {
                method: "POST",
                body: JSON.stringify({
                    content: noteContent,
                    username: currentUser,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (!data) {
            throw new Error(
                "Error: There was a problem, please try again later"
            );
        }
        createNoteForm.reset();
        createNoteModal.close();
        displayNotes(data.notes);
    } catch (error) {
        console.error(error.message);
    }
});

closeCreateNoteModalBtn.addEventListener("click", () => {
    createNoteForm.reset();
    createNoteModal.close();
});

async function deleteNote(noteId) {
    try {
        const currentUser = sessionStorage.getItem("user");
        if (!currentUser) {
            throw new Error("Error: not currently signed in");
        }
        const response = await fetch(
            `http://127.0.0.1:5173/api/v1/note/delete`,
            {
                method: "DELETE",
                body: JSON.stringify({
                    id: noteId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (!data) {
            throw new Error(
                "Error: There was a problem, please try again later"
            );
        }
        displayNotes(data.notes);
    } catch (error) {
        console.error(error.message);
    }
}

export { displayNotes };
