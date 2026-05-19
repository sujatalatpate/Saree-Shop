import React, { useState,useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { getWishlist } from '../../services/api';

function ProductCard({ product }) {
  
  const [hovered, setHovered] =
    useState(false);
  const { cart } = useContext(CartContext);
  const { wishlist, toggleWishlist, setWishlist } =
    useContext(WishlistContext);

    const images =
    product.images?.length > 0
      ? product.images
      : [product.image];


  const navigate = useNavigate();

 const isWishlisted = wishlist.some(
  (item) => item && item._id === product._id
);

  const imageSrc =
    product.images?.length > 0
      ? product.images[0]
      : product.image ||
      'https://via.placeholder.com/400';

  const discount =
    product.originalPrice
      ? Math.round(
        ((product.originalPrice -
          product.price) /
          product.originalPrice) *
        100
      )
      : 0;

      useEffect(() => {

  const loadWishlist = async () => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return;

    const res = await getWishlist(user._id);

    setWishlist(res.data);

  };

  loadWishlist();

}, []);

  return (
    <div
      className="border-0 overflow-hidden"
      style={{
        cursor: 'pointer',
        transition: '0.35s ease',
        transform: hovered
      ? 'translateY(-5px)'
      : 'translateY(0)'
      }}
      onClick={() =>
        navigate(`/product/${product._id}`)
      }
      onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE SECTION */}
      <div
        className="position-relative overflow-hidden rounded-4"
        style={{
          height: '340px',
          background: '#f5f5f5'
        }}
      >
        {/* DISCOUNT BADGE */}
        {product.originalPrice &&
          discount > 0 && (
            <span
              className="badge bg-danger position-absolute px-3 py-2"
              style={{
                top: '14px',
                left: '14px',
                zIndex: 2,
                borderRadius: '20px',
                fontSize: '11px',
                letterSpacing: '0.5px'
              }}
            >
              {discount}% OFF
            </span>
          )}

        {/* WISHLIST */}
        <button
          className="btn btn-light rounded-circle position-absolute"
          style={{
            top: '14px',
            right: '14px',
            zIndex: 2,
            width: '40px',
            height: '40px',
            boxShadow:
              '0 4px 10px rgba(0,0,0,0.12)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <i
            className={`bi ${isWishlisted
                ? 'bi-heart-fill text-danger'
                : 'bi-heart'
              }`}
            style={{ fontSize: '17px' }}
          ></i>
        </button>

        {/* PRODUCT IMAGE */}
        <img
          src={
  hovered && images[1]
    ? images[1]
    : images[0]
}
          alt={product.name}
          className="w-100 h-100"
         style={{
  objectFit: 'cover',
  transition: '0.5s ease',
  transform: hovered
    ? 'scale(1.06)'
    : 'scale(1)'
}}
          onMouseOver={(e) =>
          (e.currentTarget.style.transform =
            'scale(1.06)')
          }
          onMouseOut={(e) =>
          (e.currentTarget.style.transform =
            'scale(1)')
          }
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="pt-3 px-1">

        {/* SAREE NAME */}
        <h6
          className="fw-semibold mb-1"
          style={{
            fontSize: '15px',
            lineHeight: '24px',
            color: '#222'
          }}
        >
          {product.name}
        </h6>

        {/* DESCRIPTION */}
        <p
          className="text-muted mb-2"
          style={{
            fontSize: '13px',
            lineHeight: '22px'
          }}
        >
          {product.description
            ? product.description.slice(0, 55) + '...'
            : 'Premium elegant saree collection'}
        </p>

        {/* PRICE */}
        <div className="d-flex align-items-center gap-2">
          <span
            className="fw-bold"
            style={{
              fontSize: '18px',
              color: '#111'
            }}
          >
            ₹{product.price}
          </span>
         

          {product.originalPrice && (
            <span
              className="text-muted text-decoration-line-through"
              style={{
                fontSize: '13px'
              }}
            >
              ₹{product.originalPrice}
            </span>
          )}
           {/* {product.stock > 0 ? (

  <p className="text-success fw-semibold mb-0">
    In Stock: {product.stock}
  </p>

) : (

  <p className="text-danger fw-semibold mb-0">
    Out Of Stock
  </p>

)} */}
        </div>


      </div>
    </div>
  );
}

export default ProductCard;