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

   
    // ============ Input registration + Visual feedback ==============
    /** 
     * This function processes inputs both from
     * the user's physical keyboard and the virtual one
     * by taking in the agnostic "key" parameter that is
     * just the string value of the key, rather than an event.
     * */ 
    
    function registerInput(key) {
        if (gameOver) return;

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
            var [correct, existing] = checkWord(wotd, typed, attempts)
            
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

            // Assigning classes to virtual keyboard keys
            // based on correct/existing/incorrect status.
            for (let i = 0; i < attempts.length; i++) {
                attempts[i].split('').forEach( (l, i) => {
                    // At Initialization, each key in the virtual keyboard
                    // is assigned its own value as an ID, which allows for
                    // selection and class assignment below:
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
        
    }

    // =========== Init virtual Keyboard =============
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

function setNewWord() {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
    .then((res) => res.json())
    .then(res => {
        CookieUtils.setCookie(`wotd`, res[0]);
        
    })
}

function getNewWord() {
    return CookieUtils.getCookie('wotd')
}

function checkWord(wotd, typed, attempts) {
    let definitions = []
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
        acc[letter]? acc[letter] += 1 : acc[letter] = 1
        return acc
    }, {})

    /**
     * Contains comparison logic and dispatches not the letter,
     * but its index to the correct/existing arrays.
     */
    for (let i = 0; i < attempt.length ; i++) {
        if (attempt[i] === comparator[i]) {
            hash[attempt[i]] -= 1
            correct.push(i)
        }
        else if (comparator.includes(attempt[i]) && hash[attempt[i]] != 0) {
            hash[attempt[i]] -= 1
            existing.push(i)
        }
    }   



    if (correct.length == 5 || attempts.length == 4) {
        gameOver=true
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


const definition = {
    "word": "netty",
    "phonetic": "/ˈnɛti/",
    "phonetics": [
        {
            "text": "/ˈnɛti/",
            "audio": ""
        }
    ],
    "meanings": [
        {
            "partOfSpeech": "adjective",
            "definitions": [
                {
                    "definition": "Neat, well-groomed, natty.",
                    "synonyms": [],
                    "antonyms": []
                }
            ],
            "synonyms": [],
            "antonyms": []
        }
    ],
    "license": {
        "name": "CC BY-SA 3.0",
        "url": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "sourceUrls": [
        "https://en.wiktionary.org/wiki/netty"
    ]
}