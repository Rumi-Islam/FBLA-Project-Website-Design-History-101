const fileInput = document.getElementById('file');
const fileNameDisplay = document.getElementById('file-name');
const uploadForm = document.getElementById('uploadForm');
const errorMessage = document.getElementById('error-message');

// Update text when a file is selected
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = "Selected: " + fileInput.files[0].name;
        errorMessage.style.display = 'none'; // Hide error if they fix it
    }
});

// Handle the Upload button click
uploadForm.addEventListener('submit', (e) => {
    if (fileInput.files.length === 0) {
        e.preventDefault(); // Stop the form from submitting
        errorMessage.style.display = 'block'; // Show the error
    }
});