import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user exists in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          // Auto-upgrade the specific admin email if they aren't admin yet
          if (currentUser.email === 'eyobengdawork1998@gmail.com' && data.role !== 'admin') {
            await setDoc(userRef, { role: 'admin' }, { merge: true });
            data.role = 'admin';
          }
          setUserData(data);
        } else {
          // Create new user document
          const newUserData: UserData = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Student',
            photoURL: currentUser.photoURL || '',
            role: currentUser.email === 'eyobengdawork1998@gmail.com' ? 'admin' : 'student', // Default role
          };
          
          await setDoc(userRef, {
            ...newUserData,
            createdAt: serverTimestamp()
          });
          
          setUserData(newUserData);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
