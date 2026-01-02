// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector(".progress-bar");
  const updatingBar = event.target.querySelector(".update-bar");
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add("hide");
    event.target.removeEventListener("progress", onProgress);
  } else {
    progressBar.classList.remove("hide");
  }
};
document.querySelector("model-viewer").addEventListener("progress", onProgress);

// Main application script
let quizAnswers = {};
let quizSubmitted = false;

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set logo and title from config
  document.getElementById("logo").src = CONFIG.logo;
  document.getElementById("title").textContent = CONFIG.title;

  // Set model attributes
  const modelViewer = document.querySelector("model-viewer");
  modelViewer.setAttribute("src", CONFIG.model.src);
  modelViewer.setAttribute("alt", CONFIG.model.alt);
  if (CONFIG.model.poster) {
    modelViewer.setAttribute("poster", CONFIG.model.poster);
  }
});

// Toggle mobile menu dropdown
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const dropdownArrow = document.getElementById("dropdown-arrow");

  mobileNav.classList.toggle("active");
  dropdownArrow.classList.toggle("open");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");
  const mobileNav = document.getElementById("mobile-nav");
  const dropdownArrow = document.getElementById("dropdown-arrow");

  if (mobileMenuContainer && !mobileMenuContainer.contains(event.target)) {
    mobileNav.classList.remove("active");
    if (dropdownArrow) {
      dropdownArrow.classList.remove("open");
    }
  }
});

// Open content in modal
function openContent(contentType) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  // Close mobile menu dropdown if open
  const mobileNav = document.getElementById("mobile-nav");
  const dropdownArrow = document.getElementById("dropdown-arrow");
  if (mobileNav) {
    mobileNav.classList.remove("active");
  }
  if (dropdownArrow) {
    dropdownArrow.classList.remove("open");
  }

  // Reset quiz state
  quizAnswers = {};
  quizSubmitted = false;

  // Check if content is available
  if (!CONFIG.content[contentType].available) {
    modalTitle.textContent = "Error";
    modalBody.innerHTML = `
            <div class="error-404">
                <h2>404</h2>
                <p>Content Not Available</p>
            </div>
        `;
    modal.classList.add("active");
    return;
  }

  // Set modal title
  const titles = {
    home: "Home",
    audio: "Audio Content",
    video: "Video Content",
    images: "Image Gallery",
    articles: "Articles",
    quiz: "Quiz",
  };
  modalTitle.textContent = titles[contentType];

  // Generate content based on type
  let content = "";

  switch (contentType) {
    case "home":
      content = generateHomeContent();
      break;
    case "audio":
      content = generateAudioContent();
      break;
    case "video":
      content = generateVideoContent();
      break;
    case "images":
      content = generateImagesContent();
      break;
    case "articles":
      content = generateArticlesContent();
      break;
    case "quiz":
      content = generateQuizContent();
      break;
  }

  modalBody.innerHTML = content;
  modal.classList.add("active");
}

// Close modal
function closeModal() {
  document.getElementById("modal").classList.remove("active");
  quizAnswers = {};
  quizSubmitted = false;
}

// Close modal when clicking outside
document.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
});

// Generate content functions
function generateHomeContent() {
  const data = CONFIG.content.home;
  return `
        <div style="padding: 2rem 0;">
            <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">
                ${data.title}
            </h2>
            <p style="font-size: 1.125rem; color: #374151; line-height: 1.6;">
                ${data.description}
            </p>
        </div>
    `;
}

function generateAudioContent() {
  const items = CONFIG.content.audio.items;
  let html = '<div class="content-section">';

  items.forEach((item) => {
    html += `
            <div class="content-item">
                <h3>${item.title}</h3>
                <audio controls>
                    <source src="${item.url}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
  });

  html += "</div>";
  return html;
}

function generateVideoContent() {
  const items = CONFIG.content.video.items;
  let html = '<div class="content-section">';

  items.forEach((item) => {
    html += `<div class="content-item"><h3>${item.title}</h3>`;

    if (item.type === "youtube") {
      html += `
                <div class="video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/${item.url}"
                        title="${item.title}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            `;
    } else {
      html += `
                <video controls>
                    <source src="${item.url}" type="video/mp4">
                    Your browser does not support the video element.
                </video>
            `;
    }

    html += "</div>";
  });

  html += "</div>";
  return html;
}

function generateImagesContent() {
  const items = CONFIG.content.images.items;
  let html = '<div class="gallery-grid">';

  items.forEach((item) => {
    html += `
            <div class="gallery-item content-item">
                <img src="${item.url}" alt="${item.title}">
                <p>${item.title}</p>
            </div>
        `;
  });

  html += "</div>";
  return html;
}

function generateArticlesContent() {
  const items = CONFIG.content.articles.items;

  if (items.length === 0) {
    return '<p style="text-align: center; padding: 2rem;">No articles available.</p>';
  }

  let html = '<div class="content-section">';

  items.forEach((item) => {
    html += `
            <div class="content-item">
                <h3>${item.title}</h3>
                <a href="${
                  item.url
                }" target="_blank" style="color: #3b82f6; text-decoration: underline;">
                    Open ${item.type.toUpperCase()}
                </a>
            </div>
        `;
  });

  html += "</div>";
  return html;
}

function generateQuizContent() {
  const quiz = CONFIG.content.quiz;
  let html = `<h2 style="font-size: 1.5rem; margin-bottom: 1rem;">${quiz.title}</h2>`;

  quiz.questions.forEach((q, qIndex) => {
    html += `
            <div class="quiz-question">
                <p>${qIndex + 1}. ${q.question}</p>
                <div>
        `;

    q.options.forEach((option, oIndex) => {
      html += `
                <label class="quiz-option" id="option-${qIndex}-${oIndex}">
                    <input 
                        type="radio" 
                        name="question-${qIndex}" 
                        value="${oIndex}"
                        onchange="selectAnswer(${qIndex}, ${oIndex})"
                    >
                    ${option}
                </label>
            `;
    });

    html += "</div></div>";
  });

  html += `
        <button class="quiz-submit" onclick="submitQuiz()" id="quiz-submit-btn">
            Submit Quiz
        </button>
        <div id="quiz-result" style="margin-top: 1rem;"></div>
    `;

  return html;
}

// Quiz functions
function selectAnswer(questionIndex, answerIndex) {
  quizAnswers[questionIndex] = answerIndex;

  // Update visual feedback
  const quiz = CONFIG.content.quiz;
  quiz.questions[questionIndex].options.forEach((_, oIndex) => {
    const option = document.getElementById(`option-${questionIndex}-${oIndex}`);
    if (option) {
      option.classList.remove("selected");
      if (oIndex === answerIndex) {
        option.classList.add("selected");
      }
    }
  });
}

function submitQuiz() {
  if (quizSubmitted) return;

  quizSubmitted = true;
  const quiz = CONFIG.content.quiz;
  let correctCount = 0;

  // Check answers and update UI
  quiz.questions.forEach((q, qIndex) => {
    const userAnswer = quizAnswers[qIndex];
    const isCorrect = userAnswer === q.correct;

    if (isCorrect) {
      correctCount++;
    }

    // Update option styles
    q.options.forEach((_, oIndex) => {
      const option = document.getElementById(`option-${qIndex}-${oIndex}`);
      if (option) {
        const input = option.querySelector("input");
        input.disabled = true;

        option.classList.remove("selected");

        if (oIndex === q.correct) {
          option.classList.add("correct");
        } else if (oIndex === userAnswer && !isCorrect) {
          option.classList.add("incorrect");
        }
      }
    });
  });

  // Display score
  const resultDiv = document.getElementById("quiz-result");
  resultDiv.innerHTML = `
        <div class="quiz-score">
            Score: ${correctCount} / ${quiz.questions.length}
        </div>
    `;

  // Hide submit button
  document.getElementById("quiz-submit-btn").style.display = "none";
}
