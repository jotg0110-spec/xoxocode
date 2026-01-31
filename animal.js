// Link to your Teachable Machine model
// IMPORTANT: Replace this URL with your own model URL!
const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";

let model, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        document.getElementById('loading').style.display = 'block';
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        document.getElementById('loading').style.display = 'none';
        console.log("Model Loaded");
    } catch (e) {
        document.getElementById('loading').textContent = "Error loading model. Please check the URL in animal.js";
        console.error(e);
    }
}

// Initialize model when page loads
init();

const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const uploadLabel = document.querySelector('.upload-label');
const predictButton = document.getElementById('predict-button');
const labelContainer = document.getElementById('label-container');

// Handle Image Upload
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadLabel.style.display = 'none';
            predictButton.style.display = 'inline-block';
            labelContainer.innerHTML = ""; // Clear previous results
        }
        reader.readAsDataURL(file);
    }
});

// Handle Prediction
predictButton.addEventListener('click', async function() {
    if (!model) {
        alert("Model is still loading, please wait...");
        return;
    }
    await predict();
});

async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(imagePreview);
    
    // Sort predictions by probability (highest first)
    prediction.sort((a, b) => b.probability - a.probability);

    labelContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(1) + "%";
        
        // Create result bars
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

// Reuse theme logic from main.js (simplified)
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
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
}
