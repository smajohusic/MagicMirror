var admin = require('firebase-admin');

currentUser = null;

authenticateFirebase();
registerListenerOnUserChanged();


function authenticateFirebase() {
  var serviceAccount = require('../src/firebase_alice.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://alice-188216.firebaseio.com/'
  });
}

function registerListenerOnUserChanged() {
  var db = admin.database();
  var reference = db.ref('/recognized_user');

  reference.on('child_changed', (snapshot, prevChildKey) => {
    currentUser = snapshot.val();

    triggerGreetUser();
  });
}

function triggerGreetUser() {
  //console.log(currentUser)
}
