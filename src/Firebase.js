import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD8GERLcUM3EArlAt35X3DFLC424iPzIZE",
  authDomain: "netflix-clone-8e51f.firebaseapp.com",
  projectId: "netflix-clone-8e51f",
  storageBucket: "netflix-clone-8e51f.firebasestorage.app",
  messagingSenderId: "1098568259847",
  appId: "1:1098568259847:web:f3b9aad85f4323328b4da2"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup = async (name,email,password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
    })
  }catch(error){
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const logout = async ()=>{
    signOut(auth);
}

export {auth,db,signup,login,logout}