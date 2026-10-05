const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

let notes = [];

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

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

        deleteBtn.addEventListener("click", () => {
            notes = notes.filter(n => n.id !== note.id);
            render();
            updateCount();
        });

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

    const text = noteInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const note = {
        id: Date.now(),
        text: text,
        category: categorySelect.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    render();
    updateCount();

    noteInput.value = "";
});

updateCount();