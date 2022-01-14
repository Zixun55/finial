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

const creatButton = document.querySelector('button');


function Submit(event){
    event.preventDefault();
    var mail = document.getElementById("mail").value;
    var pw = document.getElementById("password").value;
    var check_pw = document.getElementById("check_password").value;
    if (pw != check_pw){
        alert("密碼確認失敗");
        window.location.reload();
    }
    if (mail == "admin@gmail.com" && pw == "adminadmin"){
        alert("註冊失敗");
        window.location.reload();
    }

    
    firebase.auth().createUserWithEmailAndPassword(mail, pw)
    .then((userCredential) => {
        var user = userCredential.user;
        db.collection("member").add({
            mail : mail,
            password : pw,
            Permission : "1"
        })
        .then(() => {
            window.location.reload();
        });
        alert("註冊成功");
        
    })
    .catch((error) => {
        alert("註冊失敗");
    });
    // 
}

creatButton.addEventListener('click', Submit);