// src/pages/CreateAdmin.tsx

import { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

type Admin = {
  adminId: string;
  username: string;
  name: string;
  position: string;
  createdAt: string;
};

export default function CreateAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [firstAdminId, setFirstAdminId] = useState<string | null>(null);
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Admin | null>(null);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [thaiTime, setThaiTime] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    position: "",
  });

  const isEdit = !!editing;
  const isTable = screenWidth >= 1280;

  // คนที่ Login อยู่เป็น firstAdmin หรือไม่
  const isSuperAdmin =
    currentAdminId !== null &&
    firstAdminId !== null &&
    currentAdminId === firstAdminId;

  // =====================================================
  // RESPONSIVE
  // =====================================================

  useEffect(() => {
    const resize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // =====================================================
  // THAI TIME
  // =====================================================

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setThaiTime(
        now.toLocaleString("th-TH", {
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

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  // =====================================================
  // LOAD CURRENT ADMIN
  // =====================================================

  const loadCurrentAdmin = async () => {
    try {
      const res = await api.get("/admin/me");

      setCurrentAdminId(res.data?.adminId || null);
    } catch (error) {
      console.error("โหลดข้อมูล Admin ปัจจุบันไม่สำเร็จ", error);
      setCurrentAdminId(null);
    }
  };

  // =====================================================
  // LOAD ADMINS
  // =====================================================

  const loadAdmins = async () => {
    try {
      const res = await api.get("/admin/getall");

      const data: Admin[] = Array.isArray(res.data) ? res.data : [];

      const sorted = [...data].sort((a, b) =>
        (a.username || "").localeCompare(b.username || "", "th", {
          sensitivity: "base",
          numeric: true,
        }),
      );

      setAdmins(sorted);

      // Admin คนแรก = firstAdminId
      if (sorted.length > 0) {
        const first = [...sorted].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )[0];

        setFirstAdminId(first.adminId);
      } else {
        setFirstAdminId(null);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
        text: "ไม่สามารถโหลดรายชื่อผู้ดูแลระบบได้",
      });
    }
  };

  useEffect(() => {
    loadAdmins();
    loadCurrentAdmin();
  }, []);

  // =====================================================
  // OPEN CREATE
  // ทุกคนสามารถเพิ่มสมาชิกได้
  // =====================================================

  const openCreate = () => {
    setEditing(null);

    setForm({
      username: "",
      password: "",
      name: "",
      position: "",
    });

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEdit = (admin: Admin) => {
    // firstAdmin แก้ไขทุกคนได้
    // Admin ทั่วไปแก้ไขเฉพาะตัวเอง
    if (!isSuperAdmin && admin.adminId !== currentAdminId) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีสิทธิ์",
        text: "คุณสามารถแก้ไขได้เฉพาะข้อมูลของตัวเอง",
      });

      return;
    }

    setEditing(admin);

    setForm({
      username: admin.username || "",
      password: "",
      name: admin.name || "",
      position: admin.position || "",
    });

    setShowModal(true);
  };

  // =====================================================
  // CHANGE FORM
  // =====================================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================================================
  // SAVE
  // =====================================================

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // ================= EDIT =================

      if (isEdit) {
        if (!isSuperAdmin && editing?.adminId !== currentAdminId) {
          Swal.fire({
            icon: "warning",
            title: "ไม่มีสิทธิ์",
            text: "คุณสามารถแก้ไขได้เฉพาะข้อมูลของตัวเอง",
          });

          return;
        }

        await api.put(`/admin/${editing!.adminId}`, {
          username: form.username,
          name: form.name,
          position: form.position,
        });
      }

      // ================= CREATE =================
      else {
        // ทุก Admin สามารถเพิ่มสมาชิกได้
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

      setForm({
        username: "",
        password: "",
        name: "",
        position: "",
      });

      await loadAdmins();
      await loadCurrentAdmin();
    } catch (err: any) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.response?.data?.error || "ไม่สามารถบันทึกข้อมูลได้",
      });
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const removeAdmin = async (adminId: string) => {
    // เฉพาะ firstAdmin
    if (!isSuperAdmin) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีสิทธิ์",
        text: "เฉพาะ Super Admin เท่านั้นที่สามารถลบสมาชิกได้",
      });

      return;
    }

    // ห้ามลบตัวเอง
    if (adminId === currentAdminId) {
      Swal.fire({
        icon: "warning",
        title: "ไม่สามารถลบตัวเองได้",
        text: "ไม่สามารถลบบัญชีของตัวเองได้",
      });

      return;
    }

    const confirm = await Swal.fire({
      title: "ลบสมาชิก ?",
      text: "เมื่อลบแล้วจะไม่สามารถเรียกคืนข้อมูลได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/admin/${adminId}`);

      await Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ",
        text: "ลบสมาชิกเรียบร้อยแล้ว",
        timer: 1500,
        showConfirmButton: false,
      });

      await loadAdmins();
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        text: error.response?.data?.error || "เกิดข้อผิดพลาดขณะลบข้อมูล",
      });
    }
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);

    setForm({
      username: "",
      password: "",
      name: "",
      position: "",
    });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="main-content min-h-screen bg-gray-50 px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1500px] px-1 sm:px-4">
        {/* ================= HEADER ================= */}

        <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650017] to-[#800020] shadow-lg">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">
                👥
              </div>

              <div>
                <h1 className="text-lg font-bold text-white sm:text-xl">
                  สมาชิกผู้ดูแลระบบ
                </h1>

                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                  จัดการบัญชีผู้ดูแลระบบ
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-white/60">เวลาปัจจุบัน</p>

              <p className="mt-1 text-sm font-semibold text-white">
                {thaiTime}
              </p>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                👤
              </div>

              <div>
                <p className="text-xs text-gray-400">ผู้ดูแลระบบทั้งหมด</p>

                <p className="text-xl font-bold text-gray-800">
                  {admins.length}

                  <span className="ml-1 text-sm font-medium text-gray-400">
                    คน
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
                👑
              </div>

              <div>
                <p className="text-xs text-gray-400">สิทธิ์ของฉัน</p>

                <p
                  className={`text-base font-bold ${
                    isSuperAdmin ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {isSuperAdmin ? "Super Admin" : "Admin"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ADD MEMBER ================= */}

        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={openCreate}
            className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-95"
          >
            <span className="text-lg">＋</span>
            เพิ่มสมาชิก
          </button>
        </div>

        {/* ================= MAIN CARD ================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* ================= DESKTOP ================= */}

          {isTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="w-[80px] border border-gray-700 px-4 py-3 text-center">
                      #
                    </th>

                    <th className="border border-gray-700 px-4 py-3 text-left">
                      Username
                    </th>

                    <th className="border border-gray-700 px-4 py-3 text-left">
                      ชื่อ
                    </th>

                    <th className="border border-gray-700 px-4 py-3 text-left">
                      ตำแหน่ง
                    </th>

                    <th className="w-[100px] border border-gray-700 px-4 py-3 text-center">
                      แก้ไข
                    </th>

                    <th className="w-[100px] border border-gray-700 px-4 py-3 text-center">
                      ลบ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {admins.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-gray-400"
                      >
                        ไม่พบสมาชิก
                      </td>
                    </tr>
                  ) : (
                    admins.map((a, i) => (
                      <tr
                        key={a.adminId}
                        className="transition hover:bg-gray-50"
                      >
                        {/* # */}

                        <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-500">
                          {i + 1}
                        </td>

                        {/* USERNAME */}

                        <td className="border border-gray-200 px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              {a.username}
                            </span>

                            {a.adminId === firstAdminId && (
                              <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
                                SUPER
                              </span>
                            )}

                            {a.adminId === currentAdminId && (
                              <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
                                ฉัน
                              </span>
                            )}
                          </div>
                        </td>

                        {/* NAME */}

                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          {a.name || "-"}
                        </td>

                        {/* POSITION */}

                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          {a.position || "-"}
                        </td>

                        {/* ================= EDIT ================= */}

                        <td className="border border-gray-200 px-4 py-3 text-center">
                          {isSuperAdmin || a.adminId === currentAdminId ? (
                            <button
                              type="button"
                              onClick={() => openEdit(a)}
                              className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-amber-600 active:scale-95"
                            >
                              ✏️
                            </button>
                          ) : (
                            <span className="text-xs text-gray-300">-</span>
                          )}
                        </td>

                        {/* ================= DELETE ================= */}

                        <td className="border border-gray-200 px-4 py-3 text-center">
                          {isSuperAdmin && a.adminId !== currentAdminId ? (
                            <button
                              type="button"
                              onClick={() => removeAdmin(a.adminId)}
                              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700 active:scale-95"
                            >
                              🗑️
                            </button>
                          ) : (
                            <span className="text-xs text-gray-300">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* ================= MOBILE ================= */

            <div className="p-3 sm:p-5">
              {admins.length === 0 ? (
                <div className="py-10 text-center text-gray-400">
                  ไม่พบสมาชิก
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {admins.map((a, index) => (
                    <div
                      key={a.adminId}
                      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {/* CARD HEADER */}

                      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800020]/10 text-xs font-bold text-[#800020]">
                            {index + 1}
                          </span>

                          <span className="text-xs font-semibold text-gray-400">
                            Admin
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {a.adminId === firstAdminId && (
                            <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold text-red-700">
                              SUPER
                            </span>
                          )}

                          {a.adminId === currentAdminId && (
                            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                              ฉัน
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CARD BODY */}

                      <div className="p-4">
                        <div className="mb-4">
                          <p className="mb-1 text-[10px] font-semibold text-gray-400">
                            USERNAME
                          </p>

                          <p className="break-all text-base font-bold text-gray-800">
                            {a.username}
                          </p>
                        </div>

                        <div className="mb-3 rounded-xl bg-gray-50 p-3">
                          <p className="text-[10px] font-semibold text-gray-400">
                            ชื่อ
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-700">
                            {a.name || "-"}
                          </p>
                        </div>

                        <div className="mb-4 rounded-xl bg-gray-50 p-3">
                          <p className="text-[10px] font-semibold text-gray-400">
                            ตำแหน่ง
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-700">
                            {a.position || "-"}
                          </p>
                        </div>

                        {/* ================= ACTIONS ================= */}

                        <div className="flex gap-2">
                          {/* แก้ไข:
                              Super Admin = ทุกคน
                              Admin = ตัวเอง
                          */}

                          {(isSuperAdmin || a.adminId === currentAdminId) && (
                            <button
                              type="button"
                              onClick={() => openEdit(a)}
                              className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-amber-500 text-sm font-bold text-white transition hover:bg-amber-600 active:scale-95"
                            >
                              ✏️ แก้ไข
                            </button>
                          )}

                          {/* ลบ:
                              Super Admin = คนอื่น
                              ตัวเอง = ไม่มี
                          */}

                          {isSuperAdmin && a.adminId !== currentAdminId && (
                            <button
                              type="button"
                              onClick={() => removeAdmin(a.adminId)}
                              className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white transition hover:bg-red-700 active:scale-95"
                            >
                              🗑️ ลบ
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-3 py-5">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between bg-[#800020] px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isEdit ? "แก้ไขข้อมูลสมาชิก" : "เพิ่มสมาชิก"}
                </h2>

                <p className="mt-0.5 text-xs text-white/70">
                  {isEdit
                    ? "แก้ไขข้อมูลผู้ดูแลระบบ"
                    : "สร้างบัญชีผู้ดูแลระบบใหม่"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg text-white transition hover:bg-white/20"
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={submit}>
              <div className="space-y-4 p-5">
                {/* USERNAME */}

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Username
                  </label>

                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="กรอก Username"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
                  />
                </div>

                {/* PASSWORD */}

                {!isEdit && (
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="กรอก Password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
                    />
                  </div>
                )}

                {/* NAME */}

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    ชื่อ
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="กรอกชื่อ"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
                  />
                </div>

                {/* POSITION */}

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    ตำแหน่ง
                  </label>

                  <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    placeholder="กรอกตำแหน่ง"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
                  />
                </div>
              </div>

              {/* MODAL FOOTER */}

              <div className="flex gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="min-h-[46px] flex-1 rounded-xl bg-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-300 active:scale-95"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="min-h-[46px] flex-1 rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#650017] active:scale-95"
                >
                  {isEdit ? "บันทึกการแก้ไข" : "เพิ่มสมาชิก"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
