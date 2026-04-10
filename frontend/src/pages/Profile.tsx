import { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

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

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await api.get("/admin/me");
      setProfile(res.data);
    } catch {
      Swal.fire("ผิดพลาด", "โหลดข้อมูลไม่สำเร็จ", "error");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= EDIT PROFILE POPUP ================= */
  const openEditProfile = async () => {
    const { value } = await Swal.fire({
      title: "แก้ไขข้อมูลส่วนตัว",
      html: `
        <input id="username" class="swal2-input" placeholder="Username" value="${profile.username}">
        <input id="name" class="swal2-input" placeholder="ชื่อ - นามสกุล" value="${profile.name}">
        <input id="position" class="swal2-input" placeholder="ตำแหน่ง" value="${profile.position}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      preConfirm: () => {
        return {
          username: (document.getElementById("username") as HTMLInputElement).value,
          name: (document.getElementById("name") as HTMLInputElement).value,
          position: (document.getElementById("position") as HTMLInputElement).value,
        };
      },
    });

    if (value) {
      try {
        await api.put("/admin/me", value);

        setProfile(value);

        Swal.fire("สำเร็จ", "บันทึกข้อมูลแล้ว", "success");
      } catch {
        Swal.fire("ผิดพลาด", "อัปเดตไม่สำเร็จ", "error");
      }
    }
  };

  /* ================= CHANGE PASSWORD POPUP ================= */
  const openChangePassword = async () => {
    const { value } = await Swal.fire({
      title: "เปลี่ยนรหัสผ่าน",
      html: `
        <input id="oldPassword" type="password" class="swal2-input" placeholder="รหัสผ่านเดิม">
        <input id="newPassword" type="password" class="swal2-input" placeholder="รหัสผ่านใหม่">
      `,
      showCancelButton: true,
      confirmButtonText: "เปลี่ยนรหัสผ่าน",
      cancelButtonText: "ยกเลิก",
      preConfirm: () => {
        const oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
        const newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;

        if (!oldPassword || !newPassword) {
          Swal.showValidationMessage("กรอกข้อมูลให้ครบ");
          return;
        }

        if (oldPassword === newPassword) {
          Swal.showValidationMessage("รหัสใหม่ห้ามซ้ำ");
          return;
        }

        if (newPassword.length <= 6) {
          Swal.showValidationMessage("รหัสต้องมากกว่า 6 ตัว");
          return;
        }

        return { oldPassword, newPassword };
      },
    });

    if (value) {
      try {
        await api.put("/auth/change-password", value);

        Swal.fire({
          icon: "success",
          title: "เปลี่ยนรหัสผ่านสำเร็จ",
          text: "กรุณาเข้าสู่ระบบใหม่",
        });

        window.location.href = "/";
      } catch (err: any) {
        Swal.fire("ผิดพลาด", err.response?.data?.error || "error", "error");
      }
    }
  };

  return (
    <div className="main-content">
      <div className="container py-3 text-center">
        <h3 className="fw-bold mb-4">👤 โปรไฟล์ผู้ใช้งาน</h3>

        {/* ปุ่ม */}
        <div className="d-flex gap-3 justify-content-center">
          <button className="btn btn-primary px-4" onClick={openEditProfile}>
            🧑 แก้ไขข้อมูล
          </button>

          <button className="btn btn-warning px-4" onClick={openChangePassword}>
            🔒 เปลี่ยนรหัสผ่าน
          </button>
        </div>
      </div>
    </div>
  );
}