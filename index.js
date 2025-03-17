console.log("Redirecting to Map Finder application...");

// This script helps to redirect to the map-finder application
const { exec } = require('child_process');
const path = require('path');

const mapFinderDir = path.join(__dirname, 'map-finder');

// This will execute "npm start" in the map-finder directory
exec('cd "' + mapFinderDir + '" && npm start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`Map Finder application started successfully!`);
}); 