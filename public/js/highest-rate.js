// import { database } from "firebase";

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

function populateReviews() {
    var query = firebase.database().ref("reviews").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var para = document.createElement("p");
            var node = document.createTextNode(childSnapshot.child("company").val());
            para.appendChild(node);
            var element = document.getElementById("company");
            element.appendChild(para);

            if (childSnapshot.child("rating").val() == null) {
                var node1 = document.createTextNode("No ratings.");
            } else if (childSnapshot.child("rating").val() == 1) {
                var node1 = document.createTextNode(childSnapshot.child("rating").val() + " star");
            }
            else { var node1 = document.createTextNode(childSnapshot.child("rating").val() + " stars");}

            var para1 = document.createElement("p");
            para1.appendChild(node1);
            var element1 = document.getElementById("rating");
            element1.appendChild(para1);

    });
    });
}
