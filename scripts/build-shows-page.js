let concerts = [
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

//function displayShows() {
const mainEl = document.querySelector("main");
const sectionEl = document.createElement("section");
sectionEl.classList.add("shows");
const headingEl = document.createElement("h2");
headingEl.classList.add("shows__title");
headingEl.innerText = "Shows";
sectionEl.appendChild(headingEl);
mainEl.appendChild(sectionEl);

concerts.forEach((concert, index) => {
  const showContainerEl = document.createElement("div");
  showContainerEl.classList.add("shows__container");
  sectionEl.appendChild(showContainerEl);
  const keys = Object.keys(concert);
  keys.forEach((element) => {
    const showDetails = document.createElement("div");
    showDetails.classList.add("shows__details");
    showContainerEl.appendChild(showDetails);
    const paragraphEl1 = document.createElement("p");
    const paragraphEl2 = document.createElement("p");

    
    if (element == "date") {
      paragraphEl2.classList.add("shows__info--date");
    } else {
      paragraphEl2.classList.add("shows__info");
    }

    if (index === 0) {
        paragraphEl1.classList.add("shows__info--title");
    }
    paragraphEl1.classList.add("shows__info--title--all");
    paragraphEl1.innerText = element.toUpperCase();
    paragraphEl2.innerText = concert[element];

    showDetails.appendChild(paragraphEl1);
    showDetails.appendChild(paragraphEl2);
  });
  const buttonEl = document.createElement("button");
  buttonEl.innerText = "BUY TICKETS";
  if (index === 0) {
    buttonEl.classList.add("shows__buy-btn--first");
  }
  buttonEl.classList.add("shows__buy-btn");
  showContainerEl.appendChild(buttonEl);
});
//}

//const paragraphEl = document.createElement('p').classList.add('shows__info');

// <!-- <div class="shows__container">
//   <div class="shows__details">
//     <p>DATE</p>
//     <p class="shows__info--date">Mon Sept 06 2021</p>
//   </div>
//   <div class="shows__details">
//     <p>VENUE</p>
//     <p class="shows__info">Ronald Lane</p>
//   </div>
//   <div class="shows__details">
//     <p>LOCATION</p>
//     <p class="shows__info">San Francisco, CA</p>
//   </div>
//   <button class="shows__buy-btn">BUY TICKETS</button>
// </div> -->
// </section>
