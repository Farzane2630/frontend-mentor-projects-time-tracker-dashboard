const container = document.querySelector(".activities-cards");

/*
Porpus of the below obj is 
to create key words used in 
time frame (previous):
<span class="activity-time-pre">Last ${timeFrame[chosenTime]}
*/
const timeFrame = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
};

// the timeframe chosen by user
let chosenTime = "daily";

const timeBtns = document.querySelectorAll(".time-btn");

// update chosen timeframe clicking on every timeframe btn
timeBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    timeBtns.forEach((b) => {
      // reset styling to default
      b.setAttribute("aria-pressed", "false");
    });

    // change color of the btn text + good accessibility practice
    btn.setAttribute("aria-pressed", "true");

    chosenTime = btn.textContent.trim().toLowerCase();
    // get data again based on the updated chosenTime
    fetchData();
  });
});

/* in this function:
  data is fetched from db
  card element is created to show activities 
  card elements are appended to its container
*/
const fetchData = async () => {
  await fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      // reset the container
      container.innerHTML = "";

      for (const item of data) {
        // get the title in lowercase to use in class and src
        const act = item.title.replace(" ", "-").toLowerCase();
        // creating card element
        const card = document.createElement("div");
        // adding classlist to card
        card.className = "activity-card";
        // populating elements with child elements and contents
        card.innerHTML = `
            <div class="icon-wrapper ${act}">
              <img src="./images/icon-${act}.svg" />
            </div>
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
            `;

        // appending card to its container
        container.appendChild(card);
      }
    });
};

// fetching data in reload and refresh
fetchData();
