import { motion } from "motion/react";
import { ArrowRight, Clock, BarChart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function CourseSection() {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      // Query must match the security rule: allow read: if resource.data.published == true
      const q = query(collection(db, "courses"), where("published", "==", true));
      const snapshot = await getDocs(q);
      const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "enrollments"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const ids = snapshot.docs.map(doc => doc.data().courseId);
      setEnrolledCourseIds(ids);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  return (
    <section id="courses" className="py-24 px-6 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">CHOOSE YOUR PATH.</h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Our pathways are engineered to take you from zero to professional in record time.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary-blue font-bold hover:gap-4 transition-all">
            VIEW ALL COURSES <ArrowRight size={20} />
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500">No courses available yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, i) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card overflow-hidden group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      src={course.thumbnailUrl || course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary-blue text-xs font-bold uppercase tracking-wider">
                      {course.category || "General"}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                      <span className="text-2xl font-black text-primary-blue shrink-0">{course.price} Birr</span>
                    </div>
                    <p className="text-gray-400 mb-6 font-medium flex-1">{course.description || course.outcome}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock size={16} /> {course.duration || "Self-paced"}
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart size={16} /> {course.level || "Beginner"}
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} /> {course.curriculum ? course.curriculum.length : 1} Modules
                      </div>
                    </div>

                    {isEnrolled ? (
                      <Link to={`/learn/${course.id}`} className="w-full py-4 rounded-xl blue-gradient text-black font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-auto">
                        START LEARNING <ArrowRight size={18} />
                      </Link>
                    ) : (
                      <Link to={`/checkout/${course.id}`} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mt-auto">
                        ENROLL NOW <ArrowRight size={18} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
