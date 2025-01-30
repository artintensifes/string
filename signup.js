// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyChVgdEdoH3E5ueWQw3f2tk0JJn_DrfteA",
    authDomain: "stringer-a6866.firebaseapp.com",
    projectId: "stringer-a6866",
    storageBucket: "stringer-a6866.firebasestorage.app",
    messagingSenderId: "893503594092",
    appId: "1:893503594092:web:658cff1d4c453893154249"
  };
  
  // Initialize Firebase App
  firebase.initializeApp(firebaseConfig);
  
  // Reference to Firebase Authentication and Firestore
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Signup function
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      // Sign up the user using Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      
      const user = userCredential.user;
      
      // Generate a unique 6-digit ID
      const uniqueID = Math.floor(100000 + Math.random() * 900000);  // Random 6-digit number
      
      // Save the user data to Firestore
      await db.collection('users').doc(user.uid).set({
        email: user.email,
        uniqueID: uniqueID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  
      alert('User signed up successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
  