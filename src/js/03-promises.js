
const formEl = document.querySelector('.form');
let promiseQuantity = 0;
let delayValue = 0;
let stepValue = 0;
let amountvalue = 0;
let totalInterval = 0;
let totalDelay = 0;



formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  delayValue = evt.currentTarget.elements.delay.value;
  stepValue = evt.currentTarget.elements.step.value;
  amountvalue = evt.currentTarget.elements.amount.value;
  totalDelay = Number(delayValue);

  setInterval(countPromises, stepValue);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function countPromises() {
  promiseQuantity += 1;
  totalDelay += Number(stepValue);

  if (promiseQuantity > amountvalue) {
    return;
  }

  createPromise(promiseQuantity, totalDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

