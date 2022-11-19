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
  let auth = firebase.auth();

  // get userId
let userId = localStorage.getItem('userId');

// check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
      // do nothing
    } else {
      // User is signed out
      // send user to login page
      location.href = '/admin';
    }
  });

    // get user details
firestore.collection('users').doc(userId).get()
.then(user => {
  // profile-picture
  document.querySelector('.profile-picture').setAttribute('style', `background-image: url(${user.data().image})`);
  // username
  document.querySelector('.username').innerHTML = user.data().name;
  // email
  document.querySelector('.email').innerHTML = user.data().email;

});

// functionalities
let dashTab = document.querySelector('.list.dashTab');
let carTab = document.querySelector('.list.car');
let blogTab = document.querySelector('.list.blog');
let faqTab = document.querySelector('.list.faq');
let logout = document.querySelector('.list.sign-out');


  dashTab.onclick = function(){
    location.href = 'dashboard.html';
  }
  
  faqTab.onclick = function(){
    location.href = 'faq.html';
  }
  
  carTab.onclick = function(){
    location.href = 'car.html';
  }
  
  
  blogTab.onclick = function(){
    location.href = 'blog.html';
  }
  
  logout.onclick = function(){
    auth.signOut().then( val => {
      location.href = '/admin';
    });
  }
  

  let userBG = document.querySelector('.show-users');

  firestore.collection('users').where('role', '==', 'Sub User').get()
  .then(snap => {
    snap.docs.forEach(doc => {
        // render users
        renderUsers(doc);
    });
  });


  function renderUsers(doc){
      let mainBG = document.createElement('div');
      let imgDiv = document.createElement('div');
      let profileImg = document.createElement('div');
      let username = document.createElement('h6');
      let email = document.createElement('p');
      let hr = document.createElement('hr');
      let lastLogged = document.createElement('p');
      
      mainBG.classList.add('main-bg', 'col', 'l4');
      imgDiv.classList.add('user-profile-picture-div');
      profileImg.classList.add('user-profile-picture');
      username.classList.add('bold', 'black-text');
      email.classList.add('grey-text', 'text-darken-2');
      lastLogged.classList.add('grey-text', 'text-darken-1');

      profileImg.setAttribute('style', `background-image: url(${doc.data().image});`);
      username.innerHTML = doc.data().name,
      email.innerHTML = doc.data().email,
      lastLogged.innerHTML = 'Last Login: '+timeConverter(doc.data()['last logged']);

      imgDiv.appendChild(profileImg);
      mainBG.appendChild(imgDiv);
      mainBG.appendChild(username);
      mainBG.appendChild(email);
      mainBG.appendChild(hr);
      mainBG.appendChild(lastLogged);
      userBG.appendChild(mainBG);

  }

  function timeConverter(timestamp){
    var a = new Date(timestamp);
    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // var year = a.getFullYear();
    // var month = months[a.getMonth()];
    // var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    // var time = date + ' ' + month;
    let time = a.toString().substring(0,16);
    return time;
}