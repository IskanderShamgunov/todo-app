function getLocalTodoItemList(owner) {
  let todoItemList = JSON.parse(localStorage.getItem(owner));

  if (!todoItemList) {
    localStorage.setItem(owner, JSON.stringify([]));
    todoItemList = [];
  };

  return todoItemList;
};

function createLocalTodoItem({name, done}, owner) {
  if (!name) return;
  done = done || false;
  let todoItemList = JSON.parse(localStorage.getItem(owner));
  let id;

  do {
    id = Math.trunc(Math.random() * 10000);
  } while ( todoItemList.some((todo) => +todo.id === +id) )

  todoItemList.push({name, done, id});
  localStorage.setItem(owner, JSON.stringify(todoItemList));

  return {name, done, id};
};

function toggleLocalTodoItemDone(todoItem, owner) {
  todoItem.done =  !todoItem.done;

  let todoItemList = JSON.parse(localStorage.getItem(owner));
  const todoIndex = todoItemList.findIndex( (todo) => +todo.id === +todoItem.id );

  todoItemList[todoIndex].done = todoItem.done;

  localStorage.setItem(owner, JSON.stringify(todoItemList));
};

function deleteLocalTodoItem(todoItem, owner) {
  let todoItemList = JSON.parse(localStorage.getItem(owner));
  const todoIndex = todoItemList.findIndex( (todo) => +todo.id === +todoItem.id );

  todoItemList.splice(todoIndex, 1);
  localStorage.setItem(owner, JSON.stringify(todoItemList));
};

export {
  getLocalTodoItemList as getTodoItemList,
  createLocalTodoItem as createTodoItem,
  toggleLocalTodoItemDone as toggleTodoItemDone,
  deleteLocalTodoItem as deleteTodoItem,
}
