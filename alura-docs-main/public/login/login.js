import { emitAuthenticateUser } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form["input-usuario"].value;
    const password = form["input-senha"].value;
    
    emitAuthenticateUser({ name, password });
});