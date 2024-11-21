
// TABLE OF CONTENTS
// Scroll Trigger Links
// Vertical Scroll
// AR View
// X-Ray

const player = new Plyr('video'); 

// SCROLL TRIGGER LINKS 

(() => {

  const navLinks = document.querySelectorAll("#main-nav nav ul li a");

  function scrollLink(e) {    
          e.preventDefault(); 
          console.log(e.currentTarget.hash);
          let selectedLink = e.currentTarget.hash;
          gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100 }});
  }

  navLinks.forEach((link) => {
      link.addEventListener("click", scrollLink);
  });

})();

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

  ScrollTrigger.matchMedia({
    // Desktop
    "(min-width: 768px)": function() {
      gsap.to(buds, {
        frame: 74,
        snap: "frame",
        scrollTrigger: {
          trigger: "#vs-vid",
          pin: true,
          scrub: 2.5,
          start: 300,
          end: "bottom+=200 top",
        },
        onUpdate: render,
      });
    },
  
    // Mobile
    "(max-width: 767px)": function() {
      gsap.to(buds, {
        frame: 74,
        snap: "frame",
        scrollTrigger: {
          trigger: "#vs-vid",
          pin: false,
          scrub: 1.5,
          start: 1,
        },
        onUpdate: render,
      });
    },
  });
  
  

  images[0].addEventListener("load", render)

  function render() {
      context.clearRect(0,0, canvas.width, canvas.height)
      context.drawImage(images[buds.frame], 0, 0);
  }

})();

// AR VIEW
(() => {
  
    // VARIABLES
    const hotspots = document.querySelectorAll(".Hotspot");
    const features = [
      {
        id:"hotspot-1",
        title: "Venomous Sound",
        imgSrc: "images/sound-waves.jpg"
      },
  
      {
        id:"hotspot-2",
        title: "Ouroboros Charge",
        imgSrc: "images/snake-metal.jpg"
      },
   
      {
        id:"hotspot-3",
        title: "Silent Strike",
        imgSrc: "images/scales.jpeg"
      },

      {
        id:"hotspot-4",
        title: "Scaled Precision",
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