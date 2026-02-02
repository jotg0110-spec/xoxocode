export class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.highlightActiveLink();
  }

  highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: var(--surface-light, #ffffff);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          justify-content: center; /* Center logic for small layout */
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-light, #333);
          font-weight: 600;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          background-color: rgba(0,0,0,0.05);
          color: var(--primary, #6200ea);
        }

        .nav-link.active {
          color: var(--primary, #6200ea);
          background-color: rgba(98, 0, 234, 0.05);
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background-color: var(--primary, #6200ea);
          border-radius: 3px;
        }
        
        /* Dark Mode Handling */
        :host-context([data-theme="dark"]) :host {
             background: var(--surface-light, #1e1e1e); /* In dark mode variable swaps */
             border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        :host-context([data-theme="dark"]) .nav-link {
            color: var(--text-light, #e0e0e0);
        }

        :host-context([data-theme="dark"]) .nav-link:hover {
             background-color: rgba(255,255,255,0.1);
        }
        
        /* Mobile */
        @media (max-width: 600px) {
            nav {
                gap: 0.5rem;
                padding: 0.5rem;
            }
            .nav-link {
                font-size: 0.9rem;
                padding: 0.4rem 0.8rem;
            }
        }
      </style>
      <nav>
        <a href="index.html" class="nav-link">Fortune Cookie</a>
        <a href="animal.html" class="nav-link">Animal Face Test</a>
        <a href="voice.html" class="nav-link">Voice Zoo</a>
        <slot name="toggle"></slot>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
