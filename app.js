const http = new HTTP;

// Get Users
http.get('data.json')
  .then(users => {



    class User {
      constructor(id, firstName, surname, friends) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.friends = friends;
      }
    }

    class UI {
      // Display all Users
      addUser(user) {
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.surname}</td>
          <td>${user.friends}</td>
          <td><a href="#" class="select btn btn-primary">Select<a></td>
        `;
        list.appendChild(row);
      }

      // Display direct Friends
      selectUser(user) {
        const list = document.getElementById('friends-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.surname}</td>
          <td>${user.friends}</td>
        `;
        list.appendChild(row);
      }

      // Display friends of Friends
      selectDirectFriends(user) {
        const list = document.getElementById('direct-friends-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.surname}</td>
          <td>${user.friends}</td>
        `;
        list.appendChild(row);
      }

      // Display suggested Friends
      selectSuggestedFriends(user) {
        const list = document.getElementById('suggested-friends-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.surname}</td>
          <td>${user.friends}</td>
        `;
        list.appendChild(row);
      }
    }


    // All Users Loop
    users.forEach((u) => {
      // Instantiate user
      const user = new User(u.id, u.firstName, u.surname, u.friends);
      // Instantiate UI
      const ui = new UI();
      // Add user
      ui.addUser(user);
    });


    // ----------------------------------------------- Event Listener for Selecting User
    document.getElementById('book-list').addEventListener('click', (e) => {


      if (e.target.classList.contains('select')) {


        // Clear fields
        document.getElementById('friends-list').innerHTML = '';
        document.getElementById('direct-friends-list').innerHTML = '';
        document.getElementById('suggested-friends-list').innerHTML = '';

        // Style
        const bg = document.querySelectorAll('.users tr');
        bg.forEach((td) => {
          td.className = '';
        });


        e.target.parentElement.parentElement.className = 'bg-dark';


        // Selected user id
        const selectedId = e.target.parentElement.parentElement.childNodes[1].textContent;
        // Selected user object
        const selectedObject = users[selectedId - 1];



        // ---------------------------------------------- Direct friends

        users.forEach(u => {
          if (selectedObject.friends.indexOf(u.id) !== -1) {
            const user = new User(u.id, u.firstName, u.surname, u.friends);
            // Instantiate UI
            const ui = new UI();
            // Select user
            ui.selectUser(user);
          }
        });

        // ------------------------------------------------- Friends of friends


        let friendsOfFriends = [];
        // loop trough all users
        users.forEach(user => {
          // go to user friend list
          user.friends.forEach(friend_id => {
            // get ids of friends of friend who are in selectedObject.friends
            // and not equal to selectedObject.id
            // and who is not in array already
            if (
              selectedObject.friends.indexOf(user.id) !== -1 &&
              selectedObject.id !== friend_id &&
              friendsOfFriends.indexOf(friend_id) === -1
            ) {
              friendsOfFriends.push(friend_id);
            }
          });
        });
        // remove direct
        friendsOfFriends = friendsOfFriends.filter(fri => {
          return selectedObject.friends.indexOf(fri) === -1;
        });


        users.forEach(u => {
          if (friendsOfFriends.indexOf(u.id) !== -1) {
            const user = new User(u.id, u.firstName, u.surname, u.friends);
            // Instantiate UI
            const ui = new UI();
            // Select user
            ui.selectDirectFriends(user);
          }

        });

        // ------------------------------------------------ Suggested Friends

        let arr = [];
        users.forEach((user) => {
          if (user.friends.length > 1) {
            arr.push(user);
          }
        });


        let arr1 = [];
        arr.forEach((user) => {

          let x = 0;
          user.friends.forEach((id) => {
            if (selectedId === id) {
              x = 1;
            }

          });

          if (x === 0) {
            arr1.push(user);
          }

        });

        arr1.splice(arr1.indexOf(selectedObject), 1);


        let suggestedFriendsArray = [];

        arr1.forEach((user) => {

          let x = 0;
          user.friends.forEach((fost) => {
            selectedObject.friends.forEach((id) => {
              if (fost === id) {
                x += 1;
              }

            });

          });
          if (x > 1) {
            suggestedFriendsArray.push(user.id);
          }

        });

        users.forEach(u => {
          if (suggestedFriendsArray.indexOf(u.id) !== -1) {
            const user = new User(u.id, u.firstName, u.surname, u.friends);
            // Instantiate UI
            const ui = new UI();
            // Select user
            ui.selectSuggestedFriends(user);
          }

        });

      }

      e.preventDefault();
    });

  })
  .catch(err => console.log(err));

