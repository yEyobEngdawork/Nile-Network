import { useAuth } from "../context/AuthContext";
import { logout, db } from "../firebase";
import { Navigate, Link } from "react-router-dom";
import { Users, BookOpen, DollarSign, Tag, Settings, LogOut, Upload, BarChart, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Course Upload State
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Payments State
  const [payments, setPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  useEffect(() => {
    if (activeTab === 'payments') {
      fetchPayments();
    }
  }, [activeTab]);

  const fetchPayments = async () => {
    setLoadingPayments(true);
    try {
      const snapshot = await getDocs(collection(db, "payments"));
      const paymentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentsData);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoadingPayments(false);
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

  const handleUploadCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await addDoc(collection(db, "courses"), {
        title: courseTitle,
        description: courseDesc,
        price: Number(coursePrice),
        published: true,
        createdAt: serverTimestamp()
      });
      alert("Course uploaded successfully!");
      setCourseTitle("");
      setCourseDesc("");
      setCoursePrice("");
    } catch (error) {
      console.error("Error uploading course:", error);
      alert("Failed to upload course.");
    } finally {
      setIsUploading(false);
    }
  };

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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-gray-400 hover:bg-white/5 hover:text-white">
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
                    <p className="text-3xl font-black mt-1">45,231.00 Birr</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <DollarSign size={20} />
                  </div>
                </div>
                <p className="text-sm text-green-500 font-medium">+12.5% from last month</p>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Active Students</p>
                    <p className="text-3xl font-black mt-1">1,204</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                    <Users size={20} />
                  </div>
                </div>
                <p className="text-sm text-green-500 font-medium">+5.2% from last month</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Course Conversions</p>
                    <p className="text-3xl font-black mt-1">8.4%</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                    <BarChart size={20} />
                  </div>
                </div>
                <p className="text-sm text-red-500 font-medium">-1.2% from last month</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-6">Recent Enrollments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm border-b border-white/5">
                      <th className="pb-4 font-medium">Student</th>
                      <th className="pb-4 font-medium">Course</th>
                      <th className="pb-4 font-medium">Amount</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[1,2,3,4].map((i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="py-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10" />
                          <span className="font-medium">Student Name {i}</span>
                        </td>
                        <td className="py-4 text-gray-300">Full-Stack Web Engineering</td>
                        <td className="py-4 font-medium">499.00 Birr</td>
                        <td className="py-4 text-gray-500">Just now</td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-bold">Paid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black mb-8">Upload New Course</h1>
            <form onSubmit={handleUploadCourse} className="glass-card p-8 space-y-6">
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
              <button 
                type="submit"
                disabled={isUploading}
                className="w-full py-4 rounded-xl blue-gradient text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Publish Course"}
              </button>
            </form>
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
