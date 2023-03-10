const startButton = document.getElementById('start-button');
const replayButton = document.getElementById('replay-button');
const gameQuestionElement = document.getElementById('game-question');
const answersElement = document.getElementById('answers');
const remainingTimeElement = document.getElementById('remaining-time');

const QUESTIONS = {
  programming: [
    {
      question: '¿Cuántos tipos de bucles hay en programación?',
      answers: {
        options: ['1', '2', '3', '50'],
        correctAnswer: 1
      },
      theme: 'programming',
      hasAnswered: false
    },
    {
      question: '¿Cuántos lenguajes de programación entienden los navegadores?',
      answers: {
        options: ['3', '2', '1', '20'],
        correctAnswer: 2
      },
      theme: 'programming',
      hasAnswered: false
    }
  ],
  math: [
    {
      question: '¿Cuánto es 5 x 8?',
      answers: {
        options: ['40', '25', '30', '50'],
        correctAnswer: 0
      },
      theme: 'math',
      hasAnswered: false
    },
    {
      question: '¿Cuánto es la cuarta parte de la tercera parte?',
      answers: {
        options: ['Un doceavo', 'Un séptimo', '3/4 partes', '4/6 partes'],
        correctAnswer: 0
      },
      theme: 'math',
      hasAnswered: false
    }
  ],
  science: [
    {
      question: '¿En qué dirección apunta la aguja de una brújula?',
      answers: {
        options: ['Sur', 'Este', 'Oeste', 'Norte'],
        correctAnswer: 3
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Qué mineral se encuentra en una solución salina?',
      answers: {
        options: ['Potasio', 'Calcio', 'Sodio', 'Magnesio'],
        correctAnswer: 2
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Cuál es la especialidad del Nobel de Economía Daniel Kahneman?',
      answers: {
        options: ['Matemáticas', 'Psicología', 'Teoría del caos', 'Teoría de cuerdas'],
        correctAnswer: 1
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Por qué investigación recibió Einstein el Nobel de Física?',
      answers: {
        options: ['Efecto fotoeléctrico', 'Teoría especial de la relatividad', 'Teoría general de la relatividad', 'Equivalencia de la masa y la energía'],
        correctAnswer: 0
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿En qué isla viven los lémures?',
      answers: {
        options: ['Sumatra', 'Borneo', 'Madagascar', 'Tasmania'],
        correctAnswer: 2
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Qué vitamina previene el escorbuto?',
      answers: {
        options: ['A', 'B12', 'C', 'D'],
        correctAnswer: 2
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Cuántos huesos tiene un humano adulto?',
      answers: {
        options: ['412', '287', '306', '328'],
        correctAnswer: 2
      },
      theme: 'science',
      hasAnswered: false
    }
  ],
  history: [
    {
      question: '¿En qué año pisó el hombre la luna por primera vez?',
      answers: {
        options: ['1830', '1969', '2001', 'Fue un montaje'],
        correctAnswer: 1
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Dónde se inventó la pólvora?',
      answers: {
        options: ['China', 'Francia', 'EEUU', 'Italia'],
        correctAnswer: 0
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Qué líder iraní fue derrocado en 1979?',
      answers: {
        options: ['Sadat', 'Gaddafi', 'Ahmadinejad', 'Reza Pahlavi'],
        correctAnswer: 3
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Qué líder nazi voló en solitario a Escocia en 1941 para llegar a un acuerdo con el Reino Unido?',
      answers: {
        options: ['Göring', 'Hess', 'Rommel', 'Himmler'],
        correctAnswer: 1
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Dónde originaron los juegos olímpicos?',
      answers: {
        options: ['Cuenca', 'Grecia', 'Alemania', 'Dublin'],
        correctAnswer: 1
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Quién fue el fundador de Kodak?',
      answers: {
        options: ['Auguste Lumière', 'Thomas Edison', 'George Eastman', 'Eadweard Muybridge'],
        correctAnswer: 2
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Cómo se llama la etiqueta que se pone en el lomo de los libros de las bibliotecas?',
      answers: {
        options: ['Tejuelo', 'Gorrón', 'Cajo', 'Faja'],
        correctAnswer: 0
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿De dónde viene la palabra «coche»?',
      answers: {
        options: ['Del alemán «Kutsche»', 'Del checo «cočiem»', 'Del húngaro «kocsi»', 'Del francés «couchette»'],
        correctAnswer: 2
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Cuál fue el primer largometraje de Stanley Kubrick?',
      answers: {
        options: ['El beso del asesino', 'Atraco perfecto', 'Espartaco', 'Lolita'],
        correctAnswer: 0
      },
      theme: 'history',
      hasAnswered: false
    }
  ]
};

const counters = {
  programming: 0,
  math: 0,
  science: 0,
  history: 0
};

let allQuestions = [...QUESTIONS.programming, ...QUESTIONS.math, ...QUESTIONS.science, ...QUESTIONS.history];

const randomNumber = number => {
  return Math.floor(Math.random() * (number + 1));
};

let unansweredQuestions;

let intervalId = '';

const printCountDown = number => {
  remainingTimeElement.textContent = number;
  let counter = number;
  intervalId = setInterval(() => {
    counter = (counter - 0.01).toFixed(2);
    remainingTimeElement.textContent = counter;
    if (counter < 0.01) {
      currentQuestion.hasAnswered = true;
      answers.innerHTML = '';
      clearTimeout(intervalId);
      printQuestion();
    }
  }, 10);
};

let currentQuestion;
const setNewQuestion = () => {
  unansweredQuestions = allQuestions.filter(item => !item.hasAnswered);
  currentQuestion = unansweredQuestions[randomNumber(unansweredQuestions.length - 1)];
};

const printQuestion = () => {
  setNewQuestion();
  gameQuestionElement.textContent = currentQuestion.question;
  const fragment = document.createDocumentFragment();
  currentQuestion.answers.options.forEach(option => {
    let newAnswer = document.createElement('p');
    newAnswer.textContent = option;
    newAnswer.classList.add('answer');
    newAnswer.dataset.option = currentQuestion.answers.options.indexOf(option);
    fragment.append(newAnswer);
  });
  answersElement.append(fragment);
  printCountDown(10);
};

const updateScore = theme => {
  if (theme) document.getElementById(`${theme}-score`).textContent = counters[theme];
  else
    Object.keys(counters).forEach(key => {
      counters[key] = 0;
      document.getElementById(`${key}-score`).textContent = 0;
    });
};

const endGame = () => {
  remainingTimeElement.textContent = '';
  const totalScore = Object.values(counters).reduce((accumulator, current) => accumulator + current);
  gameQuestionElement.textContent = 'TERMINASTE';
  let finalScore = document.createElement('h2');
  finalScore.textContent = `Has acertado ${totalScore} preguntas de ${allQuestions.length}`;
  finalScore.classList.add('final-score');
  answersElement.append(finalScore);
  replayButton.hidden = false;
};

startButton.addEventListener('click', () => {
  startButton.hidden = true;
  setNewQuestion();
  printQuestion();
});

answersElement.addEventListener('click', ev => {
  clearTimeout(intervalId);
  if (!ev.target.classList.contains('answer')) return;
  if (Number(ev.target.dataset.option) === currentQuestion.answers.correctAnswer) {
    counters[currentQuestion.theme]++;
    updateScore(currentQuestion.theme);
  }
  currentQuestion.hasAnswered = true;
  answers.innerHTML = '';
  if (unansweredQuestions.length === 1) {
    endGame();
  } else {
    printQuestion();
  }
});

replayButton.addEventListener('click', ev => {
  replayButton.hidden = true;
  gameQuestionElement.textContent = 'Bienvenido a tu propio juego de preguntas y respuestas';
  startButton.hidden = false;
  answers.innerHTML = '';
  remainingTimeElement.textContent = '';
  allQuestions.forEach(question => (question.hasAnswered = false));
  updateScore();
});
