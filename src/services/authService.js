import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const handleLogin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user; // ✅ return user object
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
