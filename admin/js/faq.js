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
let usersTab = document.querySelector('.list.user');
let blogTab = document.querySelector('.list.blog');
let logout = document.querySelector('.list.sign-out');


  dashTab.onclick = function(){
    location.href = 'dashboard.html';
  }
  
  blogTab.onclick = function(){
    location.href = 'blog.html';
  }
  
  carTab.onclick = function(){
    location.href = 'car.html';
  }
  
  usersTab.onclick = function(){
    location.href = 'user.html';
  }
  
  logout.onclick = function(){
    auth.signOut().then( val => {
      location.href = '/admin';
    });
  }

  let showFaqBG = document.querySelector('.show-faq');

  firestore.collection('faq').get()
  .then(snap => {
    snap.docs.forEach(doc => {
        renderFAQ(doc);
    });
  });


  function renderFAQ(doc){
      let fqBG = document.createElement('div');
      let question = document.createElement('h6');
      let answer = document.createElement('p');
      let deleteDiv = document.createElement('div');
      let contentDiv = document.createElement('div');
      let remove = document.createElement('p');

      fqBG.classList.add('white', 'single-faq');
      contentDiv.classList.add('white', 'single-content');
      question.classList.add('black-text');
      answer.classList.add('grey-text', 'text-darken-2');
      deleteDiv.classList.add('delete-div');
      remove.classList.add('white-text');

      question.innerHTML = doc.data().question;
      answer.innerHTML = doc.data().answer;
      remove.innerHTML = 'Delete';

      deleteDiv.appendChild(remove);
      fqBG.appendChild(deleteDiv);
      contentDiv.appendChild(question);
      contentDiv.appendChild(answer);
      fqBG.appendChild(contentDiv);
      showFaqBG.appendChild(fqBG);

      remove.onclick = function(){
          let responce = confirm('Are you sure you want to delete?');

          if(responce){
              remove.innerHTML = 'Deleting...';
              firestore.collection('faq').doc(doc.id).delete()
              .then(v => {
                remove.innerHTML = 'Delete';
                M.toast({html: 'FAQ Deleted Successfully'});
                setTimeout(() => {
                    location.reload();
                }, 4000);
              });
          }
      }
  }

  let popUp = document.querySelector('.faq-popup');
  let cancelBtn = document.querySelector('.cancel');
  let openPopUp = document.querySelector('#add-faq-btn');
  let submitBtn = document.querySelector('.submit-btn');
  let questionInput = document.getElementById('question');
  let answerInput = document.getElementById('answer');

  openPopUp.onclick = function(){
    popUp.classList.add('open');
  }

  cancelBtn.onclick = function(){
      popUp.classList.remove('open');
  }

  submitBtn.onclick = function(){
      if(questionInput.value !== '' && answerInput.value !== ''){
        submitBtn.innerHTML = 'Loading...';  
        firestore.collection('faq').doc().set({
            question: questionInput.value,
            answer: answerInput.value
          }).then(val => {
              M.toast({html: 'FAQ Added Successfully'});
              submitBtn.innerHTML = 'SUBMIT FAQ';
              setTimeout(() => {
                  location.reload();
              }, 4000);
          });
      }else{
          M.toast({html: 'Can not process empty string'});
      }
  }
