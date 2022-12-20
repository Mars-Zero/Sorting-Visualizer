/**
 * The size of the array
 */
const n = 20;
/**
 * The array that needs to be sorted
 */
const array = [];

init();

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
    const moves=bubbleSort(copy);
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
 * This is a bubble sort 🧋
 * @param {*an array that needs to be sorted} array 
 * @returns the moves that have been made in order to sort the array
 */
function bubbleSort(array) {
    const moves=[];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            //moves.push({indices: [i-1,i],type:"comp"});

            if (array[i - 1] > array[i]) {
                swapped = true;
                moves.push({indices: [i-1,i],type:"swap"});
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped)
    return moves;
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