
function toggleLeftContainer() {
    const button = document.querySelector('.toggle-btn');
    button.classList.toggle('rotated');
    const leftContainer = document.querySelector(".left-container");
    leftContainer.classList.toggle("open"); // Açma/Kapama
    if (leftContainer.classList.contains('open')) {
        button.style.left = "330px"; // Açılınca içeride kalacak
    } else {
        button.style.left = "0px"; // Kapanınca dışarı çıkacak
    }
}


async function fetchProfileData(email,Allow=true) {
    try {
        if (Allow) {
        const savedProfileData = sessionStorage.getItem('profileData');
        if (savedProfileData) {
            console.log("Profile data loaded from sessionStorage.");
            const data = JSON.parse(savedProfileData);
            updateProfileUI(data);
            return; 
        }
        }
        const response = await fetch('http://192.168.0.158:3001/api-profile-get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if data contains profileImage and name, then update UI
        updateProfileUI(data);

        // Store the profile data in sessionStorage
        sessionStorage.setItem('profileData', JSON.stringify(data));

    } catch (error) {
        console.error('Error fetching profile data:', error);
        document.getElementById('errorMessage').textContent = 'Failed to load profile data. Please try again later.';
    }
}

function updateProfileUI(data) {
    sessionStorage.setItem('username',data.name);
    if (data.profileImage) {
        const profileImageElement = document.getElementById('profileImage');
        if (profileImageElement) {
            profileImageElement.src = data.profileImage;
            sessionStorage.setItem('username',data.name);
        }
    }

    // Update the username if it exists
    
}


async function fetchFriendsData(email,Allow) {
    try {
        if (Allow) {
        const savedProfileData = sessionStorage.getItem('friendsData');
        if (savedProfileData) {
            console.log("Friends data loaded from sessionStorage.");
            const data = JSON.parse(savedProfileData);
            updateFriends(data);
            return; 
        }
        }

        const response = await fetch('http://192.168.0.158:3001/api-friends-get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        updateFriends(data);

        sessionStorage.setItem('friendsData', JSON.stringify(data));

    } catch (error) {
        console.error('Error fetching profile data:', error);
        document.getElementById('errorMessage').textContent = 'Failed to load profile data. Please try again later.';
    }
}

function updateFriends(data) {
    if (data.friends) {
        const user_list = document.querySelector('.user-list');
        if (!user_list) {
            console.error('User list element not found.');
            return;
        }

        user_list.innerHTML = ''; // Clear previous content

        let count = data.friends.length;
        for (let index = 0; index < count; index++) {
            const friend = data.friends[index];
            const activityDiv = document.createElement('div');
            activityDiv.setAttribute('email', friend.email);
            activityDiv.className = 'user friend-selected';

            // Create Profile Image Div
            const profileImageDiv = document.createElement('div');
            profileImageDiv.className = 'friend-profile-image';
            
            // Set the background image with fallback
            profileImageDiv.style.backgroundImage = `url(${friend.profileImage || 'default-profile.jpg'})`; // Fallback image

            // Create and set the friend's name
            const nameDiv = document.createElement('div');
            nameDiv.textContent = friend.name; // Friend's name

            nameDiv.setAttribute('email', friend.email);
            nameDiv.className = 'friend-name friend-selected ';

            // Append the profile image and name to the user div
            activityDiv.appendChild(profileImageDiv);
            activityDiv.appendChild(nameDiv);

            // Append the user div to the user list
            user_list.appendChild(activityDiv);
        }
    } else {
        console.error('No friends data found.');
    }
}
 

function addFriend(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        friendEmail: formData.get('friend'),
        email: sessionStorage.getItem('email'),
    };

    fetch("http://192.168.0.158:3001/api-friend-add", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Friend added successfully!") {
            fetchFriendsData(sessionStorage.getItem('email'), false);
        } else {
            alert("Failed to add friend");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred: " + error.message);
    });
}

async function handleUserClick(event) {
    document.querySelectorAll('.chat-box').forEach((chatbox) => {
      chatbox.style.display = 'none';
    });

    console.log('Clicked element:', event.target);

    if (!event.target.classList.contains('friend-selected')) return;

    const toEmail = event.target.getAttribute('email').trim(); // Get email from attribute
    const fromEmail = sessionStorage.getItem('email'); // Get sender email from sessionStorage


    if (!fromEmail) {
      console.error('Gönderen kullanıcı bulunamadı.');
      return;
    }

    sessionStorage.setItem('recipient', toEmail);

    const container = document.getElementById('chat-container');
    if (!container) {
      console.error('Chat container bulunamadı.');
      return;
    }

    let chatBox = document.getElementById(`chatbox-${toEmail}`);
    if (!chatBox) {
      chatBox = document.createElement('div');
      chatBox.classList.add('chat-box');
      chatBox.id = `chatbox-${toEmail}`;
      container.prepend(chatBox);
    }

    chatBox.style.display = 'flex';
    chatBox.innerHTML = ''; // Clear previous content

    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Loading messages...';
    chatBox.appendChild(loadingMessage);

    try {
      const response = await fetch('http://192.168.0.158:3001/api-chat-get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: fromEmail, receiver: toEmail }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      chatBox.innerHTML = ''; // Clear loading message

      if (result.length === 0) {
        const noMessagesDiv = document.createElement('div');
        noMessagesDiv.textContent = 'No messages yet.';
        chatBox.appendChild(noMessagesDiv);
      } else {
        result.forEach((message) => {
          const activityDiv = document.createElement('div');
          activityDiv.classList.add(message.from === fromEmail ? 'my-message' : 'other-message');

          const strongElement = document.createElement('strong');
          strongElement.className = message.from === fromEmail ? 'my-message-name' : 'other-message-name';
          strongElement.textContent = `${message.from}:`;

          const messageText = document.createElement('p');
          messageText.appendChild(strongElement);
          messageText.appendChild(document.createTextNode(` ${message.message}`));

          activityDiv.appendChild(messageText);
          chatBox.appendChild(activityDiv);
        });

        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the last message
      }
    } catch (error) {
      console.error('Error:', error);
      showErrorMessage('An error occurred while fetching messages.');
    }
  }

// Utility function to show error message in UI
function showErrorMessage(message) {
  const chatBox = document.getElementById('chat-box');
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  chatBox.appendChild(errorMessage);
}
   
function toggleAddUser() {
        const container = document.getElementById('add-user-container');
        container.style.display = container.style.display === 'none' || container.style.display === '' ? 'block' : 'none';
}


function fetchProfileDataAccount() {
    try {
        
        const savedProfileData = sessionStorage.getItem('profileData');
        if (savedProfileData) {
        const data = JSON.parse(savedProfileData);
    
        if (data.profileImage) {
            document.getElementById('profileImageAccount').src = data.profileImage;
        }
        document.getElementById('nameAccount').innerHTML = data.name;
        document.getElementById('emailAccount').textContent = "Email: " + data.email;
        document.getElementById('bioAccount').textContent = data.bio;
        document.getElementById('age').textContent = data.age;
    }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onloadend = function () {
            document.getElementById('profileImagePreview').src = reader.result;
            document.getElementById('profileImageBase64').value = reader.result;
        };

        reader.readAsDataURL(file);
    }
}

async function saveProfileData() {
    const name = document.getElementById('updateName').value;
    const bio = document.getElementById('updateBio').value;
    const age = document.getElementById('updateAge').value;
    const profileImageBase64 = document.getElementById('profileImageBase64').value;
    const email = sessionStorage.getItem('email');
    
    try {
        const response = await fetch('http://192.168.0.158:3001/api-profile-save', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, name, bio, age, profileImage: profileImageBase64 })
        });

        const data = await response.json();
        alert(data.message);
        fetchProfileData(sessionStorage.getItem('email'),false);
    } catch (error) {
        console.error('Error saving profile data:', error);
    }
}
