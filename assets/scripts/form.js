
/**
 * @file form.js
 * @description This file contains the logic for the form.
 * Labels and placeholders will be displayed to the user.
 * Name is used for form registration and submission (TODO)
 * type and id will be used to create the form elements and for future data manipulation (TODO)
 */
const cardData = [
    {
        label: "Today was...",
        type: "datalist",
        name: "entry-2",
        id: "entry-2",
        placeholder: "What are you grateful for?",
        options: ["Productive", "Long", "Stressful", "Relaxing", "Fun"]
    },
    {
    label: "Today I feel:",
    type: "radio",
    name: "sentiment",
    id: "entry-1",
    options: [
        { id: "sentiment-positive", value: "Positive", label: "Positive" },
        { id: "sentiment-neutral", value: "Neutral", label: "Neutral" },
        { id: "sentiment-negative", value: "Negative", label: "Negative" }
    ]
},
{
    label: "Today I...",
    type: "textarea",
    name: "entry-3",
    id: "entry-3",
    placeholder: "What did you do today?"
},
{
    label: "I am grateful for...",
    type: "datalist",
    name: "entry-4",
    id: "entry-4",
    placeholder: "What are you grateful for?",
    options: ["My family", "My health", "My job", "My friends", "My home"]
},
{
    label: "I am looking forward to...",
    type: "textarea",
    name: "entry-5",
    id: "entry-5",
    placeholder: "What are you looking forward to?"
},
{
    label: "What's on your mind?",
    type: "textarea",
    name: "entry-6",
    id: "entry-6",
    placeholder: "What's on your mind?"
},
{
    label: "Things I would like to do differently...",
    type: "textarea",
    name: "entry-7",
    id: "entry-7",
    placeholder: "What's your mood?"
}
];

function submitForm(form) {
    console.log("submitting form")
    console.log(form.entries())
}


document.addEventListener('DOMContentLoaded', function() {
    /**
     * @function
     * @description This function creates the form cards and appends them to the DOM.
    */
   const form = new FormData(document.querySelector('form'));
   const cardContainer = document.querySelector('#cards_ctn')

   
    for (let card in cardData) {
        // Create card element that will be targeted for animation;
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('form_card');
        cardDiv.classList.add('bg-blue');
        cardDiv.innerHTML = `
        <h2>${cardData[card].label}</h2>
        <p>${cardData[card].placeholder}</p>
        `;
        
        let inputValue
        // Create form elements based on the type of form data;
        // Creating RADIO;
        if (cardData[card].type === 'radio') {
            for (let option in cardData[card].options) {
                let radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = cardData[card].options[option].value;
                radio.id = cardData[card].options[option].value;
                radio.value = cardData[card].options[option].value;
                let label = document.createElement('label');
                label.htmlFor = cardData[card].options[option].value;
                label.innerHTML = cardData[card].options[option].label;
                label.appendChild(radio);
                cardDiv.appendChild(label);
                radio.addEventListener('click', function(e) {
                    inputValue = e.target.value
                });
            }
        }
        // Creating TEXTAREA;
        if (cardData[card].type === 'textarea') {
            let textarea = document.createElement('textarea');
            textarea.name = cardData[card].name;
            cardDiv.appendChild(textarea);
            textarea.addEventListener('input', function(e) {
                inputValue = e.target.value
            });
        }
        // Creating DATALIST;
        if (cardData[card].type === 'datalist') {
            let datalist = document.createElement('datalist');
            datalist.id = cardData[card].id;
            for (let option in cardData[card].options) {
                let optionEl = document.createElement('option');
                optionEl.value = cardData[card].options[option];
                datalist.appendChild(optionEl);
            }
            let input = document.createElement('input');
            input.name = cardData[card].name;
            input.addEventListener('input', function(e) {
                inputValue = e.target.value
            });
            input.setAttribute('list', cardData[card].id);
            cardDiv.appendChild(input);
            cardDiv.appendChild(datalist);
        }
        
        
        // Initial card styles for "stacking" visual effect;
        cardDiv.style.zIndex = cardData.length - card
        cardDiv.style.position = "absolute";
        cardDiv.style.top = `${card * 10}px`;
        
        // Create overlay div for transparency effect;
        let overlayDiv = document.createElement('div');
        overlayDiv.classList.add('card_overlay');
        cardDiv.appendChild(overlayDiv)
        
        
        function inputFocus(element, type) {
            console.log(element, type)
            if (type === 'radio') return;
            let input = element.getElementsByTagName(type)[0]
            console.log(input)
                input.focus();
        }
        
        function validateInputAndTransition() {
            let cardCounter = cardData.length - card;
            if (inputValue) {
                // Initiate the transition effect;
                cardDiv.classList.add('transition');
                form.append(cardData[card].name, inputValue);
                
                // Create a new div element
                let entryEl = document.createElement('div');
                entryEl.classList.add('entry_record');
                entryEl.dataset.entryId = cardData[card].id;
                entryEl.addEventListener('click', function(e) {
                    form.append(cardData[card].name, inputValue);
                });
                entryEl.innerHTML = `
                <h3>${cardData[card].label}</h3>
                <p>${inputValue}</p>
                `; // Set its inner HTML to inputValue
                

                // Append the new div element to the container
                document.getElementById('entry_ctn').appendChild(entryEl);
            }
            
            if (Array.from(form.entries()).length === cardData.length) {
                const submitBtn = document.createElement('button');
                submitBtn.innerHTML = "Submit";
                submitBtn.classList.add('btn')
                submitBtn.addEventListener('click', function() {
                    submitForm(form);
                });
            document.querySelector('#entry_ctn').appendChild(submitBtn);
        }
        inputFocus(cardDiv, cardData[card].type);
    }

    cardDiv.addEventListener('click', (e) => validateInputAndTransition(e));
    cardDiv.addEventListener('keydown', (e) => {
        if (e.key === "Enter") validateInputAndTransition(e)
    });

// Append card to the DOM;

cardContainer.appendChild(cardDiv);

        

}
});




