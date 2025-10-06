const STORAGE_KEY = "chat_style_contacts";
let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const form = document.getElementById("entryForm");
const nameI = document.getElementById("name");
const emailI = document.getElementById("email");
const ageI = document.getElementById("age");
const genderI = document.getElementById("gender");
const notesI = document.getElementById("notes");
const tableBody = document.querySelector("#entriesTable tbody");
const countSpan = document.getElementById("count");

// Render table
function render() {
  tableBody.innerHTML = "";
  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.age}</td>
      <td>${entry.gender}</td>
      <td>${entry.notes}</td>
      <td>
        <button onclick="deleteEntry('${entry.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  countSpan.textContent = entries.length;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Add entry
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newEntry = {
    id: Date.now(),
    name: nameI.value,
    email: emailI.value,
    age: ageI.value,
    gender: genderI.value,
    notes: notesI.value
  };

  if (!newEntry.name || !newEntry.email || newEntry.age < 18) {
    alert("Please fill in all fields correctly!");
    return;
  }

  entries.push(newEntry);
  form.reset();
  render();
});

function deleteEntry(id) {
  entries = entries.filter(e => e.id != id);
  render();
}

// Clear all
document.getElementById("clearAll").addEventListener("click", () => {
  if (confirm("Clear all entries?")) {
    entries = [];
    render();
  }
});

render(); // Display stored data on load
