const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener('click', () => {
  addNewNote();
  updateLS();
});

function addNewNote(text = '') {
  const note = document.createElement('div');
  const toolsDiv = document.createElement('div');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const mainDiv = document.createElement('div');
  const textarea = document.createElement('textarea');

  note.classList.add('note');

  toolsDiv.classList.add('tools');
  note.appendChild(toolsDiv);

  editButton.classList.add('edit');
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.addEventListener('click', () => {
    mainDiv.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
  });
  toolsDiv.appendChild(editButton);

  deleteButton.classList.add('delete');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.addEventListener('click', () => {
    note.remove();
    updateLS();
  });
  toolsDiv.appendChild(deleteButton);

  if (!text) {
    mainDiv.classList.add('hidden');
  }
  mainDiv.innerHTML = marked(text);
  note.appendChild(mainDiv);

  if (text) {
    textarea.classList.add('hidden');
  }
  textarea.value = text;
  textarea.addEventListener('input', (e) => {
    const { value } = e.target;
    mainDiv.innerHTML = marked(value);
    updateLS();
  });
  note.appendChild(textarea);

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem('notes', JSON.stringify(notes));
}
