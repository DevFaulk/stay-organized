"use strict";
const userDrop = document.querySelector("#user-drop");

function loadUserDrop() {
  fetch("http://localhost:8083/api/users")
    .then((response) => response.json())
    .then((users) => {
      for (const user of users) {
        let userOption = document.createElement("option");
        userOption.value = user.id;
        userOption.innerHTML = user.username;
        userDrop.appendChild(userOption);
      }
    });
}

//calls
window.onload = loadUserDrop;
