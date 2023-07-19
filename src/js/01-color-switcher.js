// // const btnStart = document.querySelector('button[data-start]');
// // const btnStop = document.querySelector('button[data-stop]');

// const btn = document.querySelector('button');
// const body = document.querySelector('body');

// btn.addEventListener('click', changeBg);
// // btnStop.addEventListener('click', stopChange);

// function changeBg(evt) {
//     // if (evt.dataset = 'start') {
//         // }
//     if (!evt.target.dataset.start) {
//         const idInrl = setInterval(() => {
//             body.style.background = getRandomHexColor();
//         }, 1000);
//     } else if (!evt.target.dataset.stop) {
//         clearInterval(idInrl);
//     }
// };
// // function stopChange() {
// //     clearInterval(idInrl);
// // }




// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', changeBg);
btnStop.addEventListener('click', stopChange);

let idInrl;

function changeBg() {
    idInrl = setInterval(() => {
        body.style.background = getRandomHexColor();
    }, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
};

function stopChange() {
    clearInterval(idInrl);
    btnStop.disabled = true;
    btnStart.disabled = false;
}




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}