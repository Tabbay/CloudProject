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
    var context;

    var template = $('#review-card').html();

    templateScript = Handlebars.compile(template);

    var query = firebase.database().ref("reviews").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var company = document.createTextNode(childSnapshot.child("company").val());
            var rating = document.createTextNode(childSnapshot.child("rating").val());
            var position = document.createTextNode(childSnapshot.child("position").val());
            var length = document.createTextNode(childSnapshot.child("length").val());
            var salary = document.createTextNode(childSnapshot.child("salary").val());
            var willReturn =  document.createTextNode(childSnapshot.child("return").val());
            var location = document.createTextNode(childSnapshot.child("location").val());
            var classification = document.createTextNode(childSnapshot.child("classification").val());
            var offer = document.createTextNode(childSnapshot.child("offer").val());
            var review = document.createTextNode(childSnapshot.child("review").val());

            // console.log(company);

            context = {"company" : company, "rating" : rating, "position" : position, "length" : length, "salary" : salary, "return" : willReturn, 
                    "location" : location, "classification" : classification, "offer" : offer, "review" : review};

            console.log(company);

            var html = templateScript(context);

            $(document.body).append(html);

            // context = { "company" : document.createTextNode(childSnapshot.child("company").val()), "rating" : document.createTextNode(childSnapshot.child("rating").val()), 
            //         "position" : document.createTextNode(childSnapshot.child("position").val()) , "length" : document.createTextNode(childSnapshot.child("length").val()), 
            //         "salary" : document.createTextNode(childSnapshot.child("salary").val()), "return" : document.createTextNode(childSnapshot.child("return").val()), 
            //         "location" : document.createTextNode(childSnapshot.child("location").val()), "classification" : document.createTextNode(childSnapshot.child("classification").val()), 
            //         "offer" : document.createTextNode(childSnapshot.child("offer").val()), "review" : document.createTextNode(childSnapshot.child("review").val())};

        });
        
    });
    // console.log(company);

    // // Compile the template data into a function
    // templateScript = Handlebars.compile(template);

    // var context = {"company" : company, "rating" : rating, "position" : position, "length" : length, "salary" : salary, "return" : willReturn, 
    //                 "location" : location, "classification" : classification, "offer" : offer, "review" : review};

    // // html = 'My name is Ritesh Kumar. I am a developer.'
    // var html = templateScript(context);

    // Insert the HTML code into the page
    // $(document.body).append(html);
}   

// function populateReviews() {
//     var query = firebase.database().ref("reviews").orderByKey();
//     query.once("value")
//     .then(function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             var para = document.createElement("p");
//             var node = document.createTextNode(childSnapshot.child("company").val());
//             para.appendChild(node);
//             var element = document.getElementById("company");
//             element.appendChild(para);

//             if (childSnapshot.child("rating").val() == null) {
//                 var node1 = document.createTextNode("No ratings.");
//             } else if (childSnapshot.child("rating").val() == 1) {
//                 var node1 = document.createTextNode(childSnapshot.child("rating").val() + " star");
//             }
//             else { var node1 = document.createTextNode(childSnapshot.child("rating").val() + " stars");}

//             var para1 = document.createElement("p");
//             para1.appendChild(node1);
//             var element1 = document.getElementById("rating");
//             element1.appendChild(para1);

//             var para2 = document.createElement("p");
//             var node2 = document.createTextNode(childSnapshot.child("position").val());
//             para2.appendChild(node2);
//             var element = document.getElementById("position");
//             element.appendChild(para2);

//             var para3 = document.createElement("p");
//             var node3 = document.createTextNode(childSnapshot.child("length").val());
//             para3.appendChild(node3);
//             var element = document.getElementById("length");
//             element.appendChild(para3);


//             var para4 = document.createElement("p");
//             var node4 = document.createTextNode(childSnapshot.child("salary").val());
//             para4.appendChild(node4);
//             var element = document.getElementById("salary");
//             element.appendChild(para4);


//             var para5 = document.createElement("p");
//             var node5 = document.createTextNode(childSnapshot.child("return").val());
//             para5.appendChild(node5);
//             var element = document.getElementById("return");
//             element.appendChild(para5);


//             var para6 = document.createElement("p");
//             var node6 = document.createTextNode(childSnapshot.child("location").val());
//             para6.appendChild(node6);
//             var element = document.getElementById("location");
//             element.appendChild(para6);


//             var para7 = document.createElement("p");
//             var node7 = document.createTextNode(childSnapshot.child("classification").val());
//             para7.appendChild(node7);
//             var element = document.getElementById("classification");
//             element.appendChild(para7);


//             var para8 = document.createElement("p");
//             var node8 = document.createTextNode(childSnapshot.child("offer").val());
//             para8.appendChild(node8);
//             var element = document.getElementById("offer");
//             element.appendChild(para8);


//             var para9 = document.createElement("p");
//             var node9 = document.createTextNode(childSnapshot.child("review").val());
//             para9.appendChild(node9);
//             var element = document.getElementById("review");
//             element.appendChild(para9);


//     });
//     });
// }
