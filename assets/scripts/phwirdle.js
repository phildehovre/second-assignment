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
    var gameOver = false
    const rows = document.querySelectorAll('.grid_row');
    const currentRow = rows[attempts.length];
    let cells = currentRow.querySelectorAll('.cell'); 
    var wotd = CookieUtils.getCookie('wotd')
    fetchDefinition(wotd)
    
    if (!wotd) {
        location.reload
        setNewWord()
    }

//    BUG: When a  letter appears and the first instance is "existing"
//    not correct, it will appear

//    BUG: gameOver does not work

    // ============ Input registration + Visual feedback ==============
    /** 
     * This function processes inputs both from
     * the user's physical keyboard and the virtual one
     * by taking in the agnostic "key" parameter that is
     * just the string value of the key, rather than an event.
     * */ 
    
    function registerInput(key) {
        if (gameOver) return;
        // Keypress animation, for some reason, 
        // blocks the backspace doing its job,
        // hence the 'if' statement;
        if (key !== 'Backspace') {
            let pressed = document.querySelector(`#${key}`)
            pressed.classList.toggle('active')
            setTimeout(() => {
                pressed.classList.toggle('active')
            }, 
            0)
        }
        


        if (key == "Back" || key == 'Backspace') {
            typed = typed.slice(0, typed.length-1)
            cells[typed.length].textContent = ''
            // Only allow Alphabetical characters to be appended to "typed"
        } else if (96 < key.charCodeAt(0) && key.charCodeAt(0) < 123 ) {
            if (typed.length < 5) {
                typed += key
                cells[typed.length - 1].textContent = key
            }
        } else if (key == "Enter" && typed.length == 5) {
            // Initiate validation
            spellCheck(typed)
            .then((result) => {
                if (result == false) {
                    rows[attempts.length].classList.add('shake')
                    setTimeout(() => {
                        rows[attempts.length].classList.remove('shake')
                    }, 300)
                } 
                if (result == true) {
                    const [correct, existing] = checkWord(wotd, typed, attempts, gameOver)
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
                    });
                              // updateKeyboard(attemps)
            if (attempts.length < 5) {
                const currentRow = rows[attempts.length]
                cells = currentRow.querySelectorAll('.cell')
            }
            
            // Assigning classes to virtual keyboard keys
            // based on correct/existing/incorrect status.
            for (let i = 0; i < attempts.length; i++) {
                attempts[i].split('').forEach( (l, i) => {
                    // At Initialization, each key in the virtual keyboard
                    // is assigned its own value as an ID, which allows for
                    // selection and class assignment further down below.
                    // "vk" stands for" virtual key".
                    const vk = document.querySelector(`#${l}`)
                    if (!wotd.includes(l)) {
                        vk.classList.add('incorrect')
                    } else {
                        if (wotd.indexOf(l) == i ) {
                            vk.classList.remove('existing')
                            vk.classList.add('correct')
                        }
                        else  {
                            vk.classList.add('existing')
                        }
                    }
                }
            )
        }
                }
            })
            

            // ===============Spellcheck ===================
            async function spellCheck(word) {
                return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then(res => {

                        if (res.status === 200) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .catch(error => {
                        console.error("Error occurred:", error);
                        return;
                    });
            }
            // ===============Spellcheck ===================
     


  
        gameOver = attempts.length == 5 || typed == wotd ? true:false
    }
        
}

    // =========== Initialising/Registering virtual Keyboard ======
    let keyboard = document.querySelector('#keyboard');
    letters.forEach(letter => {
        let key = document.createElement('div');
        key.classList.add('key');
        key.id = letter
        key.textContent = letter;

        key.addEventListener('click', () => {
            pressedKey = key.textContent;
            registerInput(pressedKey);

        });
        keyboard.appendChild(key);
     });

    // =========== Registering keystrokes =============
    document.addEventListener('keydown', (e) => {
    // Allow for backspace functionality       
        let key = e.key;
        registerInput(key);
    });

    // =========== Reset Function =============
    const resetButton = document.querySelector('#new')
    resetButton.addEventListener('click', () => resetGame())
});

function resetGame() {
  location.reload()
}

    // =========== Helper functions =============

    /**
     * Function sources a random word.
     */
function setNewWord() {
    fetch('https://random-word-api.vercel.app/api?words=1&length=5')
    .then((res) => res.json())
    .then(res => {
        CookieUtils.setCookie(`wotd`, res[0]);
        
    })
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

    /**
     * Builds a hash to account for letters 
     * that appear multiple times, each time an existing
     * letter appear, it will subtract 1 from that letter count.
     */
    const hash = wotd.split('').reduce((acc, letter) => {
        acc[letter]? acc[letter] + 1 : acc[letter] = 1
        return acc
    }, {})

    /**
     * Contains comparison logic and dispatches not the letter,
     * but its index to the correct/existing arrays.
     */
    for (let i = 0; i < attempt.length ; i++) {
        // Check if letter has already been found
        if (hash[attempt[i]] != 0) {
            // If not, is it at the right index
            if (attempt[i] === comparator[i]) {
                hash[attempt[i]] -= 1
                correct.push(i)
            }
            // If not, is it at least included
            else if (comparator.includes(attempt[i])) {
                hash[attempt[i]] -= 1
                existing.push(i)
            }
        }
    }   

    if (correct.length == 5 || attempts.length == 4) {
        document.querySelector('#wotd').textContent = `The word was: ${wotd}`


        CookieUtils.getCookie('definition').split(';').forEach((definition, i) => {
            console.log("definition", definition)
            let defCtn = document.createElement('small')
            let def = document.createElement('p')

            def.classList.add('definition')
            defCtn.classList.add('def_ctn')

            def.textContent = definition

            defCtn.appendChild(def)
            document.querySelector('#definition').appendChild(defCtn)
        })
    }

    return [correct, existing]
}

function fetchDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then(data => {
        const definition = stringifyDefinitions(data[0].meanings[0].definitions);
        CookieUtils.setCookie('definition', definition)
    })
}



function stringifyDefinitions(array) {
    let acc = []
    for (let i = 0; i < 3; i++) {
       array[i]? acc.push(array[i].definition) : null
    }
    return acc.join(';')
}

const letters = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 
'Enter', 'x', 'c', 'v', 'b', 'n', 'm', 'Back'
]

