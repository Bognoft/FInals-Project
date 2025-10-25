function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const notification = document.getElementById("notification");

    // Example credentials (you can replace these or connect to a real database later)
    const validUsername = "admin";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
        // ✅ Successful login: redirect to main page
        notification.textContent = "Login successful! Redirecting...";
        notification.style.color = "green";
        
        // Redirect after 1 second (adjust if you like)
        setTimeout(() => {
            window.location.href = "FINALS.html"; // 👈 Replace with your main page filename
        }, 1000);
    } else {
        // ❌ Invalid login
        notification.textContent = "Invalid username or password!";
        notification.style.color = "red";
    }
}