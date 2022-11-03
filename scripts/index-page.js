let headersList = {Accept: "*/*", "content-type": "application/json"};

const apiUrl = (end_point) =>`https://project-1-api.herokuapp.com/${end_point}?api_key=%3C%22api_key%22:%22c1cb7b58-9e6c-45c2-84e9-8c2d41c3ff6b%22%3E`;

const mainEl = document.querySelector("main");
const sectionEl = document.createElement("section");
sectionEl.classList.add("post-section");

const form = document.querySelector("form");
const username = document.getElementById("name");
const usercomment = document.getElementById("comment");

//let comments;
let lastComment;

const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

function timeSince(date) {
  const seconds = Math.floor((Date.now() - date) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

function displayComments() {
  axios
    .get(apiUrl("comments"))
    .then((response) => {
     let comments = response.data.reverse();
      //format timestamps
    //comments.forEach(comment => comment.timestamp = comment.timestamp.toISOString().slice(0, 10));
      //creates (divs, headings, paragraghs) to display each comment in comment obj
      sectionEl.innerHTML = "";
      createCommentSection(comments);
    })
    .catch((error) => {
      console.log("Unsuccessful response", error);
      addErrorMessageToCommentGetRequest();
    });
}

function likeComments(selectedComment){
  axios
  .put(apiUrl(`comments/${selectedComment.id}/like`), selectedComment, { headers: headersList })
  .then((response) => {
    displayComments();
  })
  .catch((error) => {
    console.log("Unsuccessful response", error);
  });
}

function deleteComments(selectedComment){
  axios
  .delete(apiUrl(`comments/${selectedComment.id}`), selectedComment, { headers: headersList })
  .then((response) => {
    displayComments();
  })
  .catch((error) => {
    console.log("Unsuccessful response", error);
  });
}

function addErrorMessageToCommentGetRequest() {
  const errorMessageEl = document.createElement("p");
  errorMessageEl.innerText = "Unable to load Previous Comments";

  mainEl.appendChild(errorMessageEl);
}

function displayComment(newComment) {
  //adds new comment to comments obj, displays it and reset the form
  axios
    .post(apiUrl("comments"), newComment)
    .then((response) => {
    displayComments();
    })
    .catch(function (error) {
      console.log(error);
    });
    form.reset();
}

const removeError = () => {
  //alert("Please fill fields completely before submitting");
  swal("Please fill fields completely before submitting");  
  usercomment.classList.remove("form__error-signal");
  username.classList.remove("form__error-signal");
};

function displayError() {
  //display signals for erroneous inputs
  usercomment.classList.add("form__error-signal");
  username.classList.add("form__error-signal");
  setTimeout(removeError, 1000);
}

function createCommentSection(commentsArr) {
  commentsArr.forEach((comment) => {
    const containerEl = document.createElement("div");
    containerEl.classList.add("post-container");
    sectionEl.appendChild(containerEl);

    const imagBoxEl = document.createElement("div");
    imagBoxEl.classList.add("post__image-box");
    containerEl.appendChild(imagBoxEl);

    const imagEl = document.createElement("div");
    imagEl.classList.add("post__image");
    imagBoxEl.appendChild(imagEl);

    const headingEl = document.createElement("h3");
    headingEl.classList.add("post__heading");
    headingEl.innerText = comment.name;

    const paragraph1 = document.createElement("p");
    paragraph1.classList.add("post__text");
    paragraph1.innerText = comment.comment;

    const paragraph2 = document.createElement("p");
    paragraph2.classList.add("post__time");
    paragraph2.innerText = new Date(comment.timestamp).toISOString().slice(0, 10);

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('btn__like');
    likeBtn.innerHTML= `<i class="fa-solid fa-thumbs-up"></i>`;
    likeBtn.addEventListener('click', ()=> likeComments(comment))

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn__delete');
    deleteBtn.innerHTML= `<i class="fa-solid fa-trash-can"></i>`;
    deleteBtn.addEventListener('click', ()=> deleteComments(comment))

    const boxEl = document.createElement("div");
    boxEl.classList.add("post__box");
    boxEl.appendChild(headingEl);
    boxEl.appendChild(paragraph2);

    const btnBox = document.createElement("div");
    btnBox.classList.add('btn')
    btnBox.append(`${comment.likes} `)
    btnBox.appendChild(likeBtn);
    btnBox.appendChild(deleteBtn);
    
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.appendChild(boxEl);
    postEl.appendChild(paragraph1);
    postEl.appendChild(btnBox);
    containerEl.appendChild(postEl);
  });
  mainEl.appendChild(sectionEl);
}

function manageComments() {
  displayComments();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    lastComment = {name: e.target.name.value, comment: e.target.comment.value};
    //validates form input
    Object.values(lastComment).includes("") ? displayError() : displayComment(lastComment);
  });
}

manageComments();
