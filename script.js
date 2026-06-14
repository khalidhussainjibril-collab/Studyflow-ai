let timer;
let timeLeft = 1500; // 25 minutes

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Focus session finished!");
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

  if (task === "") return;

  let li = document.createElement("li");
  li.innerText = task;

  li.onclick = () => li.remove();

  document.getElementById("taskList").appendChild(li);

  document.getElementById("taskInput").value = "";
}
