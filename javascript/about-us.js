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


  firestore.collection('keywords').doc('aboutUs').get()
  .then(kw => {
    keyword.setAttribute('content', `${kw.data().keywords}`);
  });


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