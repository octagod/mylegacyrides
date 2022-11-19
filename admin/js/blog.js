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

  let blogBG = document.querySelector('.blog-body');
  
//   render blogs
firestore.collection('posts').get().
then(snap => {
    blogBG.innerHTML = '';
    snap.docs.forEach(doc => {
        renderBlogs(doc);
    });
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
  
  
  usersTab.onclick = function(){
    location.href = 'user.html';
  }
  
  logout.onclick = function(){
    auth.signOut().then( val => {
      location.href = '/admin';
    });
  }
  
function renderBlogs(doc){
    let div = document.createElement('div');
    let deleteDiv = document.createElement('div');
    let h6 = document.createElement('h6');
    let date = document.createElement('p');
    let delet = document.createElement('h5');


    h6.classList.add('truncate', 'bold', 'grey-text', 'text-darken-2');
    date.classList.add('x-small','grey-text');
    delet.classList.add('red-text', 'center');
    div.classList.add('col', 'l10');
    deleteDiv.classList.add('col', 'l2', 'delete-div');

    h6.innerHTML = doc.data().title;
    date.innerHTML = timeConverter(doc.data().timestamp);
    delet.innerHTML = 'x';

    div.appendChild(h6);
    div.appendChild(date);
    deleteDiv.appendChild(delet);
    blogBG.appendChild(div);
    blogBG.appendChild(deleteDiv);

    delet.onclick = function(){
        firestore.collection('posts').doc(doc.id).delete()
        .then(val => {
            location.reload();
        });
    }
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

let title = document.getElementById('blog');
let publish = document.querySelector('a.btn-flat.brand-color');

publish.onclick = () => {
    if(title.value !== ''){
        if(firstFile){
            if(richTextField.document.body.innerHTML !== ''){
                let imageName = title.value+'-image';
                publish.innerHTML = 'Saving Image....';
                let storage = firebase.storage().ref().child(imageName);
                storage.put(firstFile).then(snap => {
                    snap.ref.getDownloadURL().then(imageUrl => {
                        publish.innerHTML = 'Authenticating...';
    
                        // Save blog to db
                        firestore.collection('posts').doc()
                        .set({
                            title: title.value,
                            body: richTextField.document.body.innerHTML,
                            timestamp: Date.now(),
                            image: imageUrl
                        }).then(v => {
                            publish.innerHTML = 'Publish';
                            M.toast({html: 'Blog Post Added'});
                            setTimeout(() => {
                                location.reload();
                            }, 3000);
                        })
                    });
                });
            }else{
                M.toast({html: 'Blog Content Empty'})
            }

        }else{
            M.toast({html: 'Select a blog image'});
        }
    }else{
        M.toast({html: 'Enter blog title'});
    }
}




let file = document.getElementById('image-file');
//save image
var firstFile;

//check to see if the file has a data
file.addEventListener('change', function(){
    firstFile = this.files[0];
});