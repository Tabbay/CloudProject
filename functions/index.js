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
