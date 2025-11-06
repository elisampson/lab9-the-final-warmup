import { LitElement, html, css } from 'lit';
import './todo-item.js';

/**
 * `<todo-list>` component.
 * Renders a scrollable list of `<todo-item>` components.
 *
 * Emits (for each item):
 * - `toggle-todo`: CustomEvent<{ id: number }>
 * - `update-todo`: CustomEvent<{ id: number, text: string }>
 * - `delete-todo`: CustomEvent<{ id: number }> (currently unused)
 */
export class TodoList extends LitElement {
  static properties = {
    /** Array of todo items to display */
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
    /** @type {Array<Object>} */
    this.todos = [];
  }

  /**
   * Renders the list of todo items or an empty state message.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    if (this.todos.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <p>No todos yet. Add one above!</p>
        </div>
      `;
    }

    return html`
      <div class="list-container">
        ${this.todos.map(todo => html`
          <todo-item
            .todo=${todo}
            @toggle-todo=${(e) => this._forwardEvent(e)}
            @delete-todo=${(e) => this._forwardEvent(e)}
            @update-todo=${(e) => this._forwardEvent(e)}
          ></todo-item>
        `)}
      </div>
    `;
  }

  /**
   * Forwards custom events from children to parent.
   * @param {CustomEvent} e
   * @private
   */
  _forwardEvent(e) {
    this.dispatchEvent(new CustomEvent(e.type, {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('todo-list', TodoList);
