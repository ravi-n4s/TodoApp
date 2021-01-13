// import uuid1 from uuid/v4;

var ul = document.querySelector("#list");
var storedTodos = [];

const setTodos = (ele) => {
  if (ele.length !== 0) localStorage.setItem("stored", JSON.stringify(ele));
  else {
    localStorage.clear();
  }
};

const getTodos = () => {
  return JSON.parse(localStorage.getItem("stored"));
};

const preload = () => {
  if (getTodos()) {
    storedTodos = getTodos();
  }
  storedTodos.forEach((ele) => addListItem(ele));
};

var addListItem = (newTodo) => {
  var li = document.createElement("li");
  let checkbox = document.createElement("input");

  li.setAttribute("className", "mycheck");
  // checkbox.setAttribute('id','check')

  checkbox.type = "checkbox";
  checkbox.id = "check";
  checkbox.setAttribute("value", newTodo.isChecked.id);
  checkbox.setAttribute("onchange", "{onCheck(value)}");
  checkbox.checked = newTodo.isChecked.value;

  var label = document.createElement("label");
  label.appendChild(document.createTextNode(newTodo.todo));

  li.appendChild(checkbox);
  li.appendChild(label);
  ul.insertBefore(li, ul.childNodes[0]);

  setTimeout(() => {
    li.className = "visual";
  }, 1);
};

const changeAllInputs = (value) => {
  storedTodos.forEach((ele, index) => {
    storedTodos[index].isChecked.value = value;
  });
  setTodos(storedTodos);
};

const onCheck = (value) => {
  storedTodos.forEach((ele, index) => {
    if (ele.isChecked.id == value)
      storedTodos[index].isChecked.value = ele.isChecked.value ? false : true;
  });

  setTodos(storedTodos);
};

var addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
  let newTodoValue = document.querySelector("#input").value;
  if (newTodoValue === undefined || newTodoValue === "") {
    // var audio = new Audio("addons/erro.mp3");
    // audio.play();
    // let errMsg = document.createElement('h6')
    let errMsg = document.querySelector("h6");
    errMsg.setAttribute("className", "errMsg");
    // errMsg.appendChild(document.createTextNode('Please Enter a new TODO item'))
    errMsg.style.color = "red";
    errMsg.style.marginTop = "0px";
    errMsg.style.marginBottom = "0px";
    errMsg.style.width = "70.5%";
    errMsg.style.textAlign = "center";
    errMsg.style.opacity = "1";

    let inputPlace = document.querySelector(".controls");
    // console.log(inputPlace.childNodes);
    inputPlace.insertBefore(errMsg, inputPlace.childNodes[7]);
    setTimeout(() => {
      // inputPlace.removeChild(errMsg)
      // errMsg.className = 'visualo'
      errMsg.style.opacity = "0";
    }, 1500);
  } else {
    newTodo = {
      todo: newTodoValue,
      isChecked: { value: false, id: Date.now() },
    };

    storedTodos.push(newTodo);
    setTodos(storedTodos);

    addListItem(newTodo);
    document.querySelector("#input").value = "";
  }
});

var removeBtn = document.querySelector("#remove");
removeBtn.addEventListener("click", () => {
  storedTodos = storedTodos.filter((ele) => ele.isChecked.value === false);

  setTodos(storedTodos);

  let li = ul.children;
  for (var i = 0; i < li.length; i++) {
    if (li[i].children[0].checked) {
      ul.removeChild(li[i]);
      i--;
    }
  }
  document.querySelector("#all").innerText = "Check All";
});

//check/uncheck all button
var checkAll = document.querySelector("#all");
checkAll.addEventListener("click", (event) => {
  if (event.target.innerText == "Check All") {
    event.target.innerText = "Uncheck All";
    changeAllInputs(true);
    let li = ul.children;
    for (let i = 0; i < li.length; i++) {
      li[i].children[0].checked = true;
    }
  } else {
    event.target.innerText = "Check All";
    changeAllInputs(false);
    let li = ul.children;
    for (let i = 0; i < li.length; i++) {
      li[i].children[0].checked = false;
    }
  }
});

preload();
