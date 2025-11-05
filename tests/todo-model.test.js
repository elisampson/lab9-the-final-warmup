import { test } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../src/models/todo-model.js';

/**
 * Mock storage service for testing
 */
class MockStorage {
  constructor() {
    this.data = {};
  }

  save(key, value) {
    this.data[key] = value;
  }

  load(key, defaultValue) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  remove(key) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }
}

// Tests for TodoModel
test('addTodo creates a valid todo', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Test task');

  assert.strictEqual(model.todos.length, 1);
  const todo = model.todos[0];
  assert.strictEqual(todo.text, 'Test task');
  assert.strictEqual(todo.completed, false);
  assert.ok(todo.createdAt);
  assert.ok(typeof todo.id === 'number');
});


test('addTodo ignores empty or blank input', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('');
  model.addTodo('   ');
  assert.strictEqual(model.todos.length, 0);
});


test('toggleComplete switches completion state', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Toggle me');
  const id = model.todos[0].id;

  model.toggleComplete(id);
  assert.strictEqual(model.todos[0].completed, true);

  model.toggleComplete(id);
  assert.strictEqual(model.todos[0].completed, false);
});


test('deleteTodo removes the correct task', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Keep me');
  model.addTodo('Remove me');
  const removeId = model.todos[1].id;

  model.deleteTodo(removeId);
  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Keep me');
});

test('updateTodo changes the task text', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Old name');
  const id = model.todos[0].id;

  model.updateTodo(id, 'New name');
  assert.strictEqual(model.todos[0].text, 'New name');
});

test('clearCompleted removes only completed todos', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Active');
  model.addTodo('Done');
  const doneId = model.todos[1].id;

  model.toggleComplete(doneId);
  model.clearCompleted();

  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Active');
});

test('clearAll removes everything', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('One');
  model.addTodo('Two');

  model.clearAll();
  assert.strictEqual(model.todos.length, 0);
});

test('activeCount and completedCount are correct', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('One');
  model.addTodo('Two');
  model.toggleComplete(model.todos[1].id);

  assert.strictEqual(model.activeCount, 1);
  assert.strictEqual(model.completedCount, 1);
});

/* so few tests! I guess you can say you have testing, but it isn't meaningful.
   Also where are our end to end tests!?! */
