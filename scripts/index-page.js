// let comments = [
//   {
//     name: "Connor Walton",
//     timestamp: "02/17/2021",
//     commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
//   {
//     name: "Emilie Beach",
//     timestamp: "01/09/2021",
//     commentText:"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     name: "Miles Acosta",
//     timestamp: "12/20/2020",
//     commentText:"I cant stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.",
//   },
// ];
let comments;
const API_URL = "https://project-1-api.herokuapp.com/comments?api_key=%3C%22api_key%22:%22c1cb7b58-9e6c-45c2-84e9-8c2d41c3ff6b%22%3E";

axios
.get(`${API_URL}`)
.then(result => {
    console.log("Successful response", result);
    console.log("Username is ", result[0].name);
    comments = result;
})
.catch(error => {
    console.log("Unsuccessful response", error);
    //addErrorMessageToSearchResults();
})




const mainEl = document.querySelector("main");
const sectionEl = document.createElement("section");
sectionEl.classList.add("post-section");
const form = document.querySelector("form");
const username = document.getElementById("name");
const usercomment = document.getElementById("comment");

function displayComments() {
  //creates (divs, headings, paragraghs) to display each comment in comment obj
  comments.forEach((comment) => {
    const containerEl = document.createElement("div");
    containerEl.classList.add("post-container");
    sectionEl.appendChild(containerEl);

    const imagEl = document.createElement("div");
    imagEl.classList.add("post__image");
    containerEl.appendChild(imagEl);

    const headingEl = document.createElement("h3");
    headingEl.classList.add("post__heading");
    headingEl.innerText = comment.name;

    const paragraph1 = document.createElement("p");
    paragraph1.classList.add("post__text");
    paragraph1.innerText = comment.commentText;

    const paragraph2 = document.createElement("p");
    paragraph2.classList.add("post__time");
    paragraph2.innerText = comment.timestamp;

    const boxEl = document.createElement("div");
    boxEl.classList.add("post__box");
    boxEl.appendChild(headingEl);
    boxEl.appendChild(paragraph2);

    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.appendChild(boxEl);
    postEl.appendChild(paragraph1);
    containerEl.appendChild(postEl);
  });
  mainEl.appendChild(sectionEl);
}

function displayComment(newComment) {
  //adds new comment to comments obj, displays it and reset the form
  comments.unshift(newComment);
  sectionEl.innerHTML = "";
  displayComments();
  form.reset();
}

function getCurrentDate() {
  //generates date for posted comments
  let today = new Date().toISOString().slice(0, 10);
  return today;
}
const removeError = ()=> {
  alert("Please fill fields completely before submitting");
  usercomment.classList.remove("form__error-signal");
  username.classList.remove("form__error-signal");
}

function displayError() {
  //display signals for erroneous inputs
  usercomment.classList.add("form__error-signal");
  username.classList.add("form__error-signal");
  setTimeout(removeError, 1000) ;
}



function manageComments() {
  displayComments();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let lastComment = { name: e.target.name.value, timestamp: getCurrentDate(), commentText: e.target.comment.value}
    //validates form input
    Object.values(lastComment).includes("") ? displayError() : displayComment(lastComment);
  });
}

manageComments();
