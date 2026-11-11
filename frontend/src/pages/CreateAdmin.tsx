import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import Swal from "sweetalert2";

type Admin = {
  adminId: string;
  username: string;
  name: string;
  position: string;
  createdAt: string;
};

type AdminForm = {
  username: string;
  password: string;
  name: string;
  position: string;
};

type AdminResponse = {
  adminId?: string | number;
  username?: string;
  name?: string;
  position?: string;
  createdAt?: string;
};

const initialForm: AdminForm = {
  username: "",
  password: "",
  name: "",
  position: "",
};

function extractAdminList(payload: unknown): Admin[] {
  if (Array.isArray(payload)) {
    return payload
      .filter(
        (item): item is AdminResponse =>
          item !== null && typeof item === "object" && !Array.isArray(item),
      )
      .map((item) => ({
        adminId: String(item.adminId ?? ""),
        username: String(item.username ?? ""),
        name: String(item.name ?? ""),
        position: String(item.position ?? ""),
        createdAt: String(item.createdAt ?? ""),
      }))
      .filter((item) => item.adminId !== "");
  }

  if (!payload || typeof payload !== "object") return [];

  const data = payload as Record<string, unknown>;

  for (const key of ["admins", "admin", "data", "results", "users"]) {
    if (data[key] !== undefined) {
      const result = extractAdminList(data[key]);
      if (result.length > 0 || Array.isArray(data[key])) return result;
    }
  }

  return [];
}

function extractCurrentAdminId(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as Record<string, unknown>;

  if (data.adminId !== undefined && data.adminId !== null) {
    return String(data.adminId);
  }

  for (const key of ["admin", "user", "data"]) {
    if (data[key] && typeof data[key] === "object") {
      const result = extractCurrentAdminId(data[key]);
      if (result) return result;
    }
  }

  return null;
}

function getInitial(name: string, username: string) {
  const value = name.trim() || username.trim();
  return value.charAt(0).toUpperCase() || "A";
}

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name:
    | "users"
    | "user"
    | "shield"
    | "crown"
    | "plus"
    | "edit"
    | "trash"
    | "search"
    | "clock"
    | "close"
    | "back"
    | "check";
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths = {
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    crown: (
      <>
        <path d="m2 8 5 4 5-7 5 7 5-4-2 12H4L2 8Z" />
        <path d="M4 20h16" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    edit: (
      <>
        <path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    back: <path d="M19 12H5m7 7-7-7 7-7" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      {paths[name]}
    </svg>
  );
}

export default function CreateAdmin() {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [firstAdminId, setFirstAdminId] = useState<string | null>(null);
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Admin | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [thaiTime, setThaiTime] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<AdminForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isEdit = editing !== null;
  const isTable = screenWidth >= 1280;

  const isSuperAdmin =
    currentAdminId !== null &&
    firstAdminId !== null &&
    currentAdminId === firstAdminId;

  const filteredAdmins = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return admins;

    return admins.filter((admin) =>
      [admin.username, admin.name, admin.position].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }, [admins, search]);

  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const update = () => {
      setThaiTime(
        new Date().toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    update();
    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const loadAdmins = async (showError = true): Promise<void> => {
    try {
      const res = await api.get<unknown>("/admin/getall");
      const data = extractAdminList(res.data);

      const sorted = [...data].sort((a, b) =>
        a.username.localeCompare(b.username, "th", {
          sensitivity: "base",
          numeric: true,
        }),
      );

      const first = [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return (
          (Number.isNaN(dateA) ? 0 : dateA) - (Number.isNaN(dateB) ? 0 : dateB)
        );
      })[0];

      setAdmins(sorted);
      setFirstAdminId(first?.adminId ?? null);
    } catch (error) {
      console.error("โหลดรายชื่อผู้ดูแลระบบไม่สำเร็จ", error);

      if (showError) {
        await Swal.fire({
          icon: "error",
          title: "โหลดข้อมูลไม่สำเร็จ",
          text: "ไม่สามารถโหลดรายชื่อผู้ดูแลระบบได้",
        });
      }
    }
  };

  const loadCurrentAdmin = async (): Promise<void> => {
    try {
      const res = await api.get<unknown>("/admin/me");
      setCurrentAdminId(extractCurrentAdminId(res.data));
    } catch (error) {
      console.error("โหลดข้อมูล Admin ปัจจุบันไม่สำเร็จ", error);
      setCurrentAdminId(null);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      setLoading(true);

      try {
        const [adminsResult, currentAdminResult] = await Promise.allSettled([
          api.get<unknown>("/admin/getall"),
          api.get<unknown>("/admin/me"),
        ]);

        if (cancelled) return;

        if (adminsResult.status === "fulfilled") {
          const data = extractAdminList(adminsResult.value.data);

          const sorted = [...data].sort((a, b) =>
            a.username.localeCompare(b.username, "th", {
              sensitivity: "base",
              numeric: true,
            }),
          );

          const first = [...data].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();

            return (
              (Number.isNaN(dateA) ? 0 : dateA) -
              (Number.isNaN(dateB) ? 0 : dateB)
            );
          })[0];

          setAdmins(sorted);
          setFirstAdminId(first?.adminId ?? null);
        } else {
          console.error("โหลดรายชื่อผู้ดูแลระบบไม่สำเร็จ", adminsResult.reason);

          await Swal.fire({
            icon: "error",
            title: "โหลดข้อมูลไม่สำเร็จ",
            text: "ไม่สามารถโหลดรายชื่อผู้ดูแลระบบได้",
          });

          if (cancelled) return;
        }

        if (currentAdminResult.status === "fulfilled") {
          setCurrentAdminId(
            extractCurrentAdminId(currentAdminResult.value.data),
          );
        } else {
          console.error(
            "โหลดข้อมูล Admin ปัจจุบันไม่สำเร็จ",
            currentAdminResult.reason,
          );
          setCurrentAdminId(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void initialize();

    return () => {
      cancelled = true;
    };
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...initialForm });
    setShowModal(true);
  };

  const openEdit = (admin: Admin) => {
    if (!isSuperAdmin && admin.adminId !== currentAdminId) {
      void Swal.fire({
        icon: "warning",
        title: "ไม่มีสิทธิ์",
        text: "คุณสามารถแก้ไขได้เฉพาะข้อมูลของตัวเอง",
      });
      return;
    }

    setEditing(admin);
    setForm({
      username: admin.username,
      password: "",
      name: admin.name,
      position: admin.position,
    });
    setShowModal(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditing(null);
    setForm({ ...initialForm });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      if (isEdit && editing) {
        if (!isSuperAdmin && editing.adminId !== currentAdminId) {
          await Swal.fire({
            icon: "warning",
            title: "ไม่มีสิทธิ์",
            text: "คุณสามารถแก้ไขได้เฉพาะข้อมูลของตัวเอง",
          });
          return;
        }

        await api.put(`/admin/${editing.adminId}`, {
          username: form.username,
          name: form.name,
          position: form.position,
        });
      } else {
        await api.post("/admin/register", form);
      }

      await Swal.fire({
        icon: "success",
        title: isEdit ? "แก้ไขสำเร็จ" : "เพิ่มสมาชิกสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });

      setShowModal(false);
      setEditing(null);
      setForm({ ...initialForm });

      await Promise.all([loadAdmins(false), loadCurrentAdmin()]);
    } catch (error: unknown) {
      console.error("บันทึกข้อมูลผู้ดูแลระบบไม่สำเร็จ", error);

      const message = axios.isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined;

      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: message || "ไม่สามารถบันทึกข้อมูลได้",
      });
    } finally {
      setSaving(false);
    }
  };

  const removeAdmin = async (adminId: string) => {
    if (!isSuperAdmin) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่มีสิทธิ์",
        text: "เฉพาะ Super Admin เท่านั้นที่สามารถลบสมาชิกได้",
      });
      return;
    }

    if (adminId === currentAdminId) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถลบตัวเองได้",
        text: "ไม่สามารถลบบัญชีของตัวเองได้",
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: "ลบสมาชิก?",
      text: "เมื่อลบแล้วจะไม่สามารถเรียกคืนข้อมูลได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#991b1b",
      cancelButtonColor: "#64748b",
    });

    if (!confirmation.isConfirmed) return;

    try {
      await api.delete(`/admin/${adminId}`);

      await Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ",
        text: "ลบสมาชิกเรียบร้อยแล้ว",
        timer: 1500,
        showConfirmButton: false,
      });

      await loadAdmins(false);
    } catch (error: unknown) {
      console.error("ลบสมาชิกไม่สำเร็จ", error);

      const message = axios.isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined;

      await Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        text: message || "เกิดข้อผิดพลาดขณะลบข้อมูล",
      });
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100";

  return (
    <div className="main-content min-h-screen bg-[#F5F6FA] px-3 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 md:hidden">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-95"
          >
            <Icon name="back" className="h-4 w-4" />
            ย้อนกลับ
          </button>
        </div>

        <section className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-[#35105F] via-[#6D174F] to-[#A51D50] shadow-xl shadow-purple-950/10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 px-5 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-white/65">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                SYSTEM / ADMINISTRATION
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-inner backdrop-blur-md">
                  <Icon name="users" className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    จัดการผู้ดูแลระบบ
                  </h1>
                  <p className="mt-1 text-sm text-white/70">
                    จัดการบัญชีผู้ใช้งานและกำหนดสิทธิ์การเข้าถึงระบบ
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md lg:self-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <Icon name="clock" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-white/60">
                  THAILAND TIME · UTC+7
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {thaiTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl transition group-hover:scale-150" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  ผู้ดูแลระบบทั้งหมด
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-800">
                  {admins.length}
                  <span className="ml-2 text-sm font-medium text-slate-400">
                    Accounts
                  </span>
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <Icon name="users" className="h-6 w-6" />
              </div>
            </div>
            <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-blue-50">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-100/80 blur-2xl transition group-hover:scale-150" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  สิทธิ์บัญชีของฉัน
                </p>
                <p
                  className={`mt-2 text-xl font-extrabold ${
                    isSuperAdmin ? "text-amber-600" : "text-slate-700"
                  }`}
                >
                  {isSuperAdmin ? "Super Admin" : "Admin"}
                </p>
              </div>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${
                  isSuperAdmin
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/20"
                    : "bg-gradient-to-br from-slate-400 to-slate-600 shadow-slate-500/20"
                }`}
              >
                {isSuperAdmin ? (
                  <Icon name="crown" className="h-6 w-6" />
                ) : (
                  <Icon name="shield" className="h-6 w-6" />
                )}
              </div>
            </div>
            <div className="relative mt-4 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  isSuperAdmin ? "bg-amber-400" : "bg-slate-400"
                }`}
              />
              <span className="text-xs text-slate-400">
                {isSuperAdmin
                  ? "สามารถจัดการบัญชีสมาชิกได้ทั้งหมด"
                  : "จัดการข้อมูลบัญชีของตัวเอง"}
              </span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-100/80 blur-2xl transition group-hover:scale-150" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  สถานะการให้บริการ
                </p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                <Icon name="check" className="h-6 w-6" />
              </div>
            </div>
            <div className="relative mt-4 text-xs text-slate-400">
              ระบบจัดการผู้ดูแลระบบ
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-violet-600">
              ADMIN DIRECTORY
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-800">
              รายชื่อผู้ดูแลระบบ
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              ตรวจสอบและจัดการข้อมูลบัญชีผู้ใช้งาน
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-xl active:scale-95"
          >
            <Icon name="plus" className="h-5 w-5" />
            เพิ่มสมาชิกใหม่
          </button>
        </div>

        <div className="mb-4 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-md">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา Username, ชื่อ หรือตำแหน่ง..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <span className="text-xs font-medium text-slate-400">
            แสดง {filteredAdmins.length} จาก {admins.length} รายการ
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center">
              <div className="mb-3 h-10 w-10 animate-spin rounded-full border-[3px] border-violet-100 border-t-violet-600" />
              <p className="text-sm font-medium text-slate-500">
                กำลังโหลดข้อมูล...
              </p>
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Icon name="users" className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-slate-600">
                ไม่พบข้อมูลสมาชิก
              </p>
              <p className="mt-1 text-xs text-slate-400">
                ลองเปลี่ยนคำค้นหาอีกครั้ง
              </p>
            </div>
          ) : isTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#35105F] via-[#6D174F] to-[#7C245A] text-white">
                    <th className="w-20 px-5 py-4 text-center font-semibold">
                      ลำดับ
                    </th>
                    <th className="px-5 py-4 text-left font-semibold">
                      บัญชีผู้ใช้งาน
                    </th>
                    <th className="px-5 py-4 text-left font-semibold">
                      ชื่อ - นามสกุล
                    </th>
                    <th className="px-5 py-4 text-left font-semibold">
                      ตำแหน่ง
                    </th>
                    <th className="w-28 px-4 py-4 text-center font-semibold">
                      แก้ไข
                    </th>
                    <th className="w-28 px-4 py-4 text-center font-semibold">
                      ลบ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAdmins.map((admin, index) => {
                    const isFirst = admin.adminId === firstAdminId;
                    const isMe = admin.adminId === currentAdminId;

                    return (
                      <tr
                        key={admin.adminId}
                        className="border-b border-slate-100 last:border-0 transition hover:bg-violet-50/40"
                      >
                        <td className="px-5 py-4 text-center text-xs font-semibold text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                isFirst
                                  ? "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700"
                                  : "bg-gradient-to-br from-blue-100 to-violet-100 text-violet-700"
                              }`}
                            >
                              {getInitial(admin.name, admin.username)}
                            </div>

                            <div>
                              <p className="font-bold text-slate-800">
                                {admin.username}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {isFirst && (
                                  <span className="rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                                    SUPER ADMIN
                                  </span>
                                )}
                                {isMe && (
                                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                                    บัญชีของฉัน
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-700">
                          {admin.name || "-"}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {admin.position || "-"}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isSuperAdmin || isMe ? (
                            <button
                              type="button"
                              onClick={() => openEdit(admin)}
                              aria-label={`แก้ไข ${admin.username}`}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition hover:bg-amber-500 hover:text-white active:scale-95"
                            >
                              <Icon name="edit" className="h-4 w-4" />
                            </button>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {isSuperAdmin && !isMe ? (
                            <button
                              type="button"
                              onClick={() => removeAdmin(admin.adminId)}
                              aria-label={`ลบ ${admin.username}`}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-600 transition hover:bg-rose-600 hover:text-white active:scale-95"
                            >
                              <Icon name="trash" className="h-4 w-4" />
                            </button>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
              {filteredAdmins.map((admin, index) => {
                const isFirst = admin.adminId === firstAdminId;
                const isMe = admin.adminId === currentAdminId;

                return (
                  <article
                    key={admin.adminId}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
                  >
                    <div
                      className={`h-1.5 ${
                        isFirst
                          ? "bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"
                          : "bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500"
                      }`}
                    />

                    <div className="relative overflow-hidden p-5">
                      <div
                        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl ${
                          isFirst ? "bg-amber-100" : "bg-violet-100"
                        }`}
                      />

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${
                              isFirst
                                ? "bg-gradient-to-br from-amber-400 to-orange-500"
                                : "bg-gradient-to-br from-blue-500 to-violet-600"
                            }`}
                          >
                            <Icon name="user" className="h-6 w-6" />
                          </div>

                          <div className="min-w-0">
                            <p className="break-all text-sm font-bold text-slate-800">
                              {admin.username}
                            </p>
                            <p className="mt-1 text-[10px] font-semibold tracking-wider text-slate-400">
                              ACCOUNT #{String(index + 1).padStart(2, "0")}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-1">
                          {isFirst && (
                            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-bold text-amber-700">
                              SUPER
                            </span>
                          )}
                          {isMe && (
                            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[9px] font-bold text-blue-700">
                              ฉัน
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative mt-5 grid grid-cols-1 gap-2">
                        <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-3">
                          <p className="text-[10px] font-bold text-blue-500">
                            ชื่อ - นามสกุล
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {admin.name || "-"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-violet-100 bg-violet-50/70 px-3 py-3">
                          <p className="text-[10px] font-bold text-violet-500">
                            ตำแหน่ง
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {admin.position || "-"}
                          </p>
                        </div>
                      </div>

                      {(isSuperAdmin || isMe) && (
                        <div className="relative mt-4 flex gap-2 border-t border-slate-100 pt-4">
                          <button
                            type="button"
                            onClick={() => openEdit(admin)}
                            className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-bold text-white shadow-sm transition hover:from-amber-500 hover:to-orange-600 active:scale-95"
                          >
                            <Icon name="edit" className="h-4 w-4" />
                            แก้ไข
                          </button>

                          {isSuperAdmin && !isMe && (
                            <button
                              type="button"
                              onClick={() => removeAdmin(admin.adminId)}
                              className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-xs font-bold text-white shadow-sm transition hover:from-rose-600 hover:to-red-700 active:scale-95"
                            >
                              <Icon name="trash" className="h-4 w-4" />
                              ลบสมาชิก
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center">
          <span>ระบบงานพิมพ์มือตรวจประวัติ</span>
          <span className="font-semibold tracking-wider">
            ADMINISTRATION MANAGEMENT · SYSTEM CONTROL
          </span>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/60 px-3 py-5 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-[480px] overflow-hidden rounded-3xl border border-white/50 bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#35105F] via-[#6D174F] to-[#A51D50] px-6 py-6">
              <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white">
                    {isEdit ? (
                      <Icon name="edit" className="h-6 w-6" />
                    ) : (
                      <Icon name="plus" className="h-6 w-6" />
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-white/60">
                      ADMINISTRATION
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-white">
                      {isEdit ? "แก้ไขข้อมูลสมาชิก" : "เพิ่มสมาชิกใหม่"}
                    </h2>
                    <p className="mt-1 text-xs text-white/65">
                      {isEdit
                        ? "ปรับปรุงข้อมูลบัญชีผู้ดูแลระบบ"
                        : "กรอกข้อมูลเพื่อสร้างบัญชีผู้ดูแลระบบ"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  aria-label="ปิดหน้าต่าง"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-50"
                >
                  <Icon name="close" />
                </button>
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="space-y-4 px-5 py-6 sm:px-6">
                <div>
                  <label
                    htmlFor="admin-username"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="admin-username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="กรอก Username"
                    autoComplete="username"
                    required
                    className={inputClass}
                  />
                </div>

                {!isEdit && (
                  <div>
                    <label
                      htmlFor="admin-password"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="กรอกรหัสผ่าน"
                      autoComplete="new-password"
                      required
                      className={inputClass}
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="admin-name"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    ชื่อ - นามสกุล
                  </label>
                  <input
                    id="admin-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="กรอกชื่อและนามสกุล"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-position"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    ตำแหน่ง
                  </label>
                  <input
                    id="admin-position"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    placeholder="กรอกตำแหน่ง"
                    className={inputClass}
                  />
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                  <Icon
                    name="shield"
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
                  />
                  <p className="text-xs leading-5 text-blue-700">
                    {isEdit
                      ? "การแก้ไขข้อมูลจะไม่เปลี่ยนแปลงรหัสผ่านของบัญชีเดิม"
                      : "กรุณาตรวจสอบข้อมูลบัญชีก่อนยืนยันการสร้างสมาชิก"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="min-h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 sm:min-w-28"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-36"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      กำลังบันทึก...
                    </>
                  ) : isEdit ? (
                    <>
                      <Icon name="edit" className="h-4 w-4" />
                      บันทึกการแก้ไข
                    </>
                  ) : (
                    <>
                      <Icon name="plus" className="h-4 w-4" />
                      สร้างบัญชี
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
