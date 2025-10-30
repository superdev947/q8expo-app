# Q8Expo Mobile App

A React Native Expo mobile application for the Q8Expo platform, featuring e-commerce functionality, QR code scanning, membership management, and multi-role user support.

## 📱 Features

### User Roles
- **Guest**: Browse products, view offers, and register accounts
- **Customer/Seller**: Full e-commerce experience with cart, orders, and profile management
- **Admin**: QR code scanning and administrative functions

### Core Functionality
- 🛍️ **E-Commerce**: Browse products, categories, brands, and manage shopping cart
- 🎫 **Offers & Discounts**: View and redeem special offers and discounts
- 👤 **User Authentication**: Complete auth flow with login, registration, verification, and password reset
- 📍 **Location Services**: Interactive maps for store locations
- 📷 **QR Code Scanner**: Admin QR code scanning capabilities
- 💳 **Membership Management**: Subscribe to and manage memberships
- 🌐 **Internationalization**: Full support for English and Arabic (RTL)
- 📱 **App Intro**: Onboarding slider for first-time users

## 🏗️ Project Structure

```
q8expo-app/
├── src/
│   ├── Router.js                 # Main app router with role-based navigation
│   ├── Welcome.js                # Welcome/onboarding screen
│   ├── assets/                   # Images, videos, icons
│   ├── components/               # Reusable UI components
│   ├── constants/                # App constants (colors, layouts, API endpoints)
│   ├── containers/               # Screen components
│   │   ├── AdminScreens/         # Admin-specific screens
│   │   ├── AuthScreen/           # Authentication screens
│   │   └── MainScreens/          # Main app screens
│   ├── lang/                     # Translation files (en, arabic)
│   ├── navigate/                 # Navigation configurations
│   │   ├── Admin.js              # Admin navigation stack
│   │   ├── Guest.js              # Guest navigation stack
│   │   ├── Logged.js             # Logged-in user navigation stack
│   │   └── SideMenu.js           # Side drawer menu
│   └── redux/                    # State management
│       ├── Store.js              # Redux store configuration
│       ├── actions/              # Redux actions
│       ├── reducers/             # Redux reducers
│       └── services/             # API services
├── App.js                        # Root component with video splash screen
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
└── babel.config.js               # Babel configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/superdev947/q8expo-app.git
   cd q8expo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoints** (Optional)
   
   Edit `src/constants/Root.js` to point to your backend:
   ```javascript
   export const DEV = {
     BACKEND_URL: "http://your-api-url.com/api/",
     IMAGE_URL: "http://your-api-url.com/",
     player: "players"
   }
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## 📦 Tech Stack

### Core
- **React Native**: v17.0.2 (Expo SDK 41)
- **Expo**: v41.0.1
- **React Navigation**: v4.4.4

### State Management
- **Redux**: v4.0.5
- **React Redux**: v7.2.1
- **Redux Thunk**: v2.3.0

### UI Libraries
- **Native Base**: v2.15.2
- **React Native Elements**: v2.3.2
- **React Native Linear Gradient**: Gradient effects

### Key Features
- **axios**: HTTP client for API requests
- **i18n-js**: Internationalization
- **expo-barcode-scanner**: QR code scanning
- **expo-image-picker**: Image selection
- **react-native-maps**: Map integration
- **react-native-qrcode-svg**: QR code generation
- **expo-av**: Video playback (splash screen)

## 📱 Available Scripts

```bash
# Start development server
npm start

# Build Android APK
npm run build

# Build iOS app
npm run build:ios

# Fetch Android fingerprint hashes
npm run build:fingerprint
```

## 🔑 Key Screens

### Authentication Flow
- `WelcomeScreen`: Landing page with login/register options
- `LoginScreen`: User login
- `CreateAccountScreen`: New user registration
- `VerificationScreen`: Account verification
- `ForgetScreen`: Password recovery
- `ResetPasswordScreen`: Reset password

### Main Screens
- `HomeScreen`: Main dashboard with featured products
- `CategoriesScreen`: Browse product categories
- `DetailScreen`: Product details
- `CartScreen`: Shopping cart management
- `OffersScreen`: View available offers
- `DiscountScreen`: Browse discounts
- `MembershipScreen`: Membership plans
- `MyProfileScreen`: User profile management
- `LocationScreen`: Store locations on map
- `CreateScreen`: Create new listings (for sellers)

### Admin Screens
- `AdminHomeScreen`: Admin dashboard
- `ScanScreen`: QR code scanner

## 🌍 Internationalization

The app supports both English and Arabic with RTL (Right-to-Left) support for Arabic. Translation files are located in:
- `src/lang/en.json`
- `src/lang/arabic.json`

Default language is set to Arabic.

## 🎨 Theming

Theme colors and layouts are defined in:
- `src/constants/Color.js`: Color palette
- `src/constants/Layout.js`: Layout dimensions and helpers

## 🔐 Authentication

The app uses token-based authentication. Auth tokens are stored in Redux and automatically included in API requests via the services layer (`src/redux/services/index.js`).

## 📱 Platform Support

- ✅ iOS (version 1.0.6)
- ✅ Android (versionCode: 1)
- ✅ Web (limited support)

## 🗺️ Google Maps Integration

The app includes Google Maps for location features. API keys are configured in `app.json`:
- iOS: Uses Google Maps API Key
- Android: Uses separate Google Maps API Key

## 📄 License

Private project - All rights reserved

## 👨‍💻 Author

**superdev947**

## 🐛 Known Issues

- Some LogBox warnings for `interpolate()` are suppressed
- Video splash screen runs for 6 seconds on app launch

## 📞 Support

For issues or questions, please contact the repository owner.

---

**Version**: 1.0.6  
**Bundle ID (iOS)**: com.happy.qexpo  
**Package (Android)**: com.happy.qexpo
