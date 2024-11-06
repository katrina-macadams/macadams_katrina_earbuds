(() => {
  console.log("IIFE Fired");
  // VARIABLES
  const hotspots = document.querySelectorAll(".Hotspot");
  // console.log(hotspots);

  // FUNCTIONS

  function showInfo(e) {
    console.log("showInfo called");
    console.log(e.currentTarget.slot);
    let selected = document.querySelector(`button[slot="${e.currentTarget.slot}" ]> div`);
    console.log(selected);
    gsap.to(selected, 1, {autoAlpha: 1});
  }
  // tells me which hotspot user is hovering over
  // dynamically create string. Want to drop in a variable = ${what is here becomes dynamic}
  //  `${e.currenttarget.slot}
  // (dynamic selectors)

  function hideInfo(e) {
    console.log("hideInfo called");
    let selected = document.querySelector(`button[slot="${e.currentTarget.slot}" ]> div`);
    gsap.to(selected, 1, {autoAlpha: 0});
  }


  // EVENTLISTENERS

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo)
  });


// Marco wants us to dynamically load the content and include an images
// We will be using an x-ray view and regular view
// and a series of still frames for a scrolling animation 
// for our assignment ^^^

})();

// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

