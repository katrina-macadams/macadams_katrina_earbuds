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
      hotspot.addEventListener("click", showInfo);
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo)
    });

    



  // You hold each node in a temp placeholder
  //  => grab this node list collections "hotspots" and loop through it, and each time i loop 
  // through it I want to put it in a temp placeholder and then run a function
  // hotspots = node list (array)
  // put them in a temp place holder
  // the add an add and event listener with mouseover and mouse out
  // then define the fucntions
  // event objects are hidden behind the scenes in JS everytime we use an eventlistener
  // (e) for event capture
  
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
  
  