# Lab 9: Task Manager

## Overview

This project is a refactored and enhanced **Task Management Web App** built using Lit web components. The purpose of this lab was to take AI-generated “brownfield” code and demonstrate professional development practices including:

- Refactoring brownfield code
- Functional and UI improvements 
- Unit and E2E testing
- Linting and formatting
- Documentation

## Project Goals 
By the end of this lab, we achieved:

1. A fully functional task manager
2. Enhanced interactivity
3. A UI built with Lit and web components 
4. An organized repo structure with doc generation, JSDoc, and testing

## Task Manager Features

- Adding tasks
- Tracking total tasks
- Deleting tasks by checking them (changed from the original where there was a delete button, and components for completed tasks)
- Clearing all tasks
- Keayboard accessible

## Development Approach
This project was developed through progressive enhancement:

1. Initial analysis of AI-generated code
2. File reorganization into components, models, and services
3. Code refactoring and linting
4. Documentation added with JSDoc + ADR
5. Unit tests reviewed and improved
6. E2E testing setup using Playwright 
7. UI/UX improvements and accessibility fixes
8. GitHub Issues used for all planning and implementation

## Design Decisions

- A main change that was done from the original was the way tasks are handled when completed. In my version clicking the checkmark will get rid of the task from the list as it is now completed. This gets rid of the delete button along with the tracker for completed tasks.
- Also decided to keep using lit since the code was functional with it. It helps enforce encapsulation through scoped styles and custom elements.

## Repository Structure
lab9-the-final-warmup/
├── src/
│ ├── components/
│ │ ├── todo-app.js
│ │ ├── todo-form.js
│ │ ├── todo-item.js
│ │ └── todo-list.js
│ ├── models/
│ │ └── todo-model.js
│ ├── services/
│ │ └── storage-service.js
│ ├── index.html
│ └── styles.css
├── tests/
│ ├── todo-model.test.js
│ └── todo.e2e.spec.js
├── test-results/
├── docs/
├── README.md
├── LICENSE
├── package.json
├── vite.config.js
└── playwright.config.js


## License
This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Author
William Sampson