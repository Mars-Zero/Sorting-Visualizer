import sortArray from "./sorting_algotihms.js"
import playNote from "./audio_processing.js"

/**
 * The size of the array
 */
const n = 20;
/**
 * The array that needs to be sorted
 */
const array = [];

/**
 * A value that resets the visual representation of the sorting
 */
var isStarted=false;


setDefaultStat();
/**
 * This functions sets the default state of the webpage
 */
function setDefaultStat()
{

    init();
    document.querySelector('button[name="init"]').addEventListener('click', init);
    document.querySelector('button[name="playBubbleSort"]').addEventListener('click', playBubbleSort);
    document.querySelector('button[name="playSelectionSort"]').addEventListener('click', playSelectionSort);
    document.querySelector('button[name="playInsertionSort"]').addEventListener('click', playInsertionSort);
}





/**
 * The action behind Init button
 */
function init() {
    isStarted=false;
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
    isStarted=true;
    const copy=[...array];
    const moves=sortArray(copy,"selectionsort");
    animatemoves(moves);
    
}

/**
 * The action behind the BubbleSort button
 */
function playBubbleSort()
{
    isStarted=true;
    const copy=[...array];
    const moves=sortArray(copy,"bubblesort");
    animatemoves(moves);
    
}
/**
 * The action behind the SelectionSort button
 */
function playSelectionSort()
{
    isStarted=true;
    const copy=[...array];
    const moves=sortArray(copy,"selectionsort");
    animatemoves(moves);
    
}
/**
 * The action behind the InsertionSort button
 */
function playInsertionSort()
{
    isStarted=true;
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
    if(moves.length==0 || !isStarted)
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