let comments = [
  {
    name: "Connor Walton",
    timestamp: "02/17/2021",
    commentText:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    timestamp: "01/09/2021",
    commentText:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    timestamp: "12/20/2020",
    commentText:
      "I cant stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.",
  },
];

function displayComments() {
  const mainEl = document.querySelector("main");
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("post-section");

  comments.forEach((comment) => {
    const containerEl = document.createElement("div");
    containerEl.classList.add("post-container");
    const imagEl = document.createElement("div");
    imagEl.classList.add("post__image");
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    const headingEl = document.createElement("h3");
    headingEl.classList.add("post__heading");
    const paragraph1 = document.createElement("p");
    paragraph1.classList.add("post__text");
    const paragraph2 = document.createElement("p");
    paragraph2.classList.add("post__time");
    const boxEl = document.createElement("div");
    boxEl.classList.add("post__box");
    paragraph1.innerText = comment.commentText;
    paragraph2.innerText = comment.timestamp;
    headingEl.innerText = comment.name;
    boxEl.appendChild(headingEl);
    boxEl.appendChild(paragraph2);
    postEl.appendChild(boxEl);
    postEl.appendChild(paragraph1);

    containerEl.appendChild(imagEl);
    containerEl.appendChild(postEl);
    sectionEl.appendChild(containerEl);
    console.log(containerEl);
  });
  mainEl.appendChild(sectionEl);
}

displayComments();

const form = document.querySelector("form");
const username = document.getElementById("name");
const usercomment = document.getElementById("comment");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value && usercomment.value ) {
    let newComment = {
      name: username.value,
      timestamp: getCurrentDate(),
      commentText: usercomment.value
      
    };
    comments.unshift(newComment);
    console.log(comments);
    displayComments();
  
    form.reset();
    
  } else {
    usercomment.classList.add('form__error-signal');
    username.classList.add('form__error-signal');
    setTimeout(resetError, 2000)
    
  }
  
  
});
function getCurrentDate() {
  let today = new Date().toISOString().slice(0, 10);
  return today;
}

function resetError() {
  alert('Please fill fields completely before submitting');
  usercomment.classList.remove('form__error-signal');
    username.classList.remove('form__error-signal');
    
}

