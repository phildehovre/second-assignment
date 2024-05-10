// Function to create/update a cookie
function setCookie(cookieName, cookieValue, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Function to read a cookie
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Function to delete a cookie
function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

window.CookieUtils = { getCookie, setCookie, deleteCookie}

function getScore() {
    let score = localStorage.getItem('score');
    
    if (!score) {
        score = {"won": 0, "lost": 0};
        localStorage.setItem('score', JSON.stringify(score));
    } else {
        score = JSON.parse(score);
    }

    return score;
}

function updateScore(score) {
    localStorage.setItem('score', JSON.stringify(score))

}

window.LocalStorageUtils = {getScore, updateScore}