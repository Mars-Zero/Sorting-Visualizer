/**
 * This is a method that sorts an array by some type of sorting algorithm
 * @param {*the array that needs to be sorted} array 
 * @param {*the type of sort} type 
 * @returns the list of moves that need to be animated
 */
export default function sortArray(array,type)
{
    switch(type){
        case "bubblesort":{
            return bubbleSort(array);
        }
        case "selectionsort":{
            return selectionSort(array);
        }
        case "insertionsort":{
            return insertionSort(array);
        }
        case "mergesort":{
            return mergeSort(array);
        }
        case "quicksort":{
            return quickSort(array);
        }
        
    }
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
            else{
                //moves.push({indices: [i-1,i],type:"compar"}); 
            }
        }
    } while (swapped)
    return moves;
}


/**
 * This is a selection sort 👇
 * @param {*an array that needs to be sorted} array 
 * @returns the moves that have been made in order to sort the array
 */
function selectionSort(array) {
    const moves=[];
    for(let i=0; i < array.length-1; i++)
    {
        for(let j=i+1; j<array.length; j++)
        {
            if (array[j] < array[i]) {
                moves.push({indices: [j,i],type:"swap"});
                [array[j], array[i]] = [array[i], array[j]];
            }
            else{
                //moves.push({indices: [j,i],type:"compar"});
            }
        }
    }
    return moves;
}

/**
 * This is an insertion sort 📶
 * @param {*an array that needs to be sorted} array 
 * @returns the moves that have been made in order to sort the array
 */
function insertionSort(array) {
    const moves=[];
    for(let i=1; i < array.length; i++)
    {
        let num=array[i];
        let poz=i;
        for(let j=0; j<i; j++)
        {
            if(num<array[j])
            {
                poz=j;
                break;
            }
            else{
                moves.push({indices: [j,i],type:"compar"});
            }
        }
        for(let j=i; j>poz; j--)
        {
            [array[j - 1], array[j]] = [array[j], array[j - 1]];
            moves.push({indices: [j-1,j],type:"swap"});
        }
        
        
    }
    return moves;
}

/**
 * This is a merge sort 👐
 * TODO somehow find a way to display the moves
 * @param {*an array that needs to be sorted} array 
 * @returns the moves that have been made in order to sort the array
 */
function mergeSort(array) {
    const moves=[];
    console.log(array);
    mergeRec(array,0,array.length-1);
    console.log(array);
}

function mergeRec(array,st,dr)
{
    let moves=[];
    if(st<dr)
    {
        let mij=Math.floor((st+dr)/2);
        moves+=mergeRec(array,st,mij);
        moves+=mergeRec(array,mij+1,dr);

        let interclas = [];
        let a=st;
        let b=mij+1;
        let n=0;
        while(a<=mij && b<=dr)
        {
            
            if(parseFloat(array[a])<parseFloat(array[b]))
            {
                interclas[n++]=parseFloat(array[a++]);
            }
            else{
                interclas[n++]=parseFloat(array[b++]);
            }
        }
        while(a<=mij)
        {
            
            interclas[n++]=parseFloat(array[a++]);
        }
        while(b<=dr)
        {
           
            interclas[n++]=parseFloat(array[b++]);
        }

        for(let i=0; i<n; i++)
        {
            array[st+i]=interclas[i];
        }

    }
}

/**
 * This is a quick sort 🥇
 * TODO somehow find a way to display the moves
 * TODO check if the sorting is correct
 * @param {*an array that needs to be sorted} array 
 * @returns the moves that have been made in order to sort the array
 */
function quickSort(array)
{
     
    console.log(array);
    const moves=mergeRec(array,0,array.length-1);
    console.log(array);
    return moves;
}

function quickSortRec(array,st,dr)
{
    let moves=[];
    if(st<dr)
    {
        let mij=Math.floor((st+dr)/2);

        let inex=Math.floor(Math.random%(dr-st));
        let pivot=array[st+inex];
        array[st + inex] = array[mij];
        array[mij] = pivot;

        let aux;
        let i=st,j=dr,schimb=0;
        while (i < j)
        {
            moves.push({indices: [j,i],type:"compar"});
            if (v[i] > v[j])
            {
                moves.push({indices: [j,i],type:"swap"});
                [array[j], array[i]] = [array[i], array[j]];
                schimb = 1 - schimb;
            }
            i += schimb;
            j = j - 1 + schimb;
        }
        moves+=quickSortRec(array,st,i-1);
        moves+=quickSortRec(array,j+1,dr);
        return moves;
    }
}