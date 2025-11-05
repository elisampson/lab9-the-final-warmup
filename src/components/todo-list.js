import { LitElement, html, css } from 'lit';
import './todo-item.js';

/**
 * Displays a list of todo items.
 */
export class TodoList extends LitElement {
  static properties = {
    todos: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: white;
      font-size: 18px;
    }

    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .list-container {
      max-height: 500px;
      overflow-y: auto;
    }

    .list-container::-webkit-scrollbar {
      width: 8px;
    }

    .list-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .list-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }

    .list-container::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `;

  constructor() {
    super();
    this.todos = [];
  }

  render() {
  // Show placeholder when there are no todos
  if (this.todos.length === 0) {
    return html`
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p>No todos yet. Add one above!</p>
      </div>
    `;
  }
  
  // Render todo-item components when todos are present
  return html`
    <div class="list-container">
      ${this.todos.map(todo => html`
        <todo-item
          .todo=${todo}
          @toggle-todo=${(e) => this.dispatchEvent(new CustomEvent('toggle-todo', { detail: e.detail, bubbles: true, composed: true }))}
          @delete-todo=${(e) => this.dispatchEvent(new CustomEvent('delete-todo', { detail: e.detail, bubbles: true, composed: true }))}
          @update-todo=${(e) => this.dispatchEvent(new CustomEvent('update-todo', { detail: e.detail, bubbles: true, composed: true }))}
        ></todo-item>
      `)}
    </div>
  `;
}


  _forwardEvent(e) {
    this.dispatchEvent(new CustomEvent(e.type, {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('todo-list', TodoList);
