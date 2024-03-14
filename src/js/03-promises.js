// Импорт библиотеки предупреждения
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Начальные установки переменных
let numberOfFirstDelay = 0;
let numberOfDelayStep = 0;
let numberOfAmount = 0;

// Выбор элементов формы
const firstDelay = document.querySelector('form input[name="delay"]');
const delayStep = document.querySelector('form input[name="step"]');
const amount = document.querySelector('form input[name="amount"]');
const button = document.querySelector('button');

// Слушатели для элементов формы
firstDelay.addEventListener('input', () => {
  numberOfFirstDelay = Number(firstDelay.value);
});

delayStep.addEventListener('input', () => {
  numberOfDelayStep = Number(delayStep.value);
});

amount.addEventListener('input', () => {
  numberOfAmount = Number(amount.value);
});

button.addEventListener('click', (event) => {
  // Запрет действий по умолчанию
  event.preventDefault();
  // Установка первой задержки и вызов генератора промисов
  setTimeout(() => {
    generatorOfPromises(numberOfAmount, numberOfDelayStep);
  }, numberOfFirstDelay);
});

// Функция генерации промисов
function generatorOfPromises(numberOfAmount1, numberOfDelayStep1) {
  for (let i = 0; i < numberOfAmount1; i += 1) {
    let position = i + 1;
    let delay = numberOfFirstDelay + numberOfDelayStep1 * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    };
}

// Функция создания промиса
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay - numberOfFirstDelay);
  });
}


