$(document).ready(function() {
    // Initialize app (load login/signup forms)
    loadAuth();
  });
  
  function loadAuth() {
    $('#auth-container').html(`
      <div>
        <h2>Login</h2>
        <input type="email" id="login-email" placeholder="Email" />
        <input type="password" id="login-password" placeholder="Password" />
        <button onclick="login()">Login</button>
      </div>
      <div>
        <h2>Register</h2>
        <input type="email" id="register-email" placeholder="Email" />
        <input type="password" id="register-password" placeholder="Password" />
        <button onclick="register()">Register</button>
      </div>
    `);
  }
  
  function loadNotes() {
    $.ajax({
      url: 'http://localhost:5000/api/notes',
      method: 'GET',
      headers: { 'Authorization': localStorage.getItem('token') },
      success: function(notes) {
        $('#notes-container').html(`
          <h2>Your Notes</h2>
          <div>
            <input type="text" id="note-title" placeholder="Title" />
            <textarea id="note-content" placeholder="Content"></textarea>
            <input type="text" id="note-tags" placeholder="Tags (comma separated)" />
            <input type="color" id="note-backgroundColor" />
            <button onclick="createNote()">Create Note</button>
          </div>
          <div id="notes-list">
            ${notes.map(note => `
              <div class="note" style="background-color: ${note.backgroundColor}">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <p>Tags: ${note.tags}</p>
                <button onclick="deleteNote(${note.id})">Delete</button>
              </div>
            `).join('')}
          </div>
        `);
      },
      error: function() {
        alert('Failed to load notes');
      }
    });
  }
  