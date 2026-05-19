
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, addReview, fetchProducts } from '../../services/api';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();


  const isInCart =
  product &&
  cart.some(
    (item) =>
      item &&
      (
        item.productId === product._id ||
        item._id === product._id
      )
  );
const pending =
  JSON.parse(
    localStorage.getItem('pendingProduct')
  ) || {};

const isPending =
  product &&
  pending &&
  pending._id === product._id;

  const isAdded = isInCart || isPending;


  const handleAddToCart = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
      return;
    }

    addToCart({
      productId: product._id,
      _id: product._id,
      name: product.name,
      price: product.price,
      image: images[0],
      qty: 1
    });

  };



  useEffect(() => {

    fetchProductById(id)
      .then(res => {

        setProduct(res.data);

        // FIRST IMAGE DEFAULT
        if (res.data.images?.length > 0) {
          setCurrentImage(res.data.images[0]);
        } else {
          setCurrentImage(res.data.image);
        }

      })
      .catch(err => console.log(err));

  }, [id]);

  useEffect(() => {

  const loadRelatedProducts = async () => {

    if (!product) return;

    try {

      const res = await fetchProducts();

      const related = res.data
        .filter(
          (item) =>
            item._id !== product._id &&
            item.category === product.category
        )
        .slice(0, 8);

      setRelatedProducts(related);

    } catch (error) {

      console.log(error);

    }

  };

  loadRelatedProducts();

}, [product]);

   let viewedProducts =
    JSON.parse(
      localStorage.getItem(
        'recentlyViewed'
      )
    ) || [];

  // REMOVE DUPLICATE
  useEffect(() => {

  if (!product || !product._id) return;

  let viewedProducts =
    JSON.parse(
      localStorage.getItem('recentlyViewed')
    ) || [];

  // REMOVE NULL VALUES
  viewedProducts = viewedProducts.filter(
    (item) => item && item._id
  );

  // REMOVE DUPLICATE
  viewedProducts = viewedProducts.filter(
    (item) => item._id !== product._id
  );

  // ADD CURRENT PRODUCT FIRST
  viewedProducts.unshift(product);

  // LIMIT TO 8 PRODUCTS
  viewedProducts = viewedProducts.slice(0, 8);

  localStorage.setItem(
    'recentlyViewed',
    JSON.stringify(viewedProducts)
  );

}, [product]);
if (!product) {
  return (
    <div className="text-center py-5">
      <h4>Loading...</h4>
    </div>
  );
}

  // IMAGE ARRAY
  const images =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const handleReviewSubmit = async (e) => {

    e.preventDefault();

    try {

      await addReview(product._id, {
        rating,
        comment
      });

      alert('Review Added');

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div
      className="container py-5"
      style={{
        marginTop: '20px',
        paddingTop: '40px',
        paddingBottom: '60px',
        minHeight: '100vh',
        background: '#fafafa'
      }}
    >

      <div
        className="row g-5"
        style={{
          overflow: 'visible'
        }}
      >

        {/* LEFT SIDE */}
        <div className="col-md-6">

          {/* MAIN IMAGE */}
          <div
            className="overflow-hidden shadow-lg"
            style={{
              borderRadius: '28px',
              background: '#f3f3f3',
              padding: '10px'
            }}
          >

            <img
              src={currentImage}
              alt={product.name}
              className="w-100"
              style={{
                height: '650px',
                objectFit: 'cover',
                borderRadius: '20px',
                transition: '0.4s ease'
              }}
            />

          </div>

          {/* THUMBNAILS */}
          <div className="d-flex gap-3 mt-3 flex-wrap">

            {images.map((img, index) => (

              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setCurrentImage(img)}
                style={{
                  width: '95px',
                  height: '95px',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  padding: '4px',
                  background: '#fff',
                  transition: '0.3s ease',
                  boxShadow:
                    currentImage === img
                      ? '0 0 0 3px #111'
                      : '0 6px 18px rgba(0,0,0,0.08)',
                  transform:
                    currentImage === img
                      ? 'translateY(-4px)'
                      : 'translateY(0)'
                }}
              />

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6 d-flex">

          <div
            style={{
              position: 'sticky',
              top: '120px',
              alignSelf: 'flex-start',
              width: '100%'
            }}
          >

            <h3
              className="fw-bold mb-3"
              style={{
                fontSize: '40px',
                letterSpacing: '-1.5px',
                lineHeight: '1.2',
                color: '#111'
              }}
            >
              {product.name}
            </h3>
            <div className="mb-3">

              <span className="text-warning fs-5">

                {'⭐'.repeat(
                  Math.round(product.rating)
                )}

              </span>

              <span className="ms-2 text-muted">

                ({product.numReviews} Reviews)

              </span>

            </div>

            <div className="mb-4">

  {/* PRICE ROW */}
  <div className="d-flex align-items-center gap-3 flex-wrap">

    <h2
      className="fw-bold mb-0"
      style={{
        fontSize: '42px',
        color: '#111',
        letterSpacing: '-1px'
      }}
    >
      ₹{product.price}
    </h2>

    {product.originalPrice > product.price &&
  Math.round(
    ((product.originalPrice - product.price)
      / product.originalPrice) * 100
  ) > 0 && (

      <>
        <span
          className="text-muted text-decoration-line-through"
          style={{
            fontSize: '22px'
          }}
        >
          ₹{product.originalPrice}
        </span>

        <span
          className="badge bg-danger"
          style={{
            fontSize: '13px',
            padding: '8px 14px',
            borderRadius: '30px'
          }}
        >
          {Math.round(
            ((product.originalPrice - product.price)
              / product.originalPrice) * 100
          )}% OFF
        </span>
      </>

    )}

  </div>

  {/* STOCK ROW */}
  <div className="mt-2">

    {product.stock <= 5 && product.stock > 0 && (

      <p
        className="fw-semibold mb-0"
        style={{
          color: '#d32f2f',
          fontSize: '15px'
        }}
      >
        Only {product.stock} left in stock
      </p>

    )}

    {product.stock > 5 && (

      <p
        className="fw-semibold mb-0"
        style={{
          color: '#2e7d32',
          fontSize: '15px'
        }}
      >
        In Stock
      </p>

    )}

    {product.stock === 0 && (

      <p
        className="fw-bold mb-0"
        style={{
          color: '#d32f2f',
          fontSize: '15px'
        }}
      >
        Out Of Stock
      </p>

    )}

  </div>

</div>

            <p
              style={{
                lineHeight: '1.9',
                fontSize: '16px',
                color: '#666'
              }}
            >
              {product.description}
            </p>
            {/* BUTTONS */}
            <div className="d-flex gap-3 mt-4" >

              {/* ADD TO CART */}
              <button
                className={`btn w-50 py-3 ${isAdded
                  ? 'btn-success'
                  : 'btn-dark'
                  }`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  borderRadius: '14px',
                  fontSize: '18px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  transition: '0.3s ease',
                  border: 'none'
                }}
              >

                {isAdded
                  ? 'Added To Cart'
                  : 'Add To Cart'}

              </button>

              {/* BUY NOW */}
              <button
                className="btn btn-danger w-50 py-3"
                disabled={product.stock === 0}
                style={{
                  borderRadius: '14px',
                  fontSize: '18px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  transition: '0.3s ease',
                  border: 'none'
                }}
                onClick={() => {

                  const user = JSON.parse(
                    localStorage.getItem('user')
                  );

                  if (!user) {
                    navigate('/login');
                    return;
                  }

                  addToCart({
                    productId: product._id,
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: images[0],
                    qty: 1
                  });

                  navigate('/checkout');

                }}
              >
                Buy Now
              </button>

            </div>
            <hr />

            <h4 className="fw-bold mt-4 mb-3">
              Add Review
            </h4>

            <form onSubmit={handleReviewSubmit}>

              {/* RATING */}
              <div className="mb-3">

                <label className="form-label">
                  Rating
                </label>

                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) =>
                    setRating(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Rating
                  </option>

                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐⭐</option>
                  <option value="3">3 ⭐⭐⭐</option>
                  <option value="4">4 ⭐⭐⭐⭐</option>
                  <option value="5">5 ⭐⭐⭐⭐⭐</option>

                </select>

              </div>

              {/* COMMENT */}
              <div className="mb-3">

                <label className="form-label">
                  Comment
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  required
                />

              </div>

              <button
                className="btn btn-dark rounded-3 px-4"
                type="submit"
              >
                Submit Review
              </button>

            </form>
            <hr className="my-5" />

            <h4 className="fw-bold mb-4">
              Customer Reviews
            </h4>

            {product.reviews?.length === 0 ? (

              <p>No Reviews Yet</p>

            ) : (

              product.reviews.map((review, index) => (

                <div
                  key={index}
                  className="p-4 mb-4"
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
                  }}
                >

                  <div className="d-flex justify-content-between">

                    <h6 className="fw-bold mb-1">
                      {review.name}
                    </h6>

                    <span className="text-warning">

                      {'⭐'.repeat(review.rating)}

                    </span>

                  </div>

                  <p className="mb-0 text-muted">
                    {review.comment}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>
{/* RELATED PRODUCTS */}
{relatedProducts.length > 0 && (

  <section className="mt-5">

    <h2 className="fw-bold mb-4">
      Related Products
    </h2>

    <div className="row g-4">

      {relatedProducts.map((item) => (

        <div
          className="col-lg-3 col-md-4 col-sm-6"
          key={item._id}
        >

          <ProductCard product={item} />

        </div>

      ))}

    </div>

  </section>

)}


      </div>

    </div>

  );
}

export default ProductDetail;