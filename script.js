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
function sendMessage() {
  let input = document.getElementById("chatInput");
  let text = input.value;
  if (!text) return;

  let chatBox = document.getElementById("chatBox");

  // User message
  let userMsg = document.createElement("div");
  userMsg.innerText = "You: " + text;
  chatBox.appendChild(userMsg);

  // Simple AI response (mock intelligence)
  let botMsg = document.createElement("div");

  let reply = "";

  if (text.toLowerCase().includes("study")) {
    reply = "Try using 25-minute focus sessions with short breaks.";
  } else if (text.toLowerCase().includes("motivate")) {
    reply = "Consistency beats motivation. Start small, stay steady.";
  } else if (text.toLowerCase().includes("hello")) {
    reply = "Hello 👋 I’m your Study assistant.";
  } else {
    reply = "I’m still learning. Try asking about study tips.";
  }

  botMsg.innerText = "AI: " + reply;
  chatBox.appendChild(botMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
