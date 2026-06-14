let timer;
let timeLeft = 1500;
let completedSessions = 0;

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      completedSessions++;
      localStorage.setItem("sessions", completedSessions);
      updateStats();
      alert("Focus session complete!");
      return;
    }

    timeLeft--;
    document.getElementById("time").innerText =
      Math.floor(timeLeft / 60) + ":" + (timeLeft % 60);
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 1500;
  document.getElementById("time").innerText = "25:00";
}

function addTask() {
  let task = document.getElementById("taskInput").value;
  if (!task) return;

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  document.getElementById("taskInput").value = "";
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.forEach((t, index) => {
    let li = document.createElement("li");
    li.innerText = t;

    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    list.appendChild(li);
  });
}

function updateStats() {
  document.getElementById("stats").innerText =
    "Sessions Completed: " + (localStorage.getItem("sessions") || 0);
}

window.onload = () => {
  completedSessions = Number(localStorage.getItem("sessions") || 0);
  renderTasks();
  updateStats();
};
