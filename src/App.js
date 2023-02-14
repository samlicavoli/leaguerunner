import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

const app = firebase.initializeApp({
  apiKey: "AIzaSyDOnCtgMBGvPZPZSLwUes0WlFoXGatUPHA",
  authDomain: "league-runner.firebaseapp.com",
  projectId: "league-runner",
  storageBucket: "league-runner.appspot.com",
  messagingSenderId: "38973408078",
  appId: "1:38973408078:web:6b477edbdd8e7b4838941f",
  measurementId: "G-WKSZF6DK0L"
});

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('CE304B0D-98EE-4404-996A-5E77977FE54F'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user]= useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  return (<>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </main>

  </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL}  alt=''/>
      <p>{text}</p>
    </div>
  </>)
}
export default App;
