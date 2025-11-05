import { LitElement, html, css } from 'lit';

/**
 * Form for adding a new todo item.
 */
export class TodoForm extends LitElement {
  static properties = {
    text: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 24px;
    }

    form {
      display: flex;
      gap: 8px;
    }

    input[type="text"] {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    button {
      padding: 10px 16px;
      background: #4caf50;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #388e3c;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.text = '';
  }

  handleInput(e) {
    this.text = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    const trimmed = this.text.trim();
    if (trimmed) {
      this.dispatchEvent(new CustomEvent('add-todo', {
        detail: { text: trimmed },
        bubbles: true,
        composed: true
      }));
      this.text = '';
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          type="text"
          .value=${this.text}
          placeholder="Add a new task..."
          @input=${this.handleInput}
          aria-label="Add new task"
          autofocus
        />
        <button type="submit" ?disabled=${!this.text.trim()}>Add</button>
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);
