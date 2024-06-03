i
let taskList = []

const handleOnSubmit = (e) =>{
    e.preventDefault(); 
    const newForm = new FormData(e.target);
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

