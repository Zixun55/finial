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
const user1 = db.collection('logout');
const logoutButton = document.getElementById("logout");

db.collection("logout").get()
    .then(doclist => {
        doclist.forEach(element => {
            const check = element.data();
            if (`${check.Login}` == '0'){
                window.location.href='login.html';
            }
            else if (`${check.Login}` == '2'){
                window.location.href='user.html';
            }
        });
    })

const Title = `
            <tr>
                <td>帳號</td>
                <td>密碼</td>
            </tr>`
$("#listGroup").append(Title);
db.collection("member").get()
    .then(doclist => {
        doclist.forEach(element => {
            const user = element.data();
            
            const col = `
                <tr>
                    <td>${user.mail}</td>
                    <td>${user.password}</td>
                </tr> `
            $("#listGroup").append(col);
        });
    })

function userlogout(event){
    event.preventDefault();
    user1.doc('4Dw5hLTn3rTjFA2NAZjo').set({
        Login : '0',
        User : "nobody"
    })
    .then(() => {
        alert("登出成功!!")
        window.location.href='login.html';
    })
}

logoutButton.addEventListener('click', userlogout);