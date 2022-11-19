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
  

// get user details
firestore.collection('users').doc(userId).get()
.then(user => {
  // profile-picture
  document.querySelector('.profile-picture').setAttribute('style', `background-image: url(${user.data().image})`);
  // username
  document.querySelector('.username').innerHTML = user.data().name;
  // email
  document.querySelector('.email').innerHTML = user.data().email;
//   loader.setAttribute('style', 'display: none');
});


// get cars
firestore.collection('cars').orderBy('timestamp').get()
.then(snap => {
    carBg.innerHTML = '';
    snap.docs.forEach(doc => {
        renderCars(doc);
    });
});

// functionalities
let dashTab = document.querySelector('.list.dashTab');
let blogTab = document.querySelector('.list.blog');
let usersTab = document.querySelector('.list.user');
let faqTab = document.querySelector('.list.faq');
let logout = document.querySelector('.list.sign-out');


  dashTab.onclick = function(){
    location.href = 'dashboard.html';
  }
  
  faqTab.onclick = function(){
    location.href = 'faq.html';
  }
  
  blogTab.onclick = function(){
    location.href = 'blog.html';
  }
  
  
  usersTab.onclick = function(){
    location.href = 'user.html';
  }
  
  logout.onclick = function(){
    auth.signOut().then( val => {
      location.href = '/admin';
    });
  }




// ================= VARIABLES ===================
  let file = document.getElementById('image-file');
  let imageBg = document.querySelector('.show-images');
  let carBg = document.querySelector('.car-body');
//save image
var fileList;

let carName = document.getElementById('car-name');
let turoLink = document.getElementById('turo-link');
let carDoors = document.getElementById('doors');
let luggage = document.getElementById('luggage');
let price = document.getElementById('price');
let passengers = document.getElementById('passengers');
let transmission = document.getElementById('transmission');
let timeline = document.getElementById('timeline');
let video = document.getElementById('video');
let submitBtn = document.querySelector('.submit-car');

//check to see if the file has a data
file.addEventListener('change', function(){
    imageBg.innerHTML = '';
    fileList = this.files;
    
    
    for(let x = 0; fileList.length > x; x++){
        renderImages(fileList[x],x);
    }

    // fileList.forEach(singleImg => {
    //     renderImages(singleImg);
    // });
});

// ============================= ALL FUNCTIONS ==========================

function renderCars(doc){
    let imags = doc.data().images;

    let img = document.createElement('img');
    let imgDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let name = document.createElement('h6');
    let date = document.createElement('p');
    let generalBg = document.createElement('div');

    img.classList.add('car-imge');
    imgDiv.classList.add('img-div', 'col', 's12', 'l4');
    contentDiv.classList.add('content-div-review', 'col', 's12', 'l8');
    name.classList.add('black-text', 'bold',);
    date.classList.add('grey-text', 'bold', 'x-small');
    generalBg.classList.add('general-div', 'row');

    img.setAttribute('src', imags[0]);
    name.innerHTML = doc.data().name;
    date.innerHTML = timeConverter(doc.data().timestamp);

    imgDiv.appendChild(img);
    contentDiv.appendChild(name);
    contentDiv.appendChild(date);
    generalBg.appendChild(imgDiv);
    generalBg.appendChild(contentDiv);
    carBg.appendChild(generalBg);

    generalBg.onclick = function(){
        location.href = 'edit-car.html?id='+doc.id;
    }
}


function renderImages(img,index){
    // create the object url
    let src = URL.createObjectURL(img);

    let div = document.createElement('div');
    let remove = document.createElement('h5');

    div.setAttribute('style', `background-image: url(${src}); 
    background-posotion: center; background-size: cover; height: 100px; width: 200px`);
    remove.innerHTML = 'x';

    imageBg.appendChild(div);

    remove.onclick = function(){
        for(let x = 0; fileList.length > x; x++){
            if(index == x){
                // fileList.pop();
                // console.log(fileList);
            }
        }
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


submitBtn.onclick = function(){
    if(carName.value !=='' && carDoors.value !== '' && price.value !== '' && turoLink.value !== ''){
        if(fileList){
            if(richTextField.document.body.innerHTML !== ''){
                
                submitBtn.innerHTML = 'Adding Images...';
                // Adding all images to stroage and generating their indiviual 
                // download link then saving the links to another list;
                let imageUrlList = [];
                let nameAndUrl = [];

                submitBtn.innerHTML = 'Authenticating....';

                firestore.collection('cars').add({
                    description: richTextField.document.body.innerHTML,
                    doors: carDoors.value,
                    luggage: luggage.value,
                    name: carName.value,
                    turo: turoLink.value,
                    passengers: passengers.value,
                    price: parseInt(price.value),
                    timestamp: Date.now(),
                    transition: transmission.value,  
                    timeline: timeline.value,
                    video: video.value == '' ? null : video.value
                }).then(docRef => {
                    let imgNames = []
                    submitBtn.innerHTML = 'Adding Images....';
                    for(let x = 0; fileList.length > x; x++){
                        let firstFile = fileList[x];
                        let imgName = `${carName.value}-image-${x}--timestamp-${Date.now()}`;
                        // save image names to array
                        imgNames.push(imgName);
                        firebase.storage().ref().child(imgName)
                        .put(firstFile).then(snap => {
                            snap.ref.getDownloadURL().then(imgUrl => {
                                // Save image url to imageUrlList
                                imageUrlList[x] = imgUrl;
                                //if all images have been added, save the images to the database
                                if(fileList.length == x+1){          
                                    console.log(imageUrlList);

                                    //add images list to localstorage
                                    // localStorage.setItem('images', JSON.stringify(imageUrlList));                      
                                    localStorage.setItem('images', JSON.stringify(imgNames));                      
                                    //add images to the database
                                    // firestore.collection('cars').doc(docRef.id).update({
                                        // images: imageUrlList
                                    // }).then(val => {
                                        submitBtn.innerHTML = 'Success';
                                        submitBtn.classList.remove('brand-color');
                                        submitBtn.classList.add('green', 'darken-2');
                                        M.toast({html: 'Car listing added successfully'});
                                        M.toast({html: 'Please wait, while the images are being saved'});
                                        setTimeout(() => {
                                            location.href = `/admin/adding-images.html?id=${docRef.id}`;
                                        }, 6000);
                                    // });
                                }
                            })
                        });
                    }
                });
            }else{
                M.toast({html: 'Provide Car Description'});
            }
        }else{
            M.toast({html: 'Upload Car Image(s)'})
        }
    }else{
        M.toast({html: 'Can not submit empty string'});
    }
}