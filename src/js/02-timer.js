import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
const inputData = document.querySelector('#datetime-picker');
// let currentDate = new Date();
btnStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     if (selectedDates[0] < Date.now()) {
   Notify.failure('Please choose a date in the future');
   return;
  }
  btnStart.disabled = false;
  },
};

flatpickr(inputData, options);

btnStart.addEventListener('click', startCount);

  function startCount() {
    inputData.disabled = true;
    btnStart.disabled = true;
    timerId = setInterval(() => {
      // const date = convertMs(remainder);
          const selectedData  = new Date(inputData.value);
      const remainder = selectedData - Date.now();
      const { days, hours, minutes, seconds } = convertMs(remainder);

      day.textContent = addLeadingZero(days);
      hour.textContent = addLeadingZero(hours);
      minute.textContent = addLeadingZero(minutes);
      second.textContent = addLeadingZero(seconds);
      if (remainder < 1000) {
        Notify.success('The timer has expired');
        clearInterval(timerId);
        inputData.disabled = false;
      };
    }, 1000);
  }


function addLeadingZero(value) {
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


// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const date = document.querySelector('#datetime-picker');
// const btn = document.querySelector('[data-start]');
// const day = document.querySelector('[data-days]');
// const hour = document.querySelector('[data-hours]');
// const min = document.querySelector('[data-minutes]');
// const sec = document.querySelector('[data-seconds]');
// const spans = document.querySelectorAll('.value');

// let timerId = null;

// btn.disabled = true;

// flatpickr(date, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] <= Date.now()) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//       btn.disabled = true;
//     } else {
//       btn.disabled = false;

//       Notiflix.Notify.success('Lets go?');
//     }
//   },
// });

// btn.addEventListener('click', onBtnStartClick);

// function onBtnStartClick() {
//   // spans.forEach(item => item.classList.toggle('end'));
//   btn.disabled = true;
//   date.disabled = true;
//   timerId = setInterval(() => {
//     const choosenDate = new Date(date.value);
//     const timeToFinish = choosenDate - Date.now();
//     const { days, hours, minutes, seconds } = convertMs(timeToFinish);

//     day.textContent = addLeadingZero(days);
//     hour.textContent = addLeadingZero(hours);
//     min.textContent = addLeadingZero(minutes);
//     sec.textContent = addLeadingZero(seconds);

//     if (timeToFinish < 1000) {
//       // spans.forEach(item => item.classList.toggle('end'));
//       clearInterval(timerId);
//       date.disabled = false;
//     }
//   }, 1000);
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return `${value}`.padStart(2, '0');
// }