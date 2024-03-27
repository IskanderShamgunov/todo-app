async function getServerTodoItemList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  const data = await response.json();
  return data;
}

async function createServerTodoItem({name, done}, owner) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name,
      done,
      owner,
    }),
  });
  const data = await response.json();
  return data;
};

function toggleServerTodoItemDone(todoItem) {
  todoItem.done = !todoItem.done;

  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ done: todoItem.done }),
  });
};

function deleteServerTodoItem(todoItem) {
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  });
};

export {
  getServerTodoItemList as getTodoItemList,
  createServerTodoItem as createTodoItem,
  toggleServerTodoItemDone as toggleTodoItemDone,
  deleteServerTodoItem as deleteTodoItem,
}
