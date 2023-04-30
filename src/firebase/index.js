import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBNbNHcY2mNLXU5iU-nIlxNvrNz4iRvL60',
  authDomain: 'youstorer.firebaseapp.com',
  projectId: 'youstorer',
  storageBucket: 'youstorer.appspot.com',
  messagingSenderId: '232569711076',
  appId: '1:232569711076:web:b4b8716ec6463a2f3f7ff1',
  measurementId: 'G-6ZXCXTET0N'
};

// Initialize Firebase
 const app = initializeApp( firebaseConfig );
//const analytics = getAnalytics(app); 

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore( app );

export {
  db
}