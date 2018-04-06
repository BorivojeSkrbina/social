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
    users.forEach((singleUser) => {
      const id = singleUser.id,
        firstName = singleUser.firstName,
        surname = singleUser.surname,
        friends = singleUser.friends;
      // Instantiate user
      const user = new User(id, firstName, surname, friends);
      // Instantiate UI
      const ui = new UI();
      // Add user
      ui.addUser(user);
    });





    // ----------------------------------------------- Event Listener for Selecting User
    document.getElementById('book-list').addEventListener('click', (e) =>  {

      // Clear fields
      document.getElementById('friends-list').innerHTML = '';
      document.getElementById('direct-friends-list').innerHTML = '';
      document.getElementById('suggested-friends-list').innerHTML = '';

      // Style
      const bg = document.querySelectorAll('.users tr');
      bg.forEach((td) => {
        td.className = '';
      });


      
      if (e.target.classList.contains('select')) {
        
        e.target.parentElement.parentElement.className = 'bg-dark';


        // Selected user id
        const selectedId = e.target.parentElement.parentElement.childNodes[1].textContent;
        // Selected user object
        const selectedObject = users[selectedId - 1];



        // ---------------------------------------------- Direct friends Loop
        selectedObject.friends.forEach((friend) => {
          // console.log(singleUser);
          const id = users[friend - 1].id,
            firstName = users[friend - 1].firstName,
            surname = users[friend - 1].surname,
            friends = users[friend - 1].friends;
          // Instantiate user
          const user = new User(id, firstName, surname, friends);
          // Instantiate UI
          const ui = new UI();
          // Select user
          ui.selectUser(user);
        });


        // ------------------------------------------------- Friends of friends Loop
        let niz = [];
        selectedObject.friends.forEach((friends) => {
          niz.push(users[friends - 1].id);
        });
  
        let niz1 = [];
  
        niz.forEach((friend) => {
          users[friend - 1].friends.forEach((fr) => {
            if (niz1.indexOf(fr) == -1) {
              niz1.push(fr);
            }
          });
        });
  
        niz1.forEach((fr) => {
  
          if (fr == selectedId) {
            niz1.splice(niz1.indexOf(fr), 1);
          }
  
        });
  
        niz.forEach((fr1) => {
          niz1.forEach((fr) => {
  
            if (fr === selectedId) {
              niz1.splice(niz1.indexOf(fr), 1);
            }
  
            if (fr === fr1) {
              niz1.splice(niz1.indexOf(fr), 1);
            }
  
          });
        });
  
        niz1.forEach((suggested) => {
          const id = users[suggested - 1].id,
            firstName = users[suggested - 1].firstName,
            surname = users[suggested - 1].surname,
            friends = users[suggested - 1].friends;
          // Instantiate user
          const user = new User(id, firstName, surname, friends);
          // Instantiate UI
          const ui = new UI();
          // Select user
          ui.selectDirectFriends(user);
        });


        // ------------------------------------------------ Suggested Friends Loop

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

        arr1.splice(users, 1);


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

        suggestedFriendsArray.forEach((suggested) => {
          const id = users[suggested - 1].id,
            firstName = users[suggested - 1].firstName,
            surname = users[suggested - 1].surname,
            friends = users[suggested - 1].friends;
          // Instantiate user
          const user = new User(id, firstName, surname, friends);
          // Instantiate UI
          const ui = new UI();
          // Select user
          ui.selectSuggestedFriends(user);
        });

      }

      e.preventDefault();
    });

  })
  .catch(err => console.log(err));

