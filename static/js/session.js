// HTTP handlers
window.setInterval(function() {
  fetch('/session')
    .then(res => res.json())
    .then(data => {
      document.getElementById('http-session').textContent = data['session'];
      document.getElementById('http-user').textContent = data['user'];
    });
}, 1000);

document.getElementById('submit-http').addEventListener('click', function() {
  fetch('/session', {
    method: 'POST',
    body: JSON.stringify({session: document.getElementById('http-session-set').value}),
    headers: {'Content-Type': 'application/json'}
  });
});
/*document.getElementById('login-http').addEventListener('click', function() {
  fetch('/session', {
    method: 'POST',
    body: JSON.stringify({user: document.getElementById('http-user-set').value}),
    headers: {'Content-Type': 'application/json'}
  });
});*/

document.getElementById('login-http').addEventListener('click', function() {
  fetch('/session', {
    method: 'POST',
    body: JSON.stringify({user: document.getElementById('http-user-set').value}),
    headers: {'Content-Type': 'application/json'}
  }).then(response => {
    if (response.ok) {
      // Redirect to index page
      location.replace("/");
    }
  });
});





document.getElementById('logout-http').addEventListener('click', function() {
  fetch('/session', {
    method: 'POST',
    body: JSON.stringify({user: null}),
    headers: {'Content-Type': 'application/json'}
  });
});

// Socket.IO handlers
var socket = null;

document.getElementById('connect').addEventListener('click', function() {
  if (!socket) {
    socket = io();
    socket.on('refresh-session', function(data) {
      document.getElementById('socketio-session').textContent = data['session'];
      document.getElementById('socketio-user').textContent = data['user'];
    });

    document.getElementById('connect').textContent = 'Disconnect';
    document.getElementById('socketio').style.display = 'block';
  } else {
    socket.disconnect();
    socket = null;
    document.getElementById('socketio').style.display = 'none';
    document.getElementById('connect').textContent = 'Connect';
    document.getElementById('socketio-session').textContent = '';
    document.getElementById('socketio-user').textContent = '';
  }
});

window.setInterval(function() {
  if (socket) {
    socket.emit('get-session');
  }
}, 1000);

document.getElementById('submit-socketio').addEventListener('click', function() {
  socket.emit('set-session', {session: document.getElementById('socketio-session-set').value});
});
document.getElementById('login-socketio').addEventListener('click', function() {
  socket.emit('set-session', {user: document.getElementById('socketio-user-set').value});
});
document.getElementById('logout-socketio').addEventListener('click', function() {
  socket.emit('set-session', {user: null});
});
