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


let email = document.getElementById('email');
let password = document.getElementById('password');
let username = document.getElementById('username');
let file = document.getElementById('image');
let role = document.getElementById('role');
let showImage = document.querySelector('.image');
let submitBtn = document.querySelector('.sign-in');

submitBtn.onclick = function(){
    if(username.value !== '' & email.value !== ''){
        if(firstFile){
            submitBtn.innerHTML = 'Authenticating User...';

            auth.createUserWithEmailAndPassword(email.value, password.value)
            .then(doc => {
                let imageName = username.value+'-image';
                submitBtn.innerHTML = 'Loading...';
                let storage = firebase.storage().ref().child(imageName);
                storage.put(firstFile).then(snap => {
                    snap.ref.getDownloadURL().then(imageUrl => {
                        firestore.collection('users').doc(doc.user.uid).set({
                            email: email.value,
                            image: imageUrl,
                            name: username.value,
                            role: role.value,
                            'last logged': Date.now()
                        }).then(v=> {
                            submitBtn.innerHTML = 'Register';
                            setTimeout(() => {
                                location.href = '/admin';
                            }, 2000);
                        });
                    });
                });
            })
            .catch(err => {
                var errorCode = err.code;
                var errorMessage = err.message;
                alert(errorMessage);
            })
        }else{
            alert('Error');
        }
    }else{
        alert('Error');
    }
}



//save image
var firstFile;

//check to see if the file has a data
file.addEventListener('change', function(){
    firstFile = this.files[0];
});

let interval = setInterval(() => {
    if(firstFile){
        clearInterval(interval);
        // Create A Url For the file uploaded
        let src = URL.createObjectURL(firstFile);

        //preview image before uploading
        showImage.setAttribute('style', `background-image: url(${src});
        background-position: center; background-size: cover; height: 150px; width: 150px; border-radius: 300px`);
    }
}, 1000);