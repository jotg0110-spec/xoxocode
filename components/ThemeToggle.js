export class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initTheme();
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleTheme());
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button:hover {
          background-color: rgba(0,0,0,0.1);
        }
        :host-context([data-theme="dark"]) button:hover {
          background-color: rgba(255,255,255,0.1);
        }
      </style>
      <button aria-label="Toggle Dark Mode">🌓</button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
