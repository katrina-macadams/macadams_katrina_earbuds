
// TABLE OF CONTENTS
// Vertical Scroll
// AR View
// X-Ray


// VERTICAL SCROLL
(() => {

  const canvas = document.querySelector("#vs-vid");
  const context = canvas.getContext("2d");

  canvas.width = 1440;
  canvas.height = 900;

  const frameCount = 75; 

  const images = []; 

  const buds = {
      frame: 0
  }

  for(let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/vs-vid${(i+1).toString().padStart(4, '0')}.tif`;
      images.push(img)

  }

  gsap.to(buds, {
      frame: 75,
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          markers: true,
          start: "top top"
      },
      onUpdate: render

  })

  images[0].addEventListener("load", render)

  function render() {
      context.clearRect(0,0, canvas.width, canvas.height)
      context.drawImage(images[buds.frame], 0, 0);
  }

})();

// AR VIEW
(() => {
    console.log("IIFE Fired");
    // VARIABLES
    const hotspots = document.querySelectorAll(".Hotspot");
    const features = [
      {
        id:"hotspot-1",
        title: "Venomous Bass",
        imgSrc: "images/sound-waves.jpg"
      },
  
      {
        id:"hotspot-2",
        title: "Snake Inspired Design",
        imgSrc: "images/snake-metal.jpg"
      },
   
      {
        id:"hotspot-3",
        title: "Scaly Grip",
        imgSrc: "images/scales.jpeg"
      },

      {
        id:"hotspot-4",
        title: "Silent Strike Noise Cancellation",
        imgSrc: "images/xray.jpg"
      },
  ];

    // FUNCTIONS
   
    function showInfo(e) {
      const slot = e.currentTarget.slot;
    
    let feature = null;
      for (let i = 0; i < features.length; i++) {
      if (features[i].id === slot) {
      feature = features[i];
      break;
    }
  }
    
      if (feature) {
        const selected = document.querySelector(`button[slot="${slot}"] > div`);
        selected.innerHTML = `
          <img src="${feature.imgSrc}" alt="${feature.title}">
          ${feature.title}
        `;
        
        gsap.to(selected, 1, { autoAlpha: 1 });
      }
    }
    
    function hideInfo(e) {
      const slot = e.currentTarget.slot;
      const selected = document.querySelector(`button[slot="${slot}"] > div`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
    
    // EVENTLISTENERS
  
    hotspots.forEach(hotspot => {
      // For touch screen devices
      hotspot.addEventListener("click", showInfo);
      // For hover devices
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo)
    });

  
  })();
  

  // X-RAY
  (() => {
    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");

    function moveDivisor() {
        console.log(slider.value);
        divisor.style.width = slider.value+"%";
    }

    slider.addEventListener("input", moveDivisor);
  
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