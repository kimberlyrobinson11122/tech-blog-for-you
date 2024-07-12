const submitComment = async () => {
  try {
    const comment = document.querySelector('#comment').value;

    // Check if the user-id element exists before accessing its value
    const userIdElement = document.getElementById('user-id');
    const userId = userIdElement ? userIdElement.value : null;

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId, // Updated key to match the server's expected key
        comment_text: comment, // Updated key to match the server's expected key
      }),
    });

    if (response.ok) {
      const data = await response.json();

      // Display comment on the blog page
      const commentContainer = document.querySelector('#comments-container');
      const commentDiv = document.createElement('div');
      commentDiv.textContent = `${data.comment_text} - User ID: ${data.user_id}`;
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