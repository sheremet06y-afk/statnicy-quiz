// script.js

let currentPage = 0;
const questionsPerPage = 10;

function renderQuestions() {

  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;

  const currentQuestions = questions.slice(start, end);

  currentQuestions.forEach((q, index) => {

    const div = document.createElement("div");
    div.classList.add("question-box");

    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>

      ${q.options.map((option, i) => `
        <label class="option">
          <input type="radio" name="q${index}" value="${i}">
          ${option}
        </label>
      `).join("")}

      <div class="answer-result" id="result-${index}"></div>
    `;

    quiz.appendChild(div);
  });

  document.getElementById("counter").innerText =
    `Otázky ${start + 1}-${Math.min(end, questions.length)} z ${questions.length}`;

  document.getElementById("result").innerText = "";
}

function checkAnswers() {

  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;

  const currentQuestions = questions.slice(start, end);

  let score = 0;

  currentQuestions.forEach((q, index) => {

    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const resultDiv = document.getElementById(`result-${index}`);

    if (!selected) {

      resultDiv.innerHTML = `
        <span style="color: orange;">
          ⚠ Нет ответа
        </span>
      `;

      return;
    }

    const selectedValue = Number(selected.value);

    if (selectedValue === q.correctAnswer) {

      score++;

      resultDiv.innerHTML = `
        <span style="color: limegreen; font-weight: bold;">
          ✅ Правильно
        </span>
      `;

    } else {

      resultDiv.innerHTML = `
        <span style="color: red; font-weight: bold;">
          ❌ Неправильно
        </span>
        <br>
        <span style="color: #00bfff;">
          Правильный ответ:
          ${q.options[q.correctAnswer]}
        </span>
      `;
    }

  });

  document.getElementById("result").innerHTML = `
    <h2>
      Результат: ${score} / ${currentQuestions.length}
    </h2>
  `;
}

function nextPage() {

  currentPage++;

  if (currentPage * questionsPerPage >= questions.length) {
    currentPage = 0;
  }

  renderQuestions();
}

renderQuestions();