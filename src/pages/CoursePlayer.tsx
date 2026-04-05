import { useAuth } from "../context/AuthContext";
import { Navigate, Link, useParams } from "react-router-dom";
import { PlayCircle, CheckCircle2, FileText, ArrowLeft, MessageSquare, Award, Sparkles, X, Send, Brain } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "motion/react";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // AI Chat State
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: "Hi! I'm Nile Flow AI. What do you need help with in this lesson?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isAITyping, isAIChatOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newUserMsg = { role: 'user' as const, text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setIsAITyping(true);

    setTimeout(() => {
      setIsAITyping(false);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: `That's a great question about "${activeLesson?.title || 'this topic'}". Based on the curriculum, I recommend reviewing the core concepts we just covered. Would you like me to break it down further?` 
      }]);
    }, 1500);
  };

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
              <button 
                onClick={() => setIsAIChatOpen(true)}
                className="px-6 py-2 rounded-full blue-gradient text-black font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                <Sparkles size={16} className="animate-pulse" /> Ask Nile Flow AI
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
        <aside className="w-full lg:w-96 border-l border-white/5 bg-neutral-950/50 flex flex-col shrink-0 h-[50vh] lg:h-auto overflow-y-auto relative">
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

          {/* AI Chat Panel Overlay */}
          <AnimatePresence>
            {isAIChatOpen && (
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 bg-neutral-900 z-20 flex flex-col border-l border-accent-blue/30 shadow-[-10px_0_30px_rgba(0,198,255,0.1)]"
              >
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-neutral-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full blue-gradient flex items-center justify-center">
                      <Brain size={16} className="text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">Nile Flow AI</h3>
                      <p className="text-[10px] text-accent-blue flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" /> Online
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAIChatOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary-blue text-black rounded-br-sm' 
                          : 'bg-white/10 text-gray-200 rounded-bl-sm border border-white/5'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAITyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 border border-white/5 p-4 rounded-2xl rounded-bl-sm flex gap-1.5">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/10 bg-neutral-950/50">
                  <form onSubmit={handleSendMessage} className="relative">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about this lesson..."
                      className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-accent-blue/50 transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim() || isAITyping}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent-blue hover:bg-accent-blue/10 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
