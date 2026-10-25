let form = document.getElementById("search-form");
let input = document.getElementById("word-input");
let message = document.getElementById("message");
let result = document.getElementById("result");
let savedList = document.getElementById("saved-list");
let emptyMessage = document.getElementById("empty-message");
let themeBtn = document.getElementById("theme-btn");

// 2. Variables that remember things 
let savedWords = [];     // the words the user saved
let currentEntry = null; // the word being shown right now

// 3. Event listener: search form 
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

// 4. Fetch: ask the API for the word
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

// 5. Parse the data and update the page 
function showWord(entry) {
  let html = "";

  // Highlight the word if it has been saved
  let titleClass = "";
  if (savedWords.includes(entry.word)) {
    titleClass = "saved-word";
  }

  // Word and pronunciation text
  html += "<h3 class='" + titleClass + "'>" + entry.word + "</h3>";
  html += "<p>Pronunciation: " + (entry.phonetic || "not available") + "</p>";

  // Pronunciation audio: use the first one that has an audio link
  for (let i = 0; i < entry.phonetics.length; i++) {
    if (entry.phonetics[i].audio) {
      html += "<audio controls src='" + entry.phonetics[i].audio + "' aria-label='Pronunciation of " + entry.word + "'></audio>";
      break;
    }
  }

  // Save button
  html += "<p><button id='save-btn' class='btn btn-outline-primary btn-sm' type='button' aria-label='Save the word " + entry.word + "'>Save word</button></p>";

  // Meanings: part of speech, definitions, examples, synonyms
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

  // Put everything on the page
  result.innerHTML = html;
  result.classList.remove("d-none"); // Bootstrap class: shows the card

  // Event listener: the Save button only exists after the line above runs
  let saveBtn = document.getElementById("save-btn");
  saveBtn.addEventListener("click", saveCurrentWord);
}

// ---------- 6. Saving words ----------
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
    let word = savedWords[i];

    let li = document.createElement("li");
    li.className = "list-group-item";

    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "saved-word";
    btn.textContent = word;
    btn.setAttribute("aria-label", "Look up " + word + " again");

    // Event listener: clicking a saved word searches it again
    btn.addEventListener("click", function () {
      input.value = word;
      searchWord(word);
    });

    li.appendChild(btn);
    savedList.appendChild(li);
  }

  // Hide the "no saved words" text when the list has words
  if (savedWords.length === 0) {
    emptyMessage.classList.remove("d-none");
  } else {
    emptyMessage.classList.add("d-none");
  }
}

// ---------- 7. Event listener: theme button ----------
themeBtn.addEventListener("click", function () {
  let html = document.documentElement;

  if (html.getAttribute("data-bs-theme") === "dark") {
    html.setAttribute("data-bs-theme", "light");
    themeBtn.textContent = "Dark theme";
    themeBtn.setAttribute("aria-label", "Switch to dark theme");
    themeBtn.setAttribute("aria-pressed", "false");
  } else {
    html.setAttribute("data-bs-theme", "dark");
    themeBtn.textContent = "Light theme";
    themeBtn.setAttribute("aria-label", "Switch to light theme");
    themeBtn.setAttribute("aria-pressed", "true");
  }

  console.log("Theme is now:", html.getAttribute("data-bs-theme"));
});
