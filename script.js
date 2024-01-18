const todoTitle = document.querySelector("#todoTitle");
const todoDesc = document.querySelector("#todoDesc");
const addBtn = document.querySelector("#addBtn");
const cancel = document.querySelector("#cancel");
const todoContent = document.querySelector(".todoBodyContent");
const updateTodo = document.querySelector(".updateTodo");
// const editbtn = document.querySelector("#editbtn");
// const dltbtn = document.querySelectorAll("#dltbtn");

cancel.addEventListener("click", () => {
  document.querySelector("#edittitle").value = "";
  document.querySelector("#editdescription").value = "";
  updateTodo.style.display = "none";
});

// check if todo exist or add one
if (!localStorage.getItem("todo")) {
  let mkArry = new Array();
  localStorage.setItem("todo", JSON.stringify(mkArry));
}

function showMassage() {
  let cuItem = JSON.parse(localStorage.getItem("todo"));
  if (cuItem.length === 0) {
    let valuAdd = `
  <h1>There is no todo</h1>
  `;
    document.querySelector(".showmessage").innerHTML = valuAdd;
  } else {
    let valuAdd = `
  <h1></h1>
  `;
    document.querySelector(".showmessage").innerHTML = valuAdd;
  }
}

const loopTodos = () => {
  // Empty Todo Content
  todoContent.innerHTML = "";

  let currentItems = JSON.parse(localStorage.getItem("todo"));
  // Loop throw From localStorage
  let serial = 1;
  currentItems.forEach((value, index) => {
    todoContent.innerHTML += `
  <li id="singleTodo" data-itemId="${index}">
    <p class="firstChild">
      <span class="TodoId">${serial}.</span>${value.title}
    </p>
    <p class="lastChild">${value.desc}</p>
    <div class="buttons">
      <button  class="edit" id="editbtn">
        Edit
      </button>
      <button data-itemId="${index}" class="dlt" id="dltbtn">
        Delete
      </button>
    </div>
  </li>
`;
    serial++;
  });
  deleteTodos();
  showMassage();
  modifyTodo();
};
loopTodos();

// addTodo

const addTodo = () => {
  addBtn.addEventListener("click", () => {
    let titleInput = todoTitle.value.trim();
    let descInput = todoDesc.value.trim();

    let newTodo = {
      title: titleInput,
      desc: descInput,
    };

    // Get Current Items
    let currentTodos = JSON.parse(localStorage.getItem("todo"));
    currentTodos.push(newTodo);
    localStorage.clear();
    localStorage.setItem("todo", JSON.stringify(currentTodos));

    // Empty Input Box

    todoTitle.value = "";
    todoDesc.value = "";

    loopTodos();
    showMassage();
    showAddAndDeleteMassage("Todo Is added Successfull", "success");
    modifyTodo();
  });
};

function deleteTodos() {
  // Delete Todos
  const allTodos = document.querySelectorAll("#singleTodo");
  allTodos.forEach((todo) => {
    todo.querySelector("#dltbtn").addEventListener("click", () => {
      let currentItems = JSON.parse(localStorage.getItem("todo"));

      let clickedIndex = parseInt(todo.getAttribute("data-itemId"));

      // todo filter
      let remainingItems = currentItems.filter((item, index) => {
        return index !== clickedIndex;
      });
      //  clear the localStorage
      localStorage.clear();
      localStorage.setItem("todo", JSON.stringify(remainingItems));

      loopTodos();
      showMassage();
      showAddAndDeleteMassage("Todo Delete Successfull", "danger");
    });
  });
}

function showAddAndDeleteMassage(value, style) {
  let addAndRemoveMassage = document.querySelector(".addAndRemoveMassage");

  addAndRemoveMassage.innerHTML = value;
  addAndRemoveMassage.classList.add(style);

  setTimeout(() => {
    addAndRemoveMassage.innerHTML = "";
    addAndRemoveMassage.classList.remove(style);
  }, 1000);
}

// modifyTodo

function modifyTodo() {
  // Delete Todos
  const allTodos = document.querySelectorAll("#singleTodo");
  allTodos.forEach((todo) => {
    todo.querySelector("#editbtn").addEventListener("click", () => {
      let currentItems = JSON.parse(localStorage.getItem("todo"));
      let clickedIndex = parseInt(todo.getAttribute("data-itemId"));

      document.querySelector("#edittitle").value =
        currentItems[clickedIndex].title;
      document.querySelector("#editdescription").value =
        currentItems[clickedIndex].desc;
      updateTodo.style.display = "block";

      document.querySelector("#arrayIndex").value = clickedIndex;

      // loopTodos();
      // showMassage();
    });
  });
}

function updateTodoforClick() {
  document.querySelector("#update").addEventListener("click", () => {
    let currentItems = JSON.parse(localStorage.getItem("todo"));

    let editTitle = document.querySelector("#edittitle").value;
    let editDesc = document.querySelector("#editdescription").value;

    let editObj = {
      title: editTitle,
      desc: editDesc,
    };

    let updateIndex = Number(document.querySelector("#arrayIndex").value);
    currentItems[updateIndex] = editObj;

    localStorage.clear();
    localStorage.setItem("todo", JSON.stringify(currentItems));

    document.querySelector("#edittitle").value = "";
    document.querySelector("#editdescription").value = "";
    updateTodo.style.display = "none";
    showAddAndDeleteMassage("Todo Modify Successfull", "success");
    loopTodos();
  });
}
updateTodoforClick();
modifyTodo();
deleteTodos();
addTodo();
