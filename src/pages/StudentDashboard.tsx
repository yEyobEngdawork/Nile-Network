import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase";
import { LogOut, BookOpen, Heart, Award, PlayCircle } from "lucide-react";
import { Navigate, Link } from "react-router-dom";

export default function StudentDashboard() {
  const { user, userData, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar / Header */}
      <header className="border-b border-white/5 bg-neutral-950/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center font-bold text-black">N</div>
            <span className="text-xl font-extrabold tracking-tighter">NILE NETWORK</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ''} alt="Profile" className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
              <div className="hidden md:block">
                <p className="text-sm font-bold">{userData?.displayName}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-white transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black mb-8">Welcome back, {userData?.displayName?.split(' ')[0]}!</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Enrolled Courses", val: "2", icon: <BookOpen className="text-primary-blue" /> },
            { label: "Completed Lessons", val: "14", icon: <PlayCircle className="text-accent-blue" /> },
            { label: "Certificates", val: "0", icon: <Award className="text-yellow-500" /> },
            { label: "Wishlist", val: "3", icon: <Heart className="text-red-500" /> }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.val}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400" alt="Course" className="w-full md:w-48 h-32 object-cover rounded-xl" />
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-primary-blue uppercase">Tech</span>
                <span className="text-xs text-gray-500">45% Complete</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Full-Stack Web Engineering</h3>
              <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div className="h-full blue-gradient w-[45%]" />
              </div>
              <Link to="/learn/demo-course" className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                <PlayCircle size={18} /> Resume Course
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
