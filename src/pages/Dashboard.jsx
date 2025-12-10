import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [imgError, setImgError] = useState(false);

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (currentUser?.displayName || "User") + "&background=0f172a&color=fff&size=200";

  return (
    <div className="container mx-auto px-6">
      <div className="my-8 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary font-heading">My Account</h1>
      </div>
      
      <div className="min-h-auto flex items-start justify-center p-8">
        <div className="bg-surface p-12 rounded-2xl shadow-lg w-full max-w-md border border-border text-center">
          <img 
            src={!imgError && currentUser.photoURL ? currentUser.photoURL : defaultAvatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-6 mx-auto"
            onError={() => setImgError(true)}
          />
          <h2 className="text-2xl font-bold mb-2 text-primary font-heading">{currentUser.displayName || "User"}</h2>
          <p className="text-text-secondary mb-6">{currentUser.email}</p>
          
          <div className="flex items-center text-center my-6 text-text-secondary text-sm before:flex-1 before:border-b before:border-border before:mr-2 after:flex-1 after:border-b after:border-border after:ml-2"></div>
          
          <div className="text-left space-y-2">
            <p><strong className="font-semibold text-primary">Member since:</strong> {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
            <p><strong className="font-semibold text-primary">Last login:</strong> {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
