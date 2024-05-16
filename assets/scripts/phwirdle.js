/**
 * The code structure breaks down as follows:
 * 
 * 0. Mystery word fetched through an API call and stored in cookies.
 * 
 * 1. on DOMContentLoaded, initialise virtual keyboard,
 * grid and two main event listeners on pysical and virtual keyboard;
 * 
 * 2. The event listeners pick up on user interaction, 
 * through the physical or virtual keyboard.
 * 
 * 3. On user every user input, the function "registerInput" 
 * processes the various checks and styles.
 * 
 * 4. If the user presses "Enter",
 * the "registerInput" function calls the "checkWord" function.
 * checkWord will send the word to a dictionary API.
 * On a positive response, we move to the next row and
 * assign styles to virtual keys and letter cells.
 * 
 * 5. The game ends with a simple check on the
 * number of attemps, or a positive match between user input
 * and mystery word.
 */

var DEBUG = 'stool';

var attempts = [];
var typed = '';
var gameOver = false;
setNewWord();
// var wotd = DEBUG;
var wotd = CookieUtils.getCookie('wotd');
fetchDefinition(wotd);




document.addEventListener('DOMContentLoaded', () => {
    var inputPrevent = false;

    initializeScore()

    const rows = document.querySelectorAll('.grid_row');
    const currentRow = rows[attempts.length];
    let cells = currentRow.querySelectorAll('.cell'); 
    
    if (!wotd) {
        location.reload;
        setNewWord();
        wotd = CookieUtils.getCookie('wotd');
    };
    
    // ============ Input registration + Visual feedback ==============
    /** 
     * This function processes inputs both from
     * the user's physical keyboard and the virtual one
     * by taking in the agnostic "key" parameter that is
     * just the string value of the key, rather than an event.
     * */ 
    
    async function registerInput(key) {
        if (gameOver) return;
        if (inputPrevent) return;

        if (key !== 'Backspace') {
            let pressed = document.querySelector(`#${key}`)
            pressed.classList.toggle('active')
            setTimeout(() => {
                pressed.classList.toggle('active')
            }, 
            100)
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
        } else if (key == "Enter") {
            if (typed.length < 5) return;
            inputPrevent = true
            
        // Initiate validation
           await spellCheck(typed)
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

                    // Move to next row
                    if (attempts.length < 5) {
                        const currentRow = rows[attempts.length]
                        cells = currentRow.querySelectorAll('.cell')
                    }

                
                    // Assigning classes to virtual keyboard keys
                    // based on correct/existing/incorrect status.
                    for (i = 0; i < attempts.length; i++) {
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
        });           
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
            registerInput(pressedKey)
            .then(() => {inputPrevent = false})

        });
        keyboard.appendChild(key);
     });

    // =========== Registering keystrokes =============
    document.addEventListener('keydown', (e) => {
    // Allow for backspace functionality       
        let key = e.key;
        registerInput(key)
        .then(() => {inputPrevent = false});
    });

    // =========== Initialize "rest" button =============
    const resetButton = document.querySelector('#new')
    resetButton.addEventListener('click', () => resetGame())
});


// =========== Helper functions =============

/**
 * Function sources a random word.
*/
function setNewWord(w) {
    if (w) {
        CookieUtils.setCookie('wotd', w)
    } else {
        try {
            
            const res = fetch('https://random-word-api.vercel.app/api?words=1&length=5')
            .then((res) => res.json())
            .then(res => {
                CookieUtils.setCookie(`wotd`, res[0]);
                
            });
        } catch {
            // CookieUtils.setCookie('wotd', w)
            console.log(Math.round(Math.random()) * 126)
        }
    };
}

function resetGame() {
  location.reload();
};

function checkWord(wotd, typed, attempts) {
    /**
     * This function will return two arrays of
     * indices which can then be used to select
     * the cells that need updating.
     */
    let correct = [];
    let existing = [];

    if (!wotd) return [[], []];

    const attempt = typed.split('');
    const comparator = wotd.split('');

    /**
     * Builds a hash to account for letters 
     * that appear multiple times, each time an existing
     * letter appear, it will subtract 1 from that letter count.
     */
    const hash = wotd.split('').reduce((acc, letter) => {
        acc[letter]? acc[letter] += 1 : acc[letter] = 1
        return acc;
    }, {});


    /**
     * Contains comparison logic and dispatches not the letter,
     * but its index to the correct/existing arrays.
     */
    for (i = 0; i < attempt.length ; i++) {
        // Check if letter has already been found
        if (hash[attempt[i]] != 0) {
            // If not, is it at the right index
            if (attempt[i] === comparator[i]) {
                hash[attempt[i]] -= 1;
                correct.push(i);
            }
            // If not, is it at least included
            else if (comparator.includes(attempt[i])) {
                hash[attempt[i]] -= 1;
                existing.push(i);
            }

        }
    }   

    if (correct.length == 5 || attempts.length == 4) {
        document.querySelector('#wotd').textContent = `The word was: ${wotd}`;

        const phonetic = CookieUtils.getCookie('phonetic')
        CookieUtils.getCookie('definition').split(';').forEach((definition, i) => {
            let defCtn = document.createElement('p');
            let def = document.createElement('p');

            def.classList.add('definition');
            defCtn.classList.add('def_ctn');

            def.textContent = phonetic.concat(", ", definition);

            defCtn.appendChild(def);
            document.querySelector('#definition').appendChild(defCtn);
        })
    }

    // ======== Update score =========
    if (correct.length === 5) {
        let score = LocalStorageUtils.getScore()
        score.won += 1
        LocalStorageUtils.updateScore(score)
    } else if (correct.length !== 5 && attempts.length === 4) {
        let score = LocalStorageUtils.getScore()
        score.lost += 1
        LocalStorageUtils.updateScore(score)
    }
    initializeScore()

    return [correct, existing];
}

function fetchDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then(data => {
        const definition = stringifyDefinitions(data[0].meanings[0].definitions);
        const phonetic = data[0].phonetic
        CookieUtils.setCookie('definition', definition);
        CookieUtils.setCookie('phonetic', phonetic);
    });
};

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

function stringifyDefinitions(array) {
    let acc = [];
    for (i = 0; i < 3; i++) {
       array[i]? acc.push(array[i].definition) : null;
    }
    return acc.join(';');
}

function initializeScore() {
    let score = LocalStorageUtils.getScore();
    let scoreEl = document.querySelector("#score")
    scoreEl.textContent = `Won: ${score.won} - Lost: ${score.lost}`
}


const letters = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 
'Enter', 'x', 'c', 'v', 'b', 'n', 'm', 'Back'
]

const fiveLetterWords = [
    "Apple", "House", "Chair", "Water", "Smile", "Brain", "Bread", "Earth", "Beach", "Cloud",
    "Dance", "Maple", "Eagle", "Mouse", "Horse", "Tiger", "Lemon", "Flute", "Music", "Paper",
    "Light", "Candle", "Dream", "Drink", "Queen", "Green", "Grape", "Hotel", "Jelly", "Knife",
    "Laser", "Magic", "Ocean", "Peace", "Quiet", "Rabbit", "Sheep", "Smoke", "Solid", "Train",
    "Video", "Alarm", "Angel", "Beard", "Black", "Blade", "Blank", "Blush", "Brick", "Brush",
    "Bunch", "Cabin", "Cakes", "Candy", "Chair", "Chalk", "Charm", "Chess", "Chips", "Chord",
    "Clean", "Clear", "Click", "Climb", "Clock", "Clown", "Coast", "Color", "Comet", "Comic",
    "Crown", "Curve", "Cycle", "Delta", "Dewey", "Diary", "Dress", "Dwell", "Earth", "Elbow",
    "Error", "Fairy", "Fancy", "Flask", "Flash", "Fleet", "Flood", "Floor", "Flora", "Fluff",
    "Focal", "Forge", "Fossil", "Frame", "Frost", "Fudge", "Furry", "Galaxy", "Gamey", "Ghost",
    "Glare", "Globe", "Gluey", "Golly", "Goody", "Gorge", "Grain", "Graph", "Grape", "Grass",
    "Grave", "Green", "Grief", "Grill", "Grime", "Gripe", "Group", "Grove", "Grunt", "Guard",
    "Guest", "Guide", "Gulch", "Gulfy", "Gully", "Gumbo"
  ];

  
  console.log(fiveLetterWords.length)