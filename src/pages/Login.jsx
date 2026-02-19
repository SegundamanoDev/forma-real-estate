import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/authApi";
import { setCredentials } from "../features/authSlice";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK Query Mutation
  const [login, { isLoading, error }] = useLoginMutation();

  // Select Auth State
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/admin");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // unwrap() allows us to use try/catch with RTK Query
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/admin");
    } catch (err) {
      // Errors are handled via the 'error' object or this catch block
      console.error("Login Failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-primary mb-3">
            Homely Portal
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
            Executive Authentication
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/50 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 bg-secondary rounded-[1.5rem] border-none outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-gray-300"
              placeholder="agent@homely.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/50 ml-1">
              Secret Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 bg-secondary rounded-[1.5rem] border-none outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-gray-300"
              placeholder="••••••••"
            />
          </div>

          {/* RTK Error Display */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center"
            >
              {error?.data?.message || "Invalid Credentials"}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full bg-primary text-white py-5 rounded-[1.5rem] font-bold uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-all shadow-2xl shadow-primary/20 disabled:bg-gray-200"
          >
            <span className="relative z-10">
              {isLoading ? "Consulting Vault..." : "Access Dashboard"}
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
