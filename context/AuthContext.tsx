import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User as FirebaseUser,
    UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { User } from '../types';

interface AuthContextType {
    user: FirebaseUser | null;
    userData: User | null;
    loading: boolean;
    signup: (email: string, password: string, additionalData: any) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                try {
                    // Fetch additional user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data() as User);
                    } else {
                        // Handle case where auth exists but no firestore doc (legacy/desync)
                        setUserData(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUserData(null);
                }
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string, additionalData: any) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { password: _, confirmPassword: __, ...dataToSave } = additionalData;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            uid: userCredential.user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isDonor: true, // Defaulting to true for this app context as it matches 'registerNewDonor' flow
            ...dataToSave
        });
        return userCredential;
    };

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return signOut(auth);
    };

    const value = {
        user,
        userData,
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
