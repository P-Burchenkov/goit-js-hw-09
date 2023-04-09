import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  dayVal: document.querySelector('span[data-days]'),
  hoursVal: document.querySelector('span[data-hours]'),
  minutesVal: document.querySelector('span[data-minutes]'),
  secondsVal: document.querySelector('span[data-seconds]'),
};
let selectedDate = 0;
let dif = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const difference = selectedDates[0] - Date.now();
    if (difference <= 0) {
        window.alert('Please choose a date in the future');
        return;
    } else {
      refs.btn.disabled = false;
    }
  },
};
let timerId = 0;

refs.btn.addEventListener('click', onStart);

flatpickr(refs.input, options);

function onStart(evt) {
  timerId = setInterval(countTime, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countTime() {
  refs.btn.disabled = true;
  dif = selectedDate - new Date();
  stopCountTime(timerId);
  const timeData = convertMs(dif);
  refs.dayVal.textContent = addLeadingZero(timeData.days);
  refs.dayVal.textContent = addLeadingZero(timeData.hours);
  refs.minutesVal.textContent = addLeadingZero(timeData.minutes);
  refs.secondsVal.textContent = addLeadingZero(timeData.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopCountTime(id) {
  if (dif <= 1000) clearInterval(id);
}

// Задать переменные выбраного времени и текущего времени
//
