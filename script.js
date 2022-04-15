function changeToSelected(event) {
    const divFotoeTick = event.currentTarget;
    const i = divFotoeTick.dataset.questionId;
    const Risposte = document.querySelectorAll('.choice-grid div');
    for(const s of Risposte) {
        if (s.dataset.questionId === i){
            s.classList.remove('selected');
            const x = s.querySelector('.checkbox');
            x.classList.add('hidden'); 
            const y = s.querySelector('.hidden');
            y.classList.remove('hidden');
            y.classList.add('checkbox');           
        }
    }
    
    const unTick = divFotoeTick.querySelector('.checkbox');
    const tick = divFotoeTick.querySelector('.hidden');
    unTick.classList.remove('checkbox');
    unTick.classList.add('hidden');
    tick.classList.remove('hidden');
    tick.classList.add('checkbox');
    const index = divFotoeTick.dataset.questionId;
    const divRisposte = document.querySelectorAll('.choice-grid div');
    for(const i of divRisposte) {
        if (i.dataset.questionId === index){
            i.classList.add('unSelected');
        }
    }
    divFotoeTick.classList.remove('unSelected');
    divFotoeTick.classList.add('selected');
    personalita[divFotoeTick.dataset.questionId] = divFotoeTick.dataset.choiceId;
    console.log(personalita);
    if(personalita['one'] !== undefined && personalita['two'] !== undefined && personalita['three'] !== undefined)
    controlla();
}

function controlla(){
   
    const header = document.createElement('h1');
    const par = document.createElement('p');
    if(personalita['one'] == personalita['two']){
        header.textContent = RESULTS_MAP[ personalita['one'] ].title;
        par.textContent = RESULTS_MAP[ personalita['one'] ].contents;    
    }
    else if(personalita['two'] == personalita['three']){
        header.textContent = RESULTS_MAP[ personalita['two'] ].title
        par.textContent = RESULTS_MAP[ personalita['two'] ].contents;    
    }
    else {
        header.textContent = RESULTS_MAP[ personalita['one']].title;
        par.textContent = RESULTS_MAP[ personalita['one'] ].contents;
    }
    document.querySelector('#results').appendChild(header);
    document.querySelector('#results').appendChild(par);

    const button = document.createElement('button');
    document.querySelector('#results').appendChild(button);
    bottone(button);
    // Rimuovi gli event listener restanti
    for (const box of freeBoxes) {
          box.removeEventListener('click', changeToSelected);
    }
}

function bottone(button) {
    button.textContent = "Ricomincia il Test"; 
    button.addEventListener('click', ricomincia);
}

function ricomincia(){
    for(const box of boxes)
        freeBoxes.pop(box);
    
    personalita['one'] = undefined;
    personalita['two'] = undefined;
    personalita['three'] = undefined;
    


    for (const box of boxes)    {     
        box.addEventListener('click', changeToSelected);
        freeBoxes.push(box);
    }    
    const sel = document.querySelectorAll('.selected');
    for (const j of sel) {
        j.classList.remove('selected');
        const x = j.querySelector('.checkbox');
        x.classList.add('hidden'); 
        const y = j.querySelector('.hidden');
        y.classList.remove('hidden');
        y.classList.add('checkbox');           
    }
    const unSel = document.querySelectorAll('.unSelected');
    for (const j of unSel) {
        j.classList.remove('unSelected');
    }
    document.querySelector('#results').innerHTML = '';
    
}



const freeBoxes = [];

const personalita = {};

const boxes = document.querySelectorAll('.choice-grid div');

for (const box of boxes)    {     
    box.addEventListener('click', changeToSelected);
    freeBoxes.push(box);
}
