const firebaseConfig = {
    apiKey: "AIzaSyBnGLsFAvo6N-DOyXN9VoFq9UJ_HThBejk",
    authDomain: "uhho-69148.firebaseapp.com",
    databaseURL: "https://uhho-69148.firebaseio.com",
    projectId: "uhho-69148",
    storageBucket: "uhho-69148.appspot.com",
    messagingSenderId: "476011092056",
    appId: "1:476011092056:web:cd00b5ab2543c6f923922d"
};

const UHHOLENGTH = 16;

$(()=>{
    
    console.log(location.pathname);

    firebase.initializeApp(firebaseConfig);
    const fdb = firebase.firestore();

    const docId = (location.pathname + '///').split('/')[2].length == UHHOLENGTH ? (location.pathname + '///').split('/')[2] : 'how-to-use';


    $('textarea.auto-resize')
    .on('change keyup keydown paste cut', function(){
        if ($(this).outerHeight() > this.scrollHeight){
            $(this).height(1)
        }
        while ($(this).outerHeight() < this.scrollHeight){
            $(this).height($(this).height() + 1)
        }
    });

    if (docId.length) {
        fdb.collection('documents').doc(docId).get()
        .then((doc)=>{
            $('#text1').text(doc.data().text.replace(/@RETURN@/g, '\r\n')).change();
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    $('#uhho').on('click', () => {
        const newDocId = createDocId();
        fdb.collection('documents').doc(newDocId).set({
            text: $('#text2').val().replace(/\r?\n/g, '@RETURN@'),
            insert_timestamp: yyyyMMddhhmmss()
        })
        .then(() => {
            location.href = 'https://kagasan.github.io/uhho/' + newDocId;
        })
        .catch((error) => {
            
        });
    });



});

function createDocId(){
    const arr = 'uho-'.split('');
    let str = '';
    for (let i = 0; i < UHHOLENGTH; i++) {
        str += arr[Math.floor(Math.random() * arr.length)];
    }
    return str;
}

function yyyyMMddhhmmss() {
    function padZero(num) {
        return (num < 10 ? "0" : "") + num;
    }
    const now = new Date();
    const res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
        padZero(now.getMinutes()) + padZero(now.getSeconds());
    return res;
}