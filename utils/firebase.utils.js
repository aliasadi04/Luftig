import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "firebase/auth";

import {
	collection, doc,
	getDoc, getDocs, getFirestore, onSnapshot, query, setDoc
} from "firebase/firestore";

//Denne objekt sikrer at vi forbinder til den rigtige cloud database
const firebaseConfig = {
	apiKey: "AIzaSyBkNXI-z0YAGX0PBLjYecEe4Pc8YAE8-6A",
  authDomain: "luftig-e29ea.firebaseapp.com",
  databaseURL: "https://luftig-e29ea-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "luftig-e29ea",
  storageBucket: "luftig-e29ea.appspot.com",
  messagingSenderId: "580809216520",
  appId: "1:580809216520:web:0ba53d66f5f121998e37bd"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

//henter alle brugere fra databasen
export const getUsers = async () => {
	const collectionRef = collection(db, "users");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const users = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const {co,displayName,email,uid,voc}=docSnapshot.data();
		acc.push({co,displayName,email,uid,voc});
		return acc;
	}, []);

	return users;
};

//finder en user i databasen med en bestemt uid
export const getUserByUid = async (uid) => {
	const collectionRef = collection(db, "users");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const foundUser = querySnapshot.docs.filter((user) => {
		return(user.data().uid===uid)});

	const moddedUser=foundUser[0].data();
	
	return moddedUser;
};



//opretter en bruger i database med brugerinformationerne
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email,uid } = userAuth;
		
		const createdAt =new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				uid,

				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userDocRef;
};

//opretter en auth i authentication databasen med en email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

//logger brugeren ind med email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

//opretter en reference til data databasen i firestore
const u=query(collection(db, "data"));

//en listener, der kører en givne funktion hver gang der er ændring i values databasen
export const sensorValuesListener=(callback)=>{
	onSnapshot(u, callback);
}

//logger brugeren ud
export const signOutUser = async () => await signOut(auth);

//en listener, der kører en givne funktion hver gang der er ændring i brugerdatabasen
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);


