import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query,
  getDoc
} from 'firebase/firestore';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const cartRef = collection(db, 'users', currentUser.uid, 'cart');
    const q = query(cartRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCartItems(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  async function addToCart(product) {
    if (!currentUser) throw new Error("You must be logged in to add items to cart.");
    
    const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', product.id.toString());
    const docSnap = await getDoc(cartItemRef);

    if (docSnap.exists()) {
      // Item exists, maybe update quantity? For now, just overwrite/ignore
      // Or we could add a quantity field. Let's add quantity.
      const currentQuantity = docSnap.data().quantity || 1;
      await setDoc(cartItemRef, { 
        ...product, 
        quantity: currentQuantity + 1 
      });
    } else {
      await setDoc(cartItemRef, { 
        ...product, 
        quantity: 1 
      });
    }
  }

  async function removeFromCart(productId) {
    if (!currentUser) return;
    const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', productId.toString());
    await deleteDoc(cartItemRef);
  }

  async function updateQuantity(productId, newQuantity) {
    if (!currentUser) return;
    if (newQuantity < 1) return;
    
    const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', productId.toString());
    await setDoc(cartItemRef, { quantity: newQuantity }, { merge: true });
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
