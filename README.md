# 🌦 Weather Analytics Dashboard

A modern, interactive **React + Redux Weather Dashboard** that provides real-time weather insights, 7-day and hourly forecasts, and rich visual analytics for multiple cities.  
Built with **Vite**, **Tailwind CSS**, **Recharts**, and the **WeatherAPI**.

---

## 🚀 Features

### 🌤 Core Functionality
- **Dashboard View:**  
  Displays weather cards for multiple cities with temperature, condition icon, humidity, and wind speed.  
- **Search & Add Cities:**  
  Search any city worldwide with real-time data and add it to your dashboard.  
- **Favorites:**  
  Pin favorite cities — your favorites persist between sessions using local storage.  
- **Detailed City Analytics:**  
  Click on a city card to view detailed stats including:  
  - Current temperature, humidity, wind, UV index, and pressure  
  - 7-day forecast chart (average daily temperature)  
  - Hour-by-hour temperature trends  
  - Precipitation and wind-speed graphs

### ⚙️ Settings
- Switch between **Celsius (°C)** and **Fahrenheit (°F)** instantly.  
- Dark mode design for a consistent aesthetic.

### 📊 Data Visualization
Powered by **Recharts**:  
- Daily temperature trends  
- Hourly temperature line chart  
- Precipitation patterns  
- Wind-speed and direction charts  
- Interactive tooltips and hover animations

### 💾 Caching & Performance
- Real-time data updates every minute  
- Local caching to minimize API calls  
- Built-in error handling and fallback UI

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **State Management** | Redux Toolkit |
| **Charts** | Recharts |
| **API** | [WeatherAPI.com](https://www.weatherapi.com/) |
| **Styling** | Tailwind CSS + custom gradients |
| **Persistence** | LocalStorage cache + Redux store |

---

## 🧭 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── CityCard.jsx
│   │   ├── CityDetails.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FavoritesPanel.jsx
│   │   └── SettingsToggle.jsx
│   ├── redux/
│   │   ├── weatherSlice.js
│   │   ├── favoritesSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚡️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/weather-dashboard.git
cd weather-dashboard
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set up Environment Variables
Create a `.env` file in the project root:
```bash
VITE_WEATHER_API_KEY=your_weatherapi_key_here
```
Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/).

### 4️⃣ Run the Development Server
```bash
npm run dev
```
Visit **http://localhost:5173** in your browser.

---

## 🧠 Future Enhancements
- 🔐 Google authentication for personalized dashboards  
- 🌍 Geo-location detection for “My Location” weather  
- ☁️ Rain and air-quality visual overlays  
- 📱 PWA (Progressive Web App) support for offline access

---

## 📸 Screenshots

### 🏠 Dashboard View
Displays multiple cities with real-time weather cards.

### 📊 City Analytics View
Detailed insights with temperature trends, precipitation, and wind visualizations.

*(You can add actual screenshots later once deployed)*

---

## 🧾 License
This project is licensed under the **MIT License** — feel free to use and modify it.
