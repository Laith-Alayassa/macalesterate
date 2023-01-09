// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { firebaseConfig as firebaseConfigInfo } from "./config/firebaseConfig";
import {
  doc,
  getFirestore,
  Timestamp,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  increment,
  onSnapshot,
  query,
  getDoc,
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

const uploadPhoto = (file, fileName) => {
  const semiRandomID = generateID();
  const fileRef = ref(storageRef, semiRandomID);
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
    name: "new doc",
    fireCounter: 0,
    dumpCounter: 0,
    starCounter: 0,
    shishCounter: 0,
    building: "",
    createdAt: Timestamp.now(),
  })
    // Add id to the doc so I could use that ID to update it later
    .then((docRef) => {
      updateDoc(doc(db, "rooms", docRef.id), {
        id: docRef.id,
      });
    });
};

const provider = new GoogleAuthProvider();

const singInPlz = () => {
  // signInWithRedirect(auth, provider);
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
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

    .catch((error) => {
      console.log(error);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    })
    .then(() => {
      // console.log(auth.currentUser);
      // setUserSignedIn(auth.currentUser);
    });
};

const signOutPlz = () => {
  signOut(auth);
  // setUserSignedIn(auth.currentUser);
};

let signedIn = onAuthStateChanged(auth, (user) => {
  return user ? true : false;
});

const isSignedIn = () => {
  return onAuthStateChanged(auth, (user) => {
    return user ? true : false;
  });
};

const getRoomInfo = async (roomId) => {
  const docRef = doc(db, "rooms", roomId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const getRooms = async () => {
  return new Promise((resolve, reject) => {
    const rooms = [];
    const q = query(collection(db, "rooms"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data());
      });
      resolve(rooms);
    });
  });

  // let rooms = [];
  // const querySnapshot = await onSnapshot(roomsCollectionReference, (doc) =>
  //   console.log("Current data: ", doc.data())
  // );
  // console.log("====================================");
  // console.log(querySnapshot.docs);
  // console.log("====================================");
  // querySnapshot.docs.forEach((doc) => {
  //   rooms.push(doc.data());
  // });

  // // // sort by creation date
  // // rooms.sort((a, b) =>
  // //   a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  // // );
  // // return rooms;
};

const updateRoomLikes = (likeType, roomID) => {
  return new Promise((resolve, reject) => {
    const roomRef = doc(db, "rooms", roomID);
    updateDoc(roomRef, {
      [likeType]: increment(1),
    })
      .then(() => console.log("updated"))
      .then(() => resolve());
  });
};

const generateID = () =>
  new Date().getTime() / 1000 + "-" + Math.floor(Math.random() * 1000);

export {
  uploadPhoto,
  singInPlz,
  signedIn,
  signOutPlz,
  isSignedIn,
  auth,
  getRooms,
  getRoomInfo,
  updateRoomLikes,
};
