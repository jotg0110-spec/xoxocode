export class ContactForm extends HTMLElement {
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
          background-color: var(--surface-light, #ffffff);
          padding: 2rem;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          max-width: 500px;
          margin: 0 auto;
          text-align: left;
        }

        :host-context([data-theme="dark"]) :host {
             background-color: var(--surface-light, #1e1e1e);
        }

        h2 { margin-bottom: 1.5rem; color: var(--text-light); }
        
        .form-group { margin-bottom: 1rem; }
        
        label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-light); }
        
        input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 8px;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.02);
            color: var(--text-light);
            font-family: inherit;
            transition: all 0.2s;
        }

        :host-context([data-theme="dark"]) input, 
        :host-context([data-theme="dark"]) textarea {
            background-color: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--text-light);
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: var(--primary, #6200ea);
            box-shadow: 0 0 0 3px rgba(98, 0, 234, 0.1);
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: var(--primary, #6200ea);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }

        button:hover {
            background-color: var(--primary-light, #7c4dff);
        }
      </style>
      <h2>Partnership Inquiry</h2>
      <form action="https://formspree.io/f/mykjrlaw" method="POST">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Inquiry</button>
      </form>
    `;
  }
}

customElements.define('contact-form', ContactForm);
