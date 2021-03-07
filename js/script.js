'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted){
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStoroge() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.input.value = '';
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStoroge();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if(todo.completed){
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if(this.input.value){
      if(this.input.value.trim()){
        const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
        }
        this.todoData.set(newTodo.key, newTodo);
        this.render();
      }
    }else{
      alert('Введите задачу');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(key){
    this.todoData.delete(key);
    this.render();
  }
    
  completedItem(completed){
    this.todoData.completed;
    this.render();
  }
    
  handler() {
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.addEventListener('click', (event) => {
      const target = event.target;
      
      if(target.matches('.todo-remove')) {
        this.todoData.forEach(elem => {
          if(elem.key === target.closest('.todo-item').key){
            this.deleteItem(elem.key);
            console.log(elem.key);
          }
        });
      }

      if(target.matches('.todo-complete')) {
        this.todoData.forEach(elem => {
          if(elem.key === target.closest('.todo-item').key){
            elem.completed = !elem.completed;
            this.completedItem(elem.completed);
            // console.log(elem);
            // console.log(elem.key);
            // console.log(elem.completed);
          }
        });
      }
       
    });
  }
  
  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.handler();
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();