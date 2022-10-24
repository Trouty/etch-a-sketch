const sketchContainer = document.querySelector('#sketch-container');
const controls = document.querySelector('.controls');
const gridSelector = document.querySelector('#grid-selector');
const colours = ['red', 'orange', 'light-orange', 'yellow', 'green', 'turquoise', 'blue'];

let amountOfCells = 10; // this would make a 10x10 square of pixels; (max 25)
let mouseHeld = false;
let selectedColour = 'black';


function createSketchCells() {
    Array.from(sketchContainer.children).forEach(element => {
        sketchContainer.removeChild(element);
    });

    for (let i = 0; i < amountOfCells * amountOfCells; i++) {
        const sketchCell = document.createElement('div');

        sketchCell.classList.add('sketch-cell');
        sketchCell.style.width = `${750 / amountOfCells}px`;
        sketchCell.style.height = `${750 / amountOfCells}px`;

        sketchContainer.appendChild(sketchCell);
    };    
}

Array.from(controls.children).forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'reset') {
            Array.from(sketchContainer.children).forEach(element => {
                element.className = 'sketch-cell';
            });            
        } else if (button.id === 'grid-selector') {
            return;
        } else {
            let oldSelectedButton = document.querySelector(`#${selectedColour}`);
            oldSelectedButton.classList.remove('selected-button');
            button.classList.add('selected-button');

            selectedColour = button.id;
        }
    });
});

gridSelector.addEventListener('change', e => {
    amountOfCells = e.target.value;
    createSketchCells();
});

document.addEventListener('mousedown', e => {
    if (e.button === 0 && document.elementFromPoint(e.clientX, e.clientY).parentNode.id === 'sketch-container') {
        e.preventDefault()
        mouseHeld = true;
    }
});

document.addEventListener('mouseup', e => {
    if (e.button === 0) {
        mouseHeld = false;
    }
});

document.addEventListener('mousemove', e => {
    const mouseOnElement = document.elementFromPoint(e.clientX, e.clientY);

    if (mouseHeld && mouseOnElement.parentNode.id === 'sketch-container') {
        if (selectedColour === 'random') {
            let randomColour = colours[Math.floor(Math.random() * colours.length)];
            mouseOnElement.className = `sketch-cell ${randomColour}`;   
        } else {
            mouseOnElement.className = `sketch-cell ${selectedColour}`;       
        }
    }
}, { passive: true });

createSketchCells();