// const app = firebase.initializeApp(firebaseConfig)
// console.log(app);

// //CREATE USER for signup

// const database = firebase.database();
// const signup = () => {
//     let username = document.getElementById('username').value;
//     let contact = document.getElementById('contact').value;
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     let role = user;


//     console.log(email, password)

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in 
//             let user = userCredential.user;
//             console.log(user);


//             firebase.database().ref('users/' + user.uid).set({
//                 uid: user.uid,
//                 username: username,
//                 role: role,
//                 contact: contact,
//                 email: email,
//                 password: password,
//             })
//                 .then(() => {
//                     console.log('user created successfully.')
//                 })

//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             console.log(errorCode + ': ' + errorMessage)
//             // ..
//         });

// }




// const signin = ()=>{
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
    
//     let user = userCredential.user;
//     console.log(user)
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   })
// }



// const firebaseConfig = {
//   apiKey: "AIzaSyBxPtH2NHVL_wZfcLZz82gvsuuLmdWSfXE",
//   authDomain: "smit-project-355bd.firebaseapp.com",
//   databaseURL: "https://smit-project-355bd-default-rtdb.firebaseio.com",
//   projectId: "smit-project-355bd",
//   storageBucket: "smit-project-355bd.appspot.com",
//   messagingSenderId: "754036390157",
//   appId: "1:754036390157:web:bf81cc6140c3988d72d844",
//   measurementId: "G-2466N13ETJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



const firebaseConfig = {
    apiKey: "AIzaSyBxPtH2NHVL_wZfcLZz82gvsuuLmdWSfXE",
    authDomain: "smit-project-355bd.firebaseapp.com",
    databaseURL: "https://smit-project-355bd-default-rtdb.firebaseio.com",
    projectId: "smit-project-355bd",
    storageBucket: "smit-project-355bd.appspot.com",
    messagingSenderId: "754036390157",
    appId: "1:754036390157:web:bf81cc6140c3988d72d844",
    measurementId: "G-2466N13ETJ"
  };

 










const app = firebase.initializeApp(firebaseConfig);


console.log(app)

const signup = () => {
    let username = document.getElementById('username').value;
    let contact = document.getElementById('contact').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let role = 'User'

    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                role: role,
                contact: contact,
                email: email,
                password: password
            })
                .then(() => {
                    const user = { email: email };
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log('User created successfully.')
                    window.location.href = './home.html'
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });
}

const signin = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email,password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user)
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val()
                    if (userData.role === 'Admin') {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log('User created successfully.')
                        window.location.href = '../Admin/items/items.html'
                    }
                    else {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = './home.html'
                    }
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });

}
