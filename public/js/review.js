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
