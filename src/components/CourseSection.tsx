import { motion } from "motion/react";
import { ArrowRight, Clock, BarChart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "fs-web-eng",
    category: "Tech",
    title: "Full-Stack Web Engineering",
    outcome: "Build & deploy production-ready SaaS apps",
    duration: "12 Weeks",
    level: "Intermediate",
    price: 499,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "dig-entrep",
    category: "Business",
    title: "Digital Entrepreneurship",
    outcome: "Launch a profitable online business from scratch",
    duration: "8 Weeks",
    level: "Beginner",
    price: 297,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ht-closing",
    category: "Sales",
    title: "High-Ticket Closing",
    outcome: "Master the art of closing $10k+ deals",
    duration: "6 Weeks",
    level: "Advanced",
    price: 997,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ui-ux-design",
    category: "Design",
    title: "UI/UX Product Design",
    outcome: "Design world-class digital experiences",
    duration: "10 Weeks",
    level: "Intermediate",
    price: 349,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800"
  }
];

export default function CourseSection() {
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

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary-blue text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-2xl font-bold">{course.title}</h3>
                  <span className="text-2xl font-black text-primary-blue shrink-0">{course.price} Birr</span>
                </div>
                <p className="text-gray-400 mb-6 font-medium flex-1">{course.outcome}</p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart size={16} /> {course.level}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} /> 24 Modules
                  </div>
                </div>

                <Link to={`/checkout/${course.id}`} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mt-auto">
                  ENROLL NOW <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
