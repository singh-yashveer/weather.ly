# 🌤️ Weather.ly

> A modern, responsive weather application built with React, TypeScript, and Tailwind CSS

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## ✨ Features

### 🔍 **Smart Search**

- **Intelligent Autocomplete**: City suggestions with real-time search
- **Dual-Level Debouncing**: Optimized for both city search (800ms) and weather queries (1200ms)
- **Keyboard Navigation**: Full arrow key support, Enter to select, Escape to cancel
- **Visual Feedback**: Loading indicators and search status hints

### 🌡️ **Comprehensive Weather Data**

- **Real-time Weather**: Current temperature, conditions, and detailed forecasts
- **Extended Metrics**: Feels like temperature, humidity, pressure, visibility, wind speed
- **Sunrise & Sunset**: Accurate astronomical data with proper time formatting
- **Weather Icons**: Beautiful, context-aware weather condition icons

### 🎨 **Modern Design**

- **Glass Morphism**: Beautiful blur effects and modern UI patterns
- **Dark Mode Support**: Seamless light/dark theme switching
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Fade-in, slide-up, and loading animations

### ⚡ **Performance Optimized**

- **Smart Caching**: 5-minute data refresh with intelligent stale-time management
- **Error Handling**: Comprehensive error states with user-friendly messages
- **Memory Management**: Proper cleanup of timers and event listeners
- **API Efficiency**: Reduced API calls through intelligent debouncing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weather.ly.git
cd weather.ly

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application running.

## 🏗️ Tech Stack

### Core Technologies

- **React 18+** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with excellent IDE support
- **Vite** - Lightning-fast build tool and development server
- **TanStack Router** - Type-safe routing for React applications

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library (Feather Icons)
- **Custom Animations** - Smooth transitions and loading states

### Data Management

- **React Query** - Powerful data fetching and caching
- **Lodash** - Utility functions for debouncing and data manipulation

### APIs

- **OpenWeatherMap API** - Reliable weather data source
- **City Search API** - Autocomplete city suggestions

## 🛠️ Development

### Project Structure

```
src/
├── app/                    # Application configuration
│   ├── layout/            # Layout components and types
│   ├── routes/            # Route definitions
│   ├── styles/            # Global styles and Tailwind config
│   └── theme/             # Theme context and toggle
├── pages/                 # Page components
│   └── index.lazy.tsx     # Main weather page
├── shared/                # Shared components and utilities
│   ├── components/        # Reusable UI components
│   │   ├── searchInput/   # Smart search component
│   │   ├── weatherCard/   # Weather display component
│   │   └── detailCard/    # Weather details component
│   ├── services/          # API services and data fetching
│   ├── uikit/            # Base UI components
│   └── utils/            # Utility functions
└── widgets/              # Feature-specific widgets
    ├── header/           # Application header
    └── footer/           # Application footer
```

### Key Components

#### SearchInput Component

```tsx
<SearchInput
  onSearch={handleSearch}
  onSelectCity={handleSelectCity}
  placeholder="Search for a city..."
  className="w-full max-w-lg"
  autoFocus
  isSearchPending={isSearchPending}
/>
```

**Features:**

- Debounced search with visual indicators
- Keyboard navigation support
- Error handling and loading states
- Accessibility compliant (ARIA attributes)

#### WeatherCard Component

```tsx
<WeatherCard {...weatherData} isLoading={isLoading} error={errorMessage} />
```

**Features:**

- Responsive design with gradients
- Comprehensive weather metrics
- Loading and error states
- Beautiful weather icons

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🎯 Performance Features

### Debouncing Strategy

- **Search Input**: 800ms debounce for city autocomplete
- **Weather API**: 1200ms debounce for weather data requests
- **Smart Cancellation**: Immediate requests when selecting from dropdown

### Caching Strategy

- **City Data**: 5-minute stale time for city search results
- **Weather Data**: 5-minute auto-refresh for current weather
- **Error Retry**: Smart retry logic with exponential backoff

### Memory Management

- Automatic cleanup of debounced functions
- Event listener cleanup on component unmount
- Proper timer management for auto-refresh

## 🌍 API Integration

### OpenWeatherMap API

```typescript
const fetchWeatherInfo = async (cityName: string): Promise<WeatherInfo> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  );
  return response.json();
};
```

### Error Handling

- Network error recovery
- Invalid city name handling
- API rate limit management
- User-friendly error messages

## 🎨 Theming

### Color Palette

```javascript
const theme = {
  primary: "#70778f", // Slate blue
  secondary: "#c7b8bf", // Soft pink
  accent: "#ec5a38", // Coral red
  dark: "#0d151c", // Deep navy
  light: "#e3ebf2", // Light blue-gray
};
```

### Dark Mode Support

- System preference detection
- Manual theme toggle
- Persistent theme storage
- Smooth transitions between themes

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_CITY_API_KEY=your_city_search_api_key
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Custom color palette
- Extended animations
- Glass morphism utilities
- Responsive breakpoints

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use proper component composition
- Implement proper error handling
- Add comprehensive type definitions
- Test responsive behavior

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Vite](https://vitejs.dev/) for blazing fast development

## 📞 Support

If you have any questions or need help with setup, please:

- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and modern web technologies</p>
  <p>
    <a href="#-weatherly">Back to top</a>
  </p>
</div>
