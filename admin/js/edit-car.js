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
    
// get car Id
const urlParams = new URLSearchParams(window.location.search);
const carID = urlParams.get('id'); 

  
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

let carname_ = document.querySelectorAll('.car-name');


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


// ======================= ALL FUNCTIONS ==============================

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

function showData(data) {
    carName.value = data.name;
    turoLink.value = data.turo;
    carDoors.value = data.doors;
    luggage.value = data.luggage;
    price.value = data.price;
    passengers.value = data.passengers;
    transmission.value = data.transition;
    timeline.value = data.timeline;
    video.value = data.video;
    richTextField.document.body.innerHTML = data.description;
}

let carData;

firestore.collection('cars').doc(carID).get()
.then(doc => {
    carData = doc.data();
    carname_.forEach(cn => {
        cn.innerHTML = doc.data().name;
    })
    showData(doc.data());

}).catch(err => {
    console.log(err);
    M.toast({html: 'An error occured while trying to get car data'});
})


submitBtn.onclick = () => {
    submitBtn.innerHTML = 'Please Wait...';

    firestore.collection('cars').doc(carID).update({
        description: richTextField.document.body.innerHTML,
        doors: carDoors.value,
        luggage: luggage.value,
        name: carName.value,
        turo: turoLink.value,
        passengers: passengers.value,
        price: parseInt(price.value),
        transition: transmission.value,  
        timeline: timeline.value,
        video: video.value == '' ? null : video.value
    }).then(val => {
        if(fileList){
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
                        
                        //if all images have been added, save the images to the database
                        if(fileList.length == x+1){       

                            //add images list to localstorage
                                               
                            localStorage.setItem('images', JSON.stringify(imgNames));                      
                            //add images to the database
                            
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
        }else{
            // no images
            submitBtn.innerHTML = 'Save Changes';
            M.toast({html: 'Car Infomation updated successfully'});
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }).catch(err => {
        submitBtn.innerHTML = 'Save Changes';
        console.log(err);
        M.toast({html: 'AN error occured while updating info. Check console'});
    })


}


// RE-ARRANGING IMAGES
const existingImages_holder = document.querySelector('.existing-images')
const sortedImages_holder = document.querySelector('.sorted-images')
let existingImages = [];
let sortedImages = [];

firestore.collection('cars').doc(carID).get()
.then(doc => {
    existingImages = doc.data().images;
    doc.data().images.forEach(img => {
        renderExistingImages(img);
    })
}).catch(err => {
    console.log(err);
    M.toast({html: 'An error occured while attempting to fetch images'})
})

function renderExistingImages(img) {
    const col = document.createElement('div');
    const deleteBtn = document.createElement('p');
    const holder = document.createElement('div');

    col.classList.add('border10', 'ex-img');
    deleteBtn.classList.add('image-delete-btn');
    holder.classList.add('img_holder__');

    // add data
    deleteBtn.innerHTML = 'Delete Image';
    col.setAttribute('style',`background-image:url(${img})`);

    // append element
    holder.appendChild(col);
    holder.appendChild(deleteBtn);
    existingImages_holder.appendChild(holder);

    deleteBtn.onclick = () => {
        if(confirm('Are you sure you want to delete image')) {
            existingImages = existingImages.filter(ex => ex !== img);
            firestore.collection('cars').doc(carID).update({
                'images': existingImages
            }).then(val => {
                M.toast({html: 'Image Deleted'});
                //delete image in storage
                firebase.storage().refFromURL(img).delete()
                .then(() => {

                    // re-render images
                    existingImages_holder.innerHTML = '';
                    existingImages.forEach(ni => {
                        renderExistingImages(ni);
                    })

                }).catch(err => {
                    M.toast({html: 'An error occured while trying to remove image from storage'});
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        }else{
            M.toast({html: 'Operation aborted'});
        }
    }

    col.onclick = () => {
        col.classList.toggle('selected');
        //check if image exists in sorted image
        if(sortedImages.includes(img)) {
            sortedImages = sortedImages.filter(sm => sm !== img);
            renderSortedImages(sortedImages);
        }else{
            sortedImages.push(img);  
            renderSortedImages(sortedImages);
        }
    }

}

function renderSortedImages(imgs) {
    // first clear the sorted DOM
    sortedImages_holder.innerHTML = '';
    imgs.forEach(img => {
        const col = document.createElement('div');

        col.classList.add('border10', 'st-img');

        // add data
        col.setAttribute('style',`background-image:url(${img})`);

        // append element
        sortedImages_holder.appendChild(col);
    })

}

const updateImageBtn = document.querySelector('.update-images');
updateImageBtn.onclick = () => {
    if(sortedImages.length == existingImages.length) {
        updateImageBtn.innerHTML ='Please Wait...';
        firestore.collection('cars').doc(carID).update({
            'images': sortedImages
        }).then(val => {
            M.toast({html: 'Images sorted successfully'});
            updateImageBtn.innerHTML = 'Update Images';
            setTimeout(() => {
                location.reload();
            }, 4000);
        }).catch(err => {
            console.log(err);
            updateImageBtn.innerHTML = 'Update Images';
            M.toast({html: 'An error occured while updating images'});
        })
    }else{
        M.toast({html: 'Image mismatch'})
    }
}


// TODO add delete button to delete car listing

const deleteCar = document.querySelector('.delete-car');

deleteCar.onclick = () => {

    if(confirm('Are you sure you want to delete this car? Deleted cars can not be recovered')) {
        // get the images url
        deleteCar.innerHTML = 'Please Wait..'
        firestore.collection('cars').doc(carID).get()
        .then(doc => {
            let imageUrls_ = doc.data().images;
            let count = 0;
            //delete car listing
            firestore.collection('cars').doc(carID).delete()
            .then(val => {
                //delete the images on the storage
                const res = Promise.all(imageUrls_.map(imgUrl => {
                    // Create a reference to the file to delete
                    var imgRef = firebase.storage().refFromURL(imgUrl);
                    // Delete the file using the delete() method 
                    imgRef.delete().then(function () {
                    
                        // File deleted successfully
                        console.log("Image Deleted");
                        count = count + 1;
                        if(imageUrls_.length == count+1) {
                            M.toast({html: 'All Images have been deleted'});
                            deleteCar.innerHTML = 'Delete Car Listing';
                            setTimeout(() => {
                                history.back();
                            }, 3000);
                        }
                    }).catch(function (error) {
                        // Some Error occurred
                    });
                }))
            }).catch(err => {
                console.log(err);
                deleteCar.innerHTML = 'Delete Car Listing'
                M.toast({html: 'An error occured while trying to delete the car'});
            })
        }).catch(err => {
            console.log(err);
            M.toast({html: 'Failed, try again'});
        })
    }else{
       M.toast({html: 'Aborted'}); 
    }
}
// CODE TO DELETE IMAGES FROM STORAGE WITH IMAGE URL

// var fileUrl = 
// 'https://firebasestorage.googleapis.com/b/bucket/o/images%20geeksforgeeks.jpg';
  
// // Create a reference to the file to delete
// var fileRef = storage.refFromURL(fileUrl);
  
// console.log("File in database before delete exists : " 
//         + fileRef.exists())
  
// // Delete the file using the delete() method 
// fileRef.delete().then(function () {
  
//     // File deleted successfully
//     console.log("File Deleted")
// }).catch(function (error) {
//     // Some Error occurred
// });
  
// console.log("File in database after delete exists : "
//         + fileRef.exists())
