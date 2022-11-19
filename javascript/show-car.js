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
let carId = urlParams.get('id');

  let loader = document.querySelector('.loader');
  let reviewBG = document.querySelector('.render-review');

  let photoBtn = document.querySelector('.photos-btn');
  let videoBtn = document.querySelector('.video-btn');
  let formBtn = document.querySelector('.open-form');
  let price = document.querySelector('.price-div h4 span');
  let timeline = document.querySelector('.price-div h4 small');
  let carName = document.querySelector('.car-name');
  let passengers = document.querySelector('.person span');
  let luggage = document.querySelector('.luggage span');
  let transmition = document.querySelector('.transition span');
  let doors = document.querySelector('.doors span');
  let description = document.querySelector('.description');
  let carPhoto = document.querySelector('.car-image');

  let banner = document.querySelector('.banner.parallax-container');

  let staticCarName;
//   Input Values
let comment = document.getElementById('comment');
let username = document.getElementById('name');
let email = document.getElementById('email');
let website = document.getElementById('website');
let submtBtn = document.querySelector('.submit');

// DOM
let videoPopUp = document.querySelector('.video-pop-up');
let photoPopUp = document.querySelector('.photo-pop-up');
let formPopUp = document.querySelector('.booking-pop-up');

// Radio buttons / Star ratings
let driving5 = document.getElementById('driving-5');
let driving4 = document.getElementById('driving-4');
let driving3 = document.getElementById('driving-3');
let driving2 = document.getElementById('driving-2');
let driving1 = document.getElementById('driving-1');

let interior5 = document.getElementById('interior-5');
let interior4 = document.getElementById('interior-4');
let interior3 = document.getElementById('interior-3');
let interior2 = document.getElementById('interior-2');
let interior1 = document.getElementById('interior-1');

let space5 = document.getElementById('space-5');
let space4 = document.getElementById('space-4');
let space3 = document.getElementById('space-3');
let space2 = document.getElementById('space-2');
let space1 = document.getElementById('space-1');

let overall5 = document.getElementById('overall-5');
let overall4 = document.getElementById('overall-4');
let overall3 = document.getElementById('overall-3');
let overall2 = document.getElementById('overall-2');
let overall1 = document.getElementById('overall-1');


// close video pop up
document.querySelector('.close-holder h4').onclick 
= function(){
    videoPopUp.classList.remove('show');
}
// close photo pop up
document.querySelector('.close-hlder h4').onclick 
= function(){
    photoPopUp.classList.remove('show');
}
// close booking pop up
document.querySelector('.close-booking h4').onclick 
= function(){
    formPopUp.classList.remove('show');
}

// show bookingpop up
formBtn.onclick = function(){
    formPopUp.classList.add('show');
}

// show slider
photoBtn.onclick = function(){
    photoPopUp.classList.add('show');  
}

firestore.collection('cars').doc(carId).get()
.then(user => {
    renderCars(user);
});

firestore.collection('cars').doc(carId).collection('review').where('approved', '==', true).get()
.then(snap => {
    snap.docs.length == 0 ? 
    reviewBG.innerHTML = '<h6 class="grey-text luxia" style="text-align:center;">Be the first to drop a review</h6>'
    : snap.docs.forEach(doc => {
        renderReview(doc);
    }) ;
});


function renderCars(user){
    let images = user.data().images;
    // console.log(images);
    renderSlides(images);

    // carPhoto.setAttribute('src', images[0]);
    banner.setAttribute('style', `background-image:url('${images[0]}')`);
    carName.innerHTML = user.data().name;
    passengers.innerHTML = ` ${user.data().passengers} Passengers`;
    luggage.innerHTML = ` ${user.data().luggage} Luggages`;
    doors.innerHTML = ` ${user.data().doors} Doors`;
    transmition.innerHTML = ` ${user.data().transition}`;
    description.innerHTML = user.data().description;
    price.innerHTML = `$${(user.data().price).toLocaleString()}`;
    timeline.innerHTML = user.data().timeline ? user.data().timeline : 'Per day';
    document.querySelector('title').innerHTML = `${user.data().name}`;

    if(user.data().video === null){
        videoBtn.setAttribute('style', 'display: none');
    }else{
        videoBtn.onclick = ()=> {
            // show video
            document.querySelector('.video-holder')
            .innerHTML = user.data().video;
            videoPopUp.classList.add('show');
        }
    }


    loader.setAttribute('style', 'display:none');
    
}

function renderSlides(arr){
    photoPopUp.setAttribute('style', `background-image:url(${arr[0]})`);
    arr.forEach( (img,index) => {
        let slide = document.createElement('div');
        slide.setAttribute('style', `background-image: url("${img}")`);
        slide.classList.add('slider');
        index == 0 ? slide.classList.add('selected') : '';
        document.querySelector('.slides').appendChild(slide);

        //populate gallery section
        let gal_image = document.createElement('img');
        gal_image.classList.add('col', 's12', 'l3','gal_image');
        gal_image.setAttribute('src', img);

        document.querySelector('.image-gallery').appendChild(gal_image);

        // gallery on click action 
        gal_image.onclick = () => {
            photoPopUp.classList.add('show'); 
            photoPopUp.setAttribute('style', `background-image:url("${img}")`);
            // get dom selected imaages
            let selectedImg = document.querySelector('.selected');
            selectedImg.classList.remove('selected');
            slide.classList.add('selected');
        }

        //slider on click action
        slide.onclick = () => {
            photoPopUp.setAttribute('style', `background-image:url("${img}")`);
            // get dom selected imaages
            let selectedImg = document.querySelector('.selected');
            selectedImg.classList.remove('selected');
            slide.classList.add('selected');
        }
    });

    //populate the gallery Section
    arr.forEach((img, index) => {

    });
}

function renderReview(doc){

    let img = document.createElement('img');
    let imgDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let name = document.createElement('h6');
    let date = document.createElement('p');
    let comment = document.createElement('p');
    let starGrid = document.createElement('div');
    let driving = document.createElement('div');
    let interior = document.createElement('div');
    let space = document.createElement('div');
    let overall = document.createElement('div');
    let generalBg = document.createElement('div');

    img.classList.add('user-image');
    imgDiv.classList.add('img-div', 'col', 's12', 'l2');
    contentDiv.classList.add('content-div-review', 'col', 's12', 'l10');
    name.classList.add('black-text', 'bold');
    date.classList.add('grey-text', 'bold', 'x-small');
    comment.classList.add('luxia', 'black-text', 'light-text');
    starGrid.classList.add('star-grid', 'row');
    driving.classList.add('col', 's12', 'l6');
    interior.classList.add('col', 's12', 'l6');
    space.classList.add('col', 's12', 'l6');
    overall.classList.add('col', 's12', 'l6');
    generalBg.classList.add('general-div', 'row');


    img.setAttribute('src', '../assets/defualt.png');
    name.innerHTML = doc.data().name;
    date.innerHTML = timeConverter(doc.data().timestamp);
    comment.innerText = doc.data().comment;
    driving.innerHTML = `<span class="small-text bold">Driving</span> <span>${renderRating(doc.data().driving)}</span>`;
    interior.innerHTML = `<span class="small-text bold">Interior Layout</span> <span>${renderRating(doc.data().interior)}</span>`;
    space.innerHTML = `<span class="small-text bold">Space & Practicality</span> <span>${renderRating(doc.data().space)}</span>`;
    overall.innerHTML = `<span>${renderRating(doc.data().overall)}</span>`;

    // imgDiv.appendChild(img);
    // starGrid.appendChild(driving);
    // starGrid.appendChild(interior);
    // starGrid.appendChild(space);
    starGrid.appendChild(overall);
    contentDiv.appendChild(starGrid);
    contentDiv.appendChild(name);
    // contentDiv.appendChild(date);
    contentDiv.appendChild(comment);
    generalBg.appendChild(imgDiv);
    generalBg.appendChild(contentDiv);
    reviewBG.appendChild(generalBg);

}


// review click action
submtBtn.onclick = () => {
    // check input field
    if(username.value != '' && email.value != '' && comment.value != ''){
        submtBtn.innerHTML = 'Loading...';
        firestore.collection('cars').doc(carId).collection('review').doc(email.value).set({
            'comment': comment.value,
            website: website.value === '' ? null : website.value,
            name: username.value,
            email: email.value,
            driving: parseInt(confirmRating('d')),
            interior: parseInt(confirmRating('i')),
            space: parseInt(confirmRating('s')),
            overall: parseInt(confirmRating('o')),
            timestamp: Date.now(),
            id: email.value,
            approved: false
        }).then(v => {
            firestore.collection('awaiting approval').doc().set({
                'review id': email.value,
            }).then(val =>{
                firestore.collection('cars').doc(carId).get().then(car => {
                    let initial = car.data().rating;
                    if(initial == null){
                        firestore.collection('cars').doc(carId)
                        .update({
                            'rating': (parseInt(confirmRating('d')) + parseInt(confirmRating('i')) + parseInt(confirmRating('s')) + parseInt(confirmRating('o')))/4
                        }).then( val => {
                            location.reload();
                        });
                    }else{
                        let current = (parseInt(confirmRating('d')) + parseInt(confirmRating('i')) + parseInt(confirmRating('s')) + parseInt(confirmRating('o')))/4;
                        let finalRating = (current + initial)/2;
                        firestore.collection('cars').doc(carId)
                        .update({
                            'rating': finalRating
                        }).then( val => {
                            location.reload();
                        });
                    }
                });
            });;
        })
    }else{
        redBorder(username);
        redBorder(email);
        redBorder(comment);
    }
}


// Make element border red
function redBorder(elem){
    elem.setAttribute('style', 'border: solid 3px red !important');
    setTimeout(()=>{
        elem.setAttribute('style', 'border: solid 1px rgb(218, 218, 218) !important;');
    }, 4000)
}

function confirmRating(word){
    let driving = [driving1, driving2, driving3, driving4, driving5];
    let interior = [interior1, interior2, interior3, interior4, interior5];
    let space = [space1, space2, space3, space4, space5];
    let overall = [overall1, overall2, overall3, overall4, overall5];

    let drivingRating;
    let spaceRating;
    let interiorRating;
    let overallRating;
    if(word === 'd'){
        driving.forEach(d =>{
          if(d.checked){
              drivingRating = d.value;
          }
        });
    }
    if(word === 'i'){
        interior.forEach(d =>{
          if(d.checked){
              interiorRating = d.value;
          }
        });
    }
    if(word === 's'){
        space.forEach(s =>{
          if(s.checked){
              spaceRating = s.value;
          }
        });
    }
    if(word === 'o'){
        overall.forEach(o =>{
          if(o.checked){
              overallRating = o.value;
          }
        });
    }
    return word === 'd' ? drivingRating : word === 'i' ? interiorRating : word === 's'? spaceRating : word === 'o' ? overallRating : null;
}

// star rating render
function renderRating(number){
    switch(number){
        case 1:
            return `<i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>`;
            break;
        case 2:
            return `
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            `;
            break;
        case 3:
            return `
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            `;
            break;
        case 4:
            return `
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: grey">star</i>
            `;
            break;
        case 5:
            return `
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            `;
            break;
        default:
            return `
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            <i class="material-icons tiny" style="color: #FFA100">star</i>
            `;
            break;
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

firestore.collection('cars').doc(carId).get()
    .then(doc => {
        let daysDB = doc.data().days;
        lastUpdated.innerHTML = "Last Updated - "+timeConverter(doc.data()['last updated']);
        
        if(daysDB !== undefined){
            daysDB.forEach(ddb => {
                renderAvailable(ddb);
            });
        }
    });

    // Available days
let month = document.querySelector('.month');
let lastUpdated = document.querySelector('.last-updated');
let availableBG = document.querySelector('.render-awaiting');

let date = new Date();
month.innerHTML = `${convertMonths(date.getMonth())}`;


function renderAvailable(day) {
    let generalHolder = document.createElement('div');
    let individualDateHolder = document.createElement('div');
    let date = document.createElement('p');
    
    generalHolder.classList.add('col', 'l2');
    individualDateHolder.classList.add('date-border', 'tooltipped');
    individualDateHolder.setAttribute('data-position', 'top');
    date.classList.add('luxia', 'grey-text', 'text-darken-2');

    date.innerHTML = day;
    individualDateHolder.setAttribute('data-tooltip', `${verifyDay(day)}`);

    individualDateHolder.appendChild(date);
    generalHolder.appendChild(individualDateHolder);
    availableBG.appendChild(generalHolder);

    individualDateHolder.onclick = function(){
        M.toast({html: `${verifyDay(day)}`, classes: 'rounded'});
    }


}

function convertMonths(int){
    let date = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let year = date.getFullYear();

    return months[int]+' '+year;
}

function verifyDay(val){
    let day = parseInt(val);
    let date = new Date();

    if(day == 1){
        return `${day}st of ${convertMonths(date.getMonth())}`;
    }else if(day == 2){
        return `${day}nd of ${convertMonths(date.getMonth())}`;
    }else if(day == 3){
        return `${day}rd of ${convertMonths(date.getMonth())}`;
    }else{
        return `${day}th of ${convertMonths(date.getMonth())}`;
    }

}


// Booking session
let pickup = document.getElementById('pickup');
let returnDate = document.getElementById('returnDate');
let textArea = document.querySelector('textarea[name="custom_comment"]');
let booking_name = document.querySelector('input[name="name"]');
let booking_email = document.querySelector('input[name="email"]');
let booking_phone = document.querySelector('input[name="custom_phone"]');
let submitBtn = document.querySelector('input[type="submit"]');

// Add car name to comment
// textArea.value = 
firestore.collection('cars').doc(carId).get()
.then(doc => {
    textArea.value += `Car Name: ${doc.data().name}, `
});

// Add pick up date to comment
pickup.onchange = function(){
    textArea.value += `Pick up Date: ${pickup.value}, `;
} 
// Add return date to comment
returnDate.onchange = function(){
    textArea.value += `Return Date: ${returnDate.value}.`;
} 

let booking_info;

submitBtn.onclick = (e) => {
    e.preventDefault();
    //save data to local storage
    booking_info = {
        booking_name : booking_name.value,
        booking_email : booking_email.value,
        booking_phone : booking_phone.value,
        other_info : textArea.value
    }
    //save data to local storage
    localStorage.setItem('booking-info', JSON.stringify(booking_info));

    console.log(booking_info);

    location.href = `/qualify.html?id=${carId}`;
}

