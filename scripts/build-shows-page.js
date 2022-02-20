const apiUrl = (end_point) =>`https://project-1-api.herokuapp.com/${end_point}?api_key=%3C%22api_key%22:%22c1cb7b58-9e6c-45c2-84e9-8c2d41c3ff6b%22%3E`;

const mainEl = document.querySelector("main");

const headingEl = document.createElement("h2");
headingEl.classList.add("shows__title");
headingEl.innerText = "Shows";

const sectionEl = document.createElement("section");
mainEl.appendChild(sectionEl);
sectionEl.classList.add("shows");
sectionEl.appendChild(headingEl);

function displayShows() {
  axios
    .get(apiUrl("showdates"))
    .then((response) => {
      let concerts = response.data;
      concerts.forEach(concert => concert.date  = new Date(parseInt(concert.date)).toDateString());
      //creates rows 7 columnsfor each show
      createShowTable(concerts);
    })
    .catch((error) => {
      console.log("Unsuccessful response", error);
      addErrorMessageToCommentGetRequest();
    });
}

function createShowTable(concertsArr) {
  concertsArr.forEach((concert, index) => {
    const showContainerEl = document.createElement("div");
    showContainerEl.classList.add("shows__container");
    sectionEl.appendChild(showContainerEl);
    //creates columns for (date, venue & location) for each show
    const keys = Object.keys(concert);
   
    keys.forEach((key) => {

     if (key != 'id') { //hiding id column
        const showDetails = document.createElement("div");
        showDetails.classList.add("shows__details");
        showContainerEl.appendChild(showDetails);

        const pEl1 = document.createElement("p");
        pEl1.innerText = key.toUpperCase();
        showDetails.appendChild(pEl1);

        const pEl2 = document.createElement("p");
        pEl2.innerText = concert[key];
        showDetails.appendChild(pEl2);
        //creates special styling for date column
        key == "date" ? pEl2.classList.add("shows__info--date"): pEl2.classList.add("shows__info");
        index === 0 ? pEl1.classList.add("shows__info-title", "shows__info-title--all"): pEl1.classList.add("shows__info-title--all");
    }
    });

    const buttonEl = document.createElement("button");
    buttonEl.classList.add("shows__buy-btn");
    buttonEl.innerText = "BUY TICKETS";
    if (index === 0) {
      buttonEl.classList.add("shows__buy-btn--first");
    }
    showContainerEl.appendChild(buttonEl);

    removeHighlight(showContainerEl);
  });
}

function removeHighlight(element) {
  element.addEventListener("click", () => {
    const shows = document.querySelectorAll(".shows__container");
    shows.forEach((show) => show.classList.remove("highlight-row"));
    element.classList.toggle("highlight-row");
  });
}

displayShows();
