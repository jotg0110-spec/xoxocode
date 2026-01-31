// IMPORTANT: Place your model.json and metadata.json inside the 'my_model' folder
// The 'my_model' folder should be in the same directory as animal.html
const URL = "./my_model/";

let model, webcam, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        document.getElementById('loading').style.display = 'block';
        // Load the model
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        document.getElementById('loading').style.display = 'none';

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        console.log("Model and Webcam Loaded");
        document.getElementById("start-webcam-button").style.display = 'none'; // Hide start button after init
    } catch (e) {
        document.getElementById('loading').textContent = "Error loading model or webcam. Check console for details. Ensure 'my_model' folder exists with model.json and metadata.json.";
        console.error("Error during init:", e);
    }
}

async function loop() {
    if (webcam) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }
}

// run the webcam image through the image model
async function predict() {
    if (!model || !webcam) return;
    const prediction = await model.predict(webcam.canvas);
    
    prediction.sort((a, b) => b.probability - a.probability); // Sort to show highest probability first

    const labelContainer = document.getElementById('label-container');
    labelContainer.innerHTML = ""; // Clear previous results

    for (let i = 0; i < maxPredictions; i++) {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        
        const label = document.createElement("span");
        label.className = "result-label";
        label.textContent = prediction[i].className;
        
        const barContainer = document.createElement("div");
        barContainer.className = "bar-container";
        
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = (prediction[i].probability * 100) + "%";
        
        // Dynamic colors for top result
        if (i === 0) {
            bar.style.backgroundColor = "var(--button-bg)";
        } else {
            bar.style.backgroundColor = "#ccc";
        }

        const percentage = document.createElement("span");
        percentage.className = "result-percentage";
        percentage.textContent = (prediction[i].probability * 100).toFixed(0) + "%";

        barContainer.appendChild(bar);
        resultItem.appendChild(label);
        resultItem.appendChild(barContainer);
        resultItem.appendChild(percentage);
        
        labelContainer.appendChild(resultItem);
    }
}


// Theme Toggle Logic (replicated from main.js for this page's button)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    // Apply theme on load for this specific page too
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
}