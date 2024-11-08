(() => {
    console.log("IIFE Fired");
    // VARIABLES
    const hotspots = document.querySelectorAll(".Hotspot");
    const features = [
      {
        id:"hotspot-1",
        title: "Venomous Bass",
        imgSrc: "images/xray.jpg"
      },
  
      {
        id:"hotspot-2",
        title: "Long Tail",
        imgSrc: "images/xray.jpg"
      },
   
      {
        id:"hotspot-3",
        title: "Scaly Grip",
        imgSrc: "images/xray.jpg"
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
  
  