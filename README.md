# Wordly Dictionary
A simple dictionary web page for Wordly, a language learning platform. You type a word and the meaning appears on the same page, with no page reload.

## What it does
- Search for a word using a form
- Shows the pronunciation, audio, definitions, examples, and synonyms
- Save words you like (they are highlighted in yellow)
- Switch between light and dark theme
- Background image with a light overlay so the text is easy to read
- Shows an error message if the input is empty, the word is not found, or the request fails

## API
I used the Free Dictionary API: https://dictionaryapi.dev/
```
https://api.dictionaryapi.dev/api/v2/entries/en/hello
```
It is free and needs no API key. The app uses `fetch` to get the data and shows an error message if the word is not found.

## Technologies
- HTML
- CSS
- JavaScript
- Bootstrap 5.3 (loaded from a CDN) for the layout, form, buttons, and card

## Files
- `index.html` - the page, with the Bootstrap link
- `style.css` - my own styling: background image, highlight, and text colors
- `script.js` - the code that gets the word, shows it, saves words, and changes the theme
- `background.jpg` - the background image (optional)

## How to run
1. Put all the files in one folder.
2. Open `index.html` in your browser.
3. You need internet for the API and Bootstrap to work.

## How to use
1. Type a word and click **Search**.
2. Read the meanings and click play to hear the pronunciation.
3. Click **Save word** to add it to the saved words list.
4. Click **Toggle theme** to switch between light and dark.

## How it works
1. The form's submit event is caught so the page does not reload.
2. `fetch` asks the Free Dictionary API for the word.
3. If the word is found, JavaScript builds the result and shows it in the card.
4. If not, an error message is shown.
5. JavaScript changes the style of the page: the `saved-word` class highlights saved words, and Bootstrap's `data-bs-theme` switches the theme.

## Testing
Test | Expected result |
|---|---|
Search `hello` | Meanings, phonetic, and audio are shown |
Search `asdfgh` | "Sorry, we could not find that word" message |
Search with an empty box | "Please type a word." message |
Click Save word | The word is highlighted and added to the saved list |
Click Toggle theme | The page switches between light and dark |
Turn off the internet and search | Error message is shown |

## Limitations
- Saved words disappear when you refresh the page.
- English words only.
- Some words have no audio, examples, or synonyms.

## Author
Bernice Mokeira Ateka