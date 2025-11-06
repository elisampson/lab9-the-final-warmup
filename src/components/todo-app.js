import { LitElement, html, css } from 'lit';
import { TodoModel } from '../models/todo-model.js';
import { StorageService } from '../services/storage-service.js';
import './todo-form.js';
import './todo-list.js';

/**
 * Main Todo App component.
 * Manages todos, renders UI, and handles user interactions.
 */
export class TodoApp extends LitElement {
  static properties = {
    /** List of todos */
    todos: { state: true },

    /** Count of active todos */
    activeCount: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .app-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      padding: 32px;
      min-height: 400px;
    }

    h1 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 32px;
      font-weight: 700;
      text-align: center;
    }

    .subtitle {
      color: #666;
      margin-bottom: 24px;
      font-size: 14px;
      text-align: center;
    }

    .stats {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    button {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      background: #f44336;
      color: white;
    }

    button:hover {
      background: #da190b;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  `;

  constructor() {
    super();
    this.storageService = new StorageService();
    this.model = new TodoModel(this.storageService);
    this._syncModel();
  }

  _syncModel() {
    this.todos = [...this.model.todos];
    this.activeCount = this.todos.length;
  }

  /**
   * Adds a new todo item.
   * @param {CustomEvent<{text: string}>} e - Event containing new todo text.
   */
  handleAdd = (e) => {
    this.model.addTodo(e.detail.text);
    this.storageService.save(this.model.todos);
    this._syncModel();
  };

  /**
   * Deletes a todo item.
   * @param {CustomEvent<{id: number}>} e - Event containing the ID to delete.
   */
  handleToggle = (e) => {
    this.model.deleteTodo(e.detail.id);
    this.storageService.save(this.model.todos);
    this._syncModel();
  };

  /**
   * Updates an existing todo item's text.
   * @param {CustomEvent<{id: number, text: string}>} e - Event with updated text.
   */
  handleUpdate = (e) => {
    this.model.updateTodo(e.detail.id, e.detail.text);
    this.storageService.save(this.model.todos);
    this._syncModel();
  };

  /**
   * Clears all todos with user confirmation.
   */
  handleClearAll = () => {
    if (confirm('Clear ALL todos? This cannot be undone.')) {
      this.model.clearAll();
      this.storageService.save(this.model.todos);
      this._syncModel();
    }
  };

  /**
   * Renders the UI for the todo app.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div class="app-container">
        <h1>My Tasks</h1>
        <p class="subtitle">Stay organized and productive</p>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">${this.todos.length}</div>
            <div class="stat-label">Total</div>
          </div>
        </div>

        <todo-form @add-todo=${this.handleAdd}></todo-form>

        <todo-list
          .todos=${this.todos}
          @toggle-todo=${this.handleToggle}
          @update-todo=${this.handleUpdate}>
        </todo-list>

        <div class="actions">
          <button
            @click=${this.handleClearAll}
            ?disabled=${this.todos.length === 0}>
            Clear All
          </button>
        </div>

        <div class="footer">
          Lab 9: The final battle!
        </div>
      </div>
    `;
  }
}

customElements.define('todo-app', TodoApp);
