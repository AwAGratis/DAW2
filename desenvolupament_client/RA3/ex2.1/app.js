// Selectors
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// LocalStorage key
const STORAGE_KEY = 'todoList';

// Carrega les tasques del LocalStorage quan es carrega la pàgina
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateStats();
});

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
clearBtn.addEventListener('click', clearAllTasks);

// Funció per afegir una nova tasca
function addTask() {
    const taskText = taskInput.value.trim();

    // Validació: no afegir tasques buides
    if (taskText === '') {
        taskInput.focus();
        return;
    }

    // Crear l'objecte de la tasca
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Obtenir tasques del LocalStorage
    let tasks = getTasks();
    tasks.push(task);

    // Guardar al LocalStorage
    saveTasks(tasks);

    // Limpiar l'input
    taskInput.value = '';
    taskInput.focus();

    // Actualitzar la vista
    loadTasks();
    updateStats();
}

// Funció per obtenir tasques del LocalStorage
function getTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
}

// Funció per guardar tasques al LocalStorage
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Funció per carrega les tasques i renderitzar-les
function loadTasks() {
    const tasks = getTasks();
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">No tens tasques. Comença a afegir-ne!</div>';
        return;
    }

    tasks.forEach((task) => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

// Funció per crear l'element de la tasca
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <input 
            type="checkbox" 
            class="checkbox" 
            ${task.completed ? 'checked' : ''}
            onchange="toggleTask(${task.id})"
        >
        <span class="task-text">${escapeHtml(task.text)}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Esborrar</button>
    `;

    return li;
}

// Funció per marcar/desmarcar una tasca com a completada
function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(tasks);
    loadTasks();
    updateStats();
}

// Funció per esborrar una tasca
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);
    loadTasks();
    updateStats();
}

// Funció per esborrar totes les tasques
function clearAllTasks() {
    if (getTasks().length === 0) return;

    if (confirm('Estàs segur que vols esborrar totes les tasques?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadTasks();
        updateStats();
    }
}

// Funció per actualitzar les estadístiques
function updateStats() {
    const tasks = getTasks();
    const completedCount = tasks.filter((task) => task.completed).length;
    
    totalTasksSpan.textContent = tasks.length;
    completedTasksSpan.textContent = completedCount;
    
    // Desactivar el botó de netejar si no hi ha tasques
    clearBtn.disabled = tasks.length === 0;
}

// Funció per escapar caracteres HTML (seguretat contra XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
