# Contact Management App with Charts and Maps

This React-based web application offers comprehensive contact management features and visualizes COVID-19 data using interactive charts and maps.

## Features

### Contact Management

- **Add Contacts:** Use a form to add new contacts.
- **View Contacts:** Display a list of all added contacts.
- **Contact Details:** View detailed information for each contact.
- **Edit/Delete Contacts:** Edit or remove existing contacts.

### Charts and Maps

- **Dashboard:** Interactive charts and maps.
  - **Line Graph:** Shows worldwide fluctuations in COVID-19 cases.
  - **Interactive Map:** Uses React Leaflet to display country-wise COVID-19 statistics with markers.

## Prerequisites

- Node.js (version 16.x or higher)
- npm or yarn

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ariz565/Frontend-Engineer-Coding-Task.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

- '/src': Contains the source code.
- '/src/components': Reusable components

## Usage

After starting the development server, open your browser and navigate to http://localhost:3000. You can then add, view, edit, and delete contacts, as well as view COVID-19 data on charts and maps.

## API Endpoints

The app fetches COVID-19 data from the following APIs:

- **Worldwide Data of Cases:** [https://disease.sh/v3/covid-19/all](https://disease.sh/v3/covid-19/all)
- **Country Specific Data of Cases:** [https://disease.sh/v3/covid-19/countries](https://disease.sh/v3/covid-19/countries)
- **Graph Data for Cases with Date:** [https://disease.sh/v3/covid-19/historical/all?lastdays=all](https://disease.sh/v3/covid-19/historical/all?lastdays=all)

These APIs provide essential data for displaying COVID-19 statistics worldwide and by country. You can make requests to these endpoints to retrieve up-to-date information on cases, recoveries, and deaths related to the COVID-19 pandemic.
