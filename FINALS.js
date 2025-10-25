
        let month = 9;
        let year = 2025;
        let events = [];
        let selecteddate = null;

        function formatdate(datestr) {
            const date = new Date(datestr + 'T00:00:00');
            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
        }

        function showcal() {
            const cal = document.getElementById('calendarGrid');
            cal.innerHTML = '';

            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];
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
            const today = new Date();

            for (let i = 0; i < firstday; i++) {
                const blank = document.createElement('div');
                cal.appendChild(blank);
            }

            for (let d = 1; d <= daysinmonth; d++) {
                const box = document.createElement('div');
                box.className = 'day-cell';
                
                const datestr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dayevents = events.filter(e => e.date === datestr);
                
                if (dayevents.length > 0) {
                    box.classList.add('has-event');
                }

                if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    box.classList.add('today');
                }

                let content = `<div class="day-number">${d}</div>`;
                if (dayevents.length > 0) {
                    content += '<div>';
                    for (let i = 0; i < Math.min(dayevents.length, 3); i++) {
                        content += '<span class="event-dot"></span>';
                    }
                    content += '</div>';
                }

                box.innerHTML = content;
                box.onclick = () => showdayevents(datestr);
                cal.appendChild(box);
            }
        }

        function addevent() {
            const title = document.getElementById('eventtitle').value;
            const details = document.getElementById('eventdetails').value;
            
            let date;
            if (selecteddate) {
                date = selecteddate;
            } else {
                date = document.getElementById('eventdate').value;
            }

            if (title && date) {
                events.push({
                    id: Date.now(),
                    title: title,
                    date: date,
                    details: details,
                    completed: false
                });

                document.getElementById('eventtitle').value = '';
                document.getElementById('eventdetails').value = '';
                if (!selecteddate) {
                    document.getElementById('eventdate').value = '';
                }

                shownotification('Event added successfully!');
                showcal();
                displayevents();
                saveevents();
                
                if (selecteddate) {
                    showdayevents(selecteddate);
                }
            } else {
                shownotification('Please fill in title and date', true);
            }
        }

        function displayevents() {
            const list = document.getElementById('eventslist');
            list.innerHTML = '';

            if (events.length === 0) {
                list.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No events scheduled</p>';
                return;
            }

            const sortevents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

            sortevents.forEach(event => {
                const item = document.createElement('div');
                item.className = 'event-item';
                item.innerHTML = `
                    <h5>${event.title}</h5>
                    <p><strong>Date:</strong> ${event.date}</p>
                    ${event.details ? `<p>${event.details}</p>` : ''}
                    <button onclick="deleteevent(${event.id})">Delete</button>
                `;
                list.appendChild(item);
            });
        }

        function deleteevent(id) {
            events = events.filter(e => e.id !== id);
            shownotification('Event deleted');
            showcal();
            displayevents();
            saveevents();
        }

        function deleteevent(id) {
            events = events.filter(e => e.id !== id);
            shownotification('Event deleted');
            showcal();
            displayevents();
            saveevents();
        }

        function showdayevents(date) {
            selecteddate = date;
            
            document.getElementById('sectiontitle').textContent = 'Events for ' + date;
            document.getElementById('backbtn').style.display = 'block';
            document.getElementById('eventdate').style.display = 'none';
            document.getElementById('eventlistsection').style.display = 'none';
            document.getElementById('dayeventslist').style.display = 'block';
            document.getElementById('eventform').style.display = 'block';
            
            const dayeventslist = document.getElementById('dayeventslist');
            const dayevents = events.filter(e => e.date === date);
            
            if (dayevents.length === 0) {
                dayeventslist.innerHTML = '<div class="no-events">No events on this day</div>';
            } else {
                dayeventslist.innerHTML = '';
                dayevents.forEach(event => {
                    const item = document.createElement('div');
                    item.className = 'day-event-item';
                    item.innerHTML = `
                        <h5>${event.title}</h5>
                        ${event.details ? `<p>${event.details}</p>` : ''}
                        <button onclick="deleteeventfromday(${event.id})">Delete Event</button>
                    `;
                    dayeventslist.appendChild(item);
                });
            }
        }

        function backtodefault() {
            selecteddate = null;
            document.getElementById('sectiontitle').textContent = 'Upcoming Events';
            document.getElementById('backbtn').style.display = 'none';
            document.getElementById('eventdate').style.display = 'block';
            document.getElementById('eventlistsection').style.display = 'block';
            document.getElementById('dayeventslist').style.display = 'none';
            document.getElementById('eventform').style.display = 'none';
            document.getElementById('eventtitle').value = '';
            document.getElementById('eventdetails').value = '';
        }

        function deleteeventfromday(id) {
            events = events.filter(e => e.id !== id);
            shownotification('Event deleted');
            showcal();
            displayevents();
            saveevents();
            if (selecteddate) {
                showdayevents(selecteddate);
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

        function shownotification(message, iserror = false) {
            const notif = document.getElementById('notification');
            notif.textContent = message;
            notif.className = 'notification';
            if (iserror) {
                notif.classList.add('alert-notification');
            }
            notif.style.display = 'block';
            setTimeout(() => {
                notif.style.display = 'none';
            }, 3000);
        }

        function saveevents() {
            const eventsdata = JSON.stringify(events);
            document.cookie = `events=${eventsdata}; path=/; max-age=31536000`;
        }

        function loadevents() {
            const cookies = document.cookie.split('; ');
            for (let cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name === 'events') {
                    try {
                        events = JSON.parse(value);
                    } catch (e) {
                        events = [];
                    }
                    break;
                }
            }
        }

        function checkalerts() {
            const today = new Date().toISOString().split('T')[0];
            const todayevents = events.filter(e => e.date === today && !e.completed);
            
            if (todayevents.length > 0) {
                shownotification(`You have ${todayevents.length} event(s) today!`, true);
            }
        }

        window.onload = function() {
            loadevents();
            showcal();
            displayevents();
            checkalerts();
            
            setInterval(checkalerts, 60000);
        };