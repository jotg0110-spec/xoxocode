export class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: var(--surface-light, #ffffff);
          border-top: 1px solid rgba(0,0,0,0.05);
          margin-top: auto;
          padding: 2rem 0;
        }
        
        :host-context([data-theme="dark"]) :host {
            background-color: var(--surface-light, #1e1e1e);
            border-top: 1px solid rgba(255,255,255,0.05);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          padding: 0 1rem;
        }

        p {
          color: var(--text-muted, #757575);
          margin-bottom: 1rem;
        }

        .links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        a {
          color: var(--text-light, #333);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        
        :host-context([data-theme="dark"]) a {
             color: var(--text-light, #e0e0e0);
        }

        a:hover {
          color: var(--primary, #6200ea);
          text-decoration: underline;
        }
      </style>
      <div class="container">
        <p>&copy; 2026 Fortune Cookie App. All rights reserved.</p>
        <div class="links">
            <a href="index.html">Home</a>
            <a href="animal.html">Animal Test</a>
            <a href="voice.html">Voice Zoo</a>
            <a href="privacy.html">Privacy Policy</a>
        </div>
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
