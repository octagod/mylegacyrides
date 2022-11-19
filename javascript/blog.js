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

//   get Id
let urlParams = new URLSearchParams(window.location.search);
let blogId = urlParams.get('id');

let loader = document.querySelector('.loader');
let blogBg = document.querySelector('.render-blogs');

let blogName = document.querySelector('.blog-name');
let blogDate = document.querySelector('.blog-date');
let blogBody = document.querySelector('.blog-body');
let blogImage = document.querySelector('.blog-image');

firestore.collection('posts').doc(blogId).get()
.then(blg => {
    renderDetails(blg);
});
firestore.collection('posts').orderBy('timestamp', 'desc').limit(4)
.get().then(snap => {
    snap.docs.forEach(doc => {
        renderBlogs(doc);
    });
});

function renderDetails(blog){
    blogName.innerHTML = blog.data().title;
    blogDate.innerHTML = timeConverter(blog.data().timestamp);
    blogImage.setAttribute('src', blog.data().image);
    blogBody.innerHTML = blog.data().body;
}

function renderBlogs(doc){
    let img = document.createElement('img');
    let imgDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let name = document.createElement('h6');
    let date = document.createElement('p');
    let generalBg = document.createElement('div');

    img.classList.add('blog-imge');
    imgDiv.classList.add('img-div', 'col', 's12', 'l4');
    contentDiv.classList.add('content-div-review', 'col', 's12', 'l8');
    name.classList.add('black-text', 'bold', 'luxia');
    date.classList.add('grey-text', 'bold', 'x-small');
    generalBg.classList.add('general-div', 'row');

    img.setAttribute('src', doc.data().image);
    name.innerHTML = doc.data().title;
    date.innerHTML = timeConverter(doc.data().timestamp);

    imgDiv.appendChild(img);
    contentDiv.appendChild(name);
    contentDiv.appendChild(date);
    generalBg.appendChild(imgDiv);
    generalBg.appendChild(contentDiv);
    blogBg.appendChild(generalBg);

    generalBg.onclick = function(){
        location.href = '/blog.html?id='+doc.id;
    }

    loader.setAttribute('style', 'display:none');
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