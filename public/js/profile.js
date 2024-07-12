document.addEventListener('DOMContentLoaded', () => {
  // Handle form submission for creating a new blog post
  const newBlogForm = document.querySelector('.new-blog-form');
  if (newBlogForm) {
    newBlogForm.addEventListener('submit', async function(event) {
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
            body: JSON.stringify({
              title,
              author,
              description,
              userId: document.getElementById('user-id').value
            }),
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
  }

  // Function to handle comment submission
  async function submitComment(blogId, commentText) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blog_id: blogId,
          comment_text: commentText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting comment');
      return null;
    }
  }

  // event listeners for "Add Comment" buttons
  const addCommentButtons = document.querySelectorAll('.add-comment-btn');
  addCommentButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      const blogId = button.dataset.blogId;
      console.log('Add comment functionality for blog ID:', blogId);

      // Prompt for the comment text
      const comment = prompt('Enter your comment:');
      if (comment) {
        // Send the comment to the server + update the comments section
        const result = await submitComment(blogId, comment);
        if (result) {
          console.log('Comment submitted:', comment);
          // Update the comments dynamically
          const commentsSection = document.querySelector(`#comments-section-${blogId}`);
          const newCommentElement = document.createElement('div');
          newCommentElement.classList.add('comment');
          newCommentElement.textContent = comment;
          commentsSection.appendChild(newCommentElement);
        }
      }
    });
  });
});