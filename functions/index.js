// const functions = require('firebase-functions');
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

// // Get all reviews from Firebase
// database.ref('/reviews').once('value', reviews => {
//   // Build an array of all records to push to Algolia
//   const records = [];
//   reviews.forEach(reviews => {
//     // get the key and data from the snapshot
//     const childKey = reviews.key;
//     const childData = reviews.val();
//     // We set the Algolia objectID as the Firebase .key
//     childData.objectID = childKey;
//     // Add object for indexing
//     records.push(childData);
//   });
//
//   // Add or update new objects
//   index
//     .saveObjects(records)
//     .then(() => {
//       console.log('Reviews imported into Algolia');
//     })
//     .catch(error => {
//       console.error('Error when importing reviews into Algolia', error);
//       process.exit(1);
//     });
// });

const reviewsRef = database.ref('/reviews');
reviewsRef.on('child_added', addOrUpdateIndexRecord);
reviewsRef.on('child_changed', addOrUpdateIndexRecord);
reviewsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(review) {
  // Get Firebase object
  const record = review.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = review.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing review into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord({key}) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting review from Algolia', error);
      process.exit(1);
    });
}
