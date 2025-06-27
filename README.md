# Social Media Platform - Chat App (Version 2)

This project is a chat application that allows users to make new friends, and interact globally. It includes features such as real-time messaging, story sharing, and the ability to follow and gain followers.

## Features

- **Real-time Messaging**: Communicate instantly with friends.
- **Profile Management**: Edit and update your profile information.
- **Friend Management**: Add and manage friends.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chat-app.git
    cd chat-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

### Running the Application

1. Open `Spa.html` in your browser to access the application.

### Folder Structure

```
chat-app/
├── Spa.html
├── README.md
├── package.json
└── ...
```

### API Endpoints

- **Login**: `POST /api/login`
- **Sign Up**: `POST /api/signup/enter`
- **Password Recovery**: `POST /api/login/forget/enter`
- **Profile Management**: `GET /api/profile/get`, `PUT /api/profile/update`
- **Friend Management**: `GET /api/friend/get`, `PUT /api/friend/add`
- **Chat**: `GET /api/chat/get`, `POST /api/chat/markAsRead`, `GET /api/chat/unreadCount/get`

### Scripts

- **Login Form Submission**: Handles user login.
- **Sign Up Form Submission**: Handles user registration.
- **Password Recovery**: Handles password recovery process.
- **Profile Data Fetching**: Fetches and updates user profile data.
- **Friend Data Fetching**: Fetches and updates friend list.
- **Real-time Messaging**: Handles real-time messaging using Socket.io.

### Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Socket.io

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License.
