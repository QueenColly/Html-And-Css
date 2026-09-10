const display = document.querySelector('.text-display');
const buttons = document.querySelectorAll('button');

for (let button of buttons) {
    button.addEventListener('click', (event)=> {
        let buttonText = button.textContent;
        console.log(button);
   
    if(buttonText == 'C') {
        display.textContent = '0';
    } else if (buttonText == 'DEL') {
        if(display.textContent == '0' || display.textContent == 'Syntax Error' || display.textContent == 'Math Error') {
            return; 
        }
        display.textContent = display.textContent.slice(0, -1);

         if (display.textContent == '') {
                display.textContent = '0';
            }
    } else if (buttonText == '=') {
        try {
            let result = eval(display.textContent);
            
            if (result == Infinity || result == Infinity || Number.isNaN(result)) {
                display.textContent = 'Math Error';
            } else {
                display.textContent = result;
            }
        } catch(error){
            display.textContent = 'Syntax Error';
        }
        
    } else {
         if (display.textContent == '0' || display.textContent == 'Syntax Error' || display.textContent == 'Math Error') {
                display.textContent = buttonText;
            } else {
                display.textContent = display.textContent + buttonText;
            }
    }

    }) ;
}

function pressButton(value){
    for (let button of buttons){
        if(button.textContent == value){
            button.click();
            break;
        }
    }
}

document.addEventListener('keydown', function(event){
    let key = event.key;

    if(key == 'Enter'){
        key = '=';
    }
    if (key == 'Escape'){
        key = 'C';
    }
    if (key == 'Backspace'){
        key = 'DEL';
    }
    pressButton(key);
})
document.addEventListener('keydown', function(event){
    console.log(event.key);
})