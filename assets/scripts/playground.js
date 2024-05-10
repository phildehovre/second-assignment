
// Default operator setup
var operator = "+";
let operators = ["+", "-", "*", "/"];

function setOperator(op) {
    operator = op;
    document.querySelector("#operator").textContent = operator;
    return operator;
}

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    reset();
    getScore();
});

// Init and/or reset the game
function reset() {
    const [correct, incorrect] = getScore();
    const [operand1, operand2] = generateOperands();
    document.querySelector("#operator").textContent = operator;
    document.querySelector("#operand1").textContent = operand1;
    document.querySelector("#operand2").textContent = operand2;
};

// Generate the numbers
function generateOperands() {
    return [Math.floor(Math.random() * 10 * ( 10^Math.random())), Math.floor(Math.random() ^ 10 * Math.random() * 10)]
};

function logOperation(e) {
    calculate();
    getScore();
};

function calculate() {
    document.querySelector("#result").classList.remove("correct");
    document.querySelector("#result").classList.remove("incorrect");
    const operand1 = parseInt(document.querySelector("#operand1").textContent);
    const operand2 = parseInt(document.querySelector("#operand2").textContent);
    const operator = document.querySelector("#operator").textContent;
    const answer = document.querySelector("#answer").value;
    let result = 0;
    switch(operator) {
        case "+":
        result = operand1 + operand2;
        break;
        case "-":
        result = operand1 - operand2;
        break;
        case "*":
        result = operand1 * operand2;
        break;
        case "/":
        result = operand1 / operand2;
        break;
    }
    let verdict = result == answer? "correct" : "incorrect";
    document.querySelector("#result").textContent = `The answer was ${result}, you entered ${answer} and the result is ${result == answer? "correct" : "incorrect"}`;
    document.querySelector("#result").classList.add(verdict);
    setScore(verdict == "correct"? 1 : 0, verdict == "incorrect"? 1 : 0);
    return result;
}
                
// this function will get the score of correct and incorrect answers from local storage:
function getScore() {
    let correct = localStorage.getItem("correct") || 0;
    let incorrect = localStorage.getItem("incorrect")  || 0;
    document.querySelector("#correct-answers").textContent = `You gave ${correct} correct answers`;
    document.querySelector("#incorrect-answers").textContent = `You gave ${incorrect} incorrect answers`;
    return [correct, incorrect];
}

// this function will set the score of correct and incorrect answers to local storage:
function setScore(correct, incorrect) {
    let [c, i] = getScore();
    localStorage.setItem("correct", Number(c) + correct);
    localStorage.setItem("incorrect", Number(i) + incorrect);
}





//   Definition for singly-linked list.
  function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }

  function arrayToLinkedList(arr) {
    if (arr.length === 0) {
        return null;
    }
    
    let head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

function truncateList(head) {
    let current = head.next
    let newHead = head

    while (current) {
        if (newHead.val < current.val) {
            newHead = current
            current = current.next
        } else if (current.val < current.next.val)  {
            current = current.next
        } 
    }
    
    return newHead
}

let list = arrayToLinkedList([5, 2, 13, 3, 8, 4, 4, 20, 19, 18, 17])
console.log(truncateList(list))
console.log(truncateList(arrayToLinkedList([5,2,13,3,8])))
 