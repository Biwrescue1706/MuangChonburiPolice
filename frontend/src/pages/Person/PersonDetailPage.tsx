import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const formatThaiDate = (value: any) => {
  if (!value) return "-";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

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

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

const getStatus = (status: number) => {
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

const getStatusStyle = (status: number) => {
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
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getStatusDot = (status: number) => {
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
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPerson = async () => {
    try {
      const res = await api.get(`/person/${id}`);
      setPerson(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const SectionTitle = ({
    icon,
    title,
  }: {
    icon: string;
    title: string;
  }) => (
    <div className="mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800020] text-sm text-white">
        {icon}
      </div>
      <h2 className="text-base font-bold text-[#800020]">{title}</h2>
    </div>
  );

  const Info = ({
    label,
    value,
    full = false,
  }: {
    label: string;
    value: any;
    full?: boolean;
  }) => (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="rounded-lg bg-gray-50 px-3 py-2">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <div className="mt-0.5 break-words text-sm font-medium text-gray-800">
          {value || "-"}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#800020]" />
          กำลังโหลด...
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex min-h-[250px] items-center justify-center text-gray-500">
        ไม่พบข้อมูล
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-4">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              📄 รายละเอียดบุคคล
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              ข้อมูลการตรวจสอบประวัติและใบเสร็จ
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            ← กลับ
          </button>
        </div>

        {/* Status */}
        <div className="mb-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500">สถานะปัจจุบัน</p>

              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getStatusDot(
                    person.status
                  )}`}
                />

                <span
                  className={`rounded-full border px-3 py-1 text-sm font-semibold ${getStatusStyle(
                    person.status
                  )}`}
                >
                  {getStatus(person.status)}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-500">อัปเดตสถานะล่าสุด</p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {formatThaiDate(person.statusUpdatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">

          {/* ข้อมูลการส่ง */}
          <section className="mb-5">
            <SectionTitle icon="📋" title="ข้อมูลการส่งตรวจ" />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <Info
                label="วันที่พิมพ์มือ"
                value={person.fingerprintDate}
              />

              <Info
                label="ส่วนราชการ/หน่วยงาน"
                value={person.organizationName}
              />

              <Info
                label="ชื่อ-นามสกุล"
                value={person.fullName}
              />

              <Info
                label="วันเกิด"
                value={person.birthDate}
              />

              <Info
                label="ชื่อ-นามสกุล เจ้าหน้าที่"
                value={person.fullNameWithRank}
              />

              <Info
                label="ตรวจสอบประวัติเพื่อ"
                value={person.purpose}
              />

              <Info
                label="ของส่วนราชการ/หน่วยงาน"
                value={person.requestingAgency}
              />

              <Info
                label="เลขประจำตัวประชาชน"
                value={person.citizenId}
              />
            </div>
          </section>

          {/* ข้อมูลส่วนบุคคล */}
          <section className="mb-5">
            <SectionTitle icon="👤" title="ข้อมูลส่วนบุคคล" />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <Info
                label="ชื่อ-นามสกุล"
                value={person.fullName}
              />

              <Info
                label="เกิดวันที่"
                value={person.birthDay}
              />

              <Info
                label="เดือน"
                value={person.birthMonth}
              />

              <Info
                label="ปี"
                value={person.birthYear}
              />

              <Info
                label="เชื้อชาติ"
                value={person.ethnicity}
              />

              <Info
                label="สัญชาติ"
                value={person.nationality}
              />

              <Info
                label="ส่วนสูง"
                value={person.height ? `${person.height} ซม.` : "-"}
              />

              <Info
                label="น้ำหนัก"
                value={person.weight ? `${person.weight} กก.` : "-"}
              />

              <Info
                label="รูปร่าง"
                value={person.bodyType}
              />

              <Info
                label="สีผิว"
                value={person.skinColor}
              />

              <Info
                label="ตำหนิ / พิการ / รอยสัก"
                value={person.distinguishingMarks}
                full
              />

              <Info
                label="ลักษณะเด่น"
                value={person.behavior}
                full
              />
            </div>
          </section>

          {/* ข้อมูลที่อยู่และครอบครัว */}
          <section className="mb-5">
            <SectionTitle icon="🏠" title="ข้อมูลที่อยู่และครอบครัว" />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Info
                label="ที่อยู่ปัจจุบัน"
                value={person.address}
                full
              />

              <Info
                label="อาชีพ"
                value={person.occupation}
              />

              <Info
                label="สถานที่ทำงาน"
                value={person.workplaceAddress}
                full
              />

              <Info
                label="ชื่อตัว ชื่อสกุล บิดา"
                value={person.father}
              />

              <Info
                label="ชื่อตัว ชื่อสกุล มารดา"
                value={person.mother}
              />

              <Info
                label="ชื่อตัว ชื่อสกุล ภรรยา/สามี"
                value={person.spouse}
              />
            </div>
          </section>

          {/* ใบเสร็จ */}
          <section>
            <SectionTitle icon="🧾" title="ข้อมูลใบเสร็จ" />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <Info
                label="เล่มที่"
                value={person.receiptBookNo}
              />

              <Info
                label="เลขที่"
                value={person.receiptNo}
              />

              <Info
                label="ลงวันที่"
                value={person.receiptDate}
              />

              <Info
                label="จำนวนเงิน"
                value={person.money ? `${person.money} บาท` : "-"}
              />

              <Info
                label="ตัวอักษร"
                value={
                  person.moneyText
                    ? `( ${person.moneyText} )`
                    : "-"
                }
              />

              <Info
                label="หน่วยเก็บเงิน"
                value={person.organizationName}
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}