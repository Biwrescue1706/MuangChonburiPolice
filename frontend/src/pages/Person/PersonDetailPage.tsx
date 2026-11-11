import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import api from "../../api/axios";

type Person = {
  id?: string | number;
  status: number;
  statusUpdatedAt?: string | null;
  fingerprintDate?: string | null;
  organizationName?: string | null;
  fullName?: string | null;
  birthDate?: string | null;
  fullNameWithRank?: string | null;
  purpose?: string | null;
  requestingAgency?: string | null;
  citizenId?: string | null;
  birthDay?: string | number | null;
  birthMonth?: string | null;
  birthYear?: string | number | null;
  ethnicity?: string | null;
  nationality?: string | null;
  height?: string | number | null;
  weight?: string | number | null;
  bodyType?: string | null;
  skinColor?: string | null;
  distinguishingMarks?: string | null;
  behavior?: string | null;
  address?: string | null;
  occupation?: string | null;
  workplaceAddress?: string | null;
  father?: string | null;
  mother?: string | null;
  spouse?: string | null;
  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  receiptDate?: string | null;
  money?: string | number | null;
  moneyText?: string | null;
};

const formatThaiDate = (
  value: string | number | Date | null | undefined,
): string => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const getStatus = (status: number): string => {
  switch (status) {
    case 0:
      return "รอส่ง ศพฐ.";
    case 1:
      return "เตรียมเอกสารส่ง ศพฐ. แล้ว";
    case 2:
      return "ส่ง ศพฐ. แล้ว";
    case 3:
      return "รับจาก ศพฐ. แล้ว";
    case 4:
      return "ส่งคืนต้นสังกัดแล้ว";
    default:
      return "-";
  }
};

const getStatusStyle = (status: number): string => {
  switch (status) {
    case 0:
      return "bg-amber-50 text-amber-700 border-amber-200";
    case 1:
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case 2:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case 3:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case 4:
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getStatusDot = (status: number): string => {
  switch (status) {
    case 0:
      return "bg-amber-500";
    case 1:
      return "bg-cyan-500";
    case 2:
      return "bg-blue-500";
    case 3:
      return "bg-emerald-500";
    case 4:
      return "bg-rose-500";
    default:
      return "bg-gray-500";
  }
};

const SectionTitle = ({
  icon,
  title,
  subtitle,
  color = "burgundy",
}: {
  icon: string;
  title: string;
  subtitle?: string;
  color?: "burgundy" | "blue" | "green" | "gold";
}) => {
  const colors = {
    burgundy: "bg-rose-50 text-[#800020] ring-rose-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    gold: "bg-amber-50 text-amber-700 ring-amber-100",
  };

  return (
    <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ring-1 ${colors[color]}`}
      >
        {icon}
      </div>

      <div>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
  full = false,
  color = "gray",
}: {
  label: string;
  value: ReactNode;
  full?: boolean;
  color?: "gray" | "burgundy" | "blue" | "green" | "gold";
}) => {
  const colors = {
    gray: "border-gray-100 bg-gray-50",
    burgundy: "border-rose-100 bg-rose-50/60",
    blue: "border-blue-100 bg-blue-50/60",
    green: "border-emerald-100 bg-emerald-50/60",
    gold: "border-amber-100 bg-amber-50/60",
  };

  const displayValue =
    value === null || value === undefined || value === "" ? "-" : value;

  return (
    <div className={full ? "md:col-span-2 lg:col-span-3" : ""}>
      <div
        className={`h-full rounded-xl border px-3.5 py-3 transition hover:shadow-sm ${colors[color]}`}
      >
        <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
        <div className="break-words text-sm font-semibold leading-relaxed text-gray-800">
          {displayValue}
        </div>
      </div>
    </div>
  );
};

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPerson = useCallback(async () => {
    if (!id) {
      setPerson(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await api.get<{ data: Person }>(`/person/${id}`);
      setPerson(res.data.data ?? null);
    } catch (error: unknown) {
      console.error("โหลดรายละเอียดบุคคลไม่สำเร็จ", error);
      setPerson(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchPerson();
  }, [fetchPerson]);

  if (loading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-100 border-t-[#800020]" />
          <p className="text-sm font-medium text-gray-500">
            กำลังโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
          📂
        </div>
        <p className="font-semibold text-gray-700">ไม่พบข้อมูลบุคคล</p>
        <p className="text-sm text-gray-400">
          ไม่พบรายการที่ต้องการ หรือข้อมูลอาจถูกลบแล้ว
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-2 rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650019]"
        >
          ← กลับไปหน้าก่อนหน้า
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-3 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#800020] text-2xl text-white shadow-lg shadow-rose-900/15">
              📄
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                รายละเอียดบุคคล
              </h1>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                ข้อมูลการตรวจสอบประวัติและรายละเอียดใบเสร็จ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-[#800020] hover:bg-rose-50 hover:text-[#800020]"
          >
            <span>←</span>
            กลับ
          </button>
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="h-1.5 bg-gradient-to-r from-[#800020] via-[#a83250] to-[#d4a34f]" />

          <div className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Current Status
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getStatusDot(person.status)}`}
                />

                <span
                  className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-bold ${getStatusStyle(person.status)}`}
                >
                  {getStatus(person.status)}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 sm:min-w-[220px] sm:text-right">
              <p className="text-xs font-medium text-gray-400">
                อัปเดตสถานะล่าสุด
              </p>
              <p className="mt-1 text-sm font-bold text-gray-700">
                {formatThaiDate(person.statusUpdatedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <SectionTitle
              icon="📋"
              title="ข้อมูลการส่งตรวจ"
              subtitle="รายละเอียดการส่งตรวจสอบประวัติ"
              color="burgundy"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Info
                label="วันที่พิมพ์มือ"
                value={formatThaiDate(person.fingerprintDate)}
                color="burgundy"
              />

              <Info
                label="ส่วนราชการ / หน่วยงาน"
                value={person.organizationName}
                color="burgundy"
              />

              <Info
                label="ชื่อ-นามสกุล"
                value={person.fullName}
                color="burgundy"
              />

              <Info
                label="วันเกิด"
                value={formatThaiDate(person.birthDate)}
                color="burgundy"
              />

              <Info
                label="ชื่อ-นามสกุลเจ้าหน้าที่"
                value={person.fullNameWithRank}
                color="burgundy"
              />

              <Info
                label="ตรวจสอบประวัติเพื่อ"
                value={person.purpose}
                color="burgundy"
              />

              <Info
                label="ของส่วนราชการ / หน่วยงาน"
                value={person.requestingAgency}
                color="burgundy"
              />

              <Info
                label="เลขประจำตัวประชาชน"
                value={person.citizenId}
                color="burgundy"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <SectionTitle
              icon="👤"
              title="ข้อมูลส่วนบุคคล"
              subtitle="ข้อมูลทั่วไปและลักษณะบุคคล"
              color="blue"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Info label="ชื่อ-นามสกุล" value={person.fullName} color="blue" />

              <Info label="เกิดวันที่" value={person.birthDay} color="blue" />

              <Info label="เดือน" value={person.birthMonth} color="blue" />

              <Info label="ปี" value={person.birthYear} color="blue" />

              <Info label="เชื้อชาติ" value={person.ethnicity} color="blue" />

              <Info label="สัญชาติ" value={person.nationality} color="blue" />

              <Info
                label="ส่วนสูง"
                value={person.height ? `${person.height} ซม.` : "-"}
                color="blue"
              />

              <Info
                label="น้ำหนัก"
                value={person.weight ? `${person.weight} กก.` : "-"}
                color="blue"
              />

              <Info label="รูปร่าง" value={person.bodyType} color="blue" />

              <Info label="สีผิว" value={person.skinColor} color="blue" />

              <Info
                label="ตำหนิ / พิการ / รอยสัก"
                value={person.distinguishingMarks}
                full
                color="blue"
              />

              <Info
                label="ลักษณะเด่น / พฤติกรรม"
                value={person.behavior}
                full
                color="blue"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <SectionTitle
              icon="🏠"
              title="ข้อมูลที่อยู่และครอบครัว"
              subtitle="ที่อยู่ปัจจุบัน อาชีพ และข้อมูลบุคคลในครอบครัว"
              color="green"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Info
                label="ที่อยู่ปัจจุบัน"
                value={person.address}
                full
                color="green"
              />

              <Info label="อาชีพ" value={person.occupation} color="green" />

              <Info
                label="สถานที่ทำงาน"
                value={person.workplaceAddress}
                full
                color="green"
              />

              <Info
                label="ชื่อตัว ชื่อสกุล บิดา"
                value={person.father}
                color="green"
              />

              <Info
                label="ชื่อตัว ชื่อสกุล มารดา"
                value={person.mother}
                color="green"
              />

              <Info
                label="ชื่อตัว ชื่อสกุล ภรรยา / สามี"
                value={person.spouse}
                color="green"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <SectionTitle
              icon="🧾"
              title="ข้อมูลใบเสร็จ"
              subtitle="รายละเอียดการชำระเงินและหลักฐานใบเสร็จ"
              color="gold"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Info label="เล่มที่" value={person.receiptBookNo} color="gold" />

              <Info label="เลขที่" value={person.receiptNo} color="gold" />

              <Info
                label="ลงวันที่"
                value={formatThaiDate(person.receiptDate)}
                color="gold"
              />

              <Info
                label="จำนวนเงิน"
                value={person.money ? `${person.money} บาท` : "-"}
                color="gold"
              />

              <Info
                label="จำนวนเงินตัวอักษร"
                value={person.moneyText ? `( ${person.moneyText} )` : "-"}
                color="gold"
              />

              <Info
                label="หน่วยเก็บเงิน"
                value={person.organizationName}
                color="gold"
              />
            </div>
          </section>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-xs text-gray-400 sm:flex-row">
          <span>ระบบจัดการข้อมูลตรวจสอบประวัติบุคคล</span>
          <span>Person Detail</span>
        </div>
      </div>
    </div>
  );
}
