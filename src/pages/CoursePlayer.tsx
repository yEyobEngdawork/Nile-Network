import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { PlayCircle, CheckCircle2, FileText, ArrowLeft, MessageSquare } from "lucide-react";
import { useState } from "react";

const modules = [
  {
    id: 1,
    title: "Module 1: Foundations",
    lessons: [
      { id: 101, title: "Welcome to the Program", duration: "5:20", type: "video", completed: true },
      { id: 102, title: "Setting up your environment", duration: "12:45", type: "video", completed: true },
      { id: 103, title: "Resource Cheat Sheet", duration: "PDF", type: "pdf", completed: false },
    ]
  },
  {
    id: 2,
    title: "Module 2: Core Concepts",
    lessons: [
      { id: 201, title: "Understanding the Architecture", duration: "18:30", type: "video", completed: false },
      { id: 202, title: "Building your first component", duration: "25:10", type: "video", completed: false },
    ]
  }
];

export default function CoursePlayer() {
  const { user, loading } = useAuth();
  const [activeLesson, setActiveLesson] = useState(modules[0].lessons[0]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-neutral-950/50 h-16 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-lg hidden sm:block">Full-Stack Web Engineering</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-400">
            <span className="text-white">2</span> / 5 Lessons Completed
          </div>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full blue-gradient w-[40%]" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Player Area */}
        <main className="flex-1 flex flex-col bg-black overflow-y-auto">
          <div className="w-full aspect-video bg-neutral-900 relative flex items-center justify-center border-b border-white/5">
            {activeLesson.type === 'video' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <PlayCircle size={64} className="mb-4 opacity-50" />
                <p>Video Player Placeholder</p>
                <p className="text-sm">Playing: {activeLesson.title}</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <FileText size={64} className="mb-4 opacity-50" />
                <p>PDF Viewer Placeholder</p>
                <p className="text-sm">Viewing: {activeLesson.title}</p>
              </div>
            )}
          </div>
          
          <div className="p-8 max-w-4xl w-full mx-auto">
            <h2 className="text-3xl font-black mb-4">{activeLesson.title}</h2>
            <div className="flex items-center gap-4 mb-8">
              <button className="px-6 py-2 rounded-full bg-primary-blue text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 size={16} /> Mark as Complete
              </button>
              <button className="px-6 py-2 rounded-full bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                <MessageSquare size={16} /> Ask Nile Flow AI
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-400 leading-relaxed">
                In this lesson, we cover the fundamental concepts required to master this topic. Make sure to take notes and utilize the Nile Flow AI if you get stuck. The AI is trained specifically on this video's transcript and can answer any questions you have instantly.
              </p>
            </div>
          </div>
        </main>

        {/* Sidebar Curriculum */}
        <aside className="w-full lg:w-96 border-l border-white/5 bg-neutral-950/50 flex flex-col shrink-0 h-[50vh] lg:h-auto overflow-y-auto">
          <div className="p-6 border-b border-white/5 sticky top-0 bg-neutral-950/90 backdrop-blur-md z-10">
            <h3 className="font-bold text-lg">Course Content</h3>
          </div>
          
          <div className="p-4 space-y-6">
            {modules.map((module) => (
              <div key={module.id}>
                <h4 className="font-bold text-sm text-gray-400 mb-3 uppercase tracking-wider">{module.title}</h4>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                        activeLesson.id === lesson.id ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 size={18} className="text-green-500" />
                        ) : lesson.type === 'video' ? (
                          <PlayCircle size={18} className="text-gray-500" />
                        ) : (
                          <FileText size={18} className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${activeLesson.id === lesson.id ? 'text-white' : 'text-gray-300'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
