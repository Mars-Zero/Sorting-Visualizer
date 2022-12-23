/**
 * The audio context
 */
let audioCtx=null;

/**
 * Plays a note for the user that is dependent on the height of the element
 * @param {*the value of the element} freq 
 */
export default function playNote(freq)
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