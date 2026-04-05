import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Checkout() {
  const { courseId } = useParams();
  const { user, loading } = useAuth();
  
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a payment record in Firestore
      await addDoc(collection(db, "payments"), {
        userId: user.uid,
        userEmail: user.email,
        courseId: courseId,
        note: note,
        status: "pending",
        createdAt: serverTimestamp(),
        // In a real app, we would upload the file to Firebase Storage and save the URL here
        screenshotUploaded: !!fileName
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to submit payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Submitted!</h2>
          <p className="text-gray-400 mb-8">
            Your payment receipt has been sent to our team for verification. You will be enrolled in the course once approved.
          </p>
          <Link to="/dashboard" className="w-full block py-4 rounded-xl blue-gradient text-black font-bold hover:opacity-90 transition-opacity">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-primary-blue/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} /> Back to Courses
        </Link>
        
        <h1 className="text-4xl font-black mb-2">Complete Your Enrollment</h1>
        <p className="text-gray-400 mb-12">Course ID: {courseId}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bank Details */}
          <div className="glass-card p-8 h-fit">
            <h2 className="text-xl font-bold mb-6">Direct Bank Transfer</h2>
            <p className="text-sm text-gray-400 mb-6">
              Please transfer the course fee to the following bank account. Once transferred, upload a screenshot of your receipt.
            </p>
            
            <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                <p className="font-bold text-lg">Commercial Bank of Ethiopia (CBE)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Name</p>
                <p className="font-bold text-lg text-primary-blue">Nile Network</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
                <p className="font-bold text-2xl tracking-widest">1000123456789</p>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Submit Receipt</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Upload Screenshot</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="w-full px-4 py-8 rounded-xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-primary-blue/50 transition-colors">
                    <Upload size={32} className="mb-2" />
                    <span className="text-sm font-medium">
                      {fileName ? fileName : "Click or drag to upload receipt"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Payment Note (Optional)</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="E.g., Paid from account ending in 4567"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary-blue transition-colors h-24 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !fileName}
                className="w-full py-4 rounded-xl blue-gradient text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Confirm Payment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
