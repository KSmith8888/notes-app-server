const openSignInModalBtn = document.getElementById("open-sign-in-modal-button");
const closeSignInModalBtn = document.getElementById(
    "close-sign-in-modal-button"
);
const signInModal = document.getElementById("sign-in-modal");
const signInForm = document.getElementById("sign-in-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const signInErrorMsg = document.getElementById("sign-in-error-message");
const notesSection = document.getElementById("notes-section");
const signInSection = document.getElementById("sign-in-section");

const openCreateAccountModalBtn = document.getElementById(
    "open-create-account-modal-button"
);
const closeCreateAccountModalBtn = document.getElementById(
    "close-create-account-modal-button"
);
const createAccountModal = document.getElementById("create-account-modal");
const createAccountForm = document.getElementById("create-account-form");
const createUsernameInput = document.getElementById("create-username-input");
const createPasswordInput = document.getElementById("create-password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");

function displayNotes(notes) {
    notesSection.replaceChildren();
    if (Array.isArray(notes)) {
        notes.forEach((note) => {
            const noteText = document.createElement("p");
            noteText.textContent = note;
            notesSection.append(noteText);
        });
    }
}

openSignInModalBtn.addEventListener("click", () => {
    signInModal.showModal();
});

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        if (usernameInput.value === "" || passwordInput.value === "") {
            throw new Error("Please provide a username and password");
        }
        const loginInfo = {
            username: usernameInput.value,
            password: passwordInput.value,
        };
        const response = await fetch(
            `http://127.0.0.1:5173/api/v1/authentication/login`,
            {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        signInErrorMsg.textContent = "";
        signInForm.reset();
        signInModal.close();
        signInSection.classList.add("hidden");
        displayNotes(data.notes);
    } catch (error) {
        console.error(error);
        signInForm.reset();
        signInErrorMsg.textContent = error.message;
    }
});

closeSignInModalBtn.addEventListener("click", () => {
    signInModal.close();
});

openCreateAccountModalBtn.addEventListener("click", () => {
    createAccountModal.showModal();
});

createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        if (
            createUsernameInput.value === "" ||
            createPasswordInput.value === "" ||
            confirmPasswordInput.value === ""
        ) {
            throw new Error("Please provide a username and password");
        }
        if (createPasswordInput.value !== confirmPasswordInput.value) {
            throw new Error("Password confirmation does not match input");
        }
        const newAccountInfo = {
            username: createUsernameInput.value,
            password: createPasswordInput.value,
        };
        const response = await fetch(
            `http://127.0.0.1:5173/api/v1/authentication/register`,
            {
                method: "POST",
                body: JSON.stringify(newAccountInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        signInErrorMsg.textContent = "";
        createAccountForm.reset();
        createAccountModal.close();
    } catch (error) {
        console.error(error);
        createAccountForm.reset();
        signInErrorMsg.textContent = error.message;
    }
});

closeCreateAccountModalBtn.addEventListener("click", () => {
    createAccountModal.close();
});
