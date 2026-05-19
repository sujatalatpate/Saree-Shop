import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

function Wishlist() {

  const { wishlist, toggleWishlist } =
    useContext(WishlistContext);

  const navigate = useNavigate();

  return (

    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        ❤️ My Wishlist
      </h2>

      {wishlist.length === 0 ? (

        <div className="text-center py-5">

          <h4>
            Wishlist is Empty
          </h4>

          <p className="text-muted">
            Save your favorite sarees here.
          </p>

        </div>

      ) : (

        <div className="row g-4">

          {wishlist.map(product => (

            <div
              className="col-md-3"
              key={product._id}
            >

              <div
                className="card border-0 shadow-sm rounded-4 overflow-hidden h-100"
                style={{
                  cursor: 'pointer'
                }}
                onClick={() =>
                  navigate(`/product/${product._id}`)
                }
              >

                {/* IMAGE */}
                <img
                  src={
                    product.images?.[0] ||
                    product.image
                  }
                  alt={product.name}
                  style={{
                    height: '300px',
                    objectFit: 'cover'
                  }}
                />

                {/* BODY */}
                <div className="card-body">

                  <h6
                    className="fw-semibold"
                    style={{
                      fontSize: '15px',
                      minHeight: '40px'
                    }}
                  >
                    {product.name}
                  </h6>

                  <div className="d-flex align-items-center gap-2">

                    <h6 className="fw-bold mb-0">
                      ₹{product.price}
                    </h6>

                    {product.originalPrice && (

                      <small className="text-muted text-decoration-line-through">

                        ₹{product.originalPrice}

                      </small>

                    )}

                  </div>

                  {/* REMOVE */}
                  <button
                    className="btn btn-outline-danger w-100 mt-3 rounded-3"
                    onClick={(e) => {

                      e.stopPropagation();

                      toggleWishlist(product);

                    }}
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Wishlist;