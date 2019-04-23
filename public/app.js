// var config = {
//   apiKey: "AIzaSyDWgYi1o92tuBUUhGpg0lCWKjFm1iOBdMg",
//   authDomain: "rate-my-internship.firebaseapp.com",
//   databaseURL: "https://rate-my-internship.firebaseio.com",
//   projectId: "rate-my-internship",
//   storageBucket: "rate-my-internship.appspot.com",
//   messagingSenderId: "514235121016",
// };
// firebase.initializeApp(config);
// let firestore = firebase.firestore();

// // Enable offline capabilities
// firebase.firestore().enablePersistence()
//     .then(function() {
//         // Initialize Cloud Firestore through firebase
//         var db = firebase.firestore();
//     })
//     .catch(function(err) {
//         if (err.code == 'failed-precondition') {
//             // Multiple tabs open, persistence can only be enabled in one tab at a a time.

//         } else if (err.code == 'unimplemented') {
//             // The current browser does not support all of the
//             // features required to enable persistence
//             // ...
//         }
//     });
// const search = instantsearch({
//   appId: 'Y0AM91WVVL',
//   apiKey: 'f1216651a0a4cdaf9d9fb92e4687b80d',
//   indexName: 'instant_search',
//   urlSync:true
// });

const search = instantsearch({
  indexName: 'reviews',
  searchClient: algoliasearch(
    'Y0AM91WVVL',
    'd2b17d72265d5a93017be07cedbc1021'
  ),
});

// Add widgets
// ...

// const searchClient = algoliasearch('Y0AM91WVVL', 'f1216651a0a4cdaf9d9fb92e4687b80d');
//
// const search = instantsearch({
//   indexName: 'reviews',
//   searchClient,
// });

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage:10,
    templates:{
      item: document.getElementById('hit-template').innerHTML,
      empty: "we didn't find any results <em>\"{{query}}\" </em>"
    }
  })
);

search.start();
