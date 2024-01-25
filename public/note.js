const notesSection = document.getElementById("notes-section");
const createNoteBtn = document.getElementById("create-note-button");

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
    const completeDateString = `${hours}:${minutes} ${dateString}`;
    return completeDateString;
}
/*
function generateNoteHTML(content, timstamp) {

}
*/

createNoteBtn.addEventListener("click", async () => {
    try {
        const currentUser = sessionStorage.getItem("user");
        if (!currentUser) {
            throw new Error("Error: not currently signed in");
        }
        const noteContent = "This is only a test";
        const response = await fetch(
            `http://127.0.0.1:5173/api/v1/note/create`,
            {
                method: "POST",
                body: JSON.stringify({ content: noteContent }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (!data) {
            throw new Error(
                "Error: There was a problem signing out, please try again later"
            );
        }
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
});
