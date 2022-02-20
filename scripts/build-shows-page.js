const concerts = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];
const mainEl = document.querySelector("main");

const headingEl = document.createElement("h2");
headingEl.classList.add("shows__title");
headingEl.innerText = "Shows";

const sectionEl = document.createElement("section");
mainEl.appendChild(sectionEl);
sectionEl.classList.add("shows");
sectionEl.appendChild(headingEl);

function displayShows() {
//creates rows for each show
concerts.forEach((concert, index) => {
  const showContainerEl = document.createElement("div");
  showContainerEl.classList.add("shows__container");
  sectionEl.appendChild(showContainerEl);
  //creates columns for (date, venue & location) for each show
  const keys = Object.keys(concert);
  keys.forEach((element) => {
    const showDetails = document.createElement("div");
    showDetails.classList.add("shows__details");
    showContainerEl.appendChild(showDetails);
    const paragraphEl1 = document.createElement("p");
    paragraphEl1.innerText = element.toUpperCase();
    showDetails.appendChild(paragraphEl1);

    const paragraphEl2 = document.createElement("p");
    paragraphEl2.innerText = concert[element];
    showDetails.appendChild(paragraphEl2);
  //creates special styling for date column
    element == "date" ? paragraphEl2.classList.add("shows__info--date") : paragraphEl2.classList.add("shows__info");
    index === 0 ? paragraphEl1.classList.add("shows__info-title", "shows__info-title--all"): paragraphEl1.classList.add("shows__info-title--all");
  });
 
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("shows__buy-btn");
  buttonEl.innerText = "BUY TICKETS";
  if (index === 0) {buttonEl.classList.add("shows__buy-btn--first");}
  showContainerEl.appendChild(buttonEl);
  
  showContainerEl.addEventListener('click', ()=> {
    removeHighlight();
    showContainerEl.classList.toggle("highlight-row")
  } )
});
}


function removeHighlight(){
    //showContainerEl.classList.remove('highlight-row')
    const shows = document.querySelectorAll(".shows__container");
shows.forEach(show =>  show.classList.remove("highlight-row") );
}

displayShows();
