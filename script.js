let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    //   dateAdded: new Date().toLocaleString()
    };
    
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const pendingTasksContainer = document.getElementById("pendingTasks");
  const completedTasksContainer = document.getElementById("completedTasks");
  
  pendingTasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  tasks.forEach(task => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    
    const taskText = document.createElement("p");
    taskText.innerText = `${task.text} `;
    
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
    }
    
    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons");

    const completeButton = document.createElement("button");
    completeButton.innerText = task.completed ? "Undo" : "Complete";
    completeButton.onclick = () => toggleTaskCompletion(task.id);
    taskButtons.appendChild(completeButton);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => editTask(task.id);
    taskButtons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);
    taskButtons.appendChild(deleteButton);

    taskElement.appendChild(taskText);
    taskElement.appendChild(taskButtons);

    if (task.completed) {
      completedTasksContainer.appendChild(taskElement);
    } else {
      pendingTasksContainer.appendChild(taskElement);
    }
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  
  if (task.completed) {
    task.dateCompleted = new Date().toLocaleString();
  } else {
    delete task.dateCompleted;
  }
  
  renderTasks();
}

function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  const newTaskText = prompt("Edit task:", task.text);
  
  if (newTaskText) {
    task.text = newTaskText;
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

renderTasks();
