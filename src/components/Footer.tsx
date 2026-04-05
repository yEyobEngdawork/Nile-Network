import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center font-bold text-black">N</div>
              <span className="text-xl font-extrabold tracking-tighter">NILE NETWORK</span>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              The premium EdTech platform for the next generation of global leaders and entrepreneurs.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Platform</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Pathways</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Mentorship</a></li>
              <li><a href="#ai" className="hover:text-white transition-colors">Nile Flow AI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#social-proof" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#footer" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li><a href="#footer" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#footer" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#footer" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Social</h4>
            <div className="flex gap-4 text-gray-500">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-xs font-bold tracking-widest uppercase">
          <p>© 2026 NILE NETWORK. ALL RIGHTS RESERVED.</p>
          <p>BUILT FOR THE FUTURE.</p>
        </div>
      </div>
    </footer>
  );
}
