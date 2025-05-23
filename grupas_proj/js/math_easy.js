document.getElementById('test-title').textContent = 'Matemātika — Viegls līmenis';

const allQuestions = [
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
    { q: "5 - 3 = ?", options: ["2", "3", "4"], answer: "2" },
    { q: "3 × 2 = ?", options: ["6", "5", "3"], answer: "6" },
    { q: "8 / 2 = ?", options: ["4", "2", "3"], answer: "4" },
    { q: "9 - 5 = ?", options: ["4", "3", "5"], answer: "4" },
    { q: "6 + 3 = ?", options: ["9", "8", "7"], answer: "9" },
    { q: "10 - 7 = ?", options: ["3", "4", "2"], answer: "3" },
    { q: "1 + 1 = ?", options: ["2", "1", "3"], answer: "2" },
    { q: "7 - 6 = ?", options: ["1", "2", "0"], answer: "1" },
    { q: "4 × 1 = ?", options: ["4", "5", "3"], answer: "4" },
    { q: "3 + 4 = ?", options: ["6", "7", "8"], answer: "7" },
    { q: "5 + 5 = ?", options: ["10", "11", "9"], answer: "10" },
    { q: "6 - 2 = ?", options: ["4", "3", "2"], answer: "4" },
    { q: "9 + 1 = ?", options: ["10", "9", "11"], answer: "10" },
    { q: "8 - 3 = ?", options: ["4", "6", "5"], answer: "5" }
];

function getRandomQuestions(pool, count) {
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

const questions = getRandomQuestions(allQuestions, 10);

startQuiz(questions);

function startQuiz(questions) {
    let i = 0,
        correct = 0,
        start = Date.now();
    const quiz = document.getElementById('quiz');
    const result = document.getElementById('result');
    const userAnswers = [];

    function showQuestion() {
        const q = questions[i];
        const shuffledOptions = q.options.sort(() => Math.random() - 0.5);

        quiz.innerHTML = `
      <div style="margin-bottom: 10px; font-size: 20px; color: #333;">
        Jautājums <strong>${i + 1}</strong> no <strong>${questions.length}</strong>
      </div>

      <div style="
        border: 2px solid #4a6fff;
        background-color: #f0f4ff;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: bold;
        color: #2a3f8d;
      ">
        ${q.q}
      </div>

      ${shuffledOptions
        .map(opt => `<label style="display:block; margin: 10px 0;"><input type='radio' name='opt' value='${opt}'> ${opt}</label>`)
        .join('')}

      <button onclick='submit()' style="margin-top: 20px; padding: 10px 20px; font-size: 16px;">Atbildēt</button>
    `;
  }

  window.submit = function () {
    const ans = document.querySelector('input[name=opt]:checked');
    if (!ans) return alert('Lūdzu, izvēlieties atbildi!');
    const isCorrect = ans.value === questions[i].answer;
    if (isCorrect) correct++;

    userAnswers.push({
      question: questions[i].q,
      selected: ans.value,
      correct: questions[i].answer,
      isCorrect
    });

    i++;
    if (i < questions.length) showQuestion();
    else endTest();
  };

  function endTest() {
    const time = Math.round((Date.now() - start) / 1000);
    quiz.style.display = 'none';
    result.style.display = 'block';

    let reviewHtml = "<h3 style='margin-top:30px;'>Uzdevumu analīze:</h3><ol>";
    userAnswers.forEach((a, index) => {
      reviewHtml += `<li style="margin-bottom: 12px;">
        <div><strong>${index + 1}. ${a.question}</strong></div>
        <div>Jūsu atbilde: 
          <span style="color: ${a.isCorrect ? 'green' : 'red'}; font-weight: bold;">
            ${a.selected} ${a.isCorrect ? '✅' : '❌'}
          </span>
          ${!a.isCorrect ? `<br>Pareizā atbilde: <strong>${a.correct}</strong>` : ''}
        </div>
      </li>`;
    });
    reviewHtml += "</ol>";

    result.innerHTML = `
      <h2>Rezultāts</h2>
      <p>Pareizās atbildes: ${correct} no ${questions.length}</p>
      <p>Laiks: ${time} sek.</p>
      <button onclick='location.reload()'>Mēģināt vēlreiz</button>
      <button onclick='window.location.href="index.html"'>Galvenā izvēlne</button>
      <hr>
      ${reviewHtml}
    `;
  }

  showQuestion();
}