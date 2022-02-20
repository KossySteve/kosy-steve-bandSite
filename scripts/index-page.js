//const API_HEADERS = {Content-Type: application/json};

const apiUrl =(end_point)=> `https://project-1-api.herokuapp.com/${end_point}?api_key=%3C%22api_key%22:%22c1cb7b58-9e6c-45c2-84e9-8c2d41c3ff6b%22%3E`;

const mainEl = document.querySelector("main");
const sectionEl = document.createElement("section");
sectionEl.classList.add("post-section");
const form = document.querySelector("form");
const username = document.getElementById("name");
const usercomment = document.getElementById("comment");


let comments;
let lastComment;

function displayComments() {
  axios
.get(apiUrl("comments"))
.then(response => {
   // console.log("Successful response", response);
   comments = response.data;
   //format timestamps
    comments.forEach((comment)=> comment.timestamp = new Date(comment.timestamp).toISOString().slice(0, 10));
  //  console.log(comments)
     
  //creates (divs, headings, paragraghs) to display each comment in comment obj
 createCommentSection(comments)
  
   
})
.catch(error => {
    console.log("Unsuccessful response", error);
   addErrorMessageToCommentGetRequest();
})
}

function addErrorMessageToCommentGetRequest() {
  const errorMessageEl = document.createElement("p");
  errorMessageEl.innerText = "Unable to load search results";

  mainEl.appendChild(errorMessageEl);
}

function displayComment(newComment) {
  //adds new comment to comments obj, displays it and reset the form
 // comments.unshift(newComment);
 axios.post(apiUrl(comments), lastComment, {headers: {'content-type': 'application/json'}})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

  sectionEl.innerHTML = "";
  displayComments();
  form.reset();
}

// function getCurrentDate() {
//   //generates date for posted comments
//   let today = new Date().toISOString().slice(0, 10);
//   return today;
// }
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

function createCommentSection(commentsArr){
  commentsArr.forEach((comment) => {
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
    paragraph1.innerText = comment.comment;

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



function manageComments() {
  displayComments();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    lastComment = { name: e.target.name.value, comment: e.target.comment.value}
    //validates form input
    Object.values(lastComment).includes("") ? displayError() : displayComment(lastComment);
  });
}

manageComments();
