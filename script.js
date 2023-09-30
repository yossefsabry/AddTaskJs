// dom elements
let calender = document.querySelector(".calender");
let clock = document.querySelector(".clock");
let inputTask = document.querySelector("#inputTask");
let submit = document.querySelector("#submit");
let clear = document.querySelector("#clear")
let count = document.querySelector(".count_clear p")
// data and clock
function data_time() {
    let data = new Date();
    today = data.toDateString();
    let time_now = data.toLocaleTimeString();
    calender.innerHTML = ` ${today}  `;
    clock.innerHTML = time_now;
    counttask()
}
setInterval(data_time, 1000);



// start save on localstorage
submit.addEventListener("click", collectDataInLocalStorage);
inputTask.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        collectDataInLocalStorage()
    }
})
let dataStorage;

if (localStorage.item != null) {
    dataStorage = JSON.parse(localStorage.item); // convert the json to array
} else {
    dataStorage = [];
}

function collectDataInLocalStorage() {
    let task = {
        task: inputTask.value,
    };
    if (inputTask.value != '') {
        dataStorage.push(task);
    }
    localStorage.setItem("item", JSON.stringify(dataStorage)); // convert the arry to json for localstorage
    inputTask.value = "";
    showData()
}

// show data
function showData() {
    let items = '';
    for (let i = 0; i < dataStorage.length; i++) {
        items += `
            <li class="tasks">
                <div class="content">
                    <input type="checkbox" id="task-input">
                    <p>${dataStorage[i].task}</p>
                </div>
                <i class='bx bx-trash' id="deletel_row" onclick=deleteRow(${i})></i>
            </li>
        `;
    }
    document.querySelector("ul").innerHTML = items;
}

showData()

// clear all
clear.addEventListener("click", clearAll)

function clearAll() {
    dataStorage.splice(0)
    localStorage.clear()
    showData()
}

// count task
function counttask() {
    count.innerHTML = `You Have ${dataStorage.length} Task`
}

function deleteRow(i) {
    dataStorage.splice(i, 1)
    localStorage.item = JSON.stringify(dataStorage)
    showData()
}