import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  Timestamp,
  addDoc,
  collection,
  updateDoc,
  increment,
  onSnapshot,
  query,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { uploadBytes, getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
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

let Filter = require("bad-words");
let filter = new Filter();

const uploadPhoto = (file, nickName, caption, building) => {
  return new Promise((resolve, reject) => {
    if (filter.isProfane(nickName) || filter.isProfane(caption)) {
      reject();
      return;
    }
    const semiRandomID = generateID();
    const fileRef = ref(storageRef, semiRandomID);
    let downloadUrl;
    uploadBytes(fileRef, file, { test: "yes" }).then(() => {
      getDownloadURL(fileRef, file)
        .then((url) => {
          downloadUrl = url;
        })
        .then(() => console.log(downloadUrl))
        .then(() => {
          uploadData(downloadUrl, nickName, caption, building).then(() => {
            resolve();
          });
        });
    });
  });
};

const uploadData = async (url, nickName, caption, building) => {
  const aiEmoji = [
    "🤩",
    "💩",
    "💍",
    "🤝",
    "🐸",
    "🙅‍♂️",
    "🫦",
    "🤯",
    "🤭",
    "⭐️",
    "🫡",
    "🙈",
    "😻",
    "🫶",
    "👏",
    "👎",
    "😿",
  ];

  const randomEmoji = aiEmoji[Math.floor(Math.random() * aiEmoji.length)];
  await addDoc(roomsCollectionReference, {
    url: url,
    name: nickName,
    caption: caption,
    fireCounter: 0,
    dumpCounter: 0,
    starCounter: 0,
    shishCounter: 0,
    building: building,
    createdAt: Timestamp.now(),
    usersDumbLiked: {},
    usersStarLiked: {},
    usersFireLiked: {},
    aiRating: randomEmoji,
    score: 0,
    comments: [],
    avatarURL: `https://api.dicebear.com/5.x/miniavs/svg?seed=${nickName}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=110`,
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

      const details = getAdditionalUserInfo(result);
      // console.log(details.isNewUser);
      console.log("signed in");
    })
    .then(() => {
      const user = auth.currentUser;
      // if (!user.email.endsWith("@macalester.edu")) {
      //   signOut(auth);
      //   alert("You must sign in with your Macalester e-mail");
      // }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      // const credential = GoogleAuthProvider.credentialFromError(error);
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

/**
 * gets the rooms from the database
 * @returns array of rooms
 */
const getRooms = async () => {
  return new Promise((resolve, reject) => {
    const roomsByDate = [];
    const roomsByScore = [];
    const q = query(collection(db, "rooms"));

    // TODO: Remove this from onSnapShot so it does not keep making reads that don't render in the front end
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        roomsByDate.push(doc.data());
        roomsByScore.push(doc.data());
      });

      roomsByScore.sort((a, b) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
      );
      roomsByDate.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
      );

      resolve([roomsByDate, roomsByScore]);
    });
  });
};

const updateRoomLikes = (
  likeType,
  roomID,
  performUpvote,
  collectionOfLikes
) => {
  return new Promise((resolve, reject) => {
    let scoreChange = 0;

    if (likeType === "fireCounter") {
      scoreChange = 2;
    } else if (likeType === "starCounter") {
      scoreChange = 1;
    } else if (likeType === "dumpCounter") {
      scoreChange = -1;
    }

    const roomRef = doc(db, "rooms", roomID);
    const currUserEmail = auth.currentUser.email;
    getCollectionOfLikes(roomID, collectionOfLikes).then(
      (prevCollectionOfLikes) => {
        updateDoc(roomRef, {
          [likeType]: performUpvote ? increment(1) : increment(-1),
          score: performUpvote
            ? increment(scoreChange)
            : increment(-scoreChange),
          [collectionOfLikes]: {
            ...prevCollectionOfLikes,
            [currUserEmail]: performUpvote,
          },
        }).then(() => resolve());
      }
    );
  });
};

const getCollectionOfLikes = async (roomID, collectionOfLikes) => {
  const docRef = doc(db, "rooms", roomID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    return data[collectionOfLikes];
  } else {
    console.log("No such document!");
  }
};

const addComment = (comment, id) => {
  const commentRef = doc(db, "rooms", id);
  const user = auth.currentUser;
  if (user === null) return;
  const displayName = user.displayName;
  var nameArr = displayName.split(" ");
  const name = `${nameArr[0]} ${nameArr[1][0]}.`;
  updateDoc(commentRef, {
    comments: arrayUnion({ name, comment }),
  });
};

const updatePoopCounter = (messageID, performUpvote) => {
  const messageRef = doc(db, "messages", messageID);
  updateDoc(messageRef, {
    poopCounter: performUpvote ? increment(1) : increment(-1),
    usersPooped: performUpvote
      ? arrayUnion(auth.currentUser.email)
      : arrayRemove(auth.currentUser.email),
  });
};

const generateID = () =>
  new Date().getTime() / 1000 + "-" + Math.floor(Math.random() * 1000);

export {
  db,
  uploadPhoto,
  singInPlz,
  signedIn,
  signOutPlz,
  isSignedIn,
  auth,
  getRooms,
  getRoomInfo,
  updateRoomLikes,
  addComment,
  updatePoopCounter,
};
