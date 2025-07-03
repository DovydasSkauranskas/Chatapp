document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const submitButton = document.getElementById('submitUsername');
  
    submitButton.addEventListener('click', async () => {
      const username = usernameInput.value.trim();
      if (!username) {
        alert('Please enter a username');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const result = await res.json();
        if(!result.success) {
            alert(result.message);
            return;
        }

        localStorage.setItem('username', username);
    
        window.location.href = '/';
      } catch (error) {
        console.log('Error registering: ', error);
        alert('Error while registering');
      }
  
    });
  });