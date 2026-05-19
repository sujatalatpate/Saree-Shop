import React, { createContext, useState } from 'react';
import { toggleWishlistApi } from '../services/api';
import { getWishlist } from '../services/api';

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  const toggleWishlist = async (product) => {

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return;

  const res = await toggleWishlistApi({
    userId: user._id,
    productId: product._id
  });

  setWishlist(res.data);

};

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        toggleWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;