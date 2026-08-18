// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const { admin } = useAuth();
  const [thaiTime, setThaiTime] = useState("");
  const [summary, setSummary] = useState({ all: 0, s0: 0, s1: 0, s2: 0, s3: 0, s4: 0 });

  // เวลาไทย
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const dayName = now.toLocaleDateString("th-TH", { weekday: "long", timeZone: "Asia/Bangkok" });
      const date = now.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Bangkok" });
      const time = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Bangkok" }).replace(/:/g, ".");
      setThaiTime(`${dayName} ที่ ${date} เวลา ${time} น.`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // โหลดข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/person/getall");
        const raw = res.data;
        const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
        setSummary({
          all: list.length,
          s0: list.filter((p: any) => Number(p.status) === 0).length,
          s1: list.filter((p: any) => Number(p.status) === 1).length,
          s2: list.filter((p: any) => Number(p.status) === 2).length,
          s3: list.filter((p: any) => Number(p.status) === 3).length,
          s4: list.filter((p: any) => Number(p.status) === 4).length,
        });
      } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);
      }
    };
    fetchData();
  }, []);

  // Summary Cards
  const summaryCards = [
    { title: "ข้อมูลทั้งหมด", value: summary.all, href: "/person/history", icon: "all" },
    { title: "รอส่ง ศพฐ.", value: summary.s0, href: "/person/history?status=0", icon: "wait" },
    { title: "เตรียมเอกสารส่ง ศพฐ. แล้ว", value: summary.s1, href: "/person/history?status=1", icon: "document" },
    { title: "ส่ง ศพฐ. แล้ว", value: summary.s2, href: "/person/history?status=2", icon: "send" },
    { title: "รับจาก ศพฐ. แล้ว", value: summary.s3, href: "/person/history?status=3", icon: "check" },
    { title: "ส่งคืนต้นสังกัด", value: summary.s4, href: "/person/history?status=4", icon: "return" },
  ];

  // Icon
  const SummaryIcon = ({ type }: { type: string }) => {
    if (type === "all") {
      return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v14H4z" /><path d="M8 9h8" /><path d="M8 13h5" /></svg>;
    }
    if (type === "wait") {
      return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>;
    }
    if (type === "document") {
      return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5h8l4 4V20H6z" /><path d="M14 3.5V8h4" /><path d="M9 12h6" /><path d="M9 15.5h6" /></svg>;
    }
    if (type === "send") {
      return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m21 3-7.5 18-3.5-8L3 9.5z" /><path d="M21 3 10 13" /></svg>;
    }
    if (type === "check") {
      return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.3 2.4 4.8-5" /></svg>;
    }
    return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 4 11l5 5" /><path d="M4 11h10a5 5 0 0 1 5 5v2" /></svg>;
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <main className="min-h-screen px-4 pb-10 pt-6 min-[480px]:px-5 min-[768px]:px-8 min-[768px]:pt-8 min-[1200px]:ml-[100px] min-[1200px]:px-10">
        <div className="mx-auto w-full max-w-[1400px]">

          {/* Header */}
          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#800020] via-[#690018] to-[#40000e] p-6 text-white shadow-xl shadow-[#800020]/15 min-[480px]:p-7 min-[768px]:p-9">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-40 right-20 h-80 w-80 rounded-full bg-white/[0.03] blur-2xl" />
            <div className="relative flex flex-col gap-6 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">Dashboard</p>
                <h1 className="mt-2 text-2xl font-bold text-white min-[480px]:text-3xl min-[768px]:text-4xl">หน้าหลัก</h1>
                <p className="mt-2 text-sm text-white">ยินดีต้อนรับกลับมา <span className="font-bold text-white">{admin?.name || "-"}</span></p>
                <p className="mt-1 text-xs text-white">ตำแหน่ง : {admin?.position || "-"}</p>
              </div>
              <div className="rounded-2xl border border-white bg-[#600017] px-5 py-4 min-[768px]:min-w-[330px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#800020] text-white">
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white">เวลาปัจจุบัน</p>
                    <p className="mt-1 text-xs leading-5 text-white">{thaiTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#800020]">Overview</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 min-[480px]:text-2xl">สรุปสถานะข้อมูล</h2>
            </div>
            <span className="hidden text-xs text-gray-500 min-[480px]:block">คลิกการ์ดเพื่อดูรายละเอียด</span>
          </div>

          {/* Summary Cards */}
          <div className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[768px]:grid-cols-3">
            {summaryCards.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group relative overflow-hidden rounded-2xl border border-[#600018] bg-[#800020] p-5 text-white no-underline shadow-lg shadow-[#800020]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#700019] hover:shadow-xl hover:shadow-[#800020]/30"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white bg-[#600017] text-white transition-transform duration-300 group-hover:scale-110">
                    <SummaryIcon type={item.icon} />
                  </div>
                  <div className="text-white transition-all duration-300 group-hover:translate-x-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
                  </div>
                </div>
                <p className="relative mt-5 min-h-[40px] text-sm font-bold leading-5 text-white">{item.title}</p>
                <p className="relative mt-1 text-3xl font-bold text-white">{item.value.toLocaleString("th-TH")}</p>
                <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white" style={{ width: summary.all > 0 ? `${Math.min((item.value / summary.all) * 100, 100)}%` : "0%" }} />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Menu */}
          <div className="mt-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#800020]">Quick Menu</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 min-[480px]:text-2xl">เมนูการทำงาน</h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 min-[768px]:grid-cols-3">

              {/* เพิ่มข้อมูลบุคคล */}
              <Link to="/person/create" className="group flex items-center gap-4 rounded-2xl border border-[#800020] bg-[#800020] p-5 text-white no-underline shadow-lg shadow-[#800020]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#700019] hover:shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white bg-[#600017] text-white">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" /><path d="M19 8v5" /><path d="M16.5 10.5h5" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white">เพิ่มข้อมูลบุคคล</p>
                  <p className="mt-1 text-xs text-white">บันทึกข้อมูลบุคคลใหม่</p>
                </div>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>

              {/* ประวัติบุคคล */}
              <Link to="/person/history" className="group flex items-center gap-4 rounded-2xl border border-[#800020] bg-[#800020] p-5 text-white no-underline shadow-lg shadow-[#800020]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#700019] hover:shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white bg-[#600017] text-white">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5h8l4 4V20H6z" /><path d="M14 3.5V8h4" /><path d="M9 12h6" /><path d="M9 15.5h6" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white">ประวัติบุคคล</p>
                  <p className="mt-1 text-xs text-white">ดูและจัดการข้อมูลประวัติ</p>
                </div>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>

              {/* ข้อมูลใบเสร็จ */}
              <Link to="/receipt" className="group flex items-center gap-4 rounded-2xl border border-[#800020] bg-[#800020] p-5 text-white no-underline shadow-lg shadow-[#800020]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#700019] hover:shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white bg-[#600017] text-white">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5h12v17l-2.5-1.5L13 20.5l-2.5-1.5L8 20.5 6 19z" /><path d="M9 8h6" /><path d="M9 11.5h6" /><path d="M9 15h4" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white">ข้อมูลใบเสร็จ</p>
                  <p className="mt-1 text-xs text-white">ดูข้อมูลและจัดการใบเสร็จ</p>
                </div>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}