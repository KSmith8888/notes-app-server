const openSignInModalBtn = document.getElementById("open-sign-in-modal-button");
const closeSignInModalBtn = document.getElementById(
    "close-sign-in-modal-button"
);
const signInModal = document.getElementById("sign-in-modal");
const signInForm = document.getElementById("sign-in-form");

openSignInModalBtn.addEventListener("click", () => {
    signInModal.showModal();
});

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Sign in form submitted");
});

closeSignInModalBtn.addEventListener("click", () => {
    signInModal.close();
});
