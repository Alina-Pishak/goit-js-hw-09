import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromise);

function onCreatePromise(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let currentDelay = Number(delay.value);
  let currentStep = Number(step.value);
  let currentAmount = Number(amount.value);
  for (let i = 1; i <= currentAmount; i += 1) {
    createPromise(i, currentDelay)
    .then(({ position, delay }) => {
      Notify.success((`✅ Fulfilled promise ${position} in ${delay}ms`));
    })
    .catch(({ position, delay }) => {
      Notify.failure((`❌ Rejected promise ${position} in ${delay}ms`));
    });
    currentDelay += currentStep;
  }
  evt.currentTarget.reset();
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      // Fulfill
      resolve({position, delay});
    } else {
      // Reject
      reject({position, delay});
    }
  }, delay);
});
}
