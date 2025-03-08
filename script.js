document.addEventListener("dblclick", function(event) {
    event.preventDefault(); // 🔥 Полностью блокируем двойной тап
}, { passive: false });

document.addEventListener("wheel", function(event) {
    if (event.ctrlKey) { // 🔥 Запрещаем зум через Ctrl + колесо мыши
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "-" || event.key === "0")) {
        event.preventDefault(); // 🔥 Запрещаем Ctrl + + / Ctrl + - / Ctrl + 0
    }
});


// Получаем `data-user` из `body`
const user = document.body.getAttribute("data-user") || "default";
console.log("🔍 Определён пользователь:", user);


let complimentList = [];

if (user === "codm") {
    complimentList = [
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
    ];
} else if (user === "default") {
    complimentList = [
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
} else {
    complimentList = ["Ты прекрасна! 💖"];
}

let usedCompliments = [];

let level = 1;
const stepIncrease = 1;
const baseClicks = 1;
let clicksNeeded = baseClicks;
let clickCount = 0;
const maxLevel = 7;

document.getElementById("nextButton").addEventListener("click", handleClick);

function typeText(text, element, callback) {
    if (!text || !element) return;

    // Запоминаем ширину перед очисткой
    element.innerHTML = text;
    let width = element.offsetWidth;
    element.innerHTML = ""; // Очищаем перед печатью
    element.style.width = `${width}px`; // ✅ Фиксируем ширину, исправлены кавычки

    new Typed(element, {
        strings: [text],
        typeSpeed: 50,
        showCursor: false,
        onComplete: callback
    });
}



function handleClick(event) {
    clickCount++;
    createHeart(event.clientX, event.clientY);

    if (clickCount >= clicksNeeded) {
        if (level >= maxLevel) {
            sendMessage();
        } else {
            clickCount = 0;
            level++;
            clicksNeeded = baseClicks + stepIncrease * (level - 1);
            animateLevelUp();

            // ✅ Теперь счётчик обновляется перед началом нового уровня
            updateCounter();
            startGame(); // Начинаем новый уровень
        }
    } else {
        // ✅ Обновляем счётчик после каждого клика
        updateCounter();
    }
}

function startGame() {
    document.getElementById("levelCounter").innerText = `Level: ${level}`;

    if (complimentList.length === 0) {
        complimentList = [...usedCompliments];
        usedCompliments = [];
    }

    if (complimentList.length > 0) {
        let randomIndex = Math.floor(Math.random() * complimentList.length);
        let selectedCompliment = complimentList.splice(randomIndex, 1)[0];
        usedCompliments.push(selectedCompliment);

        console.log("✅ Выбранный комплимент:", selectedCompliment);

        let textElement = document.getElementById("text");
        if (!textElement) {
            console.error("❌ Ошибка: элемент #text не найден в HTML!");
            return;
        }

        textElement.innerHTML = "";

        // ✅ Скрываем кнопку и счётчик ПЕРЕД началом анимации текста
        document.getElementById("nextButton").classList.add("hidden");
        document.getElementById("counter").classList.add("hidden");

        function cleanText(text) {
            return text.normalize("NFC"); // ✅ Убирает скрытые символы, которые могли ломать текст
        }
        
        complimentList = complimentList.map(cleanText); // ✅ Применяем ко всем фразам        

        typeText(selectedCompliment, textElement, () => {
            // ✅ Показываем кнопку и счётчик ПОСЛЕ завершения печати
            document.getElementById("nextButton").classList.remove("hidden");
            document.getElementById("counter").classList.remove("hidden");
            updateCounter();
        });
    } else {
        console.error("❌ Ошибка: список комплиментов пуст!");
    }
}





// ✅ Функция обновления счётчика (гарантирует правильное отображение)
function updateCounter() {
    const remainingClicks = Math.max(clicksNeeded - clickCount, 0);
    document.getElementById("counter").innerText = `Click ${remainingClicks} time to get more`;
}


function sendMessage() {
    window.location.href = "https://t.me/rich_gardener?text=I%20want%20more";
}

// 🎆 Анимация при переходе на новый уровень
function animateLevelUp() {
    const levelCounter = document.getElementById("levelCounter");

    levelCounter.classList.add("color-change");
    setTimeout(() => levelCounter.classList.remove("color-change"), 1000);

    for (let i = 0; i < 10; i++) createFirework(); // Вызов из `fireworks.js`
}

function updateComplimentPosition() {
    const level = document.getElementById("levelCounter");
    const button = document.getElementById("buttonContainer");
    const compliment = document.getElementById("compliment");

    if (level && button && compliment) {
        let levelRect = level.getBoundingClientRect();
        let buttonRect = button.getBoundingClientRect();

        let centerY = (levelRect.bottom + buttonRect.top) / 2;
        compliment.style.top = `${centerY}px`; // ✅ Ставим фразу между уровнями и кнопкой
    }
}

// ✅ Гарантируем, что фраза появится только после полной загрузки страницы
window.addEventListener("load", () => {
    startGame();
    updateComplimentPosition(); // ✅ Запускаем после загрузки
});
// ✅ Обновляем позицию при изменении размера окна
window.addEventListener("resize", updateComplimentPosition);
window.onload = startGame;
console.log("✅ script.js загружен!");
