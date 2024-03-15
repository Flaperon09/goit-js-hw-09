// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
// Импорт библиотеки предупреждения
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('button[data-start]');
const inputField = document.querySelector('#datetime-picker');
const numberOfDays = document.querySelector('span[data-days]');
const numberOfHours = document.querySelector('span[data-hours]');
const numberOfMinutes = document.querySelector('span[data-minutes]');
const numberOfSeconds = document.querySelector('span[data-seconds]');

// Сделать кнопку Start неактивной
startButton.setAttribute("disabled", true);

// Определение текущего времени сразу в мс
const currentDateMs = Date.now();

// Иницилизация переменной выбранного времени
let selectedDatesMs = 0;

// Объект дополнительных опций для календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDatesMs = selectedDates[0].getTime();
    // Если выбранная дата меньше текущей - вывести предупреждение
    if (currentDateMs > selectedDatesMs) {
      // alert("Please choose a date in the future");
      // Notify.failure("Achtung! Please choose a date in the future");
      Notify.failure("Achtung! Please choose a date in the future");
      // Сделать кнопку Start неактивной
      startButton.setAttribute("disabled", true);
    } else {
      // Сделать кнопку Start активной
      startButton.removeAttribute("disabled");
      // Сделать поле ввода активным
      inputField.removeAttribute("disabled");
    };    
  },
};

// Вызов календаря по клику в поле input с id="datetime-picker"
flatpickr("#datetime-picker", options);

// ========= КОД ТАЙМЕРА - начало ============
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  };
  // Функция запуска отсчёта
  start() {
    // Сделать кнопку Start неактивной
    startButton.setAttribute("disabled", true);
      // Сделать поле ввода неактивным
      inputField.setAttribute("disabled", true);
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      let deltaTime = selectedDatesMs - currentTime;
      const time = convertMs(deltaTime);
      this.onTick(time);
      if (deltaTime < 1000) {
        timer.stop();
        // Сделать кнопку Start активной
        // startButton.removeAttribute("disabled");
        // Сделать поле ввода активным
        inputField.removeAttribute("disabled");
        // Вывести сообщение об окончании отсчёта
        Notify.success("The countdown is over!");
      }
    }, 1000);
  };
  // Функция останова отсчёта
  stop() {
    clearInterval(this.intervalId);
  };
}

const timer = new Timer({
  onTick: updateClockFace,
});

// Слушатель кнопки Start
startButton.addEventListener('click', () => {
  timer.start();
});

// Функция обновления счётчика времени в интерфейсе
function updateClockFace({ days, hours, minutes, seconds }) {
  numberOfDays.textContent = days;
  numberOfHours.textContent = hours;
  numberOfMinutes.textContent = minutes;
  numberOfSeconds.textContent = seconds;
};
// ========= КОД ТАЙМЕРА - конец ===============

// Функция перевода мс в дни, часы, минуты и секунды
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

// Функция добавления нуля к однозначному числу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};