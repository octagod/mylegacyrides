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


firestore.collection('keywords').doc('rentalFleet').get()
.then(kw => {
  keyword.setAttribute('content', `${kw.data().keywords}`);
});
  
  let fleetBG = document.querySelector('.render-fleet');
  let blogBG = document.querySelector('.render-blogs');
  let loader = document.querySelector('.loader');

 // query db to get the cars
 firestore.collection('cars').orderBy('price', 'desc').get()
 .then(snap => {
    loader.setAttribute('style', 'display:none');
   snap.docs.forEach(doc => {
     renderCars(doc);
   });
 });

    // query db to get the blogs
    firestore.collection('posts').orderBy('timestamp', 'desc').limit(5).get()
    .then(snapshot => {
        // check if blog is empty
        if(snapshot.docs.length == 0){
        // no blogs
        loader.setAttribute('style', 'display:none');
        blogBG.innerHTML = '<h6 class="grey-text luxia" style="text-align:center;">No Blogs at this time</h6>';
        }else{
        snapshot.docs.forEach(doc =>{
            loader.setAttribute('style', 'display:none');
            renderBlogs(doc);
        });
        }
    });
 
 function renderCars(doc){
    let images = doc.data().images;

    let imgBg = document.createElement('div');
    let contentDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let nameDiv = document.createElement('div');
    let toolDiv = document.createElement('div');
    let carName = document.createElement('h6');
    let carPrice = document.createElement('h4');
    let transition = document.createElement('small');
    let lugage = document.createElement('small');

    // class names and styling
    imgBg.classList.add('car-image');
    contentDiv.classList.add('car-content-div');
    priceDiv.classList.add('price-div');
    toolDiv.classList.add('tool-div');
    carName.classList.add('white-text', 'regular-text');
    carPrice.classList.add('white-text', 'bold');
    transition.classList.add('white-text', 'light-text');
    lugage.classList.add('white-text', 'light-text');
    nameDiv.classList.add('name-div');

    imgBg.setAttribute('style',`background-image:url('${images[0]}')`);
    carName.innerHTML = doc.data().name;
    carPrice.innerHTML = `$${(doc.data().price).toLocaleString()} <small class='white-text light-text xx-small' style='display:block'>${doc.data().timeline ? doc.data().timeline : 'Per day'}</small>`;
    lugage.innerHTML = `<i class="fas fa-briefcase white-text"></i> <br> ${doc.data().luggage}`;
    transition.innerHTML = `<i class="fas fa-cogs white-text"></i> <br> ${doc.data().transition}`;

    priceDiv.appendChild(carPrice);
    toolDiv.appendChild(lugage);
    toolDiv.appendChild(transition);
    // nameDiv.appendChild(toolDiv);
    nameDiv.appendChild(carName);
    contentDiv.appendChild(nameDiv);
    contentDiv.appendChild(priceDiv);
    imgBg.appendChild(contentDiv);
    fleetBG.appendChild(imgBg);


    imgBg.onclick = ()=> {
      location.href = '/show-car.html?id='+doc.id;
    }
  }

  function renderBlogs(doc){

    let title = document.createElement('h6');

    title.classList.add('black-text', 'luxia', 'semi-bold', 'blog-title');


    title.innerHTML = doc.data().title;


    blogBG.appendChild(title);

    title.onclick = function(){
      location.href = 'blog.html?id='+doc.id;
    }
  } 