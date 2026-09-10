const bookList = document.querySelector("ul");
const addBookForm = document.querySelector("#add-task");
const input = document.querySelector("#add-task input");
const searchBooks = document.querySelector("#search-books");
const searchInput = searchBooks.querySelector("input");

const STORAGE_KEY = "todo-tasks";

const defaultTasks = [
  { name: "Read Python FastApi", completed: false },
  { name: "Make my hair", completed: false },
  { name: "Sleep", completed: false },
  { name: "Sleep", completed: false }
];

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultTasks;
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getTasksFromDOM() {
  return [...bookList.children].map((li) => ({
    name: li.querySelector(".name").textContent,
    completed: li.querySelector(".name").classList.contains("completed")
  }));
}

function renderTasks(tasks) {
  bookList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    const deleteSpan = document.createElement("span");
    const checkSpan = document.createElement("span");

    nameSpan.className = "name";
    if (task.completed) nameSpan.classList.add("completed");
    nameSpan.textContent = task.name;

    deleteSpan.className = "delete";
    deleteSpan.textContent = "delete";

    checkSpan.className = "check";
    if (task.completed) checkSpan.classList.add("checked");
    checkSpan.textContent = task.completed ? "✓ done" : "check";

    li.appendChild(nameSpan);
    li.appendChild(deleteSpan);
    li.appendChild(checkSpan);
    bookList.appendChild(li);
  });
}

renderTasks(loadTasks());

bookList.addEventListener("click", (event) => {
  if (event.target.className === "delete") {
    event.target.parentElement.remove();
    saveTasks(getTasksFromDOM());
  }

  if (event.target.classList.contains("check")) {
    const nameSpan = event.target.parentElement.querySelector(".name");
    const isNowCompleted = nameSpan.classList.toggle("completed");
    event.target.classList.toggle("checked", isNowCompleted);
    event.target.textContent = isNowCompleted ? "✓ done" : "check";
    saveTasks(getTasksFromDOM());
  }
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookName = input.value.trim().toLowerCase();

  if (bookName === "") {
    alert("Please enter a task!");
    return;
  }

  const tasks = getTasksFromDOM();
  tasks.push({ name: bookName, completed: false });
  renderTasks(tasks);
  saveTasks(tasks);

  input.value = "";
});

searchBooks.addEventListener("submit", (e) => e.preventDefault());

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  [...bookList.children].forEach((li) => {
    const name = li.querySelector(".name").textContent.toLowerCase();
    li.style.display = name.includes(query) ? "" : "none";
  });
});