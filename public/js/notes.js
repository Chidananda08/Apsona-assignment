function createNote() {
    const title = $('#note-title').val();
    const content = $('#note-content').val();
    const tags = $('#note-tags').val();
    const backgroundColor = $('#note-backgroundColor').val();
    
    $.ajax({
      url: 'http://localhost:5000/api/notes',
      method: 'POST',
      contentType: 'application/json',
      headers: { 'Authorization': localStorage.getItem('token') },
      data: JSON.stringify({ title, content, tags, backgroundColor }),
      success: function() {
        loadNotes();
      },
      error: function() {
        alert('Failed to create note');
      }
    });
  }
  
  function deleteNote(noteId) {
    $.ajax({
      url: `http://localhost:5000/api/notes/${noteId}`,
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('token') },
      success: function() {
        loadNotes();
      },
      error: function() {
        alert('Failed to delete note');
      }
    });
  }
  