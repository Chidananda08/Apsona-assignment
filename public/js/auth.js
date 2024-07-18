function login() {
    const email = $('#login-email').val();
    const password = $('#login-password').val();
    
    $.ajax({
      url: 'http://localhost:5000/api/auth/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function(response) {
        localStorage.setItem('token', response.token);
        loadNotes();
      },
      error: function() {
        alert('Login failed');
      }
    });
  }
  
  function register() {
    const email = $('#register-email').val();
    const password = $('#register-password').val();
    
    $.ajax({
      url: 'http://localhost:5000/api/auth/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function(response) {
        alert('Registration successful, please login');
      },
      error: function() {
        alert('Registration failed');
      }
    });
  }
  