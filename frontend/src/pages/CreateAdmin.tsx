import { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function CreateAdmin() {

  const [admins,setAdmins]=useState<any[]>([]);
  const [showModal,setShowModal]=useState(false);
  const [editing,setEditing]=useState<any>(null);

  const [screenWidth,setScreenWidth]=useState(window.innerWidth);

  const [form,setForm]=useState({
    username:"",
    password:"",
    name:"",
    position:""
  });

  const isEdit = !!editing;
  const isTable = screenWidth > 1280;

  /* ================= SCREEN ================= */
  useEffect(()=>{
    const handleResize=()=>{
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize",handleResize);
    return ()=>window.removeEventListener("resize",handleResize);
  },[]);

  /* ================= LOAD ================= */
  const loadAdmins=async()=>{
    const res=await api.get("/admin");
    setAdmins(res.data);
  };

  useEffect(()=>{
    loadAdmins();
  },[]);

  /* ================= CREATE ================= */
  const openCreate=()=>{
    setEditing(null);
    setForm({
      username:"",
      password:"",
      name:"",
      position:""
    });
    setShowModal(true);
  };

  /* ================= EDIT ================= */
  const openEdit=(admin:any)=>{
    setEditing(admin);
    setForm({
      username:admin.username,
      password:"",
      name:admin.name||"",
      position:admin.position||""
    });
    setShowModal(true);
  };

  /* ================= INPUT ================= */
  const handleChange=(e:any)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  /* ================= SAVE ================= */
  const submit=async(e:any)=>{
    e.preventDefault();

    try{

      if(isEdit){
        await api.put(`/admin/${editing.id}`,form);
      }else{
        await api.post("/admin",form);
      }

      Swal.fire({
        icon:"success",
        title:"บันทึกสำเร็จ",
        timer:1200,
        showConfirmButton:false
      });

      setShowModal(false);
      loadAdmins();

    }catch(err:any){
      Swal.fire(
        "ผิดพลาด",
        err.response?.data?.error,
        "error"
      );
    }
  };

  /* ================= DELETE ================= */
  const removeAdmin=async(id:number)=>{

    const confirm=await Swal.fire({
      title:"ลบ Admin ?",
      icon:"warning",
      showCancelButton:true
    });

    if(!confirm.isConfirmed)return;

    await api.delete(`/admin/${id}`);
    Swal.fire("ลบสำเร็จ","","success");
    loadAdmins();
  };

  return(
<div className="container-fluid p-4">

{/* ===== ADD ===== */}
<button
className="btn text-white mb-3"
style={{background:"#800020"}}
onClick={openCreate}
>
➕ เพิ่ม Admin
</button>

<div className="card shadow">
<div className="card-header fw-bold">
ประวัติผู้ดูแลระบบ
</div>

<div className="card-body">

{/* ================= TABLE MODE ================= */}
{isTable && (

<table className="table table-bordered align-middle">

<thead>
<tr>
<th>ID</th>
<th>Username</th>
<th>ชื่อ</th>
<th>ตำแหน่ง</th>
<th width="120">จัดการ</th>
</tr>
</thead>

<tbody>
{admins.map((a,index)=>(
<tr key={a.id}>

<td>{a.id}</td>
<td>{a.username}</td>
<td>{a.name}</td>
<td>{a.position}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>openEdit(a)}
>
<i className="bi bi-pencil-fill"></i>
</button>

{index!==0&&(
<button
className="btn btn-danger btn-sm"
onClick={()=>removeAdmin(a.id)}
>
<i className="bi bi-trash-fill"></i>
</button>
)}

</td>

</tr>
))}
</tbody>

</table>
)}

{/* ================= CARD MODE ================= */}
{!isTable && (

<div className="row">

{admins.map((a,index)=>(
<div
key={a.id}
className="col-6 col-sm-3 col-md-2 mb-3"
>

<div className="card shadow h-100">

<div className="card-body">

<h6 className="fw-bold">
{i‌nputFix(a.username)}
</h6>

<p className="mb-1">
<b>ชื่อ:</b> {a.name}
</p>

<p>
<b>ตำแหน่ง:</b> {a.position}
</p>

<div className="d-flex justify-content-between">

<button
className="btn btn-warning btn-sm"
onClick={()=>openEdit(a)}
>
<i className="bi bi-pencil-fill"></i>
</button>

{index!==0&&(
<button
className="btn btn-danger btn-sm"
onClick={()=>removeAdmin(a.id)}
>
<i className="bi bi-trash-fill"></i>
</button>
)}

</div>

</div>
</div>

</div>
))}

</div>
)}

</div>
</div>

{/* ================= MODAL ================= */}
{showModal&&(
<>
<div className="modal fade show d-block">
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content">

<div
className="modal-header text-white"
style={{background:"#800020"}}
>
<h5>{isEdit?"แก้ไข Admin":"เพิ่ม Admin"}</h5>

<button
className="btn-close btn-close-white"
onClick={()=>setShowModal(false)}
/>
</div>

<form onSubmit={submit}>
<div className="modal-body">

<input
name="username"
className="form-control mb-2"
placeholder="Username"
value={form.username}
onChange={handleChange}
required
/>

{!isEdit&&(
<input
type="password"
name="password"
className="form-control mb-2"
placeholder="Password"
value={form.password}
onChange={handleChange}
required
/>
)}

<input
name="name"
className="form-control mb-2"
placeholder="ชื่อ"
value={form.name}
onChange={handleChange}
/>

<input
name="position"
className="form-control"
placeholder="ตำแหน่ง"
value={form.position}
onChange={handleChange}
/>

</div>

<div className="modal-footer">

<button
type="button"
className="btn btn-secondary"
onClick={()=>setShowModal(false)}
>
ยกเลิก
</button>

<button
className="btn text-white"
style={{background:"#800020"}}
>
บันทึก
</button>

</div>
</form>

</div>
</div>
</div>

<div className="modal-backdrop fade show"></div>
</>
)}

</div>
);
}

/* ป้องกัน username null */
function inputFix(v:any){
  return v || "-";
}