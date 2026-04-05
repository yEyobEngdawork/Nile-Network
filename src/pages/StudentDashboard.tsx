import { useAuth } from "../context/AuthContext";
import { db, logout } from "../firebase";
import { LogOut, BookOpen, Heart, Award, PlayCircle } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export default function StudentDashboard() {
  const { user, userData, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const q = query(collection(db, "enrollments"), where("userId", "==", user?.uid));
      const snapshot = await getDocs(q);
      
      const coursesData = [];
      for (const enrollmentDoc of snapshot.docs) {
        const enrollment = enrollmentDoc.data();
        const courseRef = doc(db, "courses", enrollment.courseId);
        const courseSnap = await getDoc(courseRef);
        
        if (courseSnap.exists()) {
          coursesData.push({
            id: courseSnap.id,
            ...courseSnap.data(),
            enrollmentId: enrollmentDoc.id,
            progress: enrollment.progress || 0
          });
        }
      }
      setEnrolledCourses(coursesData);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoadingCourses(false);
    }
  };

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
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${userData?.displayName}`} alt="Profile" className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
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
            { label: "Enrolled Courses", val: enrolledCourses.length, icon: <BookOpen className="text-primary-blue" /> },
            { label: "Completed Lessons", val: enrolledCourses.filter(c => c.progress === 100).length, icon: <PlayCircle className="text-accent-blue" /> },
            { label: "Certificates", val: enrolledCourses.filter(c => c.progress === 100).length, icon: <Award className="text-yellow-500" /> },
            { label: "Wishlist", val: "0", icon: <Heart className="text-red-500" /> }
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
        <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
        {loadingCourses ? (
          <p className="text-gray-500">Loading your courses...</p>
        ) : enrolledCourses.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BookOpen size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">No courses yet</h3>
            <p className="text-gray-400 mb-6">Explore our catalog and start learning today.</p>
            <Link to="/" className="px-6 py-3 rounded-xl blue-gradient text-black font-bold inline-block">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {enrolledCourses.map(course => (
              <div key={course.id} className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={course.thumbnailUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400"} alt="Course" className="w-full md:w-48 h-32 object-cover rounded-xl" />
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary-blue uppercase">Course</span>
                    <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                  <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <div className="h-full blue-gradient" style={{ width: `${course.progress}%` }} />
                  </div>
                  <Link to={`/learn/${course.id}`} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                    <PlayCircle size={18} /> {course.progress === 100 ? 'Review Course' : 'Resume Course'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
