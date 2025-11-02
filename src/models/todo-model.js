/**
 * @module TodoModel
 * @description Manages the todo list data and business logic.
 * Implements the Observer pattern for reactive updates.
 */

export class TodoModel {
  /**
   * @param {import('../services/storage-service.js').StorageService} storageService
   */
  constructor(storageService) {
    this.storage = storageService;
    this.todos = this.storage.load('items', []);
    this.listeners = [];
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Subscribe to model changes.
   * @param {Function} listener - Function to call on state change.
   */
  subscribe(listener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  /**
   * Notify all subscribers of changes.
   */
  notify() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Add a new todo.
   * @param {string} text - The todo description.
   */
  addTodo(text) {
    if (!text || text.trim() === '') return;

    const newTodo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.push(newTodo);
    this.save();
    this.notify();
  }

  /**
   * Toggle todo completion status.
   * @param {number} id - ID of the todo.
   */
  toggleComplete(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.notify();
    }
  }

  /**
   * Delete a todo.
   * @param {number} id - ID of the todo.
   */
  deleteTodo(id) {
    const updatedTodos = this.todos.filter(todo => todo.id !== id);
    if (updatedTodos.length !== this.todos.length) {
      this.todos = updatedTodos;
      this.save();
      this.notify();
    }
  }

  /**
   * Update todo text.
   * @param {number} id - ID of the todo.
   * @param {string} newText - New text.
   */
  updateTodo(id, newText) {
    if (!newText || newText.trim() === '') return;

    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.text = newText.trim();
      this.save();
      this.notify();
    }
  }

  /**
   * Clear all completed todos.
   */
  clearCompleted() {
    const activeTodos = this.todos.filter(todo => !todo.completed);
    if (activeTodos.length !== this.todos.length) {
      this.todos = activeTodos;
      this.save();
      this.notify();
    }
  }

  /**
   * Clear all todos.
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Count of active (not completed) todos.
   * @returns {number}
   */
  get activeCount() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  /**
   * Count of completed todos.
   * @returns {number}
   */
  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

  /**
   * Persist todos to storage.
   */
  save() {
    this.storage.save('items', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}
