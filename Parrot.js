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
const sendButton = document.getElementById("Send");
const delButton = document.getElementById("del");
const changeButton = document.getElementById("up");

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
        <td>講話</td>
        <td>回應</td>
    </tr>`
$("#PPP").append(Title);
db.collection("parrot").get()
.then(doclist => {
doclist.forEach(element => {
    const user = element.data();
    
    const col = `
        <tr>
            <td>${user.message}</td>
            <td>${user.reply}</td>
        </tr> `
    $("#PPP").append(col);
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

function Teach(event){
    event.preventDefault();
    db.collection("parrot").add({
        message : document.getElementById("say").value,
        reply : document.getElementById("teach").value
    })
    .then(() => {
        window.location.reload();
    })
}

function Change(event){
    event.preventDefault();
    db.collection("parrot").where("message", "==", document.getElementById('say').value).get()
        .then(doclist => {
            doclist.forEach(element => {
                const mes = element.data();
                var Parrot = `${mes.message}`;
                db.collection("parrot").doc("rn4EXhSmdCAmBR9BaSs8").set({
                    message : Parrot,
                    reply : document.getElementById("teach").value,
                })
                .then(() => {
                    window.location.reload();
                })
            });
        })
}

logoutButton.addEventListener('click', userlogout);
sendButton.addEventListener('click', Teach);
changeButton.addEventListener('click', Change);