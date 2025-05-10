const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Create image directories if they don't exist
const photoshootDir = path.join(__dirname, 'images', 'photoshoot');
const dailyDir = path.join(__dirname, 'images', 'daily');

[photoshootDir, dailyDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Endpoint to get photoshoot images
app.get('/api/images/photoshoot', (req, res) => {
  getImagesFromDirectory(photoshootDir, res);
});

// Endpoint to get daily images
app.get('/api/images/daily', (req, res) => {
  getImagesFromDirectory(dailyDir, res);
});

// Helper function to get images from a directory
function getImagesFromDirectory(directory, res) {
  try {
    if (!fs.existsSync(directory)) {
      return res.status(404).json({ error: 'Directory not found' });
    }
    
    const files = fs.readdirSync(directory);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    // Convert to URLs
    const imageUrls = imageFiles.map(file => {
      const relativePath = path.relative(__dirname, path.join(directory, file))
        .replace(/\\/g, '/'); // Convert Windows backslashes to forward slashes for URLs
      return relativePath;
    });
    
    res.json(imageUrls);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Error reading directory' });
  }
}

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});

// Command to start the server
console.log('To start the server, run: node server.js');
