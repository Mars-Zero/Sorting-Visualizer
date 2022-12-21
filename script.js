import sortArray from "./sorting_algotihms.js"

/**
 * The size of the array
 */
const n = 20;
/**
 * The array that needs to be sorted
 */
const array = [];


setDefaultStat();
/**
 * This functions sets the default state of the webpage
 */
function setDefaultStat()
{

    init();
    document.querySelector('button[name="init"]').addEventListener('click', init);
    document.querySelector('button[name="play"]').addEventListener('click', play);
}



/**
 * The audio context
 */
let audioCtx=null;

/**
 * Plays a note for the user that is dependent on the height of the element
 * @param {*the value of the element} freq 
 */
function playNote(freq)
{
    if(audioCtx==null)
    {
        audioCtx=new (AudioContext
             || webkitAudioContext 
             || window.webkitAudioContext)();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);

    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

/**
 * The action behind Init button
 */
function init() {
    
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

/**
 * The action behind the Play button
 */
function play()
{
    const copy=[...array];
    const moves=sortArray(copy,"insertionsort");
    animatemoves(moves);
    
}

/**
 * This function goes recursively through a list of moves and displays them one by one
 * @param {an array of moves that need to be animated} moves 
 * @returns nothing
 */
function animatemoves(moves)
{
    if(moves.length==0)
    {
        showBars();
        return;
    }

    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap")
    {

        [array[i],array[j]]=[array[j],array[i]];
    }

    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
    showBars(move);
    setTimeout(function(){
        animatemoves(moves);
    },50);
}



/**
 * This method shows the bars on the screen
 * @param {*the move that needs to be highlighted} move 
 */
function showBars(move) {
    container.innerHTML="";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if(move!=null && move.indices.includes(i)){
            bar.style.backgroundColor=move.type=="swap"?"red":"blue";
        }
        container.appendChild(bar);
    }
}