// import firebase from firebase;

var config = {
  apiKey: "AIzaSyDWgYi1o92tuBUUhGpg0lCWKjFm1iOBdMg",
  authDomain: "rate-my-internship.firebaseapp.com",
  databaseURL: "https://rate-my-internship.firebaseio.com",
  projectId: "rate-my-internship",
  storageBucket: "rate-my-internship.appspot.com",
  messagingSenderId: "514235121016"
  };
firebase.initializeApp(config);

const firestore = defineFirestore();

function defineFirestore() {
  const firestore = firebase.firestore();
  // const settings = { /* your settings... */ timestampsInSnapshots: true };
  // firestore.settings(settings);
  return firestore;
}

function userSignUp(email, password, password1) {
    // var email = document.getElementById('email').value;
    // var password = document.getElementById('password').value;
    // var password1 = document.getElementById('reenter-password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    if (password != password1)  {
      alert("Passwords don't match.");
      return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
  }

function userSignIn(email, password) {
  // if (firebase.auth().currentUser) {
  //   // [START signout]
  //   firebase.auth().signOut();
  //   // [END signout]
  // } else {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START authwithemail]
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authwithemail]
  alert("Login successful.");
  
  document.getElementById('quickstart-sign-in').disabled = true;
}

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      var email = user.email;

      var userRef = firestore.collection("users").doc(uid);
      userRef.get().then(function (doc) {
          if (doc.exists) {
              //the user is signing in, jus
              sessionStorage.setItem("userID", uid);
              document.location.href = "../html/dashboard.html";
          } else {
              // create new user in the users table
              sessionStorage.setItem("userID", uid);
              createUserQUERY(email, uid, email);

          }
      }).catch(function (error) {
          console.log("Error getting document:", error);
      });

      alert("Login successful.");

      //if first time i.e user.uid not in users key, make a new user with the key user.uid, set all attributes except username
      //if signing in,
      //
      //window.alert(result.user.displayName);
      //document.getElementById("UserName").innerHTML = result.user.
  });
}

function linkGoogleAccount() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().currentUser.linkWithPopup(provider).then(function (result) {
      // Accounts successfully linked.
      var credential = result.credential;
      var user = result.user;
      alert("linking successful");
      // ...
  }).catch(function (error) {
      alert("Error linking");
      // Handle Errors here.
      // ...
  });
}