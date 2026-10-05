const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
    notesList.textContent = "";

    notes.forEach(note => {
        const li = document.createElement("li");

        li.classList.add("note-card");
        li.classList.add(`category-${note.category}`);

        const text = document.createElement("p");
        text.textContent = note.text;

        const category = document.createElement("small");
        category.textContent = `Category: ${note.category}`;

        const date = document.createElement("small");
        date.textContent = ` | ${note.createdAt}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        li.appendChild(text);
        li.appendChild(category);
        li.appendChild(date);
        li.appendChild(document.createElement("br"));
        li.appendChild(deleteBtn);

        notesList.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = {
        id: Date.now(),
        text: noteInput.value,
        category: categorySelect.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    render();

    noteInput.value = "";
});