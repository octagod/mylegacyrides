  // Your web app's Firebase configuration
  var firebaseConfig = {
  apiKey: "AIzaSyAiHsByQwEDdpGOWh4F_qPX0tWjPMIcPkI",
  authDomain: "my-legacy-rides.firebaseapp.com",
  projectId: "my-legacy-rides",
  storageBucket: "my-legacy-rides.appspot.com",
  messagingSenderId: "141857147115",
  appId: "1:141857147115:web:7f7fa7e7fd72f99cf856ae",
  measurementId: "G-RNPHK82611"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let firestore = firebase.firestore();

let keyword = document.querySelector('.keywords');


firestore.collection('keywords').doc('services').get()
.then(kw => {
  keyword.setAttribute('content', `${kw.data().keywords}`);
});