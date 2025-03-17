# Map Finder

A web application that allows users to find their location and track the locations of various infrastructures.

## Features

- Display an interactive map
- Find and display the user's current location
- View existing infrastructure locations
- Add new infrastructure locations
- Track and focus on specific infrastructure

## Technologies Used

- React
- TypeScript
- Leaflet (for maps)
- React-Leaflet (React components for Leaflet maps)

## Installation

1. Make sure you have Node.js installed on your system
2. Clone this repository
3. Navigate to the project directory
4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

### Finding Your Location

Click the "Find My Location" button in the top-right corner of the map to locate and center the map on your current position.

### Viewing Infrastructure

- All infrastructure locations are displayed as markers on the map
- Click on any marker to view details about that infrastructure
- The infrastructure list on the bottom-left shows all available infrastructure
- Click on an item in the list to focus the map on that infrastructure

### Adding New Infrastructure

1. Click the "Add Infrastructure" button
2. Enter the requested information:
   - Name of the infrastructure
   - Type (e.g., Healthcare, Energy, Transportation)
   - Description
3. The new infrastructure will be added at the current center of the map

## Browser Compatibility

This application works best in modern browsers that support Geolocation API:
- Chrome
- Firefox
- Safari
- Edge

## Privacy

The application requests location permission to provide location-based features. Your location data is only used within the application and is not stored or transmitted to any external servers.

## License

MIT 