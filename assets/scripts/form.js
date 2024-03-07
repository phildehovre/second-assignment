
const formData = [{
    label: "Today I feel:",
    type: "radio",
    name: "sentiment",
    options: [
        { id: "sentiment-positive", value: "Positive", label: "Positive" },
        { id: "sentiment-neutral", value: "Neutral", label: "Neutral" },
        { id: "sentiment-negative", value: "Negative", label: "Negative" }
    ]
},
{
    label: "Today was...",
    type: "datalist",
    name: "entry-4",
    placeholder: "What are you grateful for?",
    options: ["Productive", "Long", "Stressful", "Relaxing", "Fun"]
},
{
    label: "Today I...",
    type: "textarea",
    name: "entry-3",
    placeholder: "What did you do today?"
},
{
    label: "I am grateful for...",
    type: "datalist",
    name: "entry-4",
    placeholder: "What are you grateful for?",
    options: ["My family", "My health", "My job", "My friends", "My home"]
},
{
    label: "I am looking forward to...",
    type: "textarea",
    name: "entry-5",
    placeholder: "What are you looking forward to?"
},
{
    label: "What's on your mind?",
    type: "textarea",
    name: "entry-6",
    placeholder: "What's on your mind?"
},
{
    label: "Things I would like to do differently...",
    type: "textarea",
    name: "entry-7",
    placeholder: "What's your mood?"
}
];



addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        formData.forEach((data) => {
            let input;
            if (data.type === "radio") {
                input = document.createElement('fieldset');
                input.classList.add('form__fieldset');
                let legend = document.createElement('legend');
                legend.textContent = data.label;
                input.appendChild(legend);
                data.options.forEach((option) => {
                    let label = document.createElement('label');
                    label.setAttribute('for', option.id);
                    label.textContent = option.label;
                    let radio = document.createElement('input');
                    radio.setAttribute('type', data.type);
                    radio.setAttribute('name', data.name);
                    radio.setAttribute('id', option.id);
                    radio.setAttribute('value', option.value);
                    label.appendChild(radio);
                    input.appendChild(label);
                })
            }
            if (data.type === "textarea") {
                input = document.createElement('textarea');
                input.setAttribute('name', data.name);
                input.setAttribute('placeholder', data.placeholder);
            }
            if (data.type === "datalist") {
                input = document.createElement('input');
                input.setAttribute('name', data.name);
                input.setAttribute('list', data.name);
                input.setAttribute('placeholder', data.placeholder);
                let datalist = document.createElement('datalist');
                datalist.setAttribute('id', data.name);
                data.options.forEach((option) => {
                    let optionEl = document.createElement('option');
                    optionEl.setAttribute('value', option);
                    datalist.appendChild(optionEl);
                })
                form.appendChild(datalist);
            }
            form.appendChild(input);
        })
    }
}
);