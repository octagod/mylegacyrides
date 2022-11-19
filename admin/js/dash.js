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

// update user last login
firestore.collection('users').doc(userId)
  .update({
    'last logged': Date.now()
  });


let loader = document.querySelector('.loader');


// get user details
firestore.collection('users').doc(userId).get()
  .then(user => {
    // profile-picture
    document.querySelector('.profile-picture').setAttribute('style', `background-image: url(${user.data().image})`);
    // username
    document.querySelector('.username').innerHTML = user.data().name;
    // email
    document.querySelector('.email').innerHTML = user.data().email;
    loader.setAttribute('style', 'display: none');
  });

// get esiting keywords
firestore.collection('keywords').doc('homepage').get()
  .then(kw => {
    document.querySelector(
      '.existing-home-keywords'
    ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
  });

firestore.collection('keywords').doc('services').get()
  .then(kw => {
    document.querySelector(
      '.existing-services-keywords'
    ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
  });

firestore.collection('keywords').doc('rentalFleet').get()
  .then(kw => {
    document.querySelector(
      '.existing-rental-keywords'
    ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
  });

firestore.collection('keywords').doc('aboutUs').get()
  .then(kw => {
    document.querySelector(
      '.existing-about-keywords'
    ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
  });

// Save keywords
let HomepageSB = document.getElementById('homepage-submit-btn');
let servicesSB = document.getElementById('services-submit-btn');
let rentalSB = document.getElementById('rental-submit-btn');
let aboutSB = document.getElementById('about-submit-btn');

let homeinput = document.getElementById('homepage-keywords');
let servicesinput = document.getElementById('services-keywords');
let rentalinput = document.getElementById('rental-keywords');
let aboutinput = document.getElementById('about-keywords');


HomepageSB.onclick = () => {
  if (homeinput.value !== '') {
    firestore.collection('keywords').doc('homepage').update({
      keywords: homeinput.value
    }).then(val => {
      M.toast({ html: 'Keyword Updated' });
      // update rendered keywords
      firestore.collection('keywords').doc('homepage').get()
        .then(kw => {
          document.querySelector(
            '.existing-home-keywords'
          ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
        });
        homeinput.value = '';
    });
  } else {
    M.toast({ html: 'Can not submit empty String' });
  }
}


servicesSB.onclick = () => {
  if (servicesinput.value !== '') {
    firestore.collection('keywords').doc('services').update({
      keywords: servicesinput.value
    }).then(val => {
      M.toast({ html: 'Keyword Updated' });
      // update rendered keywords
      firestore.collection('keywords').doc('services').get()
        .then(kw => {
          document.querySelector(
            '.existing-servies-keywords'
          ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
        });
        servicesinput.value = '';
    });
  } else {
    M.toast({ html: 'Can not submit empty String' });
  }
}


rentalSB.onclick = () => {
  if (rentalinput.value !== '') {
    firestore.collection('keywords').doc('rentalFleet').update({
      keywords: rentalinput.value
    }).then(val => {
      M.toast({ html: 'Keyword Updated' });
      // update rendered keywords
      firestore.collection('keywords').doc('rentalFleet').get()
        .then(kw => {
          document.querySelector(
            '.existing-rental-keywords'
          ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
        });
        rentalinput.value = '';
    });
  } else {
    M.toast({ html: 'Can not submit empty String' });
  }
}


aboutSB.onclick = () => {
  if (aboutinput.value !== '') {
    firestore.collection('keywords').doc('aboutUs').update({
      keywords: aboutinput.value
    }).then(val => {
      M.toast({ html: 'Keyword Updated' });
      // update rendered keywords
      firestore.collection('keywords').doc('aboutUs').get()
        .then(kw => {
          document.querySelector(
            '.existing-about-keywords'
          ).innerHTML = '<b>Existing Keywords</b> <br>' + kw.data().keywords;
        });
        aboutinput.value = '';
    });
  } else {
    M.toast({ html: 'Can not submit empty String' });
  }
}

// Functionalities
let addblog = document.querySelector('.add-blog');
let addfaq = document.querySelector('.add-faq');
let addcar = document.querySelector('.add-car');
let adduser = document.querySelector('.add-user');

let blogTab = document.querySelector('.list.blog');
let carTab = document.querySelector('.list.car');
let usersTab = document.querySelector('.list.user');
let faqTab = document.querySelector('.list.faq');
let logout = document.querySelector('.list.sign-out');

addblog.onclick = function(){
  location.href = 'blog.html';
}

blogTab.onclick = function(){
  location.href = 'blog.html';
}

addfaq.onclick = function(){
  location.href = 'faq.html';
}

faqTab.onclick = function(){
  location.href = 'faq.html';
}

addcar.onclick = function(){
  location.href = 'car.html';
}

carTab.onclick = function(){
  location.href = 'car.html';
}

adduser.onclick = function(){
  location.href = 'user.html';
}

usersTab.onclick = function(){
  location.href = 'user.html';
}

logout.onclick = function(){
  auth.signOut().then( val => {
    location.href = '/admin';
  });
}


