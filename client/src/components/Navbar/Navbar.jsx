import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import '../Navbar/Navbar.css'

function Navbar() {

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    user = null;
  }

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  // ✅ SEARCH STATE
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // ✅ SEARCH SUBMIT
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/?search=${search}`);
  };
  const closeNavbar = () => {

    const navbar =
      document.getElementById('navbarContent');

    if (navbar?.classList.contains('show')) {

      navbar.classList.remove('show');

    }

    document
      .querySelector('.navbar-toggler')
      ?.classList.add('collapsed');

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">

      <div className="container">

        {/* TOP BAR */}
        <div className="d-flex justify-content-between align-items-center w-100">

          {/* LOGO */}
          <Link
            className="navbar-brand fw-bold fs-4 text-dark mb-0"
            to="/"
          >
            🧵 SareeShop
          </Link>

          <div className="d-flex align-items-center gap-3">

            {/* MOBILE USER NAME */}
            {user && (
              <span className="d-lg-none fw-semibold text-secondary">
                Hi, {user.name}
              </span>
            )}

            {/* TOGGLE */}
            <button
              className="navbar-toggler border-0 shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

          </div>


          <div
            className="collapse navbar-collapse mobile-menu"
            id="navbarContent"
          >


            {/* RIGHT SIDE */}
            <div className="d-flex align-items-center w-100">

              {/* SEARCH CENTER */}
              {!user?.isAdmin && user && (

                <form
                  className="mx-lg-auto"
                  style={{
                    width: '100%',
                    maxWidth: '450px'
                  }}
                  onSubmit={handleSearch}
                >

                  <div className="position-relative">

                    <input
                      className="form-control rounded-pill px-4 py-2 shadow-sm border-0"
                      type="search"
                      placeholder="Search Silk, Cotton, Designer..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        background: '#f5f5f5'
                      }}
                    />

                    <span
                      style={{
                        position: 'absolute',
                        right: '18px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px'
                      }}
                    >
                      🔍
                    </span>

                  </div>

                </form>

              )}

              {/* RIGHT SIDE */}
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-4 ms-auto w-100 justify-content-lg-end">
                {/* HOME */}
                {/* HOME FOR NORMAL USER */}
                {!user?.isAdmin && (

                  <Link
                    to="/"
                    className="text-dark text-decoration-none fw-semibold d-none d-lg-block"
                  >
                    Home
                  </Link>

                )}

                {user ? (

                  <>

                    {/* ================= DESKTOP ONLY ================= */}
                    {user && !user.isAdmin && (

                      <div className="d-none d-lg-flex align-items-center gap-4">

                        {/* CART */}
                        <Link
                          to="/cart"
                          className="position-relative text-decoration-none"
                          style={{
                            fontSize: '24px'
                          }}
                        >
                          🛒

                          {cart.length > 0 && (

                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">

                              {cart.length}

                            </span>

                          )}

                        </Link>

                        {/* WISHLIST */}
                        <Link
                          className="nav-link position-relative d-inline-block"
                          to="/wishlist"
                        >

                          <span
                            style={{
                              fontSize: '28px'
                            }}
                          >
                            🤍
                          </span>

                          {wishlist.length > 0 && (

                            <span
                              style={{
                                position: 'absolute',
                                top: '0px',
                                right: '-8px',
                                background: '#ff1744',
                                color: '#fff',
                                borderRadius: '50%',
                                minWidth: '20px',
                                height: '20px',
                                fontSize: '10px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                              }}
                            >
                              {wishlist.length}
                            </span>

                          )}

                        </Link>

                        {/* ORDERS */}
                        <Link
                          to="/orders"
                          className="text-decoration-none text-dark fw-semibold"
                        >
                          Orders
                        </Link>

                      </div>

                    )}
                    {/* ================= MOBILE ONLY ================= */}
                    <div className="d-lg-none w-100 mt-3">

                      <Link
                        to="/"
                        className="nav-link"
                        onClick={closeNavbar}
                      >
                        Home
                      </Link>

                      {!user?.isAdmin && (
                        <>
                          <Link
                            to="/cart"
                            className="nav-link"
                            onClick={closeNavbar}
                          >
                            Cart
                          </Link>

                          <Link
                            to="/wishlist"
                            className="nav-link"
                            onClick={closeNavbar}
                          >
                            Wishlist
                          </Link>

                          <Link
                            to="/orders"
                            className="nav-link"
                            onClick={closeNavbar}
                          >
                            Orders
                          </Link>
                        </>
                      )}

                      {user?.isAdmin && (
                        <>
                          <Link
                            to="/admin/add-product"
                            className="nav-link"
                            onClick={closeNavbar}
                          >
                            Add Product
                          </Link>

                          <Link
                            to="/admin/orders"
                            className="nav-link"
                            onClick={closeNavbar}
                          >
                            Manage Orders
                          </Link>
                        </>
                      )}

                      <button
                        onClick={() => {
                          handleLogout();
                          closeNavbar();
                        }}
                        className="nav-link border-0 bg-transparent text-start text-danger w-100"
                      >
                        Logout
                      </button>
                    </div>

                    {/* DESKTOP USER */}
                    {!user?.isAdmin && (

                      <div className="d-none d-lg-flex align-items-center gap-3">

                        <span className="fw-semibold text-secondary">
                          Hi, {user.name}
                        </span>

                        <button
                          className="btn btn-danger rounded-pill px-4"
                          onClick={handleLogout}
                          type='button'
                          onClick={closeNavbar}
                        >
                          Logout
                        </button>

                      </div>

                    )}

                  </>

                ) : (

                  <>
                    {/* MOBILE */}
                    <Link
                      to="/login"
                      className="nav-link d-lg-none"
                      onClick={closeNavbar}
                    >
                      Login
                    </Link>

                    {/* DESKTOP */}
                    <Link
                      to="/login"
                      className="btn btn-dark rounded-pill px-4 d-none d-lg-inline-block"
                    >
                      Login
                    </Link>
                  </>

                )}

              </div>

              {/* ADMIN DESKTOP */}
              {user?.isAdmin && (

                <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">

                  {/* HOME */}
                  <Link
                    to="/"
                    className="text-dark text-decoration-none fw-semibold"
                  >
                    Home
                  </Link>

                  {/* ADD PRODUCT */}
                  <Link
                    to="/admin/add-product"
                    className="btn btn-warning rounded-pill px-4"
                  >
                    Add Product
                  </Link>

                  {/* MANAGE ORDERS */}
                  <Link
                    to="/admin/orders"
                    className="btn btn-dark rounded-pill px-4"
                  >
                    Manage Orders
                  </Link>

                  {/* LOGOUT */}
                  <button
                    className="btn btn-danger rounded-pill px-4"
                    onClick={handleLogout}
                    type="button"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>
      </div>

    </nav>

  );
}

export default Navbar; 