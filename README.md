# 📱 StartCom Mobile

**StartCom Mobile** is the mobile application for the **StartCom** project (TCC), developed with **React Native**.  
It complements the web platform, offering an optimized experience for mobile devices.

---

## 🚀 Technologies Used

- **React Navigation** → stack, tab, and drawer navigation  
- **Axios** → HTTP requests with the backend (FastAPI)  
- **React Native Vector Icons** → native icons  
- **Context API** → global state management  
- **React Hook Form** → forms (adapted for React Native)  
- **React Native Toast Message** → notifications and feedback  
- **React Native Reanimated + Gesture Handler** → smooth animations and gestures  
- **React Native Screens** → improved navigation performance  
- **Async Storage** → local persistence (login tokens, configs)  

---

## ▶️ How to Run the Project

1. **Clone this repository**

```bash
git clone https://github.com/your-username/startcom-mobile.git
cd startcom-mobile
```

Install dependencies
```bash
npm install
```

Install required native libraries
```bash
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
```

Start the Metro bundler
```bash
npx react-native start
```

Run on Android or iOS
```bash
npx react-native run-android
npx react-native run-ios
```
