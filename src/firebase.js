// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { firebaseConfig as firebaseConfigInfo } from "./config/firebaseConfig";
import {
  doc,
  setDoc,
  getFirestore,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { uploadBytes, getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import info from "./config/firenaseConfigInfo";

// Your web app's Firebase configuration
const firebaseConfig = info;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const roomsCollectionReference = collection(db, "rooms");

const storage = getStorage(app);
const storageRef = ref(storage);

const auth = getAuth(app);

const uploadPhoto = (file) => {
  const fileRef = ref(storageRef, "work");
  let downloadUrl;
  uploadBytes(fileRef, file, { test: "yes" }).then(() => {
    getDownloadURL(fileRef, file)
      .then((url) => {
        console.log("url baby");
        downloadUrl = url;
      })
      .then(() => console.log(downloadUrl))
      .then(() => {
        uploadData(downloadUrl);
      });
  });
};

const uploadData = async (url) => {
  await addDoc(roomsCollectionReference, {
    url: url,
    name: "sup",
    fireCounter: 0,
    dumpCounter: 0,
    starCounter: 0,
    shishCounter: 0,
    building: "",
    createAt: Timestamp.now(),
  });
};

const provider = new GoogleAuthProvider();

const singInPlz = (setUseIn) => {
  // signInWithRedirect(auth, provider);
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .then(() => {
      const user = auth.currentUser;
      console.log("====loggin in user================================");
      console.log(user.email);
      console.log("====================================");
      if (!user.email.endsWith("@macalester.edu")) {
        signOut(auth);
        alert("You must be a Macalester student to use this app");
      }
    })
    .then(() => setUseIn(auth.currentUser));
  // .catch((error) => {
  //   console.log(error);
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   // const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  // });
};

const signOutPlz = (setUseIn) => {
  signOut(auth);
  setUseIn(auth.currentUser);
};

let signedIn = onAuthStateChanged(auth, (user) => {
  return user ? true : false;
});

const isSignedIn = () => {
  return onAuthStateChanged(auth, (user) => {
    return user ? true : false;
  });
};
export { uploadPhoto, singInPlz, signedIn, signOutPlz, isSignedIn, auth };
