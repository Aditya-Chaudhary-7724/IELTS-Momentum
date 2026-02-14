const state = JSON.parse(localStorage.getItem("momentum")) || {
  lri: 0,
  streak: 0,
  tokens: 0,
  activeDays: 0,
  lastActiveDate: null
};

const goals = [
  "Complete 1 Speaking cue card",
  "Solve 5 Reading questions",
  "Listen to 1 audio clip + notes",
  "Write 1 short essay intro"
];

function saveState() {
  localStorage.setItem("momentum", JSON.stringify(state));
}

function generatePlan() {
  const goal = goals[Math.floor(Math.random() * goals.length)];
  document.getElementById("microGoal").innerText = goal;
}

function completeGoal() {
  const today = new Date().toDateString();

  if (state.lastActiveDate === today) {
    alert("You’ve already completed today’s goal 🙂");
    return;
  }

  state.lastActiveDate = today;
  state.activeDays += 1;
  state.streak += 1;

  state.lri = Math.min(state.lri + 0.3, 9);

  if (state.streak % 3 === 0) {
    state.tokens += 1;
  }

  saveState();
  updateUI();
}

function updateUI() {
  document.getElementById("lriScore").innerText = state.lri.toFixed(1);
  document.getElementById("lriBar").style.width = (state.lri / 9) * 100 + "%";
  document.getElementById("streak").innerText = state.streak;
  document.getElementById("tokens").innerText = state.tokens;
  document.getElementById("activeDays").innerText = state.activeDays;

  document.getElementById("status").innerText =
    state.activeDays >= 4 ? "On Track" : "Needs Push";
}

updateUI();
