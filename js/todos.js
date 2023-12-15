"use strict";
const userDrop = document.querySelector("#user-drop");
const todoCard = document.querySelector("#userCard");

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

function loadUsersCard() {
  todoCard.innerText = " ";

  fetch("http://localhost:8083/api/todos")
    .then((response) => response.json())
    .then((todos) => {
      for (const todo of todos) {
        if (userDrop.value == todo.userid) {
          addCategoryToCard(todo);

          addPriorityToCard(todo);

          addDescriptionToCard(todo);

          addDeadlineToCard(todo);

          addNoCompletionButton(todo);

          addYesCompletionButton(todo);
        }
      }
    });
}

window.onload = function () {
  loadUserDrop();
};

userDrop.onchange = function () {
  const addTodoLink = document.querySelector("#addTodoLink");
  if (userDrop.value !== "select") {
    // show add todo
    addTodoLink.style.display = "inline";
    //change link location on change
    addTodoLink.href = `new_todo.html/?userId=${userDrop.value}`;
    loadUsersCard();
  } else if (userDrop.value == "select") {
    addTodoLink.style.display = "none";
    addTodoLink.removeAttribute("href");
    return;
  }
};

function addYesCompletionButton(todo) {
  let completeNoButton = document.createElement("button");
  completeNoButton.className = "delete-button";
  completeNoButton.id = "deleteButton";
  completeNoButton.innerText = "\u0058";
  if (todo.completed == false) {
    completeNoButton.style.backgroundColor = "red";
  } else {
    completeNoButton.style.backgroundColor = "white";
  }
  todoCard.appendChild(completeNoButton);
}

function addNoCompletionButton(todo) {
  let completeYesButton = document.createElement("button");
  completeYesButton.className = "complete-button";
  completeYesButton.id = "completeButton";
  completeYesButton.innerText = "\u2713";
  if (todo.completed == true) {
    completeYesButton.style.backgroundColor = "green";
  } else {
    completeYesButton.style.backgroundColor = "white";
  }
  todoCard.appendChild(completeYesButton);
}

function addDeadlineToCard(todo) {
  let deadline = document.createElement("p");
  deadline.innerText = `Deadline: ${todo.deadline}`;
  todoCard.appendChild(deadline);
}

function addDescriptionToCard(todo) {
  let todoDescription = document.createElement("p");
  todoDescription.innerText = todo.description;
  todoCard.appendChild(todoDescription);
}

function addPriorityToCard(todo) {
  let priority = document.createElement("h5");
  priority.innerText = `Priority: ${todo.priority}`;
  todoCard.appendChild(priority);
}

function addCategoryToCard(todo) {
  let category = document.createElement("h4");
  category.innerText = todo.category;
  todoCard.appendChild(category);
}
