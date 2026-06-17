import React, { useState } from 'react';
import { supabase } from './supabase';
import { Lock, Send, CheckCircle, PlusCircle, Compass } from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('recruitment');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // এইটো আপোনাৰ এডমিন পাছৱৰ্ড (ইয়াক আপুনি সলনি কৰিব পাৰে)
    if (pin === 'axom123') {
      setIsLoggedIn(true);
    } else {
      alert('ভুল পাছৱৰ্ড! (Wrong PIN)');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // URL ৰ বাবে slug বনোৱা
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
      const { error } = await supabase.from('posts').insert([{
        title: title,
        slug: slug,
        excerpt: excerpt,
        content: content,
        status: 'published',
        published_at: new Date().toISOString()
      }]);

      if (error) throw error;

      alert('সফলতাৰে পোষ্ট আপলোড হ’ল! (Successfully Published)');
      setTitle('');
      setExcerpt('');
      setContent('');
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 text-center">
          <div className="w-16 h-16 bg-emerald-700 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Admin Login</h2>
          <p className="text-slate-500 text-xs mb-8">Axom Xarothi Content Manager</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter PIN..." 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center tracking-widest text-lg font-bold bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-emerald-500"
            />
            <button type="submit" className="w-full bg-[#001f3f] text-white font-bold p-4 rounded-xl hover:bg-slate-900 transition">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Compass className="w-8 h-8 text-emerald-700" />
            <h1 className="text-2xl font-black text-slate-800">New Post Manager</h1>
          </div>
          <button onClick={() => window.location.href = '/'} className="text-sm font-bold text-slate-500 hover:text-emerald-700">
            View Live Site →
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Post Title (শিৰোনাম)</label>
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Assam Police Recruitment 2026" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Eligibility / Short Info (চমু বিৱৰণ)</label>
            <input required type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="e.g. Minimum HSLC Pass required" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Full Details (সম্পূৰ্ণ বিৱৰণ)</label>
            <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="Write the full details here..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500"></textarea>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-emerald-700 text-white font-extrabold p-4 rounded-xl hover:bg-emerald-800 transition flex items-center justify-center space-x-2 disabled:opacity-50">
            {loading ? <span className="animate-pulse">Publishing...</span> : <><Send className="w-5 h-5" /> <span>Publish to Live Site</span></>}
          </button>
        </form>

      </div>
    </div>
  );
}
