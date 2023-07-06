const DOM = {
    selectYear: document.querySelector("#year"),
    selectMonth: document.querySelector("#month"),
    selectDay: document.querySelector("#day"),
    selectHour: document.querySelector("#hour"),
    selectMin: document.querySelector("#min"),
    spanHelp: document.querySelector("span"),
    submitButton: document.querySelector("button"),
    resetButton: document.getElementsByTagName("button")[1],
    adjustVolumeInput: document.querySelector('input')
}



let startClock;
let audio = new Audio("clock.mp3");
audio.canPlayType("audio/mp3");
audio.volume = .2  //初始化音量


const loadTime = new Date();
let loadLimitDay = new Date().getMonth() + 1;

switch (loadLimitDay) {         //Check how many days does this month have and overwrite the variable "loadLimitDay";
    case 1:
        loadLimitDay = 31;
        break;
    case 2:
        if (loadLimitDay % 4 == 0) loadLimitDay = 29;
        else loadLimitDay = 28;
        break;
    case 3:
        loadLimitDay = 31;
        break;
    case 4:
        loadLimitDay = 30;
        break;
    case 5:
        loadLimitDay = 31;
        break;
    case 6:
        loadLimitDay = 30;
        break;
    case 7:
        loadLimitDay = 31;
        break;
    case 8:
        loadLimitDay = 31;
        break;
    case 9:
        loadLimitDay = 30;
        break;
    case 10:
        loadLimitDay = 31;
        break;
    case 11:
        loadLimitDay = 30;
        break;
    case 12:
        loadLimitDay = 31;
}

console.log(DOM, loadLimitDay);//.........................................display DOM module

addOption(DOM.selectYear, loadTime.getFullYear(), loadTime.getFullYear() + 1).join("\n");
addOption(DOM.selectMonth, 1, 12);
addOption(DOM.selectDay, 1, loadLimitDay);
addOption(DOM.selectHour, 1, 23);
addOption(DOM.selectMin, 0, 59);


function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    if (attrs) Object.assign(dom, attrs);

    for (let child of children) {
        if (typeof child != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}
function addOption(parent, start, end) {
    let element = [];
    for (let i = start; i <= end; i++) {
        let ele = parent.appendChild(elt("option", {}, `${i}`))
        element.push(ele);
    }
    return element;
}
function checkInput() {
    if (new Date() >= new Date(DOM.selectYear.selectedIndex + 2023, DOM.selectMonth.selectedIndex, DOM.selectDay.selectedIndex + 1, DOM.selectHour.selectedIndex + 1, DOM.selectMin.selectedIndex + 1)) {
        alert("無法設定時間!");
        return;
    }
    else startTimer();
}
function startTimer() {
    DOM.spanHelp.innerHTML = '時間已選擇  <p style="font-size: 35px; display: inline-block">☑</p>';
    startClock = setTimeout(() => {
        audio.play(); //play the clock
    }, new Date(DOM.selectYear.selectedIndex + 2023, DOM.selectMonth.selectedIndex, DOM.selectDay.selectedIndex + 1, DOM.selectHour.selectedIndex + 1, DOM.selectMin.selectedIndex).getTime() - Date.now())
}
function reset() {
    clearTimeout(startClock);
    DOM.spanHelp.innerHTML = "時間尚未選擇";
}
function remindHour() {

}
function adjustVolume() {
    audio.volume = Number(DOM.adjustVolume.value) / 100;
}
DOM.submitButton.addEventListener("click", checkInput, false);
DOM.resetButton.addEventListener("click", reset, false);
DOM.selectHour.addEventListener("focus", remindHour, false);
DOM.adjustVolumeInput.addEventListener("input", adjustVolume, false);
