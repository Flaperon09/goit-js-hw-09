// Функция случайного кода цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

// Выбор тегов
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

// Начальная установка кнопки Stop в неактивное состояние
stopButton.setAttribute("disabled", true);

// Обработчик нажатия кнопки Start
startButton.addEventListener('click', () => {
    // Сделать кнопку Start неактивной
    startButton.setAttribute("disabled", true);
    // Сделать кнопку Stop активной
    stopButton.removeAttribute("disabled");

    // Первая смена цвета по нажатию кнопки Start
    body.style.backgroundColor = getRandomHexColor();

    // Циклическая смена цвета
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

// Обработчик нажатия кнопки Stop
stopButton.addEventListener('click', () => {
    // Удалить таймер
    clearInterval(timerId);
    // Сделать кнопку Start активной
    startButton.removeAttribute("disabled");
    // Сделать кнопку Stop неактивной
    stopButton.setAttribute("disabled", true);
});
