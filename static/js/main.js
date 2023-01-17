const socket = io();
//const roomName = document.getElementById('join_room');

socket.on('connect', () => {
  socket.emit('my_event', { data: "I'm connected!" });
});

socket.on('my_response', (msg, cb) => {
  const log = document.getElementById('log');
  log.innerHTML += `<br> Received #${msg.count}: ${msg.data}`;
  if (cb) cb();
});


let pingPongTimes = [];
let startTime;
setInterval(() => {
  startTime = Date.now();
  document.getElementById('transport').textContent = socket.io.engine.transport.name;
  socket.emit('my_ping');
}, 1000);

socket.on('my_pong', () => {
  const latency = Date.now() - startTime;
  pingPongTimes.push(latency);
  pingPongTimes = pingPongTimes.slice(-30);
  let sum = 0;
  for (let i = 0; i < pingPongTimes.length; i++) {
    sum += pingPongTimes[i];
  }
  document.getElementById('ping-pong').textContent = (sum / pingPongTimes.length).toFixed(1);
});


document.getElementById('emit').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('my_event', { data: document.getElementById('emit_data').value });
});

document.getElementById('broadcast').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('my_broadcast_event', { data: document.getElementById('broadcast_data').value});
});

document.getElementById('join').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('join', { room: document.getElementById('join_room').value});

});


document.getElementById('leave').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('leave', { room: document.getElementById('leave_room').value });
});



document.getElementById('send_room').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('my_room_event', { room: document.getElementById('room_name').value, data: document.getElementById('room_data').value });
});

document.getElementById('close').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('close_room', { room: document.getElementById('close_room').value });
});

document.getElementById('disconnect').addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('disconnect_request');
});


/*// Add room name to DOM
function outputRoomName(room) {
  join_room.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
*/