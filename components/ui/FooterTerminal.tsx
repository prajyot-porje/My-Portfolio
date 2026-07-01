"use client";

import { useEffect, useState } from "react";

export default function FooterTerminal() {
  const [time, setTime] = useState("");
  const [ping, setPing] = useState(42);

  // Live timer for local India time (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      // Adjust to UTC+5:30
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;
      const indiaTime = new Date(utc + 3600000 * 5.5);
      setTime(
        indiaTime.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulating small network latency fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = prev + delta;
        return next > 20 && next < 100 ? next : prev;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#050505] border-t border-zinc-900 py-10 px-[var(--sp-8)] max-md:px-[var(--sp-6)] font-mono text-[10px] text-zinc-500">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
        {/* CLI dashboard metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-zinc-900 pb-6 text-[9.5px]">
          <div className="space-y-1">
            <span className="text-zinc-700 block uppercase">Server Status</span>
            <span className="text-[var(--success)] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
              ONLINE / DEPLOYED
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-700 block uppercase">
              India Standard Time
            </span>
            <span className="text-zinc-300 font-bold">
              {time || "Loading..."} (UTC+5:30)
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-700 block uppercase">
              Telemetry Connection
            </span>
            <span className="text-zinc-300 font-bold">
              PING: {ping}ms (Secure)
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-700 block uppercase">
              Current Location
            </span>
            <span className="text-zinc-300 font-bold">
              PUNE, INDIA — active
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex max-md:flex-col items-center justify-between gap-4 text-[9.5px]">
          <div className="flex items-center gap-2">
            <span className="text-zinc-700 font-bold">PRAJYOT PORJE</span>
            <span className="text-zinc-800">|</span>
            <span>&copy; {new Date().getFullYear()} ALL LOGS ACTIVE</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="https://github.com/prajyot-porje"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors no-underline"
            >
              [ github ]
            </a>
            <a
              href="https://leetcode.com/u/prajyot-porje/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors no-underline"
            >
              [ leetcode ]
            </a>
            <a
              href="mailto:prajyotporje.dev@gmail.com"
              className="hover:text-white transition-colors no-underline"
            >
              [ mail ]
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
