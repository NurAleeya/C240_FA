# 🍕 Foodie Finder

A fun and student-friendly web application that helps users find nearby food spots with emoji-based ratings and reviews.

## Features

- 🔍 **Smart Search**: Find food by type, restaurant name, or cuisine
- 🎯 **Location-Based**: Uses Geolocation API to find nearby restaurants
- 📱 **Mobile-First Design**: Optimized for mobile devices with large, tappable buttons
- 🎨 **Student-Friendly UI**: Colorful design with coral red, mint green, and lemon yellow
- 😋 **Emoji Ratings**: Fun emoji-based rating system (😋🤤🥱)
- ❤️ **Favorites**: Save your favorite spots using LocalStorage
- 🔧 **Filters**: Filter by price range and open/closed status
- ♿ **Accessible**: Full keyboard navigation and screen reader support

## Color Palette

- **Coral Red**: #FF6B6B
- **Mint Green**: #A8E6CF
- **Lemon Yellow**: #FFD166
- **Off-White**: #FAFAFA
- **Charcoal Gray**: #333333

## Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: ES6+ with classes and modern APIs
- **Geolocation API**: For location-based features
- **LocalStorage**: For persistent favorites storage

## File Structure

```
foodie-finder/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── app.js              # Main JavaScript application
├── .vscode/
│   └── settings.json       # VS Code Live Server settings
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Getting Started

1. **Clone or download** this repository
2. **Open in VS Code** with Live Server extension installed
3. **Start Live Server** - it will automatically use port 5500
4. **Open your browser** to `http://localhost:5500`

### Alternative Setup

If you don't have Live Server, you can:
- Open `index.html` directly in your browser
- Use any local server like `python -m http.server`
- Use Node.js `npx serve`

## How to Use

1. **Search**: Type in food types like "pizza", "sushi", or "burger"
2. **Filter**: Use the price and status filters to narrow results
3. **Location**: Click "Use My Location" to find nearby spots
4. **Favorites**: Click the heart button to save favorites
5. **Directions**: Click directions to get navigation (simulated)

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and live regions
- **High Contrast**: Support for high contrast mode
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Mock Data

The app currently uses mock data for demonstration. In a real implementation, you would:
- Connect to restaurant APIs (Google Places, Yelp, etc.)
- Implement real geolocation distance calculations
- Add actual directions integration
- Include real user reviews and ratings

## Future Enhancements

- 🌐 **Real API Integration**: Connect to live restaurant data
- 🔔 **Push Notifications**: Notify about deals and new places
- 📊 **Analytics**: Track popular searches and favorites
- 🎯 **Personalization**: Recommendations based on preferences
- 🌍 **Multi-language**: Support for different languages
- 📱 **PWA Features**: Offline support and app installation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

Made with ❤️ for students who love good food!
