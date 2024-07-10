document.addEventListener('DOMContentLoaded', () => {
  // Handle form submission for creating a new blog post
  document.querySelector('.new-blog-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titleInput = document.getElementById('blog-title');
    const authorInput = document.getElementById('blog-author');
    const descriptionInput = document.getElementById('blog-description');

    if (titleInput && authorInput && descriptionInput) {
      const title = titleInput.value;
      const author = authorInput.value;
      const description = descriptionInput.value;

      try {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({ title, author, description, userId: document.getElementById('user-id').value }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // Reload the page to see the new blog post
          location.reload();
        } else {
          alert('Failed to create blog post');
        }
      } catch (error) {
        console.error('Error creating blog post:', error);
      }
    } else {
      console.error('Form elements not found in the DOM');
    }
  });

  // Add event listeners for "Add Comment" buttons
  const addCommentButtons = document.querySelectorAll('.add-comment-btn');
  addCommentButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      const blogId = button.dataset.blogId; 
      console.log('Add comment functionality for blog ID:', blogId);
    });
  });
});