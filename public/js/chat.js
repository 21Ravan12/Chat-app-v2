    // Socket.io bağlantısını başlatıyoruz
    const socket = io('http://192.168.0.158:3002'); // Server'ın adresi
    
    // Kullanıcı adı ve alıcı bilgisi
    let username;
    let recipient;
    
    // Kullanıcı adı girildikten sonra chat'e katıl
    function joinChat(){
    if (username) {
      socket.emit('join', username);
    } else {
      console.log("Username is missing. Please log in first.");
    }
    }
    
    // Mesaj gönderme işlemi
    function sendPrivateMessage() {
      recipient = sessionStorage.getItem('recipient');
      const messageInput = document.getElementById('message-input');
      const message = messageInput.value;
      if (recipient && message) {
        socket.emit('private message', { toUsername: recipient, message }, (response) => {
          console.log(response.message); // Mesaj durumu
        });
    
        // Gönderilen mesajı ekrana ekle
        appendMessage(recipient, { from: username, message }, true); // Gönderen kullanıcı
        messageInput.value = ''; // Mesaj kutusunu temizle
      }
    }
    
    // Gelen mesajları gösterme
    socket.on('chat message', (messageData) => {
      appendMessage(messageData.from, messageData, false); // Gelen mesaj
    });
    
    // Mesajları ekrana eklemek
    function appendMessage(chatUser, messageData, isMyMessage) {
      const chatBox = document.getElementById(`chatbox-${chatUser}`);
      
      if (!chatBox) {
        console.error(`Chatbox bulunamadı: chatbox-${chatUser}`);
        return;
      }
    
      const updatedMessageData = { ...messageData, isRead: true };
    
      const messageElement = document.createElement('div');
      messageElement.classList.add(isMyMessage ? 'my-message' : 'other-message');
    
      const strongElement = document.createElement('strong');
      strongElement.className = isMyMessage ? 'my-message-name' : 'other-message-name';
      strongElement.textContent = `${updatedMessageData.from}:`;
    
      const messageText = document.createElement('p');
      messageText.appendChild(strongElement);
      messageText.appendChild(document.createTextNode(` ${updatedMessageData.message}`));
    
      messageElement.appendChild(messageText);
      chatBox.appendChild(messageElement);
      
      chatBox.scrollTop = chatBox.scrollHeight; // Son mesaja kaydır
    }
    
    
    // Kullanıcı listesine güncelleme yapmak
    /*socket.on('update users', (users) => {
      const userList = document.querySelector('.user-list');
      const container = document.getElementById('chat-container');
      userList.innerHTML = ''; // Listeyi temizle
    
      users.forEach((user) => {
        if (user !== username) {
          // Kullanıcı listesi elemanı oluştur
          const userItem = document.createElement('div');
          userItem.classList.add('user');
          userItem.textContent = user;
          userItem.onclick = () => selectRecipient(user); // Kullanıcıyı tıklayınca alıcıyı seç
          userList.appendChild(userItem);
    
          // Kullanıcıya özel chatbox oluştur
          if (!document.getElementById(`chatbox-${user}`)) {
            const userChat = document.createElement('div');
            userChat.classList.add('chat-box');
            userChat.id = `chatbox-${user}`;
            userChat.style.display = 'none'; // Başlangıçta gizli
            container.prepend(userChat);
          }
        }
      });
    });*/
    
    // Kullanıcıyı seçme
    /*function selectRecipient(user) {
      recipient = user;
      sessionStorage.setItem('recipient', user);
    
      // Tüm chatbox'ları gizle
      document.querySelectorAll('.chat-box').forEach((chatbox) => {
        chatbox.style.display = 'none';
      });
    
      // Seçilen kullanıcının chatbox'unu göster
      const selectedChatbox = document.getElementById(`chatbox-${user}`);
      if (selectedChatbox) {
        selectedChatbox.style.display = 'flex';
      }
    }*/
    
    // Kullanıcı ekleme
    /*document.getElementById('addFriendForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const friendUsername = document.getElementById('friend').value;
      if (friendUsername) {
        socket.emit('private message', { toUsername: friendUsername, message: 'Hi, let\'s chat!' }, (response) => {
          console.log(response.message);
        });
      }
    });
    */
    
    
