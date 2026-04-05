import { motion } from "motion/react";
import { loginWithGoogle, loginWithEmail } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { user, userData, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (user && userData) {
    return <Navigate to={userData.role === 'admin' ? '/admin' : '/dashboard'} />;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary-blue/10 blur-[150px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 w-full max-w-md text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 blue-gradient rounded-lg flex items-center justify-center font-bold text-black text-xl">N</div>
          <span className="text-2xl font-extrabold tracking-tighter">NILE NETWORK</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Sign in to continue your learning journey.</p>
        
        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-blue transition-colors"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-blue transition-colors"
            required
          />
          <button 
            type="submit"
            className="w-full py-4 rounded-xl blue-gradient text-black font-bold hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="shrink-0 px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button 
          onClick={loginWithGoogle}
          className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-3 mt-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>
        
        <p className="mt-6 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
