const firebaseConfig = {
    apiKey: "AIzaSyClNRq0I-kiy5OB2oAknn8z9fEaJbaaA6g",
    authDomain: "final-2c2be.firebaseapp.com",
    projectId: "final-2c2be",
    storageBucket: "final-2c2be.appspot.com",
    messagingSenderId: "640090899414",
    appId: "1:640090899414:web:1534b452239a7188985a77"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const log = db.collection('member');

db.collection("logout").get()
    .then(doclist => {
        doclist.forEach(element => {
            const check = element.data();
            if (`${check.Login}` == '1'){
                window.location.href='admin.html';
            }
            else if (`${check.Login}` == '2'){
                window.location.href='user.html';
            }
        });
    })

const loginButton = document.getElementById("login");
function userlogin(event){
    event.preventDefault();
    var mail = document.getElementById("mail").value;
    var pw = document.getElementById("password").value;
    const user1 = db.collection('logout');
    firebase.auth().signInWithEmailAndPassword(mail, pw)
    .then((userCredential) => {
        var user = userCredential.user;
        if (mail == 'admin@gmail.com' && pw == 'adminadmin'){
            user1.doc('4Dw5hLTn3rTjFA2NAZjo').set({
                Login : '1',
                User : mail
            })
            .then(() => {
                window.location.href='admin.html';
            })
        }
        else{
            user1.doc('4Dw5hLTn3rTjFA2NAZjo').set({
                Login : '2',
                User : mail
            })
            .then(() => {
                window.location.href='user.html';
            })
        }
    })
    .catch((error) => {
        alert('登入失敗');
        window.location.reload();
    });
}

loginButton.addEventListener('click', userlogin);







// loginButton.addEventListener("click",function(e){
//     e.prevenDefault();
//     firebase.auth().signInWithEmailAndPassword(mail.ariaValueMax,pw.value)
//     .then(() => {
//         var user = firebase.auth().currentUser;
//         if(user){
//             console.log(user);
//         }
//     })
//     .catch((error) => {
//         console.log(error.message);
//     })
// })