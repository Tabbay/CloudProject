// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const algoliasearch = require('algoliasearch');
//
// const ALGOLIA_APP_ID = "BBWJTO1KYF";
// const ALGOLIA_ADMIN_KEY = "074700630691b0e42fab054d87109da0";
// const ALGOLIA_INDEX_KEY = "reviews";
//
// admin.initializeApp(functions.config().firebase);
//
// exports.addFirestoreDataToAlgolia = functions.https.onRequest((req,res) => {
//   var reviewslist = [];
//
//   admin.firestore().collection("reviews").get().then((docs) => {
//     docs.forEach((doc) => {
//       let reviews = doc.data();
//       reviews.objectID = doc.id;
//
//       reviewslist.push(reviews);
//
//     })
//
//     var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
//     var index = client.initIndex(ALGOLIA_INDEX_NAME);
//
//     index.saveObjects(reviewslist,function (err,content){
//       res.status(200).send(content);
//     })
//
//   })
// })

// const algoliasearch = require('algoliasearch')
// const dotenv = require('dotenv')
// const firebase = require('firebase');
// const firestore = require('firebase/firestore');
// // load values from the .env file in this directory into process.env
// dotenv.load();
// // initializes the firebase database.
// firebase.initializeApp({
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   databaseURL: process.env.FIREBASE_DATABASE_URL
// })
// const db = firebase.firestore();
// // configure algolia
// const algolia = algoliasearch(
//   process.env.ALGOLIA_APP_ID,
//   process.env.ALGOLIA_API_KEY
// );
// const index = algolia.initIndex(process.env.reviews);
//
// var docRef = db.collection(process.env.reviews);
// const records = [];
// db.collection(process.env.reviews).get()
//     .then((snapshot) => {
//         snapshot.forEach((doc) => {
//             // get the key and data from the snapshot
//             const childKey = doc.id;
//             const childData = doc.data();
//             // We set the Algolia objectID as the Firebase .key
//             childData.objectID = childKey;
//             // Add object for indexing
//             records.push(childData);
//             console.log(doc.id, '=>', doc.data());
//         });
//         // Add or update new objects
//         index.saveObjects(records).then(() => {
//             console.log('Documents imported into Algolia');
//             process.exit(0);
//         })
//         .catch(error => {
//             console.error('Error when importing documents into Algolia', error);
//             process.exit(1);
//         });
//     })
//     .catch((err) => {
//         console.error('Error getting documents', error);
//     });
const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');

// load values from the .env file in this directory into process.env
dotenv.config();

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.reviews);

// Get all reviews from Firebase
database.ref('/reviews').once('value', reviews => {
  // Build an array of all records to push to Algolia
  const records = [];
  reviews.forEach(reviews => {
    // get the key and data from the snapshot
    const childKey = reviews.key;
    const childData = reviews.val();
    // We set the Algolia objectID as the Firebase .key
    childData.objectID = childKey;
    // Add object for indexing
    records.push(childData);
  });

  // Add or update new objects
  index
    .saveObjects(records)
    .then(() => {
      console.log('Reviews imported into Algolia');
    })
    .catch(error => {
      console.error('Error when importing reviews into Algolia', error);
      process.exit(1);
    });
});
