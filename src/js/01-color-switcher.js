const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
}
let timerId = 0;

refs.startBtn.addEventListener('click', OnstartBtnClick);
refs.stopBtn.addEventListener('click', OnstopBtnClick);

// Добавить слушатели на кнопки
// Ф-ция setInterval(), вызывающая ф-цию changeColor 1 раз в секунду
// Ф-ция OnstartBtnClick, запускает ф-цию setInterval(), делает кнопку старт неактивной
// Ф-ция OnstoptBtnClick, останавливает setInterval(), делает кнопку старт активной



function OnstartBtnClick(evt) {
    timerId = setInterval(changeColor, 1000);
    evt.currentTarget.disabled = true;
 };

function OnstopBtnClick(evt) {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
 };

function changeColor() {    
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
