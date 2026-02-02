export class AnimalFaceTest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.model = null;
    this.maxPredictions = 0;
    this.URL = "./my_model/";
  }

  async connectedCallback() {
    this.render();
    this.setupEventListeners();
    await this.initModel();
  }

  async initModel() {
    const loadingEl = this.shadowRoot.getElementById('loading');
    const modelURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    try {
        if(window.tmImage) {
             this.model = await tmImage.load(modelURL, metadataURL);
             this.maxPredictions = this.model.getTotalClasses();
             loadingEl.style.display = 'none';
             console.log("Model Loaded");
        } else {
             // Retry if script is not yet loaded
             setTimeout(() => this.initModel(), 500);
        }
    } catch (e) {
        loadingEl.textContent = "Error loading model. Check console.";
        console.error(e);
    }
  }

  setupEventListeners() {
    const imageUpload = this.shadowRoot.getElementById('image-upload');
    const predictButton = this.shadowRoot.getElementById('predict-button');

    imageUpload.addEventListener('change', (e) => this.handleImageUpload(e));
    predictButton.addEventListener('click', () => this.predict());
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        const imagePreview = this.shadowRoot.getElementById('image-preview');
        const uploadLabel = this.shadowRoot.querySelector('.upload-label');
        const predictButton = this.shadowRoot.getElementById('predict-button');
        const labelContainer = this.shadowRoot.getElementById('label-container');

        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadLabel.style.display = 'none';
            predictButton.style.display = 'inline-block';
            labelContainer.innerHTML = "";
        }
        reader.readAsDataURL(file);
    }
  }

  async predict() {
    if (!this.model) {
        alert("Model is still loading...");
        return;
    }
    const imagePreview = this.shadowRoot.getElementById('image-preview');
    const prediction = await this.model.predict(imagePreview);
    prediction.sort((a, b) => b.probability - a.probability);

    this.displayResults(prediction);
  }

  displayResults(prediction) {
    const labelContainer = this.shadowRoot.getElementById('label-container');
    labelContainer.innerHTML = "";

    for (let i = 0; i < this.maxPredictions; i++) {
        const percent = (prediction[i].probability * 100);
        
        const item = document.createElement('div');
        item.className = 'result-item';
        
        // Dynamic color for the top result
        const color = i === 0 ? 'var(--primary, #6200ea)' : '#ccc';
        
        item.innerHTML = `
            <span class="label">${prediction[i].className}</span>
            <div class="bar-container">
                <div class="bar" style="width: ${percent}%; background-color: ${color}"></div>
            </div>
            <span class="percent">${percent.toFixed(0)}%</span>
        `;
        labelContainer.appendChild(item);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--surface-light, #ffffff);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          max-width: 600px;
          margin: 0 auto;
        }
        
        :host-context([data-theme="dark"]) :host {
             background-color: var(--surface-light, #1e1e1e);
        }

        h1 { color: var(--primary); margin-bottom: 1rem; }
        p { color: var(--text-muted); margin-bottom: 1.5rem; }

        .upload-container {
            border: 2px dashed var(--text-muted);
            border-radius: 12px;
            padding: 2rem;
            cursor: pointer;
            transition: all 0.3s;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0,0,0,0.02);
        }

        .upload-container:hover {
            border-color: var(--primary);
            background-color: rgba(98, 0, 234, 0.05);
        }

        .upload-icon { font-size: 3rem; margin-bottom: 1rem; }
        
        #image-preview {
            max-width: 100%;
            max-height: 300px;
            border-radius: 10px;
            box-shadow: var(--shadow-md);
        }

        #predict-button {
            margin-top: 1.5rem;
            background-color: var(--primary);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
        }
        
        #predict-button:hover {
            background-color: var(--primary-light);
            transform: translateY(-2px);
        }

        .result-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-weight: 500;
        }
        
        .label { width: 80px; text-align: left; }
        
        .bar-container {
            flex: 1;
            height: 12px;
            background-color: rgba(0,0,0,0.1);
            border-radius: 6px;
            margin: 0 12px;
            overflow: hidden;
        }
        
        .bar {
            height: 100%;
            border-radius: 6px;
            transition: width 0.5s ease-out;
        }
        
        .percent { width: 40px; text-align: right; font-variant-numeric: tabular-nums; }

        /* Spinner for loading */
        #loading { font-weight: bold; color: var(--accent, orange); }

      </style>
      
      <h1>Animal Face Test</h1>
      <p>Upload a photo to see if it looks more like a Dog or a Cat!</p>
      
      <div class="upload-container">
          <input type="file" id="image-upload" accept="image/*" hidden>
          <label for="image-upload" class="upload-label" style="display:flex; flex-direction:column; align-items:center;">
              <div class="upload-icon">📸</div>
              <span>Click to Upload Image</span>
          </label>
          <img id="image-preview" src="#" alt="Image Preview" style="display: none;">
      </div>

      <div id="loading">Loading AI Model...</div>
      
      <div id="label-container" class="result-container"></div>
      
      <button id="predict-button" style="display: none;">Analyze Face</button>
    `;
  }
}

customElements.define('animal-face-test', AnimalFaceTest);
