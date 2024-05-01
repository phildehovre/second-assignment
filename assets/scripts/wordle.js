function setNewWord() {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
        .then((res) => res.json())
        .then(res => CookieUtils.setCookie(`wotd`, res[0]))
}

function getNewWord() {
    return CookieUtils.getCookie('wotd')
}

function checkWordandAnimate(wotd, typed) {
    /**
     * This function will return two arrays of
     * indices which can then be used to select
     * the cells that need updating.
     */
    let correct = []
    let existing = []
    if (!wotd) return;

    const hash = wotd.split('').reduce((acc, letter) => {
        acc[letter]? acc[letter] += 1 : acc[letter] = 1
        return acc
    }, {})

    const attempt = typed.split('')
    const comparator = Object.keys(hash)
    
    for (let i = 0; i < attempt.length ; i++) {
        console.log(i)
        console.log(attempt[i], comparator[i])
        if (attempt[i] === comparator[i]) {
            hash[attempt[i]] -= 1
            correct.push(i)
        }
        if (comparator.includes(attempt[i]) && hash[attempt[i]] != 0) {
            existing.push(i)
        }
    }   
    return [correct, existing]
}


document.addEventListener('DOMContentLoaded', () => {
    checkWordandAnimate()
    let attempts = [];
    let typed = '';
    let gameOver = false
    const rows = document.querySelectorAll('.grid_row');
    const currentRow = rows[attempts.length];
    let cells = currentRow.querySelectorAll('.cell');


    // =========== Initialize WOTD =============
    /* 
    Check if cookies contains a word of the day 
    If they dont, set an interval that will repeatedly
    SET/GET and check for existence.
    Finally, cancelling the interval on a positive check.
    */
    let wotd = CookieUtils.getCookie("wotd")
    const interval = setInterval(() => {
    if (wotd.length == 0) {
        setNewWord()
        wotd = getNewWord()
        return () => clearInterval(interval)
    }
    }, 100)

    // =========== Registering keystrokes =============
    document.addEventListener('keydown', (e) => {
        // Allow for backspace functionality
        
        if (e.key == "Backspace") {
            typed = typed.slice(0, typed.length-1)
            cells[typed.length].textContent = ''
        // Only allow Alphabetical characters to be appended to "typed"
        } else if (96 < e.key.charCodeAt(0) && e.key.charCodeAt(0) < 122 ) {
            if (typed.length < 5) {
                typed += e.key
                cells[typed.length - 1].textContent = e.key
            }
        } else if (e.key == "Enter" && typed.length == 5) {
            const [correct, existing] = checkWordandAnimate(wotd, typed)

            // assigning classes to correct/existing letters.
            correct.forEach((index) => {
                cells[index].classList.add('correct')
            })
            existing.forEach((index) => {
                cells[index].classList.add('existing')
            })
            attempts.push(typed)
            typed = ''
            const currentRow = rows[attempts.length]
            cells = currentRow.querySelectorAll('.cell')
        }
    })

    
    // =========== Rendering =============
    // ==== 1. Grid =====
    const grid = document.querySelector('#grid')

    
    
    // ==== 2. Cells =====

    cells.forEach((cell, index) => {
        
    })
    
    

})
