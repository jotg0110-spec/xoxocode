export class VoiceZoo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.recognizer = null;
    // URL for the Teachable Machine Audio Model
    this.URL = "https://teachablemachine.withgoogle.com/models/GPwZz1RDP/"; 
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.getElementById('start-btn').addEventListener('click', () => this.init());
    this.shadowRoot.getElementById('retry-btn').addEventListener('click', () => this.resetGame());
  }

  async createModel() {
    const checkpointURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    const recognizer = speechCommands.create(
        "BROWSER_FFT", 
        undefined, 
        checkpointURL, 
        metadataURL);

    await recognizer.ensureModelLoaded();
    return recognizer;
  }

  async init() {
    const startBtn = this.shadowRoot.getElementById("start-btn");
    const statusMsg = this.shadowRoot.getElementById("status-msg");
    
    startBtn.disabled = true;
    startBtn.innerText = "👂 Listening...";
    startBtn.style.backgroundColor = "#9e9e9e"; 
    statusMsg.innerText = "The AI is listening...";

    if (!this.recognizer) {
        this.recognizer = await this.createModel();
    }

    const classLabels = this.recognizer.wordLabels(); 
    const labelContainer = this.shadowRoot.getElementById("label-container");
    
    labelContainer.innerHTML = ""; 
    for (let i = 0; i < classLabels.length; i++) {
        if(classLabels[i] === "배경 소음") continue;

        const wrapper = document.createElement("div");
        wrapper.className = "label-container";
        
        const name = document.createElement("div");
        name.innerText = classLabels[i];
        name.style.width = "100px";
        name.style.textAlign = "right";

        const barBg = document.createElement("div");
        barBg.className = "bar-bg";
        const barFill = document.createElement("div");
        barFill.className = "bar-fill";
        barFill.id = "bar-" + i;
        
        barBg.appendChild(barFill);
        wrapper.appendChild(name);
        wrapper.appendChild(barBg);
        labelContainer.appendChild(wrapper);
    }

    this.recognizer.listen(result => {
        const scores = result.scores;
        
        for (let i = 0; i < classLabels.length; i++) {
            if(classLabels[i] === "배경 소음") continue;

            const probability = scores[i] * 100;
            const barElement = this.shadowRoot.getElementById("bar-" + i);
            
            if(!barElement) continue;

            barElement.style.width = probability + "%";
            
            // Success Condition > 85%
            if (probability > 85) {
                barElement.style.backgroundColor = "var(--secondary, #00bfa5)"; 
                
                this.recognizer.stopListening(); 
                this.showSuccess(classLabels[i]); 
                return;
            } else {
                barElement.style.backgroundColor = "var(--primary, #6200ea)"; 
            }
        }
    }, {
        includeSpectrogram: false,
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
    });
  }

  showSuccess(className) {
    const resultArea = this.shadowRoot.getElementById("result-area");
    const resultImg = this.shadowRoot.getElementById("result-img");
    const resultText = this.shadowRoot.getElementById("result-text");
    const startBtn = this.shadowRoot.getElementById("start-btn");

    resultImg.src = "images/" + className.toLowerCase() + ".svg"; 
    resultText.innerText = "🎉 " + className + " Unlocked!";
    
    startBtn.style.display = "none";
    resultArea.style.display = "block";
    
    this.shadowRoot.getElementById("status-msg").innerText = "Wow! Spot on!";
  }

  resetGame() {
    const resultArea = this.shadowRoot.getElementById("result-area");
    const startBtn = this.shadowRoot.getElementById("start-btn");
    const labelContainer = this.shadowRoot.getElementById("label-container");

    resultArea.style.display = "none";

    startBtn.style.display = "inline-block";
    startBtn.disabled = false;
    startBtn.innerText = "🎤 Start Challenge";
    startBtn.style.backgroundColor = ""; 
    
    this.shadowRoot.getElementById("status-msg").innerText = "Press the button and mimic the sound!";
    labelContainer.innerHTML = ""; 
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
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }
        
        :host-context([data-theme="dark"]) :host {
             background-color: var(--surface-light, #1e1e1e);
        }

        h1 { font-size: 2rem; margin-bottom: 10px; color: var(--primary, #6200ea); }
        .status { font-size: 1.2rem; color: var(--text-muted, #757575); margin-bottom: 20px; }
        
        #result-area {
            display: none;
            margin: 20px 0;
            padding: 20px;
            background-color: rgba(0,0,0,0.03);
            border-radius: 15px;
        }
        #result-img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 5px solid var(--accent, #ff6d00);
            object-fit: cover;
            margin-bottom: 15px;
        }
        #result-text {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--accent, #ff6d00);
            margin-bottom: 20px;
        }

        .label-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 8px 0;
            font-weight: bold;
            font-size: 0.9rem;
        }
        .bar-bg {
            flex-grow: 1;
            height: 15px;
            background-color: rgba(0,0,0,0.1);
            border-radius: 10px;
            margin-left: 10px;
            overflow: hidden;
        }
        .bar-fill {
            height: 100%;
            background-color: var(--primary);
            width: 0%;
            transition: width 0.1s;
        }
        
        .main-btn {
            background-color: var(--accent, #ff6d00);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            transition: all 0.2s;
            display: inline-block;
        }
        
        .main-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .main-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .retry-btn {
            background-color: var(--secondary, #00bfa5);
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.3rem;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: var(--shadow-sm);
        }
        .retry-btn:hover {
             filter: brightness(1.1);
        }

      </style>
      
      <h1>🐶 Voice Zoo</h1>
      <p class="status" id="status-msg">Press the button and mimic the sound!</p>
      
      <button id="start-btn" class="main-btn">🎤 Start Challenge</button>
      
      <div id="result-area">
          <img id="result-img" src="" alt="Success Animal">
          <div id="result-text">Congratulations!</div>
          
          <button id="retry-btn" class="retry-btn">↻ Try Again</button>
      </div>

      <div id="label-container" style="margin-top: 20px;"></div>
    `;
  }
}

customElements.define('voice-zoo', VoiceZoo);
