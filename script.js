
// 🔥 Определяем пользователя (какой массив фраз использовать)
const user = document.body.getAttribute("data-user") || "default";
console.log("🔍 Определён пользователь:", user);

// 🔥 Выбираем фразы в зависимости от пользователя
const complimentList = user === "codm" ? [
    "Ты – как мифический AK117: лучшая и всегда в топе! 🔥💖",
    "Ты – как HS0405: попадаешь прямо в сердце с одного выстрела! 💥💘",
    "Ты – моя карта Blackout, с тобой хочется играть снова и снова! 🗺️💕",
    "Ты – как DLQ с омегой: ослепляешь меня своей красотой и заставляешь тормозить перед тобой! 😵😍",
    "Ты – как полтергейст: появилась в моей жизни неожиданно, но теперь я не хочу, чтобы ты исчезала. 👻💖",
    "С тобой как на кастомках – уровень ощущений максимальный! 🏆🔥",
    "Ты – как DLQ с омегой: сводишь с ума и не даёшь двигаться дальше! 🔭😍",
    "Ты – как BY-15 с голдовым стволом в начале катки: с тобой победа обеспечена! 🏆💖",
    "Ты – мой медик, даже за зоной даёшь мне выжить! 💉❤️",
    "Ты – как последний живой игрок, засевший в углу с ловушками… На тебя хочется смотреть вечно! 🔍👀",
    "Ты – как черный рынок: всегда прыгаю туда! ✈️💕"
] : [
    "Ты – как плейлист для особых вечеров… Всегда задаёшь нужный ритм. 🎶🔥",
    "Ты – как мой любимый шоколад… Таешь у меня в руках. 🍫💋",
    "Ты – как идеальная подушка… Мне хочется зарыться в тебя лицом. 🛏️🔥",
    "Ты – как самый тёплый душ… После тебя я не хочу выходить в реальность. 🚿💖",
    "Ты – как идеально заправленная кровать… Но мне всё равно хочется её испортить. 🛏️😏",
    "Ты – как моя любимая рубашка… Лучше всего выглядишь, когда на тебе ничего нет. 👔🔥",
    "Ты – как долгожданный отпуск… После тебя мне нужно восстановление. ✈️💘",
    "Ты – как мой любимый коктейль… Опьяняешь и разжигаешь во мне огонь. 🍸🔥",
    "Ты – как разгорячённые простыни… Меня тянет к тебе всё больше. 😏🔥",
    "Ты – как ночное сообщение с тремя точками… Я представляю продолжение. 💬🔥"
];

let usedCompliments = [], level = 1, clickCount = 0;
const stepIncrease = 1, baseClicks = 1, maxLevel = 7;
let clicksNeeded = baseClicks;

// 🔥 Выбираем и сразу выводим случайную фразу
function showRandomCompliment() {
    if (complimentList.length === 0) {
        complimentList.push(...usedCompliments);
        usedCompliments = [];
    }
    
    const randomIndex = Math.floor(Math.random() * complimentList.length);
    const selectedCompliment = complimentList.splice(randomIndex, 1)[0];
    usedCompliments.push(selectedCompliment);

    document.getElementById("text").innerText = selectedCompliment;
}

// 🔥 Обновляем счётчик кликов
function updateCounter() {
    document.getElementById("counter").innerText = `Click ${Math.max(clicksNeeded - clickCount, 0)} time to get more`;
}

// 🔥 Обрабатываем клик на кнопку
function handleClick(event) {
    clickCount++;
    createHeart(event.clientX, event.clientY);

    if (clickCount >= clicksNeeded) {
        if (level >= maxLevel) {
            sendMessage();
        } else {
            level++; // ✅ Повышаем уровень
            clickCount = 0; // ✅ Сбрасываем счётчик кликов
            clicksNeeded = baseClicks + stepIncrease * (level - 1);

            document.getElementById("levelCounter").innerText = `Level: ${level}`; // ✅ Обновляем уровень
            showRandomCompliment(); // ✅ Меняем комплимент
            updateCounter(); // ✅ Обновляем счётчик
            animateLevelUp(); // ✅ Визуальная анимация
        }
    } else {
        updateCounter(); // ✅ Обновляем счётчик кликов
    }
}

// 🔥 Запуск игры
function startGame() {
    document.getElementById("levelCounter").innerText = `Level: ${level}`;
    showRandomCompliment();
    updateCounter();
}

// 🔥 Обновляем позицию текста
function updateComplimentPosition() {
    const level = document.getElementById("levelCounter");
    const button = document.getElementById("buttonContainer");
    const compliment = document.getElementById("compliment");

    if (level && button && compliment) {
        let levelRect = level.getBoundingClientRect();
        let buttonRect = button.getBoundingClientRect();
        compliment.style.top = `${(levelRect.bottom + buttonRect.top) / 2}px`;
    }
}

// 🔥 Телеграм-сообщение при максимальном уровне
function sendMessage() {
    window.location.href = "https://t.me/rich_gardener?text=I%20want%20more";
}

// 🔥 Подписываем кнопки на события
document.getElementById("nextButton").addEventListener("click", handleClick);

// 🔥 Запуск игры и фиксация позиции текста
window.addEventListener("load", () => {
    startGame();
    updateComplimentPosition();
});
window.addEventListener("resize", updateComplimentPosition);
console.log("✅ script.js загружен!");
