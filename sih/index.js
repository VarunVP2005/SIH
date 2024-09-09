const dragArea = document.querySelector('.drag-area');
const input = dragArea.querySelector('input');
const previewArea = document.getElementById('preview-area');
const dragTextElements = dragArea.querySelectorAll('.icon, .header, .support');

dragArea.addEventListener('click', () => {
  input.click();
});

input.addEventListener('change', handleFiles);

dragArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dragArea.classList.add('active');
});

dragArea.addEventListener('dragleave', () => {
  dragArea.classList.remove('active');
});

dragArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dragArea.classList.remove('active');
  const files = event.dataTransfer.files;
  input.files = files;
  handleFiles({ target: input });
});

function handleFiles(event) {
  const files = event.target.files;
  previewArea.innerHTML = ''; // Clear previous previews

  // Hide text elements when files are previewed
  if (files.length > 0) {
    dragTextElements.forEach(el => el.style.opacity = 0);
  }

  for (const file of files) {
    const fileType = file.type;
    let previewElement;

    if (fileType.startsWith('image/')) {
      previewElement = document.createElement('img');
      previewElement.src = URL.createObjectURL(file);
    } else if (fileType.startsWith('video/')) {
      previewElement = document.createElement('video');
      previewElement.src = URL.createObjectURL(file);
      previewElement.controls = true;
    } else if (fileType.startsWith('audio/')) {
      previewElement = document.createElement('audio');
      previewElement.src = URL.createObjectURL(file);
      previewElement.controls = true;
    }

    previewArea.appendChild(previewElement);
  }
}
