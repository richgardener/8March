document.addEventListener("DOMContentLoaded", function() {
    generateCompliments();
});

// 📌 Список комплиментов (Теперь с Заглавной Буквы)
const backgroundWords = [
    "Удивительная", "Невероятная", "Красивая", "Шикарная", "Чудесная",
    "Несравненная", "Неповторимая", "Любимая", "Блестящая", "Душевная",
    "Иногда Душная", "Самая Лучшая", "Милая", "Сексуальная", "Яркая", "Привлекательная",
    "Бесподобная", "Очаровательная", "Булочка", "Лапочка",
    "Сладулька", "Солнце", "Солнышко",
];

// 🔥 Создаём 10 случайных слов на фоне
function generateCompliments() {
    for (let i = 0; i < 10; i++) {
        const word = document.createElement("span");
        word.classList.add("compliment-word");
        word.innerText = backgroundWords[Math.floor(Math.random() * backgroundWords.length)];

        word.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        word.style.top = `${Math.random() * (window.innerHeight - 50)}px`;

        document.body.appendChild(word);
    }
}
