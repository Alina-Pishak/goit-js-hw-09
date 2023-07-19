import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
// import "notiflix/dist/notiflix.min.css";
// const input = document.querySelector('#')
const btnStart = document.querySelector('button[data-start]');
// const values = document.querySelectorAll('.value');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const currentDate = new Date()


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < currentDate) {
          btnStart.disabled = true;
          Notiflix.Notify.failure('Please choose a date in the future');
          return
      }
      btnStart.disabled = false;
        const date = Number(selectedDates[0]) - Number(currentDate);
        console.log(currentDate);
        console.log(convertMs(date));
  },
};

flatpickr("#datetime-picker", options);

btnStart.addEventListener('click', countdown);

function countdown(evt) {
    console.log('hello')
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// const input = document.querySelector('#datetime-picker');

// input.addEventListener('input', inputDate);

// function inputDate(evt) {
//     console.log(evt.target.value);
//     console.log(Date.now)
//     if (evt.target.value < Date.now) {
//         btnStart.disabled = true;
//     } else {

//         btnStart.disabled = false;
//     }
// }
