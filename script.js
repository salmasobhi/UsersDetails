function sendRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.error('');
      }
    };
    xhr.send();
  }
  
  var getAllUsersBtn = document.getElementById('getAllUsers');
  var userTableBody = document.getElementById('userTableBody');
  var userDetails = document.getElementById('userDetails');
  
  getAllUsersBtn.addEventListener('click', () => {
    sendRequest('https://jsonplaceholder.typicode.com/users', (users) => {
      userTableBody.innerHTML = '';
      users.forEach(user => {
        var row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><button onclick="showUserDetails(${user.id})">Details</button></td>
        `;
        userTableBody.appendChild(row);
      });
    });
  });
  
  function showUserDetails(userId) {
    sendRequest(`https://jsonplaceholder.typicode.com/users/${userId}`, (user) => {
      document.getElementById('userName').textContent = user.name;
      document.getElementById('userEmail').textContent = user.email;
      userDetails.style.display = 'block';
    });
  }