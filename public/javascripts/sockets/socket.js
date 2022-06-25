const socket = io();

let notifyBtn = document.getElementsByClassName('notify');
let notifyMe = document.getElementById('notifyMe');
const notfNum = document.getElementsByClassName('notfNum')[0];

// if(notifyBtn)
//     notifyBtn = notifyBtn[0];

if(notifyMe)
    notifyMe = notifyMe.value;

socket.on('connect', () =>{
    currentUserId = document.getElementById('currentUser').value;
    socket.emit('joinNotfsRoom', currentUserId);
})

for (let btn of notifyBtn) {
    if(btn.textContent == 'Comment'){
        btn.onclick = (e) =>{
            socket.emit('newNotf', notifyMe);
        };
    }
    else{
        btn.onclick = (e) =>{
            socket.emit('newNotf', btn.value);
        };
    }
}    
// notifyBtn.onclick = (e) =>{
//     socket.emit('newNotf', notifyMe);
// }

socket.on('addNotf', () => {
    notfNum.innerHTML = Number(notfNum.innerHTML) + 1;  
    notfNum.style.display = "block";  
})
