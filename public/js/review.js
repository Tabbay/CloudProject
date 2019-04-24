var config = {
    apiKey: "AIzaSyDWgYi1o92tuBUUhGpg0lCWKjFm1iOBdMg",
    authDomain: "rate-my-internship.firebaseapp.com",
    databaseURL: "https://rate-my-internship.firebaseio.com",
    projectId: "rate-my-internship",
    storageBucket: "rate-my-internship.appspot.com",
    messagingSenderId: "514235121016",
  };
  firebase.initializeApp(config);

var database = firebase.database();
var rating;
var user = firebase.auth().currentUser;

// firebase.auth().onAuthStateChanged(function(user) {
//   var review = document.getElementById("review");
//   var signin = document.getElementById("login");
//   if (user) {
//     review.style.display = "block";
//     signin.style.display = "none";
//   } else {
//     review.style.display = "none";
//     signin.style.display = "flex";
//   }
// });

function toggleContent() {
  var x = document.getElementById("review");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function getStarRating(star_value) {
  rating = star_value;
}

function addReview(){
  var rootRef = firebase.database().ref('/');
  var storesRef = rootRef.child('reviews/');
  var newStoreRef = storesRef.push();
  newStoreRef.set({
      company: document.getElementById('company').value,
      rating: rating, 
      length:  document.getElementById('length').value,
      return_offer: document.getElementById('return-offer').value,
      salary: document.getElementById('salary').value,
      position: document.getElementById('position').value,
      location: document.getElementById('location').value,
      classification: document.getElementById('classification').value,
      work_there_again: document.getElementById('work-again').value,
      comment: document.getElementById('user-comment').value
  });
}
