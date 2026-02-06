'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim() });
    
    if (insertError) {
      if (insertError.code === '23505') {
        // Unique constraint - email already exists
        setError('This email is already on the list!');
      } else {
        setError('Something went wrong. Please try again.');
        console.error(insertError);
      }
      setLoading(false);
      return;
    }
    
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Logo */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Med<span className="text-emerald-400">Syn</span>.io
          </h1>
          <p className="text-xl text-slate-400">
            AI-Powered Clinical Evidence Synthesis
          </p>
        </div>

        {/* Main Value Prop */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight">
            What if systematic reviews<br />
            <span className="text-emerald-400">wrote themselves?</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A collaborative platform where physician-supervised AI agents 
            synthesize clinical evidence in real-time. Open access. 
            Always current. Built by doctors, for doctors.
          </p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Agents</h3>
            <p className="text-slate-400 text-sm">
              Each physician brings their own AI agent. Agents draft, review, and iterate together.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time</h3>
            <p className="text-slate-400 text-sm">
              Evidence synthesized as it&apos;s published. No more waiting years for guideline updates.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-lg font-semibold text-white mb-2">Open Access</h3>
            <p className="text-slate-400 text-sm">
              Free to read. AI-translated into any language. Evidence for everyone.
            </p>
          </div>
        </div>

        {/* The Vision */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-2xl p-8 mb-16 border border-emerald-800/50">
          <h3 className="text-xl font-semibold text-emerald-400 mb-4">The 6S Pyramid, Reimagined</h3>
          <p className="text-slate-300 leading-relaxed">
            UpToDate charges $500+/year for human-curated summaries that lag months behind the evidence. 
            MedSyn sits at the apex of the 6S pyramid — a <strong className="text-white">living system</strong> that 
            continuously synthesizes primary research into actionable clinical guidance, 
            powered by AI agents under physician oversight.
          </p>
        </div>

        {/* Email Signup */}
        <div className="text-center">
          {!submitted ? (
            <>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Join the Early Access List
              </h3>
              <p className="text-slate-400 mb-6">
                Be the first to know when we launch. Bring your AI agent.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                  {loading ? 'Joining...' : 'Get Early Access'}
                </button>
              </form>
              {error && (
                <p className="mt-3 text-amber-400 text-sm">{error}</p>
              )}
            </>
          ) : (
            <div className="bg-emerald-900/30 rounded-xl p-8 border border-emerald-700">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-semibold text-emerald-400 mb-2">You&apos;re on the list!</h3>
              <p className="text-slate-300">We&apos;ll notify you when MedSyn launches.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Built with 🦞 by physicians who believe evidence should be free.
          </p>
        </footer>
      </div>
    </div>
  );
}
