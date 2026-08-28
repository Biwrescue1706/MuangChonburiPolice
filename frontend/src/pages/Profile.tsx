// src/pages/Profile.tsx

import { useEffect, useState } from "react";
import api from "../api/axios";

type AdminProfile = {
  username: string;
  name: string;
  position: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<AdminProfile>({
    username: "",
    name: "",
    position: "",
  });

  const [editProfile, setEditProfile] = useState<AdminProfile>({
    username: "",
    name: "",
    position: "",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  /* ================= LOAD PROFILE ================= */

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/me");

      setProfile(res.data);
      setEditProfile(res.data);
    } catch (error) {
      console.error(error);
      alert("โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= OPEN EDIT ================= */

  const openEditModal = () => {
    setEditProfile(profile);
    setEditOpen(true);
  };

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);

      await api.put("/admin/me", editProfile);

      setProfile(editProfile);
      setEditOpen(false);

      alert("บันทึกข้อมูลเรียบร้อย");
    } catch (error) {
      console.error(error);
      alert("บันทึกข้อมูลไม่สำเร็จ");
    } finally {
      setSavingProfile(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */

  const handleChangePassword = async () => {
    if (!password.oldPassword || !password.newPassword) {
      alert("กรุณากรอกรหัสผ่านให้ครบ");
      return;
    }

    try {
      setChangingPassword(true);

      await api.put("/auth/change-password", password);

      setPassword({
        oldPassword: "",
        newPassword: "",
      });

      setShowOld(false);
      setShowNew(false);
      setPasswordOpen(false);

      alert("เปลี่ยนรหัสผ่านเรียบร้อย");
    } catch (error) {
      console.error(error);
      alert("เปลี่ยนรหัสผ่านไม่สำเร็จ");
    } finally {
      setChangingPassword(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#800020]" />
          กำลังโหลดข้อมูล...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-5">
      <div className="mx-auto max-w-3xl">
        {/* ================= HEADER ================= */}

        <div className="mb-3">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            👤 โปรไฟล์ผู้ใช้งาน
          </h1>

          <p className="mt-0.5 text-sm text-gray-500">
            ข้อมูลบัญชีและการตั้งค่าผู้ใช้งาน
          </p>
        </div>

        {/* ================= PROFILE CARD ================= */}

        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* CARD HEADER */}

          <div className="bg-[#800020] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white">
                👤
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  {profile.name || "ผู้ใช้งาน"}
                </h2>

                <p className="text-xs text-white/70">
                  {profile.position || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* CARD BODY */}

          <div className="p-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {/* USERNAME */}

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-xs font-medium text-gray-500">Username</p>

                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                  {profile.username || "-"}
                </p>
              </div>

              {/* NAME */}

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-xs font-medium text-gray-500">
                  ชื่อ - นามสกุล
                </p>

                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                  {profile.name || "-"}
                </p>
              </div>

              {/* POSITION */}

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 md:col-span-2">
                <p className="text-xs font-medium text-gray-500">ตำแหน่ง</p>

                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                  {profile.position || "-"}
                </p>
              </div>
            </div>

            {/* ACTION */}

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={openEditModal}
                className="rounded-lg bg-[#800020] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#660019]"
              >
                🧑 แก้ไขข้อมูล
              </button>

              <button
                type="button"
                onClick={() => setPasswordOpen(true)}
                className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600"
              >
                🔒 เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          EDIT PROFILE MODAL
      ================================================== */}

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
            {/* HEADER */}

            <div className="flex items-center justify-between bg-[#800020] px-4 py-3">
              <div>
                <h2 className="font-semibold text-white">แก้ไขข้อมูล</h2>

                <p className="text-xs text-white/70">
                  แก้ไขข้อมูลบัญชีผู้ใช้งาน
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white transition hover:bg-white/10"
              >
                ×
              </button>
            </div>

            {/* BODY */}

            <div className="space-y-3 p-4">
              {/* USERNAME */}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  type="text"
                  value={editProfile.username}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      username: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                  placeholder="Username"
                />
              </div>

              {/* NAME */}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  ชื่อ - นามสกุล
                </label>

                <input
                  type="text"
                  value={editProfile.name}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                  placeholder="ชื่อ - นามสกุล"
                />
              </div>

              {/* POSITION */}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  ตำแหน่ง
                </label>

                <input
                  type="text"
                  value={editProfile.position}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      position: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                  placeholder="ตำแหน่ง"
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className="rounded-lg bg-[#800020] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#660019] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingProfile ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          PASSWORD MODAL
      ================================================== */}

      {passwordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
            {/* HEADER */}

            <div className="flex items-center justify-between bg-[#800020] px-4 py-3">
              <div>
                <h2 className="font-semibold text-white">🔒 เปลี่ยนรหัสผ่าน</h2>

                <p className="text-xs text-white/70">
                  กรอกรหัสผ่านเดิมและรหัสผ่านใหม่
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPasswordOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white transition hover:bg-white/10"
              >
                ×
              </button>
            </div>

            {/* BODY */}

            <div className="space-y-3 p-4">
              {/* OLD PASSWORD */}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  รหัสผ่านเดิม
                </label>

                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    value={password.oldPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        oldPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-12 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                    placeholder="กรอกรหัสผ่านเดิม"
                  />

                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-1 top-1/2 flex h-8 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100"
                  >
                    {showOld ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  รหัสผ่านใหม่
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-12 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                    placeholder="กรอกรหัสผ่านใหม่"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-1 top-1/2 flex h-8 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100"
                  >
                    {showNew ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  setPasswordOpen(false);

                  setPassword({
                    oldPassword: "",
                    newPassword: "",
                  });

                  setShowOld(false);
                  setShowNew(false);
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="rounded-lg bg-[#800020] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#660019] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {changingPassword ? "กำลังเปลี่ยน..." : "ยืนยันเปลี่ยนรหัสผ่าน"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
