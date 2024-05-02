/**
 * The functions are at the bottom,
 * I am taking advantage of hoisting
 * for clarity of code.
 * The function names chould be self explanatory
 */


document.addEventListener('DOMContentLoaded', () => {
    setNewWord()
    let attempts = [];
    let typed = '';
    let gameOver = false
    const rows = document.querySelectorAll('.grid_row');
    const currentRow = rows[attempts.length];
    let cells = currentRow.querySelectorAll('.cell'); 
    let wotd = CookieUtils.getCookie('wotd')

    const button = document.querySelector('#new')
    button.addEventListener('click', () => {
        window.refresh
    })

    
    // =========== Initialize WOTD =============
    /* 
    Check if cookies contains a word of the day 
    If they dont, set an interval that will repeatedly
    SET/GET and check for existence.
    Finally, cancelling the interval on a positive check.
    */
   
   const wotdInterval = setInterval(() => {
       let currentWord = CookieUtils.getCookie('wotd')
       if (wotd == currentWord && currentWord.length !== 0) {
           setNewWord()
           wotd = currentWord
           return clearInterval(wotdInterval)
        } 
    }, 1000)
    
    
    function wordCheck(key) {
        if (key == "Back" || key == 'Backspace') {
            typed = typed.slice(0, typed.length-1)
            cells[typed.length].textContent = ''
            // Only allow Alphabetical characters to be appended to "typed"
        } else if (96 < key.charCodeAt(0) && key.charCodeAt(0) < 122 ) {
            if (typed.length < 5) {
                typed += key
                cells[typed.length - 1].textContent = key
            }
        } else if (key == "Enter" && typed.length == 5) {
            const [correct, existing] = checkWord(wotd, typed, attempts)
            
            // assigning classes to correct/existing letters.
            correct.forEach((index) => {
                cells[index].classList.add('correct')
            })
            existing.forEach((index) => {
                cells[index].classList.add('existing')
            })
            attempts.push(typed)
            typed = ''
            cells.forEach((cell, index) => {
                cell.style = `--delay: ${index}`
                cell.classList.add('checked')
            })
            // updateKeyboard(attemps)
            if (attempts.length < 5) {
                const currentRow = rows[attempts.length]
                cells = currentRow.querySelectorAll('.cell')
            }
        }
    }

    // =========== Init virtual Keyboard =============
    let keyboard = document.querySelector('#keyboard');
    letters.forEach(letter => {
        let key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;

        key.addEventListener('click', () => {
            pressedKey = key.textContent;
            wordCheck(pressedKey);

        });
        keyboard.appendChild(key);
     });

    // =========== Registering keystrokes =============
    document.addEventListener('keydown', (e) => {
    // Allow for backspace functionality       
        let key = e.key;
        wordCheck(key);
});
});

// =========== Endgame logic ================

// =========== Helper functions =============

function setNewWord() {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
    .then((res) => res.json())
    .then(res => CookieUtils.setCookie(`wotd`, res[0]))
}

function getNewWord() {
    return CookieUtils.getCookie('wotd')
}

function checkWord(wotd, typed, attempts) {
    /**
     * This function will return two arrays of
     * indices which can then be used to select
     * the cells that need updating.
     */
    let correct = []
    let existing = []
    if (!wotd) return [[], []];
    const attempt = typed.split('')
    const comparator = wotd.split('')

    const hash = wotd.split('').reduce((acc, letter) => {
        acc[letter]? acc[letter] += 1 : acc[letter] = 1
        return acc
    }, {})

    
    for (let i = 0; i < attempt.length ; i++) {
        if (attempt[i] === comparator[i]) {
            hash[attempt[i]] -= 1
            correct.push(i)
        }
        if (comparator.includes(attempt[i]) && hash[attempt[i]] != 0) {
            existing.push(i)
        }
    }   

    if (correct.length == 5 || attempts.length == 4) {
        gameOver=true
        document.querySelector('#wotd').textContent = `The word was: ${wotd}`
    }

    return [correct, existing]
}



const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'Enter', 'x', 'c', 'v', 'b', 'n', 'm', 'Back']
