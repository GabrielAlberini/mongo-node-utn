const btnRecord = document.querySelector('.record-botton');
const taskList = document.querySelector('.tasks-list');

let recognition;
let isRecording = false;

recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'es-ES';

recognition.onstart = () => updateRecordingStatus(true);
recognition.onend = () => updateRecordingStatus(false);

function updateRecordingStatus(isRecording) {
  btnRecord.textContent = isRecording ? '⏹️ Detener Grabación' : '🎙️ Grabar Tarea';
}

const renderTasks = async () => {
  await fetchTasks()
    .then(tasks => {
      taskList.innerHTML = '';
      tasks.forEach(task => taskList.appendChild(createTaskElement(task)));
    })
    .catch(error => console.error('Error al obtener las tareas:', error));
}

const fetchTasks = async () => {
  return await fetch('http://localhost:1111/api/tasks').then(response => response.json());
}

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
  console.log({ transcriptFinal, priority })
  const newTask = {
    text: transcriptFinal.charAt(0).toUpperCase() + transcriptFinal.slice(1) + ".",
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
      console.log('Tarea añadida:', data);
      renderTasks();
    })
    .catch(error => console.error('Error al añadir la tarea:', error));
}

recognition.onresult = (event) => {
  let priority = "tranqui";
  const transcript = event.results[0][0].transcript;
  const transcriptFinal = transcript.replace(/categoría*/, "");
  if (transcript.includes("urgente")) {
    priority = "urgente";
  }
  else if (transcript.includes("medio")) {
    priority = "medio";
  }
  console.log({ transcriptFinal, priority })
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
