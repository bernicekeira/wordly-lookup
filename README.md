# Wordly Dictionary
A simple dictionary web page for Wordly, a language learning platform. You type a word and the meaning appears on the same page, with no page reload.

## What it does
- Search for a word using a form
- Shows the pronunciation, audio, definitions, examples, and synonyms
- Save words you like (they are highlighted in yellow)
- Click a saved word to look it up again
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
- `style.css` - my own styling: background image, hover effects, animation, and highlight
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
4. Click a saved word to search it again.
5. Click the theme button to switch between light and dark.

## HTML
- Semantic tags: `header`, `main`, `section`, `article`, `footer`, `form`, and `label`
- Headings in order (`h1`, then `h2`, then `h3`)
- Accessibility:
  - `aria-label` on the buttons, form, and audio player
  - `aria-labelledby` on the sections
  - `aria-live` so screen readers announce results and error messages
  - `aria-pressed` on the theme button
  - A hidden label for the search box

## CSS
- Styled search form with a shadow and a focus glow
- Buttons move up a little when you hover over them
- The result card fades in when a word is shown
- Saved words change color on hover
- Visible outline when using the keyboard
- Animations are turned off for users who prefer reduced motion

## JavaScript
- `fetch` requests the word from the API
- The response is read to get the pronunciation, definitions, examples, and synonyms
- The page is updated with JavaScript, with no reload
- Event listeners:
  - `submit` on the search form
  - `click` on the Save word button
  - `click` on each saved word
  - `click` on the theme button
- JavaScript changes the style of the page: the `saved-word` class highlights saved words, and Bootstrap's `data-bs-theme` switches the theme

## Testing
Test | Expected result |
---|---|
Search `hello` | Meanings, phonetic, and audio are shown |
Search `asdfgh` | "Sorry, we could not find that word" message |
Search with an empty box | "Please type a word." message |
Click Save word | The word is highlighted and added to the saved list |
Click a saved word | The word is searched again |
Click the theme button | The page switches between light and dark |
Press Tab | Each button and link shows a visible outline |
Turn off the internet and search | Error message is shown |

## Limitations
- Saved words disappear when you refresh the page.
- English words only.
- Some words have no audio, examples, or synonyms.

## Author
Bernice Mokeira Ateka