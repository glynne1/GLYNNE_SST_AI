"use client";

import { useRef, useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function ConsolePanel() {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const endRef = useRef(null);

  const [systemStats, setSystemStats] = useState({ date: new Date() });
  const [userStats, setUserStats] = useState({ clicks: 0, inputsFilled: 0, userAgent: "" });
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const typeStyles = {
    info: "text-blue-700",
    success: "text-green-700",
    warn: "text-yellow-600",
    error: "text-red-600",
    debug: "text-purple-600",
    custom: "text-gray-600",
  };

  // --------------------- LOGS STREAM ---------------------
  useEffect(() => {
    const events = new EventSource("https://generative-glynne-motor.onrender.com/logs/stream");

    events.onopen = () => {
      setConnected(true);
      setLogs(prev => [...prev, { time: new Date().toISOString(), msg: "🔌 Connected to GLYNNE Runtime", type: "success" }]);
    };

    events.onerror = () => {
      setConnected(false);
      setLogs(prev => [...prev, { time: new Date().toISOString(), msg: "⚠️ Lost connection — retrying...", type: "warn" }]);
    };

    events.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data);
        const type = log.type?.toLowerCase() || "info";

        let msg = "";
        let details = null;

        if (log.msg && typeof log.msg === "string") {
          msg = log.msg;
          details = log.details || (typeof log.details === "object" ? log.details : null);
        } else {
          msg = typeof log.msg === "object" ? "Object received" : log.msg || "Log received";
          details = log;
        }

        setLogs(prev => [...prev, { time: log.time || new Date().toISOString(), type, msg, details }]);
      } catch (err) {
        setLogs(prev => [...prev, { time: new Date().toISOString(), msg: event.data, type: "info", details: null }]);
      }
    };

    return () => events.close();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // --------------------- USER STATS ---------------------
  useEffect(() => {
    setUserStats(prev => ({ ...prev, userAgent: navigator.userAgent }));

    const timer = setInterval(() => {
      setSystemStats(prev => ({ ...prev, date: new Date() }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUserClick = () => {
    setUserStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
  };

  // --------------------- FETCH USER INFO SUPABASE ---------------------
  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Error obteniendo usuario:", error);
        setLoadingUser(false);
        return;
      }

      setUserInfo({
        id: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name || "Usuario",
        avatarUrl: user.user_metadata?.avatar_url || "/default-avatar.png",
        createdAt: user.created_at,
        lastSignIn: user.last_sign_in_at,
        phone: user.user_metadata?.phone || "N/A",
      });

      setLoadingUser(false);
    };

    fetchUserInfo();
  }, []);

  // --------------------- UI ---------------------
  return (
    <div
      className="flex flex-col h-[80vh] bg-white text-[12px] font-mono text-gray-800 overflow-hidden"
    >
      {/* ------------------- PANEL SUPERIOR - LOGS ------------------- */}
      <div className="flex-[0.4] p-4 border-b border-gray-200 overflow-y-auto">
        <div className="flex justify-between items-center mb-2 text-sm font-semibold">
          <span>── GLYNNE Runtime Console</span>
          <span className={connected ? "text-green-600" : "text-red-600"}>
            ● {connected ? "live" : "offline"}
          </span>
        </div>

        {logs.length === 0 && (
          <div className="text-gray-400 italic">Waiting for backend activity...</div>
        )}

        <div className="text-left">
          {logs.map((log, i) => (
            <div key={i} className="mb-2 break-words border-l-2 pl-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">
                  {new Date(log.time).toLocaleTimeString()}
                </span>
                <span className={typeStyles[log.type]}>{log.type.toUpperCase()}</span>
              </div>
              <div className={`mt-1 ${typeStyles[log.type]} font-medium`}>{log.msg}</div>
              {log.details && (
                <pre className="bg-white p-2 rounded text-xs mt-1 overflow-x-auto text-gray-700 text-left">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="mt-2 text-green-600 text-sm animate-pulse text-left">
          ▌ waiting...
        </div>
      </div>

      {/* ------------------- PANEL MEDIO - STATS ------------------- */}
      <div className="flex-[0.25] p-4 overflow-y-auto bg-white border-b border-gray-200">
        <div className="mb-2 font-semibold text-left">── System & User Stats</div>
        <div className="mb-2 text-xs text-gray-600 text-left">
          {systemStats.date.toLocaleDateString()} {systemStats.date.toLocaleTimeString()}
        </div>
        <div className="mb-2 text-xs text-gray-600 break-words text-left">
          <strong>User Agent:</strong> {userStats.userAgent}
        </div>
        <div className="mb-2 text-xs text-gray-600 text-left">
          <strong>Logs recibidos:</strong> {logs.length}
        </div>
        <div className="mb-2 text-xs text-gray-600 text-left">
          <strong>Clicks registrados:</strong> {userStats.clicks}
          <button
            onClick={handleUserClick}
            className="ml-2 px-2 py-1 bg-gray-300 rounded text-[10px] hover:bg-gray-400 transition-colors"
          >
            Click me
          </button>
        </div>
      </div>

      {/* ------------------- PANEL INFERIOR - USER INFO ------------------- */}
      <div className="flex-[0.35] p-4 overflow-y-auto bg-white">
        <div className="mb-2 font-semibold text-left">── User Info (Supabase)</div>

        {loadingUser && (
          <div className="text-gray-500 text-sm animate-pulse text-left">
            Cargando información de usuario...
          </div>
        )}

        {userInfo && (
          <pre className="bg-white p-3 rounded-md text-xs text-gray-800 overflow-x-auto text-left">
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
