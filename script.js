const firebaseConfig = {
    apiKey: "AIzaSyBnGLsFAvo6N-DOyXN9VoFq9UJ_HThBejk",
    authDomain: "uhho-69148.firebaseapp.com",
    databaseURL: "https://uhho-69148.firebaseio.com",
    projectId: "uhho-69148",
    storageBucket: "uhho-69148.appspot.com",
    messagingSenderId: "476011092056",
    appId: "1:476011092056:web:cd00b5ab2543c6f923922d"
};

$(()=>{
    
    console.log(location.pathname);

    firebase.initializeApp(firebaseConfig);
    const fdb = firebase.firestore();

    const docId = (location.pathname + '///').split('/')[2];

    fdb.collection('documents').doc(docId).get()
    .then((doc)=>{
        $('#app').text(doc.data().text);
    })
    .catch((error)=>{

    });

    // fdb.collection('documents').doc(createDocId()).set({
    //     text: 'banana',
    //     insert_timestamp: getCurrentTime()
    // })
    // .then(() => {
    //     console.log('ok');
    // })
    // .catch((error) => {
    //     console.log('ng');
    // });

});

function createDocId(length = 16){
    const arr = 'uho-'.split('');
    let str = '';
    for (let i = 0; i < length; i++) {
        str += arr[Math.floor(Math.random() * arr.length)];
    }
    return str;
}

function getCurrentTime() {
    function padZero(num) {
        return (num < 10 ? "0" : "") + num;
    }
    const now = new Date();
    const res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
        padZero(now.getMinutes()) + padZero(now.getSeconds());
    return res;
}