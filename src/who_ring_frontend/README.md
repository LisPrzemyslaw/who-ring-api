# Who Ring Frontend

A modern React application for registering and verifying phone numbers. This frontend works with the Who Ring API backend to provide a complete phone number registration and lookup service.

## Features

- Register your phone number with your name
- Verify your phone number via SMS verification code
- Look up registered phone numbers to see associated names
- Modern UI with animations and responsive design

## Technologies Used

- React 18
- React Router for navigation
- Axios for API requests
- Styled Components for styling
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Who Ring API backend running

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd src/who_ring_frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `public/` - Static files and HTML template
- `src/` - Source code
  - `components/` - Reusable UI components
  - `pages/` - Page components for different routes
  - `App.js` - Main application component with routing
  - `index.js` - Application entry point

## API Integration

The frontend communicates with the Who Ring API backend using the following endpoints:

- `POST /api/send-code` - Send a verification code to a phone number
- `POST /api/register-number` - Register a phone number with a name after verification
- `GET /api/get-number-name` - Look up a phone number to get the associated name

## Development

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update routes in `App.js` as needed

### Styling

The application uses Styled Components for styling. Global styles are defined in `index.css` and component-specific styles are defined within each component file.

## Deployment

To build the application for production:

```
npm run build
```
or
```
yarn build
```

This will create a `build` directory with optimized production files that can be served by any static file server.