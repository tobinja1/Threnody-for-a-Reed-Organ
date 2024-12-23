// Get createDevice from the rnbo.js library

const { createDevice } = RNBO;

// Create AudioContext
var WAContext = window.AudioContext || window.webkitAudioContext;
var context = new WAContext();

runToggle = document.getElementById("run");
volSlider = document.getElementById("vol");

controlsContainer = document.getElementById("controls-container");
clickToContinueContainer = document.getElementById("click-to-continue-container");
explanationtextLite = document.getElementById("explanation-text-lite");
loadingText = document.getElementById("loading-text");

mainContainer = document.querySelector(".main-container");
infoContainer = document.querySelector(".info-container")

whatIsThisButton = document.getElementById("what-is-this-button");
whatIsThisBool = false;

var toggledTimes = 0;

    // Decide on some parameters
    let allowBackgroundPlayback = true; // default false, recommended false
    let forceIOSBehavior = false; // default false, recommended false
    // Pass it to unmute if the context exists... ie WebAudio is supported
    if (context)
    {
    // If you need to be able to disable unmute at a later time, you can use the returned handle's dispose() method
    // if you don't need to do that (most folks won't) then you can simply ignore the return value
    let unmuteHandle = unmute(context, allowBackgroundPlayback, forceIOSBehavior);
    
    }

function fadeIns(){
    setTimeout(() => {
        clickToContinueContainer.style.opacity = "1";
      }, "250");
    setTimeout(() => {
        controlsContainer.style.opacity = "1";
      }, "500");
    //   setTimeout(() => {
    //     loadingText.style.opacity = "1";
    //   }, "2000");
}
  
fadeIns();

const setup = async () => {
    // get exported RNBO patcher file (file name must match whatever is used during target export)
    let rawPatcher = await fetch("assets/rnbo/threnodyVer4.json");
    const patcher = await rawPatcher.json();
  
    // fetch dependencies (if applicable, dependencies.json is created during target export)
    // const dependencies = [];
    // try {
    //     const dependenciesResponse = await fetch("assets/rnbo/dependencies.json");
    //     dependencies = await dependenciesResponse.json();
    //     dependencies = dependencies.map(d => d.file ? Object.assign({}, d, { file: "assets/rnbo/" + d.file }) : d);
    //     console.log(dependenciesResponse.json());
    // } catch (e) {}
  
    // create RNBO device
    const device = await createDevice({ context, patcher });
  
    // load samples (if applicable, check "Copy Sample Dependencies" during target export)
    // if (dependencies.length)
    //     await device.loadDataBufferDependencies(dependencies);

    // Load the exported dependencies.json file
    let dependencies = await fetch("assets/rnbo/dependencies.json");
    dependencies = await dependencies.json();

    // Load the dependencies into the device
    const results = await device.loadDataBufferDependencies(dependencies);
    results.forEach(result => {
        if (result.type === "success") {
            console.log(`Successfully loaded buffer with id ${result.id}`);
        } else {
            console.log(`Failed to load buffer with id ${result.id}, ${result.error}`);
        }
    });

    device.parameters.forEach(parameter => {
        console.log(parameter.id);
    });

  
    // connect device to AudioContext audio output
    device.node.connect(context.destination);

    runToggle.addEventListener('click', function(){
        device.parametersById.get("run").value = runToggle.checked ? 1 : 0;
        console.log(device.parametersById.get("run").value);
    });
    
    volSlider.addEventListener('input', function(){
        device.parametersById.get("vol").value = volSlider.value/100;
        console.log(device.parametersById.get("vol").value);
    });

    document.addEventListener('click', function(){
        clickToContinueContainer.style.opacity = "0";
        setTimeout(() => {
            clickToContinueContainer.style.display = "none";
          }, "500")
    })

    clickToContinueContainer.addEventListener('click', function(){
        clickToContinueContainer.style.opacity = "0";
        setTimeout(() => {
            clickToContinueContainer.style.display = "none";
          }, "500")
    })

    //device.parametersById.get("testTone").value = 1;
    //device.parametersById.get("vol").value = 1;

  };

  runToggle.addEventListener('click', function(){
    if(context.state === "suspended"){
        context.resume();
    }
    toggledTimes++;
    // if(toggledTimes > 0){
    //     explanationtextLite.style.opacity = "1";
    // }
});

whatIsThisButton.addEventListener('click', function(){
    // whatIsThisBool = !whatIsThisBool;
    console.log(whatIsThisBool);
        document.querySelector("body").style.overflowY = "scroll";
        mainContainer.style.opacity = "0";
        infoContainer.style.opacity = "1";
        infoContainer.style.display = "flex";

});

document.getElementById("return-button").addEventListener('click', function(){
    // whatIsThisBool = !whatIsThisBool;
    console.log(whatIsThisBool);
    document.querySelector("body").style.overflowY = "hidden";
        mainContainer.style.opacity = "1";
        infoContainer.style.opacity = "0";
        infoContainer.style.display = "none";

})
  
  setup();