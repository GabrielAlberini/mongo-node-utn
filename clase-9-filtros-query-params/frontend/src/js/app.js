const btnRecord = document.querySelector('.record-botton');
const tasksCountText = document.querySelector('.tasks-count-text')
const taskList = document.querySelector('.tasks-list');
const filterStatus = document.querySelector('#filter-status');
const filterPriority = document.querySelector('#filter-priority');

let recognition;
let isRecording = false;

recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'es-ES';

recognition.onstart = () => updateRecordingStatus(true);
recognition.onend = () => updateRecordingStatus(false);

function updateRecordingStatus(isRecording) {
  btnRecord.textContent = isRecording ? '⏹️ Detener Grabación' : '🎙️ Grabar Tarea';
}

const countTasks = async () => {
  await fetch("http://localhost:1111/api/tasks")
    .then(res => res.json())
    .then(totalTasks => {
      // Calculate total tasks and completed tasks
      const tasks = totalTasks.length;
      const completedTasks = totalTasks.filter(task => task.done).length;

      // Update the tasks count text
      tasksCountText.textContent = `Tareas: ${tasks} | Completadas: ${completedTasks}`;
    }
    )
}

const renderTasks = async () => {
  await fetchFilteredTasks()
    .then(tasks => {
      taskList.innerHTML = '';
      tasks.forEach(task => taskList.appendChild(createTaskElement(task)));
    })
    .catch(error => console.error('Error al obtener las tareas:', error));
}

const fetchFilteredTasks = async () => {
  const params = new URLSearchParams();
  const status = filterStatus.value;
  const priority = filterPriority.value;

  if (status !== 'all') params.append('done', status);
  if (priority !== 'all') params.append('priority', priority);

  const url = `http://localhost:1111/api/tasks/search?${params.toString()}`;
  console.log(url)
  return await fetch(url).then(response => response.json());
}

filterStatus.addEventListener('change', renderTasks);
filterPriority.addEventListener('change', renderTasks);

function createTaskElement(task) {
  const li = document.createElement('li');
  li.classList.add('task-item');

  if (task.priority === "tranqui") {
    li.classList.add('task-item-tranqui');
  } else if (task.priority === "medio") {
    li.classList.add('task-item-medio');
  } else if (task.priority === "urgente") {
    li.classList.add('task-item-urgente');
  }

  const checkbox = createCheckbox(task);
  const contContentTask = createTaskContent(checkbox, task.text);
  const deleteBtn = createDeleteButton(task._id, li);

  li.appendChild(contContentTask);
  li.appendChild(deleteBtn);

  return li;
}

function createCheckbox(task) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');
  checkbox.checked = task.done;
  checkbox.addEventListener('change', () => updateTaskStatus(task._id, checkbox.checked));
  return checkbox;
}

const updateTaskStatus = async (taskId, isDone) => {
  await fetch(`http://localhost:1111/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ done: isDone })
  })
    .then(response => {
      if (!response.ok) console.error('Error al actualizar la tarea');
    })
    .catch(error => console.error('Error al actualizar la tarea:', error));
}

function createTaskContent(checkbox, text) {
  const contContentTask = document.createElement('div');
  contContentTask.classList.add('cont-content-task');
  contContentTask.appendChild(checkbox);
  contContentTask.appendChild(document.createTextNode(text));
  return contContentTask;
}

function createDeleteButton(taskId, listItem) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-id', taskId);
  deleteBtn.addEventListener('click', () => deleteTask(taskId, listItem));
  return deleteBtn;
}

const deleteTask = async (taskId, listItem) => {
  if (confirm("¿Quieres borrar la tarea?")) {
    await fetch(`http://localhost:1111/api/tasks/${taskId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          listItem.remove();
        } else {
          console.error('Error al borrar la tarea');
        }
      })
      .catch(error => console.error('Error al borrar la tarea:', error));
  }
}

const addTask = ({ transcriptFinal, priority }) => {
  const newTask = {
    text: transcriptFinal.charAt(0).toUpperCase() + transcriptFinal.slice(1),
    done: false,
    priority,
    date: new Date().toISOString()
  };

  fetch('http://localhost:1111/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
    .then(response => response.json())
    .then(data => {
      renderTasks();
    })
    .catch(error => console.error('Error al añadir la tarea:', error));
}

recognition.onresult = (event) => {
  let priority = "tranqui";
  const transcript = event.results[0][0].transcript;
  const transcriptFinal = transcript.replace(/categoría.*/, "");
  if (transcript.includes("urgente")) {
    priority = "urgente";
  }
  else if (transcript.includes("medio")) {
    priority = "medio";
  }
  addTask({ transcriptFinal, priority });
};

btnRecord.addEventListener('click', () => {
  if (isRecording) {
    recognition.stop();
    isRecording = false;
  } else {
    recognition.start();
    isRecording = true;
  }
});

renderTasks();
countTasks()