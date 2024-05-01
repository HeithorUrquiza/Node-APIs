import emitUserRegister from "./socket-front-register.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form["input-usuario"].value;
    const password = form["input-senha"].value;

    emitUserRegister({ name, password });
});