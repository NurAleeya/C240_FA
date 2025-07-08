// Foodie Finder App - Main JavaScript
class FoodieFinder {
    constructor() {
        this.mockData = this.generateMockData();
        this.userLocation = null;
        this.favorites = this.loadFavorites();
        this.currentResults = [];
        this.chatbot = new Chatbot(this);
        this.initializeApp();
    }

    // Initialize the application
    initializeApp() {
        this.bindEvents();
        this.loadInitialResults();
        this.displayFavorites();
    }

    // Bind event listeners
    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        searchBtn.addEventListener('click', this.handleSearch.bind(this));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Filter functionality
        const priceFilter = document.getElementById('price-filter');
        const openFilter = document.getElementById('open-filter');
        const halalFilter = document.getElementById('halal-filter');
        const clearFiltersBtn = document.querySelector('.clear-filters-btn');
        const locationFilter = document.getElementById('location-filter');

        priceFilter.addEventListener('change', this.handleFilters.bind(this));
        openFilter.addEventListener('change', this.handleFilters.bind(this));
        halalFilter.addEventListener('change', this.handleFilters.bind(this));
        clearFiltersBtn.addEventListener('click', this.clearFilters.bind(this));
        locationFilter.addEventListener('change', this.handleFilters.bind(this));

        // Location functionality
        const locationBtn = document.getElementById('get-location');
        locationBtn.addEventListener('click', this.getUserLocation.bind(this));

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    }

    // Generate mock data for food spots
    generateMockData() {
        const restaurants = [
            // Food Paradise @ North Canteen
            { id: 1, name: "Crispy Waffle", type: "waffle", priceLevel: "$", isOpen: true, rating: "😋😋😋", review: "Delicious crispy waffles!", distance: 0.1, cuisine: "Dessert", dietary: "halal", location: "food-paradise" },
            { id: 2, name: "Takoyaki", type: "takoyaki", priceLevel: "$", isOpen: true, rating: "😋😋😋", review: "Authentic Japanese takoyaki!", distance: 0.2, cuisine: "Japanese", dietary: "halal", location: "food-paradise" },
            { id: 3, name: "Mr Lok Lok", type: "lok lok", priceLevel: "$$", isOpen: true, rating: "😋😋", review: "Great variety of lok lok options!", distance: 0.3, cuisine: "Asian", dietary: "non-halal", location: "food-paradise" },
            { id: 4, name: "Chuan Chuan Mix Veg Rice", type: "mixed veg rice", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Affordable and tasty mixed veg rice!", distance: 0.4, cuisine: "Chinese", dietary: "non-halal", location: "food-paradise" },
            { id: 5, name: "Tang Chao Teochew Noodle House", type: "noodle", priceLevel: "$$",
                isOpen: true,
                rating: "😋😋😋",
                review: "Authentic Teochew noodles!",
                distance: 0.5,
                cuisine: "Chinese",
                dietary: "non-halal",
                location: "food-paradise"
            },
            { id: 6, name: "M&B Food", type: "snacks", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Delicious snacks for a quick bite!", distance: 0.6, cuisine: "Snacks", dietary: "halal", location: "food-paradise" },
            { id: 7, name: "Prata Stall Indian Muslim Food", type: "prata", priceLevel: "$", isOpen: true, rating: "😋😋😋", review: "Best prata in town!", distance: 0.7, cuisine: "Indian", dietary: "halal", location: "food-paradise" },
            { id: 8, name: "Chicken Rice", type: "chicken rice", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Classic chicken rice!", distance: 0.8, cuisine: "Asian", dietary: "halal", location: "food-paradise" },

            // Lawn @ W6
            { id: 9, name: "Smooy Yoghurt & Ice Cream", type: "dessert", priceLevel: "$", isOpen: true, rating: "😋😋😋", review: "Refreshing desserts!", distance: 0.2, cuisine: "Dessert", dietary: "halal", location: "lawn-w6" },
            { id: 10, name: "Creamy Duck", type: "waffle, takoyaki, ice cream", priceLevel: "$$", isOpen: true, rating: "😋😋😋", review: "Delicious variety!", distance: 0.3, cuisine: "Fusion", dietary: "halal", location: "lawn-w6" },
            { id: 11, name: "Tea Bar", type: "beverages", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Refreshing drinks!", distance: 0.4, cuisine: "Beverages", dietary: "halal", location: "lawn-w6" },
            { id: 12, name: "Nuan Thai Food", type: "thai", priceLevel: "$$", isOpen: true, rating: "😋😋", review: "Authentic Thai cuisine!", distance: 0.5, cuisine: "Thai", dietary: "non-halal", location: "lawn-w6" },
            { id: 13, name: "Fatty Momma", type: "snacks", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Tasty snacks!", distance: 0.6, cuisine: "Snacks", dietary: "halal", location: "lawn-w6" },
            { id: 14, name: "Ann & Kalsri Chicken Rice", type: "chicken rice", priceLevel: "$", isOpen: true, rating: "😋😋😋", review: "Delicious chicken rice!", distance: 0.7, cuisine: "Asian", dietary: "halal", location: "lawn-w6" },
            { id: 15, name: "Japanese Fusion", type: "fusion", priceLevel: "$$", isOpen: true, rating: "😋😋", review: "Creative Japanese dishes!", distance: 0.8, cuisine: "Japanese", dietary: "non-halal", location: "lawn-w6" },
            { id: 16, name: "The Crowded Bowl", type: "vegetarian", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Healthy vegetarian options!", distance: 0.9, cuisine: "Vegetarian", dietary: "vegetarian", location: "lawn-w6" },
            { id: 17, name: "Ju Fu Mala Hotpot", type: "hotpot", priceLevel: "$$", isOpen: true, rating: "😋😋", review: "Spicy and flavorful!", distance: 1.0, cuisine: "Chinese", dietary: "non-halal", location: "lawn-w6" },
            { id: 18, name: "Coal 3606", type: "grill", priceLevel: "$$", isOpen: true, rating: "😋😋😋", review: "Perfectly grilled dishes!", distance: 1.1, cuisine: "Grill", dietary: "halal", location: "lawn-w6" },

            // Koufu @ South
            { id: 19, name: "Nanyang Cafe", type: "cafe", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Cozy and delicious!", distance: 0.2, cuisine: "Cafe", dietary: "halal", location: "south-canteen" },
            { id: 20, name: "Mala", type: "spicy", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Spicy and tasty!", distance: 0.3, cuisine: "Chinese", dietary: "halal", location: "south-canteen" },
            { id: 21, name: "Pizza & Chicken Wings", type: "fast food", priceLevel: "$$", isOpen: true, rating: "😋😋😋", review: "Perfect for sharing!", distance: 0.4, cuisine: "Fast Food", dietary: "halal", location: "south-canteen" },
            { id: 22, name: "Thai Cuisine", type: "thai", priceLevel: "$$", isOpen: true, rating: "😋😋", review: "Authentic Thai flavors!", distance: 0.5, cuisine: "Thai", dietary: "non-halal", location: "south-canteen" },
            { id: 23, name: "Fishball Noodle", type: "noodle", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Classic and comforting!", distance: 0.6, cuisine: "Chinese", dietary: "non-halal", location: "south-canteen" },
            { id: 24, name: "Nasi Padang", type: "rice", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Flavorful and filling!", distance: 0.7, cuisine: "Malay", dietary: "halal", location: "south-canteen" },
            { id: 25, name: "Hotto Neko Hotplate & Bingsu", type: "hotplate", priceLevel: "$$", isOpen: true, rating: "😋😋", review: "Unique and delicious!", distance: 0.8, cuisine: "Fusion", dietary: "halal", location: "south-canteen" },

            // Republic Polytechnic Centre (RPC)
            { id: 26, name: "Subway", type: "sandwich", priceLevel: "$", isOpen: true, rating: "😋😋😋", review: "Fresh and healthy sandwiches!", distance: 0.2, cuisine: "Fast Food", dietary: "halal", location: "rpc" },
            { id: 27, name: "7 Eleven", type: "convenient store", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Quick snacks and essentials!", distance: 0.3, cuisine: "Convenience", dietary: "mixed", location: "rpc" },
            { id: 28, name: "Sushi Tea", type: "sushi", priceLevel: "$$", isOpen: true, rating: "😋😋😋", review: "Delicious sushi and tea!", distance: 0.4, cuisine: "Japanese", dietary: "halal", location: "rpc" },
            { id: 29, name: "Licious Place", type: "dessert", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Sweet treats and desserts!", distance: 0.5, cuisine: "Dessert", dietary: "halal", location: "rpc" },

            // RP Resource Centre
            { id: 30, name: "E-meals by Taste Asia", type: "vending machine", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Convenient and tasty meals!", distance: 0.6, cuisine: "Asian", dietary: "mixed", location: "rp-resource-centre" },

            // The Republic Cultural Centre (TRCC)
            { id: 31, name: "Artease", type: "beverages", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Refreshing drinks and snacks!", distance: 0.7, cuisine: "Cafe", dietary: "mixed", location: "trcc" },

            // Library
            { id: 32, name: "Artease", type: "beverages", priceLevel: "$", isOpen: true, rating: "😋😋", review: "Relaxing drinks and snacks!", distance: 0.8, cuisine: "Cafe", dietary: "mixed", location: "library" },

            // Additional locations and food spots can be added here following the same structure
        ];

        return restaurants;
    }

    // Load initial results
    loadInitialResults() {
        this.currentResults = this.mockData.slice().sort((a, b) => a.distance - b.distance);
        this.displayResults(this.currentResults);
    }

    // Handle search functionality
    handleSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
        
        if (!searchTerm) {
            this.loadInitialResults();
            return;
        }

        const filteredResults = this.mockData.filter(restaurant => {
            return restaurant.name.toLowerCase().includes(searchTerm) ||
                   restaurant.type.toLowerCase().includes(searchTerm) ||
                   restaurant.cuisine.toLowerCase().includes(searchTerm);
        });

        this.currentResults = filteredResults.sort((a, b) => a.distance - b.distance);
        this.displayResults(this.currentResults);
    }

    // Handle filter functionality
    handleFilters() {
        const priceFilter = document.getElementById('price-filter').value;
        const openFilter = document.getElementById('open-filter').value;
        const halalFilter = document.getElementById('halal-filter').value;
        const locationFilter = document.getElementById('location-filter').value;
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();

        let filteredResults = this.mockData;

        // Apply search filter
        if (searchTerm) {
            filteredResults = filteredResults.filter(restaurant => {
                return restaurant.name.toLowerCase().includes(searchTerm) ||
                       restaurant.type.toLowerCase().includes(searchTerm) ||
                       restaurant.cuisine.toLowerCase().includes(searchTerm);
            });
        }

        // Apply price filter
        if (priceFilter) {
            filteredResults = filteredResults.filter(restaurant => 
                restaurant.priceLevel === priceFilter
            );
        }

        // Apply open status filter
        if (openFilter) {
            const isOpen = openFilter === 'open';
            filteredResults = filteredResults.filter(restaurant => 
                restaurant.isOpen === isOpen
            );
        }

        // Apply dietary filter
        if (halalFilter) {
            filteredResults = filteredResults.filter(restaurant => 
                restaurant.dietary === halalFilter
            );
        }

        // Apply location filter
        if (locationFilter) {
            filteredResults = filteredResults.filter(restaurant => 
                restaurant.location === locationFilter
            );
        }

        this.currentResults = filteredResults.sort((a, b) => a.distance - b.distance);
        this.displayResults(this.currentResults);
    }

    // Clear all filters
    clearFilters() {
        document.getElementById('price-filter').value = '';
        document.getElementById('open-filter').value = '';
        document.getElementById('halal-filter').value = '';
        document.getElementById('search-input').value = '';
        document.getElementById('location-filter').value = '';
        this.loadInitialResults();
    }

    // Display search results
    displayResults(results) {
        const resultsContainer = document.getElementById('results-container');
        const resultsCount = document.getElementById('results-count');

        resultsCount.textContent = `${results.length} places found`;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>No food spots found 😢</h3>
                    <p>Try adjusting your search or filters!</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map(restaurant => 
            this.createFoodCard(restaurant)
        ).join('');

        // Re-bind event listeners for dynamically created elements
        this.bindCardEvents();
    }

    // Create HTML for a food card
    createFoodCard(restaurant) {
        const isFavorited = this.favorites.some(fav => fav.id === restaurant.id);
        const favoriteText = isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites';
        const favoriteClass = isFavorited ? 'favorited' : '';
        
        // Get dietary emoji and text
        const dietaryInfo = this.getDietaryInfo(restaurant.dietary);

        return `
            <div class="food-card" data-restaurant-id="${restaurant.id}">
                <div class="food-card-header">
                    <h3 class="food-card-title">${restaurant.name}</h3>
                    <div class="food-card-meta">
                        <span class="price-level">${restaurant.priceLevel}</span>
                        <span class="open-status ${restaurant.isOpen ? 'open' : 'closed'}">
                            ${restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
                        </span>
                    </div>
                    <div class="distance">📍 ${restaurant.distance} miles away</div>
                    <div class="dietary-info">
                        <span class="dietary-badge ${restaurant.dietary}">
                            ${dietaryInfo.emoji} ${dietaryInfo.text}
                        </span>
                    </div>
                </div>
                <div class="food-card-body">
                    <div class="emoji-rating">
                        <span class="emoji">${restaurant.rating}</span>
                        <span class="rating-text">${this.getRatingText(restaurant.rating)}</span>
                    </div>
                    <p class="review-snippet">"${restaurant.review}"</p>
                    <div class="food-card-actions">
                        <button class="favorite-btn ${favoriteClass}" 
                                data-restaurant-id="${restaurant.id}"
                                aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                            ${favoriteText}
                        </button>
                        <button class="directions-btn" 
                                data-restaurant-id="${restaurant.id}"
                                aria-label="Get directions to ${restaurant.name}">
                            📍 Directions
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Get rating text based on emoji count
    getRatingText(rating) {
        const emojiCount = rating.length;
        if (emojiCount <= 1) return 'Okay';
        if (emojiCount <= 2) return 'Good';
        if (emojiCount <= 3) return 'Great';
        return 'Amazing!';
    }

    // Get dietary information with emoji and text
    getDietaryInfo(dietary) {
        const dietaryMap = {
            'halal': { emoji: '🥩', text: 'Halal' },
            'non-halal': { emoji: '🍖', text: 'Non-Halal' },
            'vegetarian': { emoji: '🥗', text: 'Vegetarian' },
            'vegan': { emoji: '🌱', text: 'Vegan' }
        };
        return dietaryMap[dietary] || { emoji: '🍽️', text: 'Mixed Options' };
    }

    // Bind events for dynamically created card elements
    bindCardEvents() {
        // Favorite buttons
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', this.toggleFavorite.bind(this));
        });

        // Directions buttons
        const directionsButtons = document.querySelectorAll('.directions-btn');
        directionsButtons.forEach(btn => {
            btn.addEventListener('click', this.getDirections.bind(this));
        });
    }

    // Toggle favorite status
    toggleFavorite(event) {
        const restaurantId = parseInt(event.target.dataset.restaurantId);
        const restaurant = this.mockData.find(r => r.id === restaurantId);
        
        if (!restaurant) return;

        const favoriteIndex = this.favorites.findIndex(fav => fav.id === restaurantId);
        
        if (favoriteIndex === -1) {
            // Add to favorites
            this.favorites.push(restaurant);
            event.target.textContent = '❤️ Favorited';
            event.target.classList.add('favorited');
            event.target.setAttribute('aria-label', 'Remove from favorites');
        } else {
            // Remove from favorites
            this.favorites.splice(favoriteIndex, 1);
            event.target.textContent = '🤍 Add to Favorites';
            event.target.classList.remove('favorited');
            event.target.setAttribute('aria-label', 'Add to favorites');
        }

        this.saveFavorites();
        this.displayFavorites();
    }

    // Get directions (simulated)
    getDirections(event) {
        const restaurantId = parseInt(event.target.dataset.restaurantId);
        const restaurant = this.mockData.find(r => r.id === restaurantId);
        
        if (!restaurant) return;

        // Simulate opening directions
        alert(`🗺️ Opening directions to ${restaurant.name}...\n\nIn a real app, this would open your maps app with directions!`);
    }

    // Display favorites
    displayFavorites() {
        const favoritesContainer = document.getElementById('favorites-container');
        
        if (this.favorites.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="no-favorites">
                    <p>No favorites yet! Heart some places to see them here.</p>
                </div>
            `;
            return;
        }

        favoritesContainer.innerHTML = this.favorites.map(restaurant => 
            this.createFoodCard(restaurant)
        ).join('');

        // Re-bind event listeners
        this.bindCardEvents();
    }

    // Get user's current location
    getUserLocation() {
        const locationBtn = document.getElementById('get-location');
        const locationStatus = document.getElementById('location-status');
        
        locationBtn.disabled = true;
        locationBtn.textContent = '📍 Getting Location...';
        
        locationStatus.textContent = 'Requesting location access...';
        locationStatus.className = 'location-status';

        if (!navigator.geolocation) {
            this.handleLocationError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                locationStatus.textContent = '✅ Location found! Showing nearby food spots.';
                locationStatus.className = 'location-status success';
                
                locationBtn.disabled = false;
                locationBtn.textContent = '📍 Location Updated';
                
                // Simulate updating distances based on location
                this.updateDistancesBasedOnLocation();
            },
            (error) => {
                this.handleLocationError(this.getLocationErrorMessage(error));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    }

    // Handle location errors
    handleLocationError(message) {
        const locationBtn = document.getElementById('get-location');
        const locationStatus = document.getElementById('location-status');
        
        locationStatus.textContent = `❌ ${message}`;
        locationStatus.className = 'location-status error';
        
        locationBtn.disabled = false;
        locationBtn.textContent = '📍 Try Again';
    }

    // Get location error message
    getLocationErrorMessage(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                return 'Location access denied. Please enable location services.';
            case error.POSITION_UNAVAILABLE:
                return 'Location information unavailable.';
            case error.TIMEOUT:
                return 'Location request timed out.';
            default:
                return 'An unknown error occurred while getting location.';
        }
    }

    // Update distances based on user location (simulated)
    updateDistancesBasedOnLocation() {
        // In a real app, this would calculate actual distances
        // For now, we'll just randomize them slightly
        this.mockData.forEach(restaurant => {
            restaurant.distance = Math.round((Math.random() * 1.5 + 0.1) * 10) / 10;
        });
        
        // Re-display results with updated distances
        this.handleSearch();
    }

    // Load favorites from localStorage
    loadFavorites() {
        try {
            const saved = localStorage.getItem('foodie-finder-favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    // Save favorites to localStorage
    saveFavorites() {
        try {
            localStorage.setItem('foodie-finder-favorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    // Debounce function for search input
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle keyboard navigation
    handleKeyboardNavigation(event) {
        // Add keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 'f':
                    event.preventDefault();
                    document.getElementById('search-input').focus();
                    break;
                case 'l':
                    event.preventDefault();
                    document.getElementById('get-location').click();
                    break;
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FoodieFinder();
});

// Chatbot Class
class Chatbot {
    constructor(app) {
        this.app = app;
        this.isOpen = false;
        this.messageCount = 0;
        this.responses = this.initializeResponses();
        this.init();
    }

    init() {
        this.bindEvents();
        this.hideNotification();
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickActions = document.querySelectorAll('.quick-action-btn');

        toggle.addEventListener('click', this.toggleChatbot.bind(this));
        close.addEventListener('click', this.closeChatbot.bind(this));
        send.addEventListener('click', this.sendMessage.bind(this));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        quickActions.forEach(btn => {
            btn.addEventListener('click', this.handleQuickAction.bind(this));
        });
    }

    toggleChatbot() {
        const popup = document.getElementById('chatbot-popup');
        const notification = document.getElementById('chatbot-notification');
        
        if (this.isOpen) {
            popup.classList.remove('active');
            this.isOpen = false;
        } else {
            popup.classList.add('active');
            this.isOpen = true;
            notification.style.display = 'none';
            document.getElementById('chatbot-input').focus();
        }
    }

    closeChatbot() {
        const popup = document.getElementById('chatbot-popup');
        popup.classList.remove('active');
        this.isOpen = false;
    }

    hideNotification() {
        setTimeout(() => {
            const notification = document.getElementById('chatbot-notification');
            notification.style.display = 'none';
        }, 3000);
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate bot response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(message, type) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message ${type}-message`;
        
        const avatar = type === 'user' ? '👤' : '🤖';
        const messageClass = type === 'user' ? 'user-message' : 'bot-message';
        
        messageElement.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.messageCount++;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingElement = document.createElement('div');
        typingElement.className = 'chatbot-message bot-message';
        typingElement.id = 'typing-indicator';
        
        typingElement.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <span>Typing</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    handleQuickAction(event) {
        const action = event.target.dataset.action;
        
        switch(action) {
            case 'halal':
                this.addMessage('Show me halal food options', 'user');
                setTimeout(() => {
                    this.addMessage('Great choice! I found several halal restaurants nearby. Let me filter those for you right now! 🥩', 'bot');
                    // Apply halal filter
                    document.getElementById('halal-filter').value = 'halal';
                    this.app.handleFilters();
                }, 1000);
                break;
            case 'budget':
                this.addMessage('What are some budget-friendly options?', 'user');
                setTimeout(() => {
                    this.addMessage('Perfect for students! Let me show you all the budget-friendly ($) options available. 💰', 'bot');
                    // Apply budget filter
                    document.getElementById('price-filter').value = '$';
                    this.app.handleFilters();
                }, 1000);
                break;
            case 'open':
                this.addMessage('Which places are open right now?', 'user');
                setTimeout(() => {
                    this.addMessage("I'll filter to show only places that are currently open! 🕒", 'bot');
                    // Apply open filter
                    document.getElementById('open-filter').value = 'open';
                    this.app.handleFilters();
                }, 1000);
                break;
            case 'help':
                this.addMessage('How does this app work?', 'user');
                setTimeout(() => {
                    this.addMessage(`Here's how to use Foodie Finder:
                    
🔍 **Search**: Type food types like "pizza" or "sushi" in the search bar
📍 **Location**: Click "Use My Location" to find nearby spots
🎯 **Filters**: Use price, status, and dietary filters to narrow results
❤️ **Favorites**: Click the heart icon to save your favorite places
🗺️ **Directions**: Click directions to get navigation

You can also ask me specific questions like "Find cheap pizza" or "Show vegan options"!`, 'bot');
                }, 1000);
                break;
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific keywords and patterns
        for (const [pattern, responses] of Object.entries(this.responses)) {
            if (lowerMessage.includes(pattern)) {
                const responseArray = Array.isArray(responses) ? responses : [responses];
                return responseArray[Math.floor(Math.random() * responseArray.length)];
            }
        }
        
        // Default responses
        const defaultResponses = [
            "That's interesting! Can you tell me more about what type of food you're looking for?",
            "I'd love to help! Are you looking for a specific cuisine or dietary preference?",
            "Let me help you find something delicious! What's your preference - price range, cuisine type, or dietary needs?",
            "Great question! Try using our search and filters to find exactly what you're craving. 🍕",
            "I'm here to help you find amazing food! What would you like to discover today?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    initializeResponses() {
        return {
            'hello': ['Hello! 👋 Welcome to Foodie Finder! What delicious food are you craving today?', 'Hi there! 🍕 Ready to discover some amazing food spots?'],
            'hi': ['Hey! 👋 What can I help you find today?', 'Hello! 🌟 Looking for something tasty?'],
            'help': ['I can help you find restaurants, filter by dietary needs, price range, and more! What would you like to know?', 'Here to help! 🤝 Ask me about food types, prices, dietary options, or how to use the app.'],
            'pizza': ['Pizza lovers unite! 🍕 Check out Tony\'s Pizza Palace and Halal Pizza Corner - both highly rated by students!', 'Mmm, pizza! 🍕 We have both regular and halal pizza options available.'],
            'halal': ['Great choice! 🥩 We have several halal-certified restaurants including Halal Chicken House, Mediterranean Grill, and Halal Pizza Corner.', 'Looking for halal food? 🥩 Let me filter those options for you!'],
            'cheap': ['Budget-friendly options coming right up! 💰 Check out our $ category - perfect for students!', 'Money-saving mode activated! 💰 Filtering for budget-friendly spots now.'],
            'expensive': ['Looking for something special? ✨ Our $$$ options include upscale dining experiences.', 'Premium dining time! 🌟 Let me show you our higher-end restaurants.'],
            'vegan': ['Plant-based power! 🌱 Vegan Delights has amazing options, and many other places offer vegan choices too.', 'Vegan food is fantastic! 🌱 Let me show you our plant-based options.'],
            'vegetarian': ['Veggie lovers welcome! 🥗 We have dedicated vegetarian restaurants and veggie-friendly options everywhere.', 'Great choice for vegetarian food! 🥗 Filtering those options now.'],
            'open': ['Want to know what\'s open right now? 🕒 Let me filter for currently open restaurants!', 'Checking what\'s open now! 🕒 Here are the available spots.'],
            'closed': ['Looking for places that are currently closed? They might be perfect for planning your next meal! 🕒', 'Some great places might be closed now but worth saving for later! 🕒'],
            'near': ['Location-based search! 📍 Make sure to click "Use My Location" to find the closest spots.', 'Finding nearby places! 📍 Distance matters when you\'re hungry!'],
            'favorite': ['Favorites are the best! ❤️ Click the heart icon on any restaurant to save it to your favorites list.', 'Love saving favorites! ❤️ Your saved spots appear in the favorites section.'],
            'burger': ['Burger time! 🍔 Burger Barn is a student favorite with great prices and portions!', 'Craving burgers? 🍔 We have some amazing burger spots with student-friendly prices.'],
            'sushi': ['Sushi lovers! 🍣 Sushi Spot offers fresh sushi at reasonable prices - perfect for students.', 'Fresh sushi coming up! 🍣 Great quality at student-friendly prices.'],
            'coffee': ['Coffee break! ☕ Coffee & Pastries is perfect for studying with great coffee and snacks.', 'Need your caffeine fix? ☕ Perfect study spots with great coffee available!'],
            'thanks': ['You\'re welcome! 😊 Happy eating and enjoy discovering new food spots!', 'My pleasure! 🌟 Hope you find something delicious!'],
            'thank you': ['Happy to help! 🌟 Enjoy your food adventure!', 'You\'re so welcome! 😊 Have a great meal!']
        };
    }
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
