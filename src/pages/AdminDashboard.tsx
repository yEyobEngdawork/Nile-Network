import { useAuth } from "../context/AuthContext";
import { logout, db } from "../firebase";
import { Navigate, Link } from "react-router-dom";
import { Users, BookOpen, DollarSign, Tag, Settings, LogOut, Upload, BarChart, CheckCircle, XCircle, Plus, Trash2, Video, FileText } from "lucide-react";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text';
  videoUrl?: string;
  textContent?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Course Upload State
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseLevel, setCourseLevel] = useState("Beginner");
  const [courseCategory, setCourseCategory] = useState("Technology");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Curriculum State
  const [curriculum, setCurriculum] = useState<Module[]>([
    { id: `mod-${Date.now()}`, title: 'Module 1: Introduction', lessons: [] }
  ]);

  // Payments State
  const [payments, setPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  // Users State
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Enrollments State
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'payments') {
      fetchPayments();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'overview') {
      fetchOverviewData();
    }
  }, [activeTab]);

  const fetchPayments = async () => {
    setLoadingPayments(true);
    try {
      const q = query(collection(db, "payments"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const paymentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentsData);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoadingPayments(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsersList(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchOverviewData = async () => {
    try {
      const pSnap = await getDocs(collection(db, "payments"));
      setPayments(pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const eSnap = await getDocs(collection(db, "enrollments"));
      setEnrollments(eSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const uSnap = await getDocs(collection(db, "users"));
      setUsersList(uSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching overview data:", error);
    }
  };

  const handleApprovePayment = async (paymentId: string, userId: string, courseId: string) => {
    try {
      await updateDoc(doc(db, "payments", paymentId), { status: "approved" });
      await addDoc(collection(db, "enrollments"), {
        userId,
        courseId,
        progress: 0,
        enrolledAt: serverTimestamp()
      });
      fetchPayments();
      alert("Payment approved and student enrolled!");
    } catch (error) {
      console.error("Error approving payment:", error);
      alert("Failed to approve payment.");
    }
  };

  const handleRejectPayment = async (paymentId: string) => {
    try {
      await updateDoc(doc(db, "payments", paymentId), { status: "rejected" });
      fetchPayments();
    } catch (error) {
      console.error("Error rejecting payment:", error);
    }
  };

  // Curriculum Handlers
  const addModule = () => {
    setCurriculum([...curriculum, { id: `mod-${Date.now()}`, title: `New Module`, lessons: [] }]);
  };

  const updateModuleTitle = (moduleId: string, title: string) => {
    setCurriculum(curriculum.map(m => m.id === moduleId ? { ...m, title } : m));
  };

  const removeModule = (moduleId: string) => {
    setCurriculum(curriculum.filter(m => m.id !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    setCurriculum(curriculum.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, { id: `les-${Date.now()}`, title: 'New Lesson', type: 'video', videoUrl: '' }]
        };
      }
      return m;
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, field: keyof Lesson, value: string) => {
    setCurriculum(curriculum.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return m;
    }));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCurriculum(curriculum.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        };
      }
      return m;
    }));
  };

  const handleUploadCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (curriculum.length === 0 || curriculum.every(m => m.lessons.length === 0)) {
      alert("Please add at least one module and lesson to the curriculum.");
      return;
    }

    setIsUploading(true);
    try {
      await addDoc(collection(db, "courses"), {
        title: courseTitle,
        description: courseDesc,
        price: Number(coursePrice),
        level: courseLevel,
        category: courseCategory,
        thumbnailUrl: thumbnailUrl,
        curriculum: curriculum,
        published: true,
        createdAt: serverTimestamp()
      });
      alert("Course uploaded successfully!");
      setCourseTitle("");
      setCourseDesc("");
      setCoursePrice("");
      setCourseLevel("Beginner");
      setCourseCategory("Technology");
      setThumbnailUrl("");
      setCurriculum([{ id: `mod-${Date.now()}`, title: 'Module 1: Introduction', lessons: [] }]);
    } catch (error) {
      console.error("Error uploading course:", error);
      alert("Failed to upload course.");
    } finally {
      setIsUploading(false);
    }
  };

  // Calculate real stats
  const totalRevenue = payments.filter(p => p.status === 'approved').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const activeStudents = usersList.filter(u => u.role === 'student').length;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || userData?.role !== 'admin') return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-neutral-950/50 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center font-bold text-black">N</div>
            <span className="text-xl font-extrabold tracking-tighter">ADMIN</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <BarChart size={18} /> Analytics
          </button>
          <button onClick={() => setActiveTab("upload")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'upload' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Upload size={18} /> Upload Course
          </button>
          <button onClick={() => setActiveTab("payments")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'payments' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <DollarSign size={18} /> Payments
          </button>
          <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'users' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            <Users size={18} /> Users
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 font-medium transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black">Dashboard Overview</h1>
              <button onClick={() => setActiveTab("upload")} className="px-5 py-2.5 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                <Upload size={18} /> Upload Content
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Total Revenue</p>
                    <p className="text-3xl font-black mt-1">{totalRevenue.toLocaleString()} Birr</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <DollarSign size={20} />
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Active Students</p>
                    <p className="text-3xl font-black mt-1">{activeStudents}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                    <Users size={20} />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Total Enrollments</p>
                    <p className="text-3xl font-black mt-1">{enrollments.length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                    <BookOpen size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-6">Recent Enrollments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm border-b border-white/5">
                      <th className="pb-4 font-medium">Student ID</th>
                      <th className="pb-4 font-medium">Course ID</th>
                      <th className="pb-4 font-medium">Progress</th>
                      <th className="pb-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {enrollments.length === 0 ? (
                      <tr><td colSpan={4} className="py-4 text-gray-500 text-center">No enrollments yet.</td></tr>
                    ) : (
                      enrollments.slice(0, 5).map((enr, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0">
                          <td className="py-4 font-medium">{enr.userId}</td>
                          <td className="py-4 text-gray-300">{enr.courseId}</td>
                          <td className="py-4 font-medium">{enr.progress}%</td>
                          <td className="py-4 text-gray-500">
                            {enr.enrolledAt?.toDate ? enr.enrolledAt.toDate().toLocaleDateString() : 'Just now'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-black mb-8">Upload New Course</h1>
            <form onSubmit={handleUploadCourse} className="space-y-8">
              {/* Basic Info */}
              <div className="glass-card p-8 space-y-6">
                <h2 className="text-xl font-bold border-b border-white/10 pb-4">Basic Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Course Title</label>
                  <input 
                    type="text" 
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea 
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors h-32 resize-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Price (Birr)</label>
                    <input 
                      type="number" 
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Thumbnail Image URL</label>
                    <input 
                      type="url" 
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Level</label>
                    <select 
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white focus:border-primary-blue transition-colors"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category / Topic</label>
                    <input 
                      type="text" 
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      placeholder="e.g. Technology, Business, Design"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Curriculum Builder */}
              <div className="glass-card p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold">Curriculum Builder</h2>
                  <button type="button" onClick={addModule} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-blue/20 text-primary-blue hover:bg-primary-blue/30 transition-colors text-sm font-bold">
                    <Plus size={16} /> Add Module
                  </button>
                </div>

                <div className="space-y-6">
                  {curriculum.map((module, mIndex) => (
                    <div key={module.id} className="border border-white/10 rounded-xl p-4 bg-white/5">
                      <div className="flex justify-between items-center mb-4 gap-4">
                        <div className="flex-1">
                          <input 
                            type="text" 
                            value={module.title}
                            onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                            placeholder="Module Title"
                            className="w-full px-3 py-2 rounded-lg bg-transparent border border-transparent hover:border-white/10 focus:border-primary-blue text-lg font-bold text-white transition-colors"
                            required
                          />
                        </div>
                        <button type="button" onClick={() => removeModule(module.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="space-y-3 pl-4 border-l-2 border-white/10 ml-2">
                        {module.lessons.map((lesson, lIndex) => (
                          <div key={lesson.id} className="bg-neutral-900 rounded-lg p-4 border border-white/5">
                            <div className="flex justify-between items-start gap-4 mb-3">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-gray-500 text-sm font-bold">Lesson {lIndex + 1}</span>
                                  <input 
                                    type="text" 
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                                    placeholder="Lesson Title"
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors text-sm"
                                    required
                                  />
                                  <select 
                                    value={lesson.type}
                                    onChange={(e) => updateLesson(module.id, lesson.id, 'type', e.target.value)}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white focus:border-primary-blue transition-colors text-sm"
                                  >
                                    <option value="video">Video</option>
                                    <option value="text">Text</option>
                                  </select>
                                </div>
                                
                                {lesson.type === 'video' ? (
                                  <div className="flex items-center gap-2">
                                    <Video size={16} className="text-gray-500" />
                                    <input 
                                      type="url" 
                                      value={lesson.videoUrl || ''}
                                      onChange={(e) => updateLesson(module.id, lesson.id, 'videoUrl', e.target.value)}
                                      placeholder="YouTube Video URL"
                                      className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors text-sm"
                                      required
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-start gap-2">
                                    <FileText size={16} className="text-gray-500 mt-2" />
                                    <textarea 
                                      value={lesson.textContent || ''}
                                      onChange={(e) => updateLesson(module.id, lesson.id, 'textContent', e.target.value)}
                                      placeholder="Lesson Content (Text/Markdown)"
                                      className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-blue transition-colors text-sm h-24 resize-none"
                                      required
                                    />
                                  </div>
                                )}
                              </div>
                              <button type="button" onClick={() => removeLesson(module.id, lesson.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-1">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <button type="button" onClick={() => addLesson(module.id)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-2">
                          <Plus size={14} /> Add Lesson
                        </button>
                      </div>
                    </div>
                  ))}
                  {curriculum.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No modules added yet. Click "Add Module" to start building your curriculum.
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isUploading}
                className="w-full py-4 rounded-xl blue-gradient text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
              >
                {isUploading ? "Publishing Course..." : "Publish Course"}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h1 className="text-3xl font-black mb-8">Registered Users</h1>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-medium text-gray-400">User</th>
                    <th className="p-4 font-medium text-gray-400">Email</th>
                    <th className="p-4 font-medium text-gray-400">Role</th>
                    <th className="p-4 font-medium text-gray-400">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loadingUsers ? (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">Loading users...</td></tr>
                  ) : usersList.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">No users found.</td></tr>
                  ) : (
                    usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}`} alt={u.displayName} className="w-8 h-8 rounded-full" />
                          <span className="font-medium">{u.displayName}</span>
                        </td>
                        <td className="p-4 text-gray-300">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-primary-blue/20 text-primary-blue' : 'bg-white/10 text-gray-300'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500">
                          {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : 'Unknown'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h1 className="text-3xl font-black mb-8">Manual Payments</h1>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-medium text-gray-400">Student Email</th>
                    <th className="p-4 font-medium text-gray-400">Course ID</th>
                    <th className="p-4 font-medium text-gray-400">Note</th>
                    <th className="p-4 font-medium text-gray-400">Status</th>
                    <th className="p-4 font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loadingPayments ? (
                    <tr><td colSpan={5} className="p-4 text-center text-gray-500">Loading payments...</td></tr>
                  ) : payments.length === 0 ? (
                    <tr><td colSpan={5} className="p-4 text-center text-gray-500">No payments found.</td></tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">{payment.userEmail}</td>
                        <td className="p-4">{payment.courseId}</td>
                        <td className="p-4 text-sm text-gray-400 max-w-xs truncate">{payment.note || '-'}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            payment.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {payment.status === 'pending' && (
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleApprovePayment(payment.id, payment.userId, payment.courseId)} className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors">
                                <CheckCircle size={18} />
                              </button>
                              <button onClick={() => handleRejectPayment(payment.id)} className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                                <XCircle size={18} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
