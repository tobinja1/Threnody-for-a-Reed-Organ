document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

// Get createDevice from the rnbo.js library

const { createDevice } = RNBO;

// Create AudioContext
var WAContext = window.AudioContext || window.webkitAudioContext;
var context = new WAContext();

bgColor = "darkslateblue";

volSlider = document.getElementById("vol");

runButton = document.getElementById("run-button");
runBool = false;

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
        controlsContainer.style.opacity = "1";
      }, "500");
}
  
fadeIns();

const setup = async () => {
    // get exported RNBO patcher file (file name must match whatever is used during target export)
    let rawPatcher = await fetch("assets/rnbo/threnodyVer4.json");
    const patcher = await rawPatcher.json();
  
    // create RNBO device
    const device = await createDevice({ context, patcher });

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

    volSlider.addEventListener('input', function(){
        device.parametersById.get("vol").value = volSlider.value/100;
        console.log(device.parametersById.get("vol").value);
    });

    runButton.addEventListener('click', function(){
        runBool = !runBool;
        console.log("click");
        if(runBool == true) {
            device.parametersById.get("run").value = 1;
            runButton.style.backgroundColor = "white"
            runButton.style.color = bgColor;
        }
        else {
            device.parametersById.get("run").value = 0;
            runButton.style.backgroundColor = bgColor;
            runButton.style.color = "white";
        }
        })

    //device.parametersById.get("testTone").value = 1;
    //device.parametersById.get("vol").value = 1;



  };

runButton.addEventListener('click', function(){
    if(context.state === "suspended"){
        context.resume();
    }
    toggledTimes++;
});

whatIsThisButton.addEventListener('click', function(){
        mainContainer.style.opacity = 0;
        document.getElementById("three-container").style.opacity = 0.1;
        document.querySelector("body").style.overflowY = "scroll";
        infoContainer.style.transform = "translateY(0vh)";
});

document.getElementById("return-button").addEventListener('click', function(){
    mainContainer.style.opacity = 1;
    document.getElementById("three-container").style.opacity = 1;
    document.querySelector("body").style.overflowY = "hidden";
    infoContainer.style.transform = "translateY(100vh)";
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})
  
  setup();