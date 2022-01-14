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
const Chat = db.collection("ChatRoom");
const logoutButton = document.getElementById("logout");
const sendButton = document.getElementById("Send");

db.collection("logout").get()
    .then(doclist => {
        doclist.forEach(element => {
            const check = element.data();
            if (`${check.Login}` == '0'){
                window.location.href='login.html';
            }
            else if (`${check.Login}` == '1'){
                window.location.href='admin.html';
            }
        });
    })

db.collection("logout").get()
    .then(doclist => {
        doclist.forEach(element => {
            const UserNow = element.data();
            document.getElementById("name").value = `${UserNow.User}`;
        })
    })

Chat.orderBy("Time", "asc").get()
    .then(doclist => {
        doclist.forEach(element => {
            const mes = element.data();
            const col = `
                <tr>
                    <td><font size="6" style="color: gray">${mes.Time}:&nbsp;&nbsp;</font></td>
                    <td><font size="6">${mes.name}:&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                    <td><font size="6">${mes.speak}</font></td>
                </tr> `
            $("#Message").append(col);
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

function SendMessage(event){
    event.preventDefault();
    var date = new Date();
    var month = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(h<10){
        h = '0' + h;
    }
    if(m<10){
        m = '0' + m;
    }
    if(s<10){
        s = '0' + s;
    }
    var now = month + '月' + d + '日' + h + ':' + m + ":" + s;
    Chat.add({
        name : document.getElementById("name").value,
        speak : document.getElementById("Speak").value,
        Time : now
    })
    .then(() => {
        ParrotCheck();
        //window.location.reload();
    })
}

function ParrotCheck(){
    db.collection("parrot").where("message", "==", document.getElementById('Speak').value).get()
        .then(doclist => {
            doclist.forEach(element => {
                const mes = element.data();
                var Parrot = `${mes.reply}`;
                var date = new Date();
                var month = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();
                if(h<10){
                    h = '0' + h;
                }
                if(m<10){
                    m = '0' + m;
                }
                if(s<10){
                    s = '0' + s;
                }
                now = month + '月' + d + '日' + h + ':' + m + ":" + (s+1);
                Chat.add({
                    name : "Happy Parrot",
                    speak : Parrot,
                    Time : now
                })
                .then(() => {
                    window.location.reload();
                })
            });
        })
}

logoutButton.addEventListener('click', userlogout);
sendButton.addEventListener('click', SendMessage);