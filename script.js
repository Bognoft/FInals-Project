
let events = {
};

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let selectedDay = currentDate.getDate();

const calendarGrid = document.getElementById('calendar-grid');
const monthYearDisplay = document.getElementById('current-month-year');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const taskListBody = document.getElementById('task-list-body');
const eventDescriptionInput = document.getElementById('event-description');
const addEventBtn = document.getElementById('add-event-btn');
const selectedDateTitle = document.getElementById('selected-date-title');


function renderCalendar() {
    const dayCells = calendarGrid.querySelectorAll('.calendar-day');
    dayCells.forEach(cell => cell.remove());

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    monthYearDisplay.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
        const inactiveCell = document.createElement('div');
        inactiveCell.classList.add('calendar-day', 'inactive');
        calendarGrid.appendChild(inactiveCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day', 'current-month');
        dayCell.textContent = day;
        dayCell.dataset.date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        if (events[dayCell.dataset.date]) {
            dayCell.classList.add('has-event');
        }

        dayCell.addEventListener('click', () => selectDay(day, dayCell));
        
        calendarGrid.appendChild(dayCell);
    }
    
    selectDay(selectedDay, document.querySelector(`[data-date="${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}"]`));
}

function selectDay(day, element) {
    document.querySelectorAll('.calendar-day').forEach(cell => cell.classList.remove('selected-day'));
    
    if (element) {
        element.classList.add('selected-day');
    }

    selectedDay = day;
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    selectedDateTitle.textContent = `Tasks for ${new Date(currentYear, currentMonth, day).toDateString()}`;
    
    renderTaskList(dateKey);
}

function renderTaskList(dateKey) {
    taskListBody.innerHTML = '';

    const dailyEvents = events[dateKey] || [];

    if (dailyEvents.length === 0) {
        taskListBody.innerHTML = `<tr><td colspan="2">No events scheduled for this date.</td></tr>`;
        return;
    }

    dailyEvents.forEach((task, index) => {
        const row = taskListBody.insertRow();
        
        const taskCell = row.insertCell();
        taskCell.textContent = task.description;

        const statusCell = row.insertCell();
        const statusBtn = document.createElement('button');
        statusBtn.textContent = task.completed ? 'Completed ✓' : 'Mark Complete';
        statusBtn.classList.add(task.completed ? 'completed-btn' : 'incomplete-btn');
        statusBtn.onclick = () => toggleTaskCompletion(dateKey, index);
        statusCell.appendChild(statusBtn);
        
        if (!task.completed && new Date(dateKey) < currentDate) {
             taskCell.textContent = `🚨 DUE: ${task.description}`; 
        }
    });
}


function addEvent() {
    const description = eventDescriptionInput.value.trim();
    if (description === "") return;

    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    
    if (!events[dateKey]) {
        events[dateKey] = [];
    }
    

    events[dateKey].push({ description: description, completed: false });
    
    eventDescriptionInput.value = '';
    

    renderTaskList(dateKey);
    document.querySelector(`[data-date="${dateKey}"]`).classList.add('has-event');
}


function toggleTaskCompletion(dateKey, index) {
    events[dateKey][index].completed = !events[dateKey][index].completed;
    renderTaskList(dateKey);
}


prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

addEventBtn.addEventListener('click', addEvent);


renderCalendar();