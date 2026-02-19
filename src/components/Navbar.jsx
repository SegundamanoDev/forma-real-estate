import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenuAlt3,
  HiOutlineX,
  HiOutlineLogout,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  // Handle transparent to solid transition
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileMenuOpen(false), [location]);

  // Updated Links to match "Buy" and "Rent"
  const navLinks = [
    { name: "Collection", path: "/search" },
    { name: "Buy", path: "/search?type=sale" },
    { name: "Rent", path: "/search?type=rent" },
  ];

  // Logic to handle active states including query strings
  const isActive = (path) => {
    // If it's the base search path, check for exact match
    if (path === "/search") {
      return location.pathname === "/search" && !location.search;
    }
    // Otherwise check if the current path + search matches
    return location.pathname + location.search === path;
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-700 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className={`text-2xl md:text-3xl font-serif tracking-[0.25em] transition-all duration-500 flex flex-col leading-none ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            <span className="font-bold">FORMA</span>
            <span
              className={`text-[7px] tracking-[0.6em] font-sans font-light uppercase mt-1 transition-opacity duration-500 ${
                isScrolled ? "text-accent" : "text-white/60"
              }`}
            >
              Real Estate
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                isScrolled ? "text-primary/70" : "text-white/70"
              } hover:text-accent`}
            >
              {link.name}
              {/* Gold Underline for Active Link */}
              <span
                className={`absolute -bottom-2 left-0 h-[2px] bg-accent transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {/* AUTHENTICATED ACTIONS */}
          <div
            className={`flex items-center gap-6 ${userInfo ? "border-l pl-8 border-gray-200" : ""}`}
          >
            {userInfo ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    isScrolled ? "text-primary" : "text-white"
                  } hover:text-accent`}
                >
                  <HiOutlineViewGrid className="text-lg text-accent" /> Admin
                </Link>
                <button
                  onClick={logoutHandler}
                  className="bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent transition-all duration-500 shadow-xl shadow-primary/20"
                >
                  <HiOutlineLogout size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="group relative overflow-hidden bg-accent text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                <span className="relative z-10">List Property</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`md:hidden text-3xl transition-transform active:scale-90 ${
            isScrolled || mobileMenuOpen ? "text-primary" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiOutlineX /> : <HiMenuAlt3 />}
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col p-10"
          >
            {/* MOBILE HEADER */}
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-serif font-bold tracking-[0.25em] text-primary">
                  FORMA
                </span>
                <span className="text-[7px] tracking-[0.6em] font-sans font-light uppercase mt-1 text-accent">
                  Real Estate
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl text-primary hover:rotate-90 transition-transform duration-300"
              >
                <HiOutlineX />
              </button>
            </div>

            {/* MOBILE LINKS */}
            <div className="flex flex-col space-y-10">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    className="text-4xl font-serif text-primary hover:text-accent transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeDot"
                        className="h-2 w-2 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <hr className="border-gray-100" />

              <Link
                to="/admin"
                className="text-accent font-bold uppercase tracking-widest text-sm flex items-center gap-3"
              >
                {userInfo ? "Go to Dashboard" : "Partner Portal"}
                <HiOutlineViewGrid />
              </Link>

              {userInfo && (
                <button
                  onClick={logoutHandler}
                  className="text-gray-400 text-left font-bold uppercase tracking-widest text-sm flex items-center gap-3"
                >
                  Logout <HiOutlineLogout />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      ;
    </nav>
  );
};

export default Navbar;
