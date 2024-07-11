const submitComment = async () => {
    try {
      const userId = document.getElementById('user-id').value;
      const comment = document.querySelector('#comment').value;
  
      const response = await fetch('/api/comments', { // Using a relative API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          comment,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Display comment on the blog page
        const commentContainer = document.querySelector('#comments-container');
        const commentDiv = document.createElement('div');
        commentDiv.textContent = `${data.comment} - User ID: ${data.userId}`;
        commentContainer.appendChild(commentDiv);
  
        // Clear comment input field
        document.querySelector('#comment').value = '';
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }
  
  // Event listener for submitting comments
  document.getElementById('comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitComment();
  });