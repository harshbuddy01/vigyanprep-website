"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlayCircle, Clock, Calendar, ShieldCheck, Award } from "lucide-react";

interface ScheduledTest {
  id: string;
  title: string;
  exam_type: string;
  window_start: string;
  window_end: string;
  duration_minutes: number;
  description: string;
  status: string;
}

export default function TestSeriesPage() {
  const [tests, setTests] = useState<ScheduledTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublicTests() {
      setLoading(true);
      try {
        const res = await fetch("https://api.vigyanprep.com/api/public/tests");
        if (res.ok) {
          const data = await res.json();
          setTests(data.tests || []);
        }
      } catch (err) {
        console.error("Failed to load test series:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPublicTests();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "TBA";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  const isWindowActive = (startStr: string, endStr: string) => {
    if (!startStr || !endStr) return true;
    const now = new Date();
    const start = new Date(startStr);
    const end = new Date(endStr);
    return now >= start && now <= end;
  };

  const launchTest = (testId: string) => {
    window.location.href = `https://test.vigyanprep.com/instructions?testId=${testId}`;
  };

  return (
    <div className="min-h-screen bg-[#141009] text-amber-50 selection:bg-amber-500 selection:text-black">
      <Navbar />

      <header className="relative z-10 pt-36 pb-16 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Award className="w-4 h-4 text-amber-400" /> Official Scheduled Test Series
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent mb-6">
          24-Hour Scheduled Test Series
        </h1>
        <p className="text-neutral-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Attempt official IISER IAT, NISER NEST & CMI mock test papers inside the 24-hour test window for official merit list rankings.
        </p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="text-center text-amber-300 py-12">Loading scheduled tests...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              const active = isWindowActive(test.window_start, test.window_end);
              return (
                <div
                  key={test.id}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/70 border border-amber-500/20 hover:border-amber-400 transition-all shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 border border-orange-500/40 text-orange-400">
                        {test.exam_type}
                      </span>
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                        {test.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-neutral-100 mb-3">
                      {test.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4 line-clamp-2">
                      {test.description || "Official Allen-Model 24h Test Series Paper"}
                    </p>

                    <div className="space-y-2 text-xs text-neutral-300 mb-6 bg-neutral-950 p-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Start: {formatDate(test.window_start)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>End: {formatDate(test.window_end)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Duration: {test.duration_minutes || 180} Mins</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => launchTest(test.id)}
                      disabled={!active}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs hover:opacity-90 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {active ? "Start Exam" : "Window Closed / Upcoming"}
                    </button>
                  </div>
                </div>
              );
            })}
            {tests.length === 0 && (
              <div className="col-span-full p-8 text-center bg-neutral-900/50 rounded-2xl border border-white/10 text-neutral-400">
                No active scheduled test series papers right now. Check back soon!
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
