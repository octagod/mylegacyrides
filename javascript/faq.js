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



  let ul = document.querySelector('.collapsible');
  let loader = document.querySelector('.loader');

  firestore.collection('faq').get()
  .then(snap => {
    snap.docs.forEach(doc => {
        renderFaq(doc);
    });
  });


  function renderFaq(doc){
      let li = document.createElement('li');
      let collapseHeader = document.createElement('div');
      let collapseBody = document.createElement('div');

      collapseHeader.classList.add('collapsible-header', 'luxia');
      collapseBody.classList.add('collapsible-body');

      collapseHeader.innerHTML = `<i class="fas fa-chevron-right"></i> ${doc.data().question}`;
      collapseBody.innerHTML = `<span class="luxia">${doc.data().answer} </span>`

      li.appendChild(collapseHeader);
      li.appendChild(collapseBody);
      ul.appendChild(li);

      loader.setAttribute('style', 'display:none');
  }