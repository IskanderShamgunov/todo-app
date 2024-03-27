function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.textContent = title;
  return appTitle;
};

function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
};

function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};

function createTodoItemElement(todoItem, owner, {onDone, onDelete}) {
  const doneClass = 'list-group-item-success';

  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  if (todoItem.done) item.classList.add(doneClass);
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', function() {
    onDone(todoItem, owner);
    if (todoItem.done) {
      item.classList.add(doneClass);
    } else {
      item.classList.remove(doneClass);
    }
  });

  deleteButton.addEventListener('click', function() {
    if (!confirm('Вы уверены?')) return;
    onDelete(todoItem, owner);
    item.remove();
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
};

function createStorageToggleBtn(toggleMode) {
  let mode = localStorage.getItem('storageMode') || 'local';
  const localModeText = 'Перейти на серверное хранилище';
  const serverModeText = 'Перейти на локальное хранилище';

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-primary', 'mb-3');
  btn.textContent = (mode === 'local') ? localModeText : serverModeText;

  btn.addEventListener('click', function() {
    toggleMode(mode);
    this.textContent = (mode === 'local') ? localModeText : serverModeText;
  });

  return btn;
};

async function createTodoApp(container, {
  title,
  owner,
  todoItemList,
  createTodoItem,
  toggleTodoItemDone,
  deleteTodoItem,
  toggleMode,
  }) {

  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const storageToggleBtn = createStorageToggleBtn(toggleMode);
  const todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(storageToggleBtn);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemForm.button.disabled = true;

  const handlers = {
    onDone: toggleTodoItemDone,
    onDelete: deleteTodoItem,
  };

  todoItemList.forEach((todoItem) => {
    const todoElement = createTodoItemElement(todoItem, owner, handlers);
    todoList.append(todoElement);
  });

  todoItemForm.input.addEventListener('input', function() {
    if(todoItemForm.input.value) {
      todoItemForm.button.disabled = false;
    } else {
      todoItemForm.button.disabled = true;
    };
  });

  todoItemForm.form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if(!todoItemForm.input.value) {
      return;
    };

    const todoItem = await createTodoItem({name: todoItemForm.input.value, done: false}, owner);
    const todoElement = createTodoItemElement(todoItem, owner, handlers);
    todoList.append(todoElement);

    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
  });

};

export { createTodoApp };
