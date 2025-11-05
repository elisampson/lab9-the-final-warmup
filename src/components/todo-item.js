import { LitElement, html, css } from 'lit';

export class TodoItem extends LitElement {
  static properties = {
    todo: { type: Object },
    isEditing: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 8px;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: white;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }

    .text {
      flex: 1;
      font-size: 16px;
    }

    .completed {
      text-decoration: line-through;
      color: #888;
    }

    button {
      padding: 4px 8px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .edit {
      background: #2196f3;
      color: white;
    }

    input[type="text"] {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
  `;

  constructor() {
    super();
    this.isEditing = false;
  }

  completeAndRemove() {
    // Treat checking the box as deletion
    this.dispatchEvent(new CustomEvent('toggle-todo', {
      detail: { id: this.todo.id },
      bubbles: true,
      composed: true
    }));
  }

  startEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit(e) {
    const newText = e.target.value.trim();
    if (newText && newText !== this.todo.text) {
      this.dispatchEvent(new CustomEvent('update-todo', {
        detail: { id: this.todo.id, text: newText },
        bubbles: true,
        composed: true
      }));
    }
    this.isEditing = false;
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      this.saveEdit(e);
    } else if (e.key === 'Escape') {
      this.cancelEdit();
    }
  }

  render() {
    return html`
      <div class="todo-item">
        <input
          type="checkbox"
          @change=${this.completeAndRemove}
        />
        ${this.isEditing
          ? html`
              <input
                type="text"
                .value=${this.todo.text}
                @keydown=${this.handleKey}
                @blur=${this.saveEdit}
              />
            `
          : html`
              <span class="text">
                ${this.todo.text}
              </span>
              <button
                class="edit"
                @click=${this.startEdit}>
                Edit
              </button>
            `}
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
