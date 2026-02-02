export class FortuneCookie extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fortunes = [
        "A beautiful, smart, and loving person will be coming into your life.",
        "A dubious friend may be an enemy in camouflage.",
        "A faithful friend is a strong defense.",
        "A feather in the hand is better than a bird in the air.",
        "A fresh start will put you on your way.",
        "A friend asks only for your time not your money.",
        "A friend is a present you give yourself.",
        "A gambler not only will lose what he has, but also will lose what he doesn’t have.",
        "A golden egg of opportunity falls into your lap this month.",
        "A good time to finish up old tasks.",
        "A hunch is creativity trying to tell you something.",
        "A lifetime of happiness lies ahead of you.",
        "A light heart carries you through all the hard times."
    ];
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.getElementById('fortune-button').addEventListener('click', () => this.getFortune());
    this.shadowRoot.getElementById('cookie').addEventListener('click', () => this.getFortune());
  }

  getFortune() {
    const randomIndex = Math.floor(Math.random() * this.fortunes.length);
    const textElement = this.shadowRoot.getElementById('fortune-text');
    
    // Simple animation effect
    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.textContent = this.fortunes[randomIndex];
        textElement.style.opacity = 1;
    }, 200);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--surface-light, #ffffff);
          padding: 3rem;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        :host-context([data-theme="dark"]) :host {
             background-color: var(--surface-light, #1e1e1e);
             box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        :host:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        h1 {
            color: var(--primary, #6200ea);
            margin-bottom: 2rem;
            font-size: 2rem;
        }

        .cookie-container {
            margin: 2rem 0;
        }

        img {
            width: 150px;
            cursor: pointer;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
        }

        img:hover {
            transform: scale(1.1) rotate(5deg);
        }
        
        img:active {
            transform: scale(0.95);
        }

        #fortune-text {
            font-size: 1.25rem;
            min-height: 4em;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-light, #333);
            margin-bottom: 2rem;
            font-style: italic;
            transition: opacity 0.2s ease;
        }
        
        :host-context([data-theme="dark"]) #fortune-text {
            color: var(--text-light, #e0e0e0);
        }

        button {
            background-color: var(--primary, #6200ea);
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(98, 0, 234, 0.3);
        }

        button:hover {
            background-color: var(--primary-light, #7c4dff);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(98, 0, 234, 0.4);
        }

        button:active {
            transform: translateY(0);
        }
      </style>
      
      <h1>Fortune Cookie</h1>
      <div class="cookie-container">
          <img src="cookie.svg" alt="Fortune Cookie" id="cookie">
      </div>
      <p id="fortune-text">Click the cookie to get your fortune!</p>
      <button id="fortune-button">Get Fortune</button>
    `;
  }
}

customElements.define('fortune-cookie', FortuneCookie);
