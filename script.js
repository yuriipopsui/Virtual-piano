
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');





// /////    keyboard playing //////////

function playKeyBoard(event){
  const audio = document.querySelector(`audio[data-code="${event.code}"]`);
  const key = document.querySelector(`.piano-key[data-code="${event.code}"]`);
  if(!audio || event.repeat) return;

    key.classList.add('piano-key-active', 'piano-key-active-pseudo');
    audio.currentTime = 0;
    audio.play();
}
function stopKeyBoard(event){
  const key = document.querySelector(`.piano-key[data-code="${event.code}"]`);
  key.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}
window.addEventListener('keydown', playKeyBoard);
window.addEventListener('keyup', stopKeyBoard);


 ///////   mouse playing   /////////////

function playAudio(src) {

  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
} 

const soundPlay = (event) => {
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
  event.target.classList.add('piano-key-active');
};
const soundStop = (event) => {
  if(event.target.classList.contains('piano-key') || event.target.classList.contains('main')) {
    event.target.classList.remove('piano-key-active');
  }
};

const startOverButton = (event) => {
    if(event.target.classList.contains('piano-key')) {
      event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      playAudio(src);
    }
  pianoKeys.forEach((elem) => {
    elem.addEventListener('mouseover', soundPlay);
    elem.addEventListener('mouseout', soundStop);
  });
}
const stopOverButton = () =>{
  pianoKeys.forEach((elem) => {
    elem.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    elem.removeEventListener('mouseover', soundPlay);
    elem.removeEventListener('mouseout', soundStop);
  });
}
piano.addEventListener('mousedown', startOverButton, false);
piano.addEventListener('mouseup', stopOverButton);


///////// Switcher Notes <--> Letters   ////////////

document.querySelector('.btn-container').addEventListener('click', (event) => {
  if(event.target.classList.contains('btn-letters')){
  event.target.classList.add('btn-active');
  document.querySelector('.btn-notes').classList.remove('btn-active');
  pianoKeys.forEach((elem) => {
    elem.classList.add('letter');
  });
  }
  else if(event.target.classList.contains('btn-notes')){
    event.target.classList.add('btn-active');
    document.querySelector('.btn-letters').classList.remove('btn-active');
    pianoKeys.forEach((elem) => {
      elem.classList.remove('letter');
    });
  }
});

/////    Fullscreen manage   ////////////
document.querySelector('.fullscreen').addEventListener('click', () => {
  if(!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
  else if (document.fullscreenEnabled){
    document.exitFullscreen();
  }
});
