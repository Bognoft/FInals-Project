function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const notification = document.getElementById("notification");

    const validUsername = "andrew";
    const validPassword = "andrew";

    if (username === validUsername && password === validPassword) {

        notification.textContent = "Login successful! Redirecting...";
        notification.style.color = "green";
        

        setTimeout(() => {
            window.location.href = "FINALS.html";
        }, 1000);
    } else {
 
        notification.textContent = "Invalid username or password!";
        notification.style.color = "red";
    }
}