// Get createDevice from the rnbo.js library
const { createDevice } = RNBO;

// Create AudioContext
var WAContext = window.AudioContext || window.webkitAudioContext;
var context = new WAContext();

runToggle = document.getElementById("run");
volSlider = document.getElementById("vol");

const setup = async () => {
    // get exported RNBO patcher file (file name must match whatever is used during target export)
    let rawPatcher = await fetch("assets/rnbo/threnodyVer3.json");
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

    // device.parametersById.get("testTone").value = 1;

    context.resume();

  };
  
  setup();