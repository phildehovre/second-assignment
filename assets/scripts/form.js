
/**
 * @file form.js
 * @description This file contains the logic for the form.
 * Labels and placeholders will be displayed to the user.
 * Name is used for form registration and submission (TODO)
 * type and id will be used to create the form elements and for future data manipulation (TODO)
 */
const formData = [
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


document.addEventListener('DOMContentLoaded', function() {
    /**
     * @function
     * @description This function creates the form cards and appends them to the DOM.
     */
    for (let card in formData) {
        // Create card element that will be targeted for animation;
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('form-card');
        cardDiv.id = formData[card].id;
        cardDiv.innerHTML = `
            <h2>${formData[card].label}</h2>
            <p>${formData[card].placeholder}</p>
        `;

        let inputValue
        // Create form elements based on the type of form data;
        if (formData[card].type === 'radio') {
            for (let option in formData[card].options) {
                let radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = formData[card].name;
                radio.value = formData[card].options[option].value;
                let label = document.createElement('label');
                label.htmlFor = formData[card].options[option].value;
                label.innerHTML = formData[card].options[option].label;
                cardDiv.appendChild(radio);
                cardDiv.appendChild(label);
            }
        }
        if (formData[card].type === 'textarea') {
            let textarea = document.createElement('textarea');
            textarea.name = formData[card].name;
            cardDiv.appendChild(textarea);
        }
        if (formData[card].type === 'datalist') {
            let datalist = document.createElement('datalist');
            datalist.id = formData[card].id;
            for (let option in formData[card].options) {
                let optionEl = document.createElement('option');
                optionEl.value = formData[card].options[option];
                datalist.appendChild(optionEl);
            }
            let input = document.createElement('input');
            input.name = formData[card].name;
            input.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log(e.target.value)
            });
            input.addEventListener('input', function(e) {
                console.log(e.target.value)
                inputValue = e.target.value
            });
            input.setAttribute('list', formData[card].id);
            cardDiv.appendChild(input);
            cardDiv.appendChild(datalist);
        }
        
        // Initial card styles for "stacking" visual effect;
        cardDiv.style.zIndex = formData.length - card
        cardDiv.style.position = "absolute";
        cardDiv.style.top = `${card * 20}px`;
        cardDiv.addEventListener('click', function(e) {
            console.log(e.target.value)
            if (inputValue) {
                cardDiv.classList.add('transition');
            }
        });
        // Append card to the DOM;
        document.querySelector('#cards_ctn').appendChild(cardDiv);
    }
});



