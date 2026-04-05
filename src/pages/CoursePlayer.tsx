import { useAuth } from "../context/AuthContext";
import { Navigate, Link, useParams } from "react-router-dom";
import { PlayCircle, CheckCircle2, FileText, ArrowLeft, MessageSquare, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      fetchCourseAndEnrollment();
    }
  }, [user, courseId]);

  const fetchCourseAndEnrollment = async () => {
    try {
      // Fetch course
      const courseRef = doc(db, "courses", courseId!);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        const courseData = { id: courseSnap.id, ...courseSnap.data() } as any;
        setCourse(courseData);
        
        if (courseData.curriculum && courseData.curriculum.length > 0 && courseData.curriculum[0].lessons.length > 0) {
          setActiveLesson(courseData.curriculum[0].lessons[0]);
          setActiveModuleId(courseData.curriculum[0].id);
        } else {
          // Setup a default module/lesson structure if none exists (for older courses)
          const defaultLesson = {
            id: 'main-video',
            title: courseData.title,
            type: 'video',
            videoUrl: courseData.videoUrl,
            completed: false
          };
          setActiveLesson(defaultLesson);
        }
      }

      // Fetch enrollment
      import("firebase/firestore").then(async ({ collection, query, where, getDocs }) => {
        const q = query(collection(db, "enrollments"), where("userId", "==", user?.uid), where("courseId", "==", courseId));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setEnrollment({ id: snap.docs[0].id, ...snap.docs[0].data() });
        }
      });

    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    if (!enrollment || !enrollment.id || !activeLesson) return;
    try {
      const completedLessons = enrollment.completedLessons || [];
      if (!completedLessons.includes(activeLesson.id)) {
        const newCompleted = [...completedLessons, activeLesson.id];
        
        let totalLessons = 0;
        if (course.curriculum) {
          course.curriculum.forEach((m: any) => {
            totalLessons += m.lessons.length;
          });
        } else {
          totalLessons = 1;
        }

        const progress = Math.round((newCompleted.length / totalLessons) * 100);

        const enrollmentRef = doc(db, "enrollments", enrollment.id);
        await updateDoc(enrollmentRef, {
          completedLessons: newCompleted,
          progress: progress
        });
        
        setEnrollment({ ...enrollment, completedLessons: newCompleted, progress });
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (authLoading || loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

  const isCompleted = enrollment?.progress === 100;
  const isCurrentLessonCompleted = enrollment?.completedLessons?.includes(activeLesson?.id) || (isCompleted && !course.curriculum);

  let totalLessons = 1;
  if (course.curriculum) {
    totalLessons = course.curriculum.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
  }
  const completedCount = enrollment?.completedLessons?.length || (isCompleted ? 1 : 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-neutral-950/50 h-16 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-lg hidden sm:block">{course.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-400">
            <span className="text-white">{completedCount}</span> / {totalLessons} Lessons Completed
          </div>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full blue-gradient transition-all duration-500" style={{ width: `${enrollment?.progress || 0}%` }} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Player Area */}
        <main className="flex-1 flex flex-col bg-black overflow-y-auto">
          {activeLesson?.type === 'video' ? (
            <div className="w-full aspect-video bg-neutral-900 relative flex items-center justify-center border-b border-white/5 shrink-0">
              {activeLesson?.videoUrl ? (
                <iframe 
                  src={activeLesson.videoUrl.replace("watch?v=", "embed/")} 
                  className="w-full h-full"
                  allowFullScreen
                  title="Course Video"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <PlayCircle size={64} className="mb-4 opacity-50" />
                  <p>No video available for this lesson.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-48 bg-neutral-900 relative flex items-center justify-center border-b border-white/5 shrink-0">
              <FileText size={48} className="text-gray-500 mb-2" />
              <p className="text-gray-400 font-medium absolute bottom-4">Reading Material</p>
            </div>
          )}
          
          <div className="p-8 max-w-4xl w-full mx-auto">
            <h2 className="text-3xl font-black mb-4">{activeLesson?.title}</h2>
            <div className="flex items-center gap-4 mb-8">
              {!isCurrentLessonCompleted ? (
                <button onClick={markAsComplete} className="px-6 py-2 rounded-full bg-primary-blue text-white font-bold text-sm flex items-center gap-2 hover:bg-blue-600 transition-colors">
                  <CheckCircle2 size={16} /> Mark as Complete
                </button>
              ) : (
                <div className="px-6 py-2 rounded-full bg-green-500/20 text-green-500 font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} /> Completed
                </div>
              )}
              {isCompleted && (
                <button onClick={() => setShowCertificate(true)} className="px-6 py-2 rounded-full bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2">
                  <Award size={16} /> View Certificate
                </button>
              )}
              <button className="px-6 py-2 rounded-full bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                <MessageSquare size={16} /> Ask Nile Flow AI
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {activeLesson?.type === 'text' && activeLesson?.textContent ? (
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {activeLesson.textContent}
                </div>
              ) : (
                <p className="text-gray-400 leading-relaxed">
                  {course.description || "In this lesson, we cover the fundamental concepts required to master this topic. Make sure to take notes and utilize the Nile Flow AI if you get stuck."}
                </p>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar Curriculum */}
        <aside className="w-full lg:w-96 border-l border-white/5 bg-neutral-950/50 flex flex-col shrink-0 h-[50vh] lg:h-auto overflow-y-auto">
          <div className="p-6 border-b border-white/5 sticky top-0 bg-neutral-950/90 backdrop-blur-md z-10">
            <h3 className="font-bold text-lg">Course Content</h3>
          </div>
          
          <div className="p-4 space-y-6">
            {course.curriculum ? (
              course.curriculum.map((module: any, mIndex: number) => (
                <div key={module.id}>
                  <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase tracking-wider">{module.title}</h4>
                  <div className="space-y-2">
                    {module.lessons.map((lesson: any, lIndex: number) => {
                      const isLessonCompleted = enrollment?.completedLessons?.includes(lesson.id);
                      const isActive = activeLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLesson(lesson);
                            setActiveModuleId(module.id);
                          }}
                          className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isLessonCompleted ? (
                              <CheckCircle2 size={18} className="text-green-500" />
                            ) : (
                              lesson.type === 'video' ? <PlayCircle size={18} className={isActive ? "text-primary-blue" : "text-gray-500"} /> : <FileText size={18} className={isActive ? "text-primary-blue" : "text-gray-500"} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{lesson.type === 'video' ? 'Video' : 'Reading'}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              // Fallback for old courses
              <div>
                <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase tracking-wider">Module 1</h4>
                <div className="space-y-2">
                  <button
                    className="w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors bg-white/10"
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={18} className="text-green-500" />
                      ) : (
                        <PlayCircle size={18} className="text-primary-blue" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {course.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Main Lesson</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 blue-gradient"></div>
            <button onClick={() => setShowCertificate(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              ✕
            </button>
            <div className="text-center p-8 border-4 border-double border-white/20 rounded-xl m-4">
              <Award size={64} className="mx-auto text-yellow-500 mb-6" />
              <h2 className="text-4xl font-black mb-2 tracking-widest uppercase text-white">Certificate of Completion</h2>
              <p className="text-gray-400 mb-8">This is to certify that</p>
              <p className="text-3xl font-bold text-primary-blue mb-8">{user.displayName}</p>
              <p className="text-gray-400 mb-4">has successfully completed the course</p>
              <p className="text-2xl font-bold mb-12">{course.title}</p>
              <div className="flex justify-between items-end mt-12 border-t border-white/10 pt-8">
                <div className="text-left">
                  <p className="font-bold text-lg">Nile Network</p>
                  <p className="text-xs text-gray-500">Authorized Signature</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{new Date().toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Date</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button onClick={() => window.print()} className="px-6 py-3 rounded-xl blue-gradient text-black font-bold">
                Download / Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
