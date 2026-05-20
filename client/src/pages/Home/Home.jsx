import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showTrending, setShowTrending] = useState(false);
  const [showNewArrival, setShowNewArrival] = useState(false);
  const PRODUCTS_PER_LOAD = 8;

const [visibleProducts, setVisibleProducts] =
  useState(PRODUCTS_PER_LOAD);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  const search = query.get('search') || '';

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const res = await fetchProducts();
       console.log(res.data);
        setProducts(res.data);

        const viewed =
          JSON.parse(
            localStorage.getItem(
              'recentlyViewed'
            )
          ) || [];

        setRecentlyViewed(viewed);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, [location.pathname]);

  let filteredProducts = products
    .filter((p) => p && p._id)
    .filter((p) => {

      const matchesSearch =
        p.name?.toLowerCase().includes(
          search.toLowerCase().trim()
        ) ||
        p.category?.toLowerCase().includes(
          search.toLowerCase().trim()
        );

      const matchesCategory =
        selectedCategory
          ? p.category === selectedCategory
          : true;

      const matchesPrice =
        maxPrice
          ? p.price <= Number(maxPrice)
          : true;

      const matchesTrending =
        showTrending
          ? p.isTrending === true
          : true;

      const matchesNewArrival =
        showNewArrival
          ? p.isNewArrival === true
          : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesTrending &&
        matchesNewArrival
      );

    });

  // SORTING
  if (sortPrice === 'lowToHigh') {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sortPrice === 'highToLow') {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }
  return (

    <div className="bg-light min-vh-100">
      {user?.isAdmin && (
        <div className="container mt-4">

          <div className="alert alert-dark d-flex justify-content-between align-items-center">

            <div>
              <h5 className="mb-1">Admin Dashboard</h5>
              <small>You are logged in as Admin</small>
            </div>

            <button
              className="btn btn-light"
              onClick={() => navigate('/admin')}
            >
              Go To Admin Panel
            </button>

          </div>

        </div>
      )
      }

      {/* HERO SLIDER */}
      {/* HERO SLIDER */}
      {!search && (
        <div
          id="bannerCarousel"
          className="carousel slide carousel-fade mb-5"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >

          {/* INDICATORS */}
          <div className="carousel-indicators">

            <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="0"
              className="active"
            ></button>

            <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="1"
            ></button>

            <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="2"
            ></button>

            <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="3"
            ></button>

          </div>

          <div className="carousel-inner">

            {/* BANNER 1 */}
            <div className="carousel-item" style={{
              height: '460px',
              objectFit: 'cover',
              borderRadius: '0 0 30px 30px'
            }}>

              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c"
                className="d-block w-100"
                alt=""
                style={{
                  height: '460',
                  objectFit: 'cover'
                }}
              />

              <div className="carousel-caption text-start mb-5">


                <h1
                  className="fw-bold"
                  style={{
                    fontSize: '52px',
                    letterSpacing: '-2px'
                  }}
                >
                  Premium Saree Collection
                </h1>

                <p
                  style={{
                    fontSize: '18px',
                    maxWidth: '500px'
                  }}
                >
                  Discover elegance for every occasion
                </p>

                <button className="btn btn-dark btn-lg rounded-pill px-4">
                  Shop Now
                </button>

              </div>

            </div>

            {/* BANNER 2 */}
            <div className="carousel-item" style={{
              height: '460px',
              objectFit: 'cover',
              borderRadius: '0 0 30px 30px'
            }}>

              <img
                src="https://img.freepik.com/premium-photo/designer-sarees-diwali-banner_962764-24970.jpg?w=826"
                className="d-block w-100"
                alt=""
                style={{
                  height: '460',
                  objectFit: 'cover'
                }}
              />
              <div className="carousel-caption text-start mb-5">


                <h1
                  className="fw-bold"
                  style={{
                    fontSize: '52px',
                    letterSpacing: '-2px'
                  }}
                >
                  Festive Special Sarees
                </h1>

                <p
                  style={{
                    fontSize: '18px',
                    maxWidth: '500px'
                  }}
                >
                  Shine beautifully this festive season
                </p>

              </div>

            </div>

            {/* BANNER 3 */}
            <div className="carousel-item" style={{
              height: '460px',
              objectFit: 'cover',
              borderRadius: '0 0 30px 30px'
            }}>
              <img
                src="https://i.pinimg.com/originals/44/c8/09/44c8091ede64503d6a16d3f3fd96438a.jpg"
                className="d-block w-100"
                alt=""
                style={{
                  height: '460',
                  objectFit: 'cover'
                }}
              />

              <div className="carousel-caption text-start mb-5">


                <h1
                  className="fw-bold"
                  style={{
                    fontSize: '52px',
                    letterSpacing: '-2px'
                  }}
                >
                  Designer Sarees
                </h1>

                <p
                  style={{
                    fontSize: '18px',
                    maxWidth: '500px'
                  }}
                >
                  Modern fashion with traditional style
                </p>

              </div>

            </div>

            {/* BANNER 4 */}
            <div className="carousel-item" style={{
              height: '460px',
              objectFit: 'cover',
              borderRadius: '0 0 30px 30px'
            }}>

              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
                className="d-block w-100"
                alt=""
                style={{
                  height: '460',
                  objectFit: 'cover'
                }}
              />

              <div className="carousel-caption text-start mb-5">

                <h1
                  className="fw-bold"
                  style={{
                    fontSize: '52px',
                    letterSpacing: '-2px'
                  }}
                >
                  Wedding Collection
                </h1>

                <p
                  style={{
                    fontSize: '18px',
                    maxWidth: '500px'
                  }}
                >
                  Luxury sarees crafted for special moments
                </p>

              </div>

            </div>

          </div>

          {/* PREVIOUS BUTTON */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="prev"
          >

            <span className="carousel-control-prev-icon"></span>

          </button>

          {/* NEXT BUTTON */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="next"
          >

            <span className="carousel-control-next-icon"></span>

          </button>

        </div>
      )}

      <div className="container">
        <div className="bg-white p-3 rounded-4 shadow-sm mb-4">

          <div className="row g-3">

            {/* CATEGORY */}
            <div className="col-md-3">

              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
              >

                <option value="">
                  All Categories
                </option>

                <option value="Silk">
                  Silk
                </option>

                <option value="Cotton">
                  Cotton
                </option>

                <option value="Designer">
                  Designer
                </option>

              </select>

            </div>

            {/* PRICE */}
            <div className="col-md-3">

              <select
                className="form-select"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
              >

                <option value="">
                  All Prices
                </option>

                <option value="1000">
                  Under ₹1000
                </option>

                <option value="2000">
                  Under ₹2000
                </option>

                <option value="5000">
                  Under ₹5000
                </option>

              </select>

            </div>

            {/* SORT */}
            <div className="col-md-3">

              <select
                className="form-select"
                value={sortPrice}
                onChange={(e) =>
                  setSortPrice(e.target.value)
                }
              >

                <option value="">
                  Sort By
                </option>

                <option value="lowToHigh">
                  Price: Low to High
                </option>

                <option value="highToLow">
                  Price: High to Low
                </option>

              </select>

            </div>

            {/* CHECKBOXES */}
            <div className="col-md-3 d-flex align-items-center gap-3">

              <div className="form-check">

                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={showTrending}
                  onChange={(e) =>
                    setShowTrending(e.target.checked)
                  }
                />

                <label className="form-check-label">
                  Trending
                </label>

              </div>


              <div className="form-check">

                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={showNewArrival}
                  onChange={(e) =>
                    setShowNewArrival(e.target.checked)
                  }
                />

                <label className="form-check-label">
                  New Arrival
                </label>

              </div>

            </div>

          </div>

        </div>
        

        {/* RECENTLY VIEWED */}
        {recentlyViewed.length > 0 && (

          <section className="mb-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="fw-bold">
                Recently Viewed
              </h2>

            </div>

            {/* <div className="row g-4">

                    {recentlyViewed
                      .filter((p) => p && p._id)
                      .map((p) => (

                        <div
                          className="col-md-3"
                          key={p._id}
                        >

                          <ProductCard product={p} />

                        </div>

                      ))}

                  </div> */}
            <div className="row g-4">

              {recentlyViewed
                .filter((p) => p && p._id)
                .slice(0, 4)
                .map((p) => (

                  <div
                    className="col-lg-3 col-md-4 col-sm-6"
                    key={p._id}
                  >

                    <ProductCard product={p} />

                  </div>

                ))}

            </div>

          </section>

        )}

        {/* SEARCH RESULTS */}
        <section className="pb-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold">

              {search
                ? `Search Results for "${search}"`
                : 'All Sarees'}

            </h2>

            <span className="text-muted">
              {filteredProducts.length} Products
            </span>

          </div>

          <div className="row g-4">

            {loading ? (

              Array(8).fill().map((_, i) => (

                <div className="col-md-3" key={i}>

                  <div className="card border-0 shadow-sm">

                    <div
                      className="placeholder-glow"
                      style={{ height: '350px' }}
                    >
                      <span className="placeholder col-12 h-100"></span>
                    </div>

                  </div>

                </div>

              ))

            ) : filteredProducts.length > 0 ? (

              filteredProducts
                .filter((p) => p)
                .slice(0, visibleProducts)
                .map((p) => (

                  <div
                    className="col-md-3"
                    key={p._id}
                  >

                    <ProductCard product={p} />

                  </div>

                ))

            ) : (

              <div className="text-center py-5">
                <h4>No Products Found</h4>
              </div>

            )}

          </div>

        </section>
        {/* SHOW MORE BUTTON */}
{/* {visibleProducts < filteredProducts.length && (

  <div className="text-center mt-5 mb-5">

    <button
      className="btn btn-dark px-5 py-3"
      style={{
        borderRadius: '14px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        fontSize: '15px',
        transition: '0.3s ease'
      }}
      onClick={() =>
        setVisibleProducts(
          prev => prev + 12
        )
      }
    >
      Show More Products
    </button>

  </div>

)} */}
{filteredProducts.length > visibleProducts && (

  <div className="text-center mt-5 mb-5">

    <button
      className="btn btn-dark px-5 py-3 rounded-pill shadow"
      onClick={() =>
        setVisibleProducts(
          prev => prev + PRODUCTS_PER_LOAD
        )
      }
    >
      Show More Products
    </button>

  </div>

)}

        

      </div>
      

    </div>
    


  );
}

export default Home;