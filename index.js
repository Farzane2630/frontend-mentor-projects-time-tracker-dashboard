const timeBtns = document.querySelectorAll(".time-btn");
const container = document.querySelector(".activities-cards");
let chosenTime = "daily";

const timeFrame = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
};

/** Fetch JSON data */
async function getData() {
  const response = await fetch("./data.json");
  return response.json();
}

/** Create a single activity card element */
function createCard(item) {
  const activitySlug = item.title.replace(" ", "-").toLowerCase();

  const card = document.createElement("div");
  // adding classlist to card
  card.className = "activity-card";
  // populating elements with child elements and contents
  card.innerHTML = `
            <div class="icon-wrapper ${activitySlug}">
              <img class="activity-icon" src="./images/icon-${activitySlug}.svg" />
              <div class="info">
              <div class="header">
              <span class="activity-title">${item.title}</span>
              <img src="/images/icon-ellipsis.svg" class="ellipsis-icon" />
              </div>
              <div class="body">
              <span class="activity-time-current"> ${item.timeframes[chosenTime]?.current}hrs</span>
              <span class="activity-time-pre">Last ${timeFrame[chosenTime]} - ${item.timeframes[chosenTime]?.previous}hrs</span>
              </div>
              </div>
              </div>
            `;

  return card;
}

/**Render all cards in the container */
function renderCards(data) {
  container.innerHTML = ""; // clear old cards

  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    fragment.appendChild(createCard(item));
  });

  container.appendChild(fragment);
}

/** Update the active button styling */
function updateActiveButton(selectedBtn) {
  timeBtns.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
  selectedBtn.setAttribute("aria-pressed", "true");
}

/** Fetch data and render UI */
async function updateUI() {
  const data = await getData();
  renderCards(data);
}

/** Event listeners for buttons */
timeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    chosenTime = btn.textContent.trim().toLowerCase();
    updateActiveButton(btn);
    updateUI();
  });
});

// Innitial load
updateUI();
