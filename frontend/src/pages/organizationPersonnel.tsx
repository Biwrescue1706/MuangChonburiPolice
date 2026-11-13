import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Phone,
  UserRound,
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SearchX,
  BadgeCheck,
  ClipboardList,
  UserCog,
} from "lucide-react";
import Swal from "sweetalert2";
import api from "../api/axios";

interface Personnel {
  personnelId: string;
  rank: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameWithRank: string;
  position: string | null;
  duty: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

interface PersonnelForm {
  rank: string;
  firstName: string;
  lastName: string;
  position: string;
  duty: string;
  phone: string;
}

const initialForm: PersonnelForm = {
  rank: "",
  firstName: "",
  lastName: "",
  position: "",
  duty: "",
  phone: "",
};

const PAGE_SIZE = 8;

const rankOptions = [
  "พ.ต.อ.",
  "พ.ต.ท.",
  "พ.ต.ท.หญิง",
  "พ.ต.ต.",
  "พ.ต.ต.หญิง",
  "ร.ต.อ.",
  "ร.ต.อ.หญิง",
  "ร.ต.ท.",
  "ร.ต.ท.หญิง",
  "ร.ต.ต.",
  "ร.ต.ต.หญิง",
  "ด.ต.",
  "ด.ต.หญิง",
  "จ.ส.ต.",
  "จ.ส.ต.หญิง",
  "ส.ต.อ.",
  "ส.ต.อ.หญิง",
  "ส.ต.ท.",
  "ส.ต.ท.หญิง",
  "ส.ต.ต.",
  "ส.ต.ต.หญิง",
];

const positionOptions = [
  "ผกก.สภ.เมืองชลบุรี",
  "รอง ผกก.ป.ฯ",
  "รอง ผกก.จร.ฯ",
  "รอง ผกก.สส.ฯ",
  "รอง ผกก.(สอบสวน)ฯ",
  "สว.อก.ฯ",
  "สวป.ฯ",
  "สวป.(ชส.)ฯ",
  "สว.จร.ฯ",
  "สว.สส.ฯ",
  "สว.(สอบสวน)ฯ",
  "รอง สวป.ฯ",
  "รอง สว.จร.ฯ",
  "รอง สว.สส.ฯ",
  "รอง สว.(สอบสวน)ฯ",
  "รอง สว.(ป.)ฯ",
  "รอง สว.(จร.)ฯ",
  "รอง สว.(สส.)ฯ",
  "รอง สว.(ส.)ฯ",
  "ผบ.หมู่ (ป.)ฯ",
  "ผบ.หมู่ (สส.)ฯ",
  "ผบ.หมู่ (จร.)ฯ",
  "ผบ.หมู่ (ผช.พงส.)ฯ",
  "ผบ.หมู่ คฝ.กก.สส.ภ.จว.ชลบุรี",
];

const rankOrder = rankOptions.reduce<Record<string, number>>(
  (acc, rank, index) => {
    acc[rank] = index;
    return acc;
  },
  {},
);

export default function OrganizationPersonnel() {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PersonnelForm>(initialForm);

  const fetchPersonnel = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<Personnel[]>("/organization-personnel");

      setPersonnel(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Fetch Personnel Error:", error);

      Swal.fire({
        icon: "error",
        title: "ไม่สามารถโหลดข้อมูลได้",
        text: "กรุณาตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonnel();
  }, [fetchPersonnel]);

  const filteredPersonnel = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return [...personnel]
      .filter((item) => {
        if (!keyword) return true;

        return [
          item.rank,
          item.firstName,
          item.lastName,
          item.fullName,
          item.fullNameWithRank,
          item.position,
          item.duty,
          item.phone,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(keyword));
      })
      .sort((a, b) => {
        const rankA = rankOrder[a.rank || ""] ?? 999;
        const rankB = rankOrder[b.rank || ""] ?? 999;

        return rankA - rankB;
      });
  }, [personnel, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPersonnel.length / PAGE_SIZE),
  );

  const paginatedPersonnel = filteredPersonnel.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item: Personnel) => {
    setEditingId(item.personnelId);

    setForm({
      rank: item.rank || "",
      firstName: item.firstName || "",
      lastName: item.lastName || "",
      position: item.position || "",
      duty: item.duty || "",
      phone: item.phone || "",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleChange = (field: keyof PersonnelForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกชื่อและนามสกุล",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (form.phone.trim() && !/^[0-9+\-\s()]{8,20}$/.test(form.phone.trim())) {
      Swal.fire({
        icon: "warning",
        title: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
        text: "กรุณาตรวจสอบหมายเลขโทรศัพท์อีกครั้ง",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const payload = {
      rank: form.rank.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      position: form.position.trim(),
      duty: form.duty.trim(),
      phone: form.phone.trim(),
    };

    const isEditing = Boolean(editingId);

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/organization-personnel/${editingId}`, payload);
      } else {
        await api.post("/organization-personnel", payload);
      }

      setModalOpen(false);
      setEditingId(null);
      setForm(initialForm);

      await fetchPersonnel();

      Swal.fire({
        icon: "success",
        title: isEditing ? "แก้ไขข้อมูลสำเร็จ" : "เพิ่มข้อมูลสำเร็จ",
        text: isEditing
          ? "บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว"
          : "เพิ่มรายชื่อเจ้าหน้าที่เรียบร้อยแล้ว",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Save Personnel Error:", error);

      Swal.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
        text: "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Personnel) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล?",
      html: `คุณต้องการลบข้อมูลของ<br/><strong>${item.fullNameWithRank || item.fullName}</strong><br/>ใช่หรือไม่`,
      showCancelButton: true,
      confirmButtonText: "ยืนยันลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/organization-personnel/${item.personnelId}`);

      await fetchPersonnel();

      Swal.fire({
        icon: "success",
        title: "ลบข้อมูลเรียบร้อย",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete Personnel Error:", error);

      Swal.fire({
        icon: "error",
        title: "ไม่สามารถลบข้อมูลได้",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const getInitials = (item: Personnel) => {
    return item.firstName?.charAt(0) || "บ";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 font-['Kanit'] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 p-6 shadow-lg sm:p-8">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-400/10" />
          <div className="absolute -bottom-24 right-48 h-56 w-56 rounded-full bg-cyan-300/10" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-blue-200">
                <ShieldCheck size={19} />
                <span className="text-sm font-medium tracking-wide">
                  PERSONNEL MANAGEMENT
                </span>
              </div>

              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                จัดการข้อมูลเจ้าหน้าที่
              </h1>

              <p className="mt-2 text-sm text-blue-100/75 sm:text-base">
                ระบบจัดเก็บรายชื่อ ตำแหน่ง และข้อมูลการติดต่อเจ้าหน้าที่
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-blue-900 shadow-md transition hover:bg-blue-50 active:scale-95"
            >
              <Plus size={19} />
              เพิ่มเจ้าหน้าที่
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">เจ้าหน้าที่ทั้งหมด</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-800">
                  {personnel.length.toLocaleString("th-TH")}
                  <span className="ml-2 text-base font-normal text-slate-400">
                    คน
                  </span>
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={25} />
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">ผลการค้นหา</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-800">
                  {filteredPersonnel.length.toLocaleString("th-TH")}
                  <span className="ml-2 text-base font-normal text-slate-400">
                    รายการ
                  </span>
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ClipboardList size={25} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600">
              <BadgeCheck size={15} />
              <span>ข้อมูลเจ้าหน้าที่ในระบบ</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <UserCog size={21} className="text-blue-600" />
                รายชื่อเจ้าหน้าที่
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                จัดการข้อมูลและรายละเอียดเจ้าหน้าที่
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาชื่อ ตำแหน่ง หรือเบอร์โทร..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-72"
                />
              </div>

              <button
                onClick={fetchPersonnel}
                disabled={loading}
                title="รีเฟรชข้อมูล"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                รีเฟรช
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-slate-50 text-xs font-medium text-slate-500">
                  <th className="px-5 py-4">ลำดับ</th>
                  <th className="px-5 py-4">ชื่อ - นามสกุล</th>
                  <th className="px-5 py-4">ตำแหน่ง</th>
                  <th className="px-5 py-4">ปฏิบัติหน้าที่</th>
                  <th className="px-5 py-4">หมายเลขโทรศัพท์</th>
                  <th className="px-5 py-4 text-center">จัดการ</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <RefreshCw
                        size={28}
                        className="mx-auto animate-spin text-blue-500"
                      />
                      <p className="mt-3 text-sm text-slate-400">
                        กำลังโหลดข้อมูล...
                      </p>
                    </td>
                  </tr>
                ) : paginatedPersonnel.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <SearchX size={27} />
                      </div>
                      <p className="mt-3 font-medium text-slate-600">
                        ไม่พบข้อมูลเจ้าหน้าที่
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        ลองเปลี่ยนคำค้นหาหรือเพิ่มข้อมูลใหม่
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedPersonnel.map((item, index) => (
                    <tr
                      key={item.personnelId}
                      className="group transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4 text-sm text-slate-400">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-sm">
                            {getInitials(item)}
                          </div>

                          <div>
                            <p className="font-medium text-slate-800">
                              {item.fullNameWithRank ||
                                item.fullName ||
                                `${item.firstName} ${item.lastName}`}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {item.rank || "ไม่ระบุยศ"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <BriefcaseBusiness
                            size={15}
                            className="shrink-0 text-blue-400"
                          />
                          {item.position || "-"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[220px] rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                          {item.duty || "ไม่ได้ระบุ"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="inline-flex items-center gap-2 text-sm text-emerald-700 transition hover:text-emerald-900"
                          >
                            <Phone size={15} />
                            {item.phone}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            title="แก้ไขข้อมูล"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(item)}
                            title="ลบข้อมูล"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredPersonnel.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                แสดง{" "}
                <span className="font-medium text-slate-800">
                  {(currentPage - 1) * PAGE_SIZE + 1}
                </span>
                {" - "}
                <span className="font-medium text-slate-800">
                  {Math.min(currentPage * PAGE_SIZE, filteredPersonnel.length)}
                </span>
                {" จาก "}
                <span className="font-medium text-slate-800">
                  {filteredPersonnel.length}
                </span>
                {" รายการ"}
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="min-w-20 text-center text-sm font-medium text-slate-700">
                  หน้า {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="pb-4 text-center text-xs text-slate-400">
          Personnel Management System
        </p>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-blue-800 px-6 py-5">
              <div className="absolute -right-8 -top-16 h-40 w-40 rounded-full bg-white/5" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                    {editingId ? <Pencil size={21} /> : <UserRound size={23} />}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {editingId
                        ? "แก้ไขข้อมูลเจ้าหน้าที่"
                        : "เพิ่มเจ้าหน้าที่ใหม่"}
                    </h2>
                    <p className="mt-0.5 text-xs text-blue-100/70">
                      กรอกรายละเอียดข้อมูลเจ้าหน้าที่
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  disabled={saving}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white hover:text-white"
                >
                  <X size={21} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[65vh] space-y-5 overflow-y-auto p-6">
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <UserRound size={17} className="text-blue-600" />
                    ข้อมูลส่วนบุคคล
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">
                        ยศ / คำนำหน้า
                      </label>
                      <input
                        list="rank-options"
                        value={form.rank}
                        onChange={(e) => handleChange("rank", e.target.value)}
                        placeholder="เลือกหรือพิมพ์ยศ..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                      <datalist id="rank-options">
                        {rankOptions.map((rank) => (
                          <option key={rank} value={rank} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">
                        ชื่อ <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          handleChange("firstName", e.target.value)
                        }
                        placeholder="กรอกชื่อ"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">
                        นามสกุล <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        value={form.lastName}
                        onChange={(e) =>
                          handleChange("lastName", e.target.value)
                        }
                        placeholder="กรอกนามสกุล"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                    <p className="mb-2 text-xs font-medium text-blue-600">
                      ตัวอย่างชื่อที่ระบบจะจัดเก็บ
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {form.rank.trim()} {form.firstName.trim() || "ชื่อ"}{" "}
                      {form.lastName.trim() || "นามสกุล"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <BriefcaseBusiness size={17} className="text-amber-600" />
                    ข้อมูลตำแหน่งและหน้าที่
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">
                        ตำแหน่ง
                      </label>
                      <input
                        list="position-options"
                        value={form.position}
                        onChange={(e) =>
                          handleChange("position", e.target.value)
                        }
                        placeholder="เลือกหรือพิมพ์ตำแหน่ง..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                      <datalist id="position-options">
                        {positionOptions.map((position) => (
                          <option key={position} value={position} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">
                        ปฏิบัติหน้าที่
                      </label>
                      <input
                        value={form.duty}
                        onChange={(e) => handleChange("duty", e.target.value)}
                        placeholder="เช่น ปฏิบัติหน้าที่หัวหน้างานสอบสวน"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Phone size={17} className="text-emerald-600" />
                    ข้อมูลการติดต่อ
                  </h3>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                      หมายเลขโทรศัพท์
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="เช่น 0812345678"
                      maxLength={20}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      {editingId ? <Pencil size={16} /> : <Plus size={17} />}
                      {editingId ? "บันทึกการแก้ไข" : "เพิ่มเจ้าหน้าที่"}
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
