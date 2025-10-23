const terminal = document.getElementById('terminal');

function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

function createLine() {
  const line = document.createElement('div');
  line.className = 'line';

  const prompt = document.createElement('span');
  prompt.textContent = 'D:\\MINDofDEMO>';

  const input = document.createElement('span');
  input.className = 'input';
  input.contentEditable = 'true';
  input.spellcheck = false;

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);

  input.focus();
  placeCaretAtEnd(input);

    input.addEventListener('input', () => {
        if (input.textContent.trim() === '') {
            input.textContent = '\u200B';
            placeCaretAtEnd(input);
        }
    })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
      const command = input.textContent.replace(/\u200B/g, '').trim();
      input.contentEditable = false;
      input.classList.remove('input')

      // Generate response instead of echoing command
      const response = document.createElement('div');
      response.className = 'response';
      response.innerHTML = getResponse(command);
      terminal.appendChild(response);

      createLine();
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
}

function getResponse(command) {
  // Replace this with your own logic
  switch (command.toLowerCase()) {
    case 'help':
      return '<p>Available commands:</p><ul><li>help</li><li>version</li><li>boot</li><li>clear</li></ul>';
    case 'version':
        return '<p>Version 2.0.0</p><ul><li>Rebase entire site from jQuery to JavaScript</li><li>Added this cool new terminal to goof in</li><ul>'
    case 'boot':
    //   return '<p>Mind of Demo is still under construction.</p>';
        document.getElementById('terminal').style.display = 'none';
        document.getElementById('boot-screen').style.display = 'flex';
        document.querySelector('#boot-screen img').classList.add('boot-animation');
    case 'clear':
      ['.line', '.response'].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });
      return '';
    default:
      return `<p>Unrecognized command: '${command}'<br>Enter 'help' for a list of commands.</p>`;
  }
}

// Initialize first line
createLine();

document.addEventListener('click', (e) => {
  const activeInput = document.querySelector('.input[contenteditable="true"]');
  if (activeInput && e.target !== activeInput) {
    e.preventDefault();
    activeInput.focus();
    placeCaretAtEnd(activeInput);
  }
});