const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const colorPreview = document.getElementById('colorPreview');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const instruction = document.getElementById('instruction');

let img = new Image();

// Handle Image Upload
imageLoader.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image on canvas
            ctx.drawImage(img, 0, 0);
            
            // UI Updates
            canvas.style.display = 'block';
            instruction.style.display = 'none';
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Pick Color on Canvas Click
canvas.addEventListener('click', function(e) {
    // Get exact click coordinates relative to the canvas
    const rect = canvas.getBoundingClientRect();
    
    // Account for CSS scaling (canvas.width vs rect.width)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Get pixel data at those coordinates
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    
    // Extract RGB
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    // Convert to HEX
    const hex = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
    const rgb = `rgb(${r}, ${g}, ${b})`;

    // Update UI
    colorPreview.style.backgroundColor = hex;
    hexValue.textContent = hex;
    rgbValue.textContent = rgb;
});