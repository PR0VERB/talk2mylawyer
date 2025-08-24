import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [homeQuestion, setHomeQuestion] = useState<string>('');
  const navigate = useNavigate();
  const sectionAnim = useMemo(() => ({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-sky-100/70 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Talk2MyLawyer</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <motion.section {...sectionAnim} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-sky-100/70 p-8 md:p-12 shadow-sm">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.12),transparent_35%)]" />
            <div className="max-w-3xl">
              <p className="text-lg md:text-xl leading-8 text-gray-800">
                Talk2MyLawyer is a legal consultation platform that connects clients with vetted, verified lawyers across multiple practice areas. Describe your case and get matched to the best-fit attorneys based on your needs and location, then compare profiles and reviews, schedule consultations, and securely share documents.
              </p>

              {/* Question Box */}
              <div className="mt-5 text-center">
                <label htmlFor="home-question" className="block text-sm font-medium text-gray-900 mb-2 text-center">
                  You now know a little more about Talk2MyLawyer, what else do you want to know?
                </label>
                <textarea
                  id="home-question"
                  value={homeQuestion}
                  onChange={(e) => setHomeQuestion(e.target.value)}
                  rows={2}
                  placeholder="I would like to know..."
                  className="mx-auto block w-full max-w-2xl px-5 py-2.5 border rounded-full text-gray-900 bg-white text-center placeholder:text-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 shadow-sm focus:shadow-md border-gray-300 resize-none"
                />
              </div>

              <div className="mt-6 flex flex-col items-center gap-4">
                <Button
                  variant="brand"
                  onClick={() => navigate('/early-access', { state: { homeQuestion } })}
                  className="px-5 py-3 text-base"
                >
                  GET EARLY ACCESS!
                </Button>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span>Vetted & verified attorneys • Private & secure consultations</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

