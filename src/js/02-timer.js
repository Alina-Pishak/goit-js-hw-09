import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const values = document.querySelectorAll('.value');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const currentDate = new Date();
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    handlerSelectedDate(selectedDates[0]);
  },
};
flatpickr("#datetime-picker", options);

function handlerSelectedDate(selectedDates) {
 if (selectedDates < currentDate) {
   Notify.failure('Please choose a date in the future');
   return;
  }
  btnStart.disabled = false;

  let remainder = Number(selectedDates) - Number(currentDate);

  btnStart.addEventListener('click', startCount);

  function startCount() {
    const idIntrvl = setInterval(() => {
      const date = convertMs(remainder);
      days.textContent = date.days;
      hours.textContent = date.hours;
      minutes.textContent = date.minutes;
      seconds.textContent = date.seconds;
      values.forEach(value => {
        value.textContent = addLeadingZero(value.textContent);
      });
      remainder -= 1000;
      if ([...values].every((value) => value.textContent === '00')) {
        Notify.success('The timer has expired');
        clearInterval(idIntrvl);
      };
    }, 1000);
  }
}

function addLeadingZero(value) {
  if (value.length > 2) {
   return 
  } 
  return value.toString().padStart(2, '0');
  
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


