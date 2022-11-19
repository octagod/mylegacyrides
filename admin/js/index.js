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

  // check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var userId = user.uid;
      localStorage.setItem('userId', userId);
      location.href = 'dashboard.html';
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

let email = document.getElementById('email');
let password = document.getElementById('password');
let submitBtn = document.querySelector('.sign-in');
let fogPasswordBtn = document.querySelector('.fog-pass');
let fogPassText = document.querySelector('.forgotPassword');

let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');

submitBtn.onclick = function(){
    if(email.value != '' && password.value != ''){
        submitBtn.innerHTML = "LOADING...";
            firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((doc) => {
                localStorage.setItem('userId', doc.user.uid);
                submitBtn.innerHTML = "SIGN IN";
                location.href = 'dashboard.html';
            })
            .catch((err)=>{
                showToast('Email Or Password in Incorrect');
                submitBtn.innerHTML = "SIGN IN";
            });
    }else{
        showToast('Empty Fields');
    }
}

let fgtpas = false;

//forgot password
fogPasswordBtn.onclick = function(){
    fgtpas = !fgtpas;
    if(fgtpas){
        submitBtn.innerHTML = 'Send Reset Link';
        password.setAttribute('style', 'display:none !important');
        document.querySelector('.second h2').innerHTML = 'Forgot Password';
        document.querySelector('.second sub').innerHTML = 'Enter your login Email';
        fogPasswordBtn.innerHTML = 'BACK TO LOGIN';

        submitBtn.onclick = function(){
            if(email.value != ''){
                firebase.auth().sendPasswordResetEmail(email.value).then((val)=>{
                    showToast(`Your Password Reset Email <br> Has Been Sent to ${email.value}`);
                    email.value = '';
                    setTimeout(()=>{
                        location.reload();
                    }, 6000);
                });
            }else{
                showToast('Input your email address');
            }
        }
    }else{
        submitBtn.innerHTML = 'SIGN IN';
        password.setAttribute('style', 'display:block');
        document.querySelector('.second h2').innerHTML = 'Sign In';
        document.querySelector('.second sub').innerHTML = 'Use Your Email and Password';
        fogPasswordBtn.innerHTML = 'FORGOT PASSWORD'
    }
}

fogPassText.onclick = function(){
    fgtpas = !fgtpas;
    if(fgtpas){
        submitBtn.innerHTML = 'Send Reset Link';
        password.setAttribute('style', 'display:none !important');
        document.querySelector('.second h2').innerHTML = 'Forgot Password';
        document.querySelector('.second sub').innerHTML = 'Enter your login Email';
        fogPassText.innerText = 'Back To login';


        submitBtn.onclick = function(){
            if(email.value != ''){
                fogPasswordBtn.innerHTML = 'Loading...';
                firebase.auth().sendPasswordResetEmail(email.value).then((val)=>{
                    showToast(`Your Password Reset Email <br> Has Been Sent to ${email.value}`);
                    email.value = '';
                    setTimeout(()=>{
                        location.reload();
                    }, 6000);
                });
            }else{
                showToast('Input your email address');
            }
        }
    }else{
        submitBtn.innerHTML = 'SIGN IN';
        password.setAttribute('style', 'display:block');
        document.querySelector('.second h2').innerHTML = 'Sign In';
        document.querySelector('.second sub').innerHTML = 'Use Your Email and Password';
        fogPassText.innerText = 'Forgot Password';
    }
}


function showToast(msg){
    toast.innerHTML = msg;
    setTimeout(function(){
        toastBody.classList.toggle('show');
    }, 5000);
    toastBody.classList.toggle('show');
}

