// Import the functions you need from the SDKs you need
 const {initializeApp} = require("firebase/app");
 const { getStorage, ref } =  require("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKLgeOrxse5dJK2cV08r-aI86Yp-NDAe0",
  authDomain: "book-app-77f95.firebaseapp.com",
  projectId: "book-app-77f95",
  storageBucket: "book-app-77f95.appspot.com",
  messagingSenderId: "121239785994",
  appId: "1:121239785994:web:868886023ad31f7b0485f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const storageRef = ref(storage);

module.exports = storageRef;