



const paragraph = 'While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.'
const wordsArray = paragraph.split(' ');

let wordsLen = wordsArray.length;
let timer = document.getElementById('timer')
let letterCorrect = 0
let totalLength
let intervel
let wordsTyped = 0;

const startTime = 0;
let time = startTime * 60; 
window.timer = 0;
let accuracy = 0





function updateTime(){
    let minutes =Math.floor(time / 60);
    let seconds =   time % 60;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds ;
    timer.innerHTML = `${minutes}:${seconds}`;
    document.getElementById('time').innerHTML = `${minutes}:${seconds}`;
    time++;
}








function randomWord(){
    randomWords = wordsArray[(Math.ceil(Math.random()*wordsLen))-1]
    return randomWords;
}

function addClass(element,name){
    element.className += ' '+name;
}

function removeClass(element,name){
    element.className = element.className.replace(name,'');
}

function wordsFormat(wordd){
    return `<div class="word"><span class="letter">${wordd.split('').join('</span><span class="letter">')}</span><span class="letter space">${' '}</span></div>`
} 

newGame()
document.getElementById('btn').addEventListener('click', () => {
    window.location.reload(true);
});
document.getElementById('next').addEventListener('click', () => {
    window.location.reload(true);
});



function newGame(){
    document.getElementById('words').innerHTML = '';
    for(let i=0;i<20;i++){
        document.getElementById('words').innerHTML += wordsFormat(randomWord())+"";
    }
    addClass(document.querySelector('.word'),'current');
    addClass(document.querySelector('.letter'),'current');
    addClass(document.getElementById('words').lastElementChild.lastChild,'lastone')
    totalLength = document.getElementsByTagName('span').length;
   
    
}


window.addEventListener('keyup',ev=>{
    const key = ev.key
    console.log(key);
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter.innerHTML;
    const ifLetter = key.length === 1;
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentWord.firstChild;
    const islastLetter = document.querySelector('.letter.current.lastone')
    if(ifLetter && window.timer == 0){
       intervel  = setInterval(updateTime,1000);
        window.timer = 1
    }
    if(islastLetter){
        clearInterval(intervel)
        document.querySelector('.popover').style = 'display:flex'
        document.querySelector('.wrap').style = 'filter: blur(3px)'
        if(accuracy>=75 && Wpm>=25){
            const end = Date.now() + 15 * 1000;
            const colors = ["#bb0000", "#ffffff"];

                (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                });

                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
                })();
        }
    }
 
    if(currentWord){
        if(ifLetter){
            if(currentLetter){
                if(key === expected){
                    letterCorrect++
                }
                addClass(currentLetter, key === expected?'correct':'incorrect');
                removeClass(currentLetter,'current');
                if(currentLetter.nextSibling){
                    addClass(currentLetter.nextSibling,'current')
                }
                accuracy = Math.floor((letterCorrect / totalLength) *100)
                document.getElementById('accuracy').innerHTML = accuracy + '% Accuracy'
                document.getElementById('acc').innerHTML = accuracy + '% Accuracy'
            }
        }
        if(expected === ' '){
            removeClass(currentWord,'current')
            addClass(currentWord.nextElementSibling,'current');
            addClass(currentWord.nextElementSibling.firstChild,'current')

            wordsTyped++

           setInterval(()=>{
            Wpm = Math.floor(wordsTyped / (time/60))
            // console.log(Wpm);
            
            document.getElementById('wpm').innerHTML = Wpm + " WPM"
            document.getElementById('wpm-pop').innerHTML = Wpm + " WPM"
           },50)
        }
        if(isBackspace){
            // if(currentLetter === isFirstLetter){
            //     removeClass(currentWord,'current');
            //     addClass(currentWord.previousSibling,'current');
            //     removeClass(currentLetter,'current');
            //     addClass(currentWord.previousSibling.lastChild,'current');
            //     removeClass(currentWord.previousSibling.lastElementChild,'incorrect');
            //     removeClass(currentWord.previousSibling.lastElementChild,'correct');
    
            // }
            if(currentLetter){
                letterCorrect --
                removeClass(currentLetter,'current');
                addClass(currentLetter.previousSibling,'current');
                removeClass(currentLetter.previousSibling,'incorrect');
                removeClass(currentLetter.previousSibling,'correct');
                accuracy = Math.floor((letterCorrect / totalLength) *100)
                document.getElementById('accuracy').innerHTML = accuracy + '%'
                document.getElementById('acc').innerHTML = accuracy + '%'
            }
        }
        

         
    }
// console.log(currentWord.previousElementSibling.lastChild);     

    
    }
)










