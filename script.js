// ---------- 1. Get the elements from the page ----------
let form = document.getElementById("search-form");
let input = document.getElementById("word-input");
let message = document.getElementById("message");
let result = document.getElementById("result");
let savedList = document.getElementById("saved-list");
let themeBtn = document.getElementById("theme-btn");

// ---------- 2. Variables that remember things ----------
let savedWords = [];     // the words the user saved
let currentEntry = null; // the word being shown right now

// ---------- 3. Search form ----------
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  let word = input.value.trim().toLowerCase();
  console.log("Form submitted. Word typed:", word);

  if (word === "") {
    message.textContent = "Please type a word.";
    return;
  }

  searchWord(word);
});

// ---------- 4. Ask the API for the word ----------
function searchWord(word) {
  message.textContent = "Loading...";
  result.innerHTML = "";
  result.classList.add("d-none"); // Bootstrap class: hides the card

  // Calls the Free Dictionary API
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  console.log("Requesting:", url);

  fetch(url)
    .then(function (response) {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("API data:", data);
      message.textContent = "";
      currentEntry = data[0];
      showWord(currentEntry);
    })
    .catch(function (error) {
      console.log("Error:", error.message);
      message.textContent = "Sorry, we could not find that word. Try another one.";
    });
}

// ---------- 5. Show the word on the page ----------
function showWord(entry) {
  let html = "";

  // Highlight the word if it has been saved
  let titleClass = "";
  if (savedWords.includes(entry.word)) {
    titleClass = "saved-word";
  }

  html += "<h2 class='" + titleClass + "'>" + entry.word + "</h2>";
  html += "<p>" + (entry.phonetic || "") + "</p>";

  // Audio: use the first pronunciation that has an audio link
  for (let i = 0; i < entry.phonetics.length; i++) {
    if (entry.phonetics[i].audio) {
      html += "<audio controls src='" + entry.phonetics[i].audio + "'></audio>";
      break;
    }
  }

  // Save button (Bootstrap button classes)
  html += "<p><button class='btn btn-outline-primary btn-sm' onclick='saveCurrentWord()'>Save word</button></p>";

  // Meanings, definitions, examples, synonyms
  for (let i = 0; i < entry.meanings.length; i++) {
    let meaning = entry.meanings[i];
    html += "<p class='part-of-speech'>" + meaning.partOfSpeech + "</p>";

    for (let j = 0; j < meaning.definitions.length; j++) {
      let def = meaning.definitions[j];
      html += "<p>" + def.definition + "</p>";
      if (def.example) {
        html += "<p class='example'>Example: " + def.example + "</p>";
      }
    }

    if (meaning.synonyms.length > 0) {
      html += "<p>Synonyms: " + meaning.synonyms.join(", ") + "</p>";
    }
  }

  result.innerHTML = html;
  result.classList.remove("d-none"); // Bootstrap class: shows the card
}

// ---------- 6. Save a word ----------
function saveCurrentWord() {
  if (currentEntry === null) {
    return;
  }

  let word = currentEntry.word;
  if (!savedWords.includes(word)) {
    savedWords.push(word);
  }
  console.log("Saved words:", savedWords);

  showSavedWords();
  showWord(currentEntry); // redraw so the word gets highlighted
}

function showSavedWords() {
  savedList.innerHTML = "";

  for (let i = 0; i < savedWords.length; i++) {
    let li = document.createElement("li");
    li.textContent = savedWords[i];
    li.className = "list-group-item saved-word"; // Bootstrap list item + our highlight
    savedList.appendChild(li);
  }
}

// ---------- 7. Theme button (Bootstrap dark mode) ----------
themeBtn.addEventListener("click", function () {
  let html = document.documentElement;

  if (html.getAttribute("data-bs-theme") === "dark") {
    html.setAttribute("data-bs-theme", "light");
  } else {
    html.setAttribute("data-bs-theme", "dark");
  }

  console.log("Theme is now:", html.getAttribute("data-bs-theme"));
});