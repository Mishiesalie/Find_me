console.log("Starting Map Finder application...");
console.log("Please navigate to the map-finder directory and run 'npm start'");
console.log("cd map-finder && npm start");

// You can also try to start the application automatically
const { exec } = require('child_process');
const path = require('path');

const mapFinderDir = path.join(__dirname, 'map-finder');

exec('cd "' + mapFinderDir + '" && npm start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}); 