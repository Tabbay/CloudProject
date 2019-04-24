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
    // Retrieve the template data from the HTML (jQuery is used here).
    var theScriptHTML = document.getElementById('review-card').innerHTML;
    var theTemplate = Handlebars.compile(theScriptHTML);
    var query = firebase.database().ref("reviews").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        var compileData;
        var context;
        snapshot.forEach(function(childSnapshot) {
            context =  { "company" : childSnapshot.child("company").val(), "rating" : childSnapshot.child("rating").val(), 
                    "position" : childSnapshot.child("position").val() , "length" : childSnapshot.child("length").val(), 
                    "salary" : childSnapshot.child("salary").val(), "return" : childSnapshot.child("work_there_again").val(), 
                    "location" : childSnapshot.child("location").val(), "classification" : childSnapshot.child("classification").val(), 
                    "offer" : childSnapshot.child("return_offer").val(), "review" : childSnapshot.child("comment").val()};

            compileData = theTemplate(context);
            console.log(compileData);
            $(document.body).append(document.getElementById('review-card').innerHTML = compileData);
        });
    });
}   