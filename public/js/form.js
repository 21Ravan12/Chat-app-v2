document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    sessionStorage.setItem('email',formData.get('email'));
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    fetch("http://192.168.0.158:3001/api-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.message == "Login successful!") {
            navigateTo("Landing-page");
        }else{
            document.querySelector('.error').textContent = data.message;
            document.querySelector('.error').style.display = "block";
            document.querySelector('.secret').style.display = "block";
        }
        

    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred: " + error);
    });
});

document.getElementById("forget-password-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    sessionStorage.setItem('email',formData.get('email'));
    const data = {
        email: formData.get('email')
    };

    fetch("http://192.168.0.158:3001/api-forget", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.message == "Password recovery code sent successfully!") {
            navigateTo("forget-code-insert-page");
        }else{
            document.querySelector('.error').textContent = data.message;
            document.querySelector('.error').style.display = "block";
           
        }
        

    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred: " + error);
    });
});

document.getElementById("forget-code-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        code: formData.get('code'),
    };

    fetch("http://192.168.0.158:3001/api-forget-end", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
       
        if (data.message == "Code successfully verified!") {
            navigateTo("Landing-page");
        }else{
            document.querySelector('.error').textContent = data.message;
            document.querySelector('.error').style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error!");
    });
});

document.getElementById("sign-up-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.querySelector('.succes').style.color = "green";
    document.querySelector('.succes').textContent = 'Wait a minut....';
    document.querySelector('.succes').style.display = "block";

    const formData = new FormData(event.target);
    sessionStorage.setItem('email',formData.get('email'));
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        bio: formData.get('bio'),
        birthyear: formData.get('birthyear')
    };

    fetch("http://192.168.0.158:3001/api-enter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message == "Verification code sent successfully!") {
            navigateTo("code-insert-page");
        }
        document.querySelector('.succes').textContent = data.error;
        document.querySelector('.succes').style.color = "red";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error!");
    });
});

document.getElementById("enter-code-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        code: formData.get('code'),
    };

    fetch("http://192.168.0.158:3001/api-enter-end", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
       
        if (data.message == "User successfully signed up!") {
            navigateTo("Landing-page");
        }else{
            document.querySelector('.error').textContent = data.message;
            document.querySelector('.error').style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error!");
    });
});
