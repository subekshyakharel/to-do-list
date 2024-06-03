
let taskList = []

const dayArr = ["sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"]

const updateDay = () =>{
    const date = new Date();
    const day = date.getDay()
    document.getElementById("day").innerText = dayArr[day];
}


const timeDisplay = () => {
    const date = new Date();
let hr = date.getHours()
let period = "AM"
if(hr >= 12){
    hr = hr- 12;
    period = "PM"
}
if(hr==0){
    hr = 12;
}

if(hr< 10){
    hr = "0" + hr;
}
let min = date.getMinutes()
if(min < 10){
    min = "0" + min;
}
let sec = date.getSeconds()
if(sec< 10){
    sec = "0" + sec;
}
console.log(hr + ":" + min + ":" + sec)
    document.querySelector(".time").innerText = hr + ":" + min + ":" + sec + " " + period;
}
updateDay()
timeDisplay()

setInterval(timeDisplay , 1000)





const handleOnSubmit = (e) =>{
   
    const newForm = new FormData(e);
    const task = newForm.get("task");
    const obj = {
        task, 
        id: randomIdGenerator(), 
        completed: false,
    }
    taskList.push(obj)
    console.log(taskList)
    displayTaskList()
}

const displayTaskList = () =>{
    let str = ''
    const tableList = document.querySelector(".tableList");

    taskList.map((item, i)=>{
        str += `
        <tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td class="text-end">
            <button onclick = handleOnDel("${item.id}") class="btn btn-danger"><i class="bi bi-trash3"></i></button>
            <button onclick="toggleTaskCompletion('${item.id}')" class="btn ${item.completed ? 'btn-success' : 'btn-primary'} mark"><i class="bi bi-check2"></i></button>
        </td>
        </tr>`
    })
    tableList.innerHTML = str;
}

const handleOnClear = () =>{
    if(window.confirm("Are you sure you want to delete all the task?"))
    taskList = [];
   displayTaskList();
}

const handleOnDel = (id) =>{
    if(window.confirm("Are you sure you want to delete?"))
    taskList = taskList.filter((item)=>{ return item.id !== id});
    displayTaskList();
}

const toggleTaskCompletion = (id) => {
    taskList = taskList.map((item) => {
        if (item.id === id) {
            return { ...item, completed: !item.completed };
        }
        return item;
    });
    displayTaskList();
}


const randomIdGenerator = () =>{
    const str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    let id = ''
    for(let i=0; i<6; i++){
    const index = Math.floor(Math.random() * str.length);
    id += str[index]
    }
    return id;
}

