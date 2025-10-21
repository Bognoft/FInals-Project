
let month = 9;
let year = 2025;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
            
    if (username && password) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        shownotification('Login successful!');
        showcal();
    } else {
        alert('Please enter username and password');
    }
}

function showcal() {
    const cal = document.getElementById('calendarGrid');
    cal.innerHTML = '';

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];             
    document.getElementById('currentMonth').textContent = months[month] + ' ' + year;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(d => {
        const head = document.createElement('div');
        head.className = 'day-header';
        head.textContent = d;
        cal.appendChild(head);
        });

    const firstday = new Date(year, month, 1).getDay();
    const daysinmonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstday; i++) {
            const blank = document.createElement('div');
            cal.appendChild(blank);
        }

        for (let d = 1; d <= daysinmonth; d++) {
            const box = document.createElement('div');
            box.className = 'day-cell';
            box.innerHTML = `<div class="day-number">${d}</div>`;
            cal.appendChild(box);
        }
        }

function previousMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
        showcal();
    }

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
        showcal();
        }

function shownotification(message) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.style.display = 'block';
    setTimeout(() => {
    notif.style.display = 'none';
    }, 3000);
    }