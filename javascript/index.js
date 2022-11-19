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

  let fleetBG = document.querySelector('.render-fleet');
  let blogBG = document.querySelector('.render-blogs');
  let loader = document.querySelector('.loader');


// query db to get the cars
  firestore.collection('cars').orderBy('timestamp', 'desc').limit(2).get()
  .then(snap => {
    snap.docs.forEach(doc => {
      renderCars(doc);
    });
  });

// query db to get the blogs
firestore.collection('posts').orderBy('timestamp', 'desc').limit(3).get()
.then(snapshot => {
  // check if blog is empty
  if(snapshot.docs.length == 0){
    // no blogs
    loader.setAttribute('style', 'display:none');
    blogBG.innerHTML = '<h6 class="grey-text luxia" style="text-align:center;"></h6>';
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
    nameDiv.classList.add('name-div');
    toolDiv.classList.add('tool-div','hide');
    carName.classList.add('white-text', 'regular-text');
    carPrice.classList.add('white-text', 'bold');
    transition.classList.add('white-text', 'light-text', 'hide');
    lugage.classList.add('white-text', 'light-text', 'hide');

    imgBg.setAttribute('style',`background-image:url('${images[0]}')`);
    carName.innerHTML = doc.data().name;
    carPrice.innerHTML = `$${(doc.data().price).toLocaleString()} <small class='white-text light-text xx-small' style='display:block'>${doc.data().timeline ? doc.data().timeline : 'Per day'}</small>`;
    lugage.innerHTML = `<i class="fas fa-briefcase white-text"></i> <br> ${doc.data().luggage}`;
    transition.innerHTML = `<i class="fas fa-cogs white-text"></i> <br> ${doc.data().transition}`;

    priceDiv.appendChild(carPrice);
    nameDiv.appendChild(carName);
    toolDiv.appendChild(lugage);
    toolDiv.appendChild(transition);
    nameDiv.appendChild(toolDiv);
    contentDiv.appendChild(nameDiv);
    contentDiv.appendChild(priceDiv);
    imgBg.appendChild(contentDiv);
    fleetBG.appendChild(imgBg);


    imgBg.onclick = ()=> {
      location.href = '/show-car.html?id='+doc.id;
    }
  }


  function renderBlogs(doc){
    let bg = document.createElement('div');
    let img = document.createElement('img');
    let date = document.createElement('p');
    let title = document.createElement('h6');
    let body = document.createElement('p');
    let Holdbody = document.createElement('p');
    let readMore = document.createElement('p');

    bg.classList.add('blog-background');
    img.classList.add('blog-image');
    date.classList.add('grey-text', 'semi-bold', 'luxia', 'blog-date');
    title.classList.add('black-text', 'luxia', 'semi-bold', 'blog-title');
    body.classList.add('grey-text', 'light-text', 'luxia', 'blog-body-text');
    readMore.classList.add('grey-text', 'text-lighten-2', 'read-more');

    img.setAttribute('src', `${doc.data().image}`);
    date.innerHTML = timeConverter(doc.data().timestamp);
    title.innerHTML = doc.data().title;
    Holdbody.innerHTML = doc.data().body;
    body.innerText = Holdbody.innerText.toString().substring(0, 200)+'...';
    readMore.innerHTML = `Read More`;

    bg.appendChild(img);
    bg.appendChild(date);
    bg.appendChild(title);
    bg.appendChild(body);
    bg.appendChild(readMore);
    blogBG.appendChild(bg);

    readMore.onclick = function(){
      location.href = 'blog.html?id='+doc.id;
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

// Show pup up after 5sec
let popup = document.querySelector('.pop-up-holder');
let cancel = document.querySelector('.pop-up-holder h3');
setTimeout(() => {
  popup.classList.add('show');
}, 4000);

cancel.onclick = () => {
  popup.classList.remove('show');
}


// Testimonials
let tesstimonialBG = document.querySelector('.render-testimonials')
let testimonials = {
    0: {
        name: 'Yemi A.',
        testimony: 'Alisha was fantastic. The car was clean and just beautiful. The picture doesn\'t do it justice. It\'s a sight to see'
    },
    1: {
        name: 'Azfer A.',
        testimony: 'Alisha\'s X5 is a stunningly beautiful and luxurious vehicle. Alisha\'s customer service, key handoff and responsiveness was undoubtedly 5 stars.'
    },
    2: {
        name: 'Daniel P.',
        testimony: 'Great service and friendly had so much fun in the scatpack, definitely will come back soon.'
    },
    3: {
        name: 'Ira D.',
        testimony: 'Beautiful SUV. Excellent Service!! The best Turo experience I ever had.'
    },
    4: {
        name: 'Walter D.',
        testimony: 'Alisha is a fantastic host, easy to deal with, very accommodating and just a really nice person to talk and deal with.'
    },
    5: {
        name: 'Daniel H.',
        testimony: 'Great host and amazing car. I will defintely be renting from this host again.'
    },
    6: {
        name: 'Aaron S.',
        testimony: 'Incredible car and attentive host. My first Turo experience couldn\'t have been better!'
      },
    7: {
        name: 'Jeff P.',
        testimony: 'Alisha was a great host and the car was exactly what we were hoping for!'
      },
    8: {
        name: 'Blake W.',
        testimony: 'The car was flawless. Alisha and her team were on point. This was my first time using the app, she answered all questions and walked me throughthe process.'
      },
    9: {
      name: 'Tarann M.',
      testimony: 'Great Car clean and well maintained first time driving a Tesla'
      },
    10: {
          name: 'Marreonia M.',
          testimony: 'Car was awesome as expected because I have the same one so I may be being bias :) Host was very considerate and helpful withthe pick up time as our flight kept getting delayed so I really appreciate Alisha for accommodating us!'
      },
}

// console.log(testimonials[0].name);

function renderTestimnial(index) {
    let testDiv = document.createElement('div');
    let content = document.createElement('h5');
    let author = document.createElement('p');

    testDiv.classList.add('testimonial-holder');
    content.classList.add('white-text', 'luxia', 'center','xx-large');
    author.classList.add('white-text', 'center', 'luixa', 'author');

    content.innerHTML = testimonials[index].testimony;
    author.innerHTML = testimonials[index].name;
    testDiv.appendChild(content);
    testDiv.appendChild(author);
    tesstimonialBG.appendChild(testDiv);
}

function adjustDots(index) {
    let activeDot = document.querySelector('.active');
    let dot = document.querySelector(`.dot${index}`);

    activeDot.classList.remove('active');
    dot.classList.add('active');

}

let index = 0;
renderTestimnial(index);

let timer = setInterval(() => {
    tesstimonialBG.innerHTML = '';
    index++;
    if (index > 10) {
        index = 0;
        renderTestimnial(index);
        adjustDots(index);
    } else {
        renderTestimnial(index);
        adjustDots(index);
    }
}, 3000);

