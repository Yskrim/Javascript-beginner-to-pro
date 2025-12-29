
const todolist = JSON.parse(localStorage.getItem('todolist')) ?? [
    {
        name: 'Wash Dishes',
        date: '10/12/2025', 
        time: `${getTime()}:${getDate()}`
    },
    {
        name: 'Do laundry',
        date: '10/12/2025',
        time: `${getTime()}:${getDate()}`
    },
]
const donelist = JSON.parse(localStorage.getItem('donelist')) ?? []
// console.log(todolist)
// console.log(donelist)
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    addTodo()
    renderList()
});

function addTodo(){
    const nameInput = document.getElementById('todo-name');
    const dateInput = document.getElementById('todo-date');
    const timeInput = document.getElementById('todo-time');

    const todo = { 
        name: nameInput.value,
        date: dateInput.value ? dateInput.value : getDate(),
        time: timeInput.value ? timeInput.value : getTime(),
    }
    todolist.push(todo);
    renderList();
}

function renderList(){
    const jsTodoList=document.querySelector('.js-todo-list')
    let todoListHtml = todolist.length ? '<label>Todo List:</label>' : ''
    
    todolist.forEach(obj => {
        const html = `
            <div class="todo-element">
                <p>
                    <h4>${obj.name}</h4>
                    <p class="meta">${obj.date} ${obj.time}</p>
                    <button class='js-todo-element-delete'>delete</button>
                    <button class='js-todo-element-complete'>done</button>
                </p>
            </div>
        `
        todoListHtml += html
    })
    jsTodoList.innerHTML = todoListHtml

    const jsDoneList = document.querySelector('.js-done-list')
    let donelistHtml = donelist.length ? '<label>Complete:</label>' : ''
    
    donelist.forEach(obj=>{
        const donehtml = `
            <div class='done-element'>
                <h4>${obj.name}</h4>
                <p class="meta">${obj.date ?? ''} ${obj.time ?? ''}</p>
                <button class="js-done-element-remove">remove</button> 
            </div>
        `
        donelistHtml += donehtml
    })
    jsDoneList.innerHTML = donelistHtml

    scrollDown(jsTodoList,jsDoneList)

    document.querySelectorAll('.js-todo-element-delete')
        .forEach((el, index) =>{
            el.addEventListener('click', ()=>{ 
                todolist.splice(index, 1)
                renderList()
            });
        });
    document.querySelectorAll('.js-todo-element-complete')
        .forEach((button,index) =>{
            button.addEventListener('click', ()=>{
                donelist.push({...todolist[index]})
                todolist.splice(index, 1)
                renderList()
            });
        });
    document.querySelectorAll('.js-done-element-remove')
        .forEach((button,index) =>{
            button.addEventListener('click', ()=>{
                donelist.filter((obj,ind) => {return ind!=index})
            });
        });
}

function getDate(){
    const date = new Date()
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
}

function getTime(){
    const date = new Date()
    return `${date.getHours()}:${date.getMinutes()}`
}

function clearLists(){
    todolist.length=0
    donelist.length=0
    localStorage.removeItem('todolist')
    localStorage.removeItem('donelist')
    renderList()
}

function saveLists(){
    localStorage.setItem('donelist', JSON.stringify(donelist))
    localStorage.setItem('todolist', JSON.stringify(todolist))
    renderList()
}

function scrollDown(jsTodoList, jsDoneList){
    jsTodoList.lastElementChild?.scrollIntoView({ behavior : 'smooth'})
    jsDoneList.lastElementChild?.scrollIntoView({ behavior : 'smooth'})
}


renderList()
