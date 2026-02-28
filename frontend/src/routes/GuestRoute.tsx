import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAuth();

  const text = "กำลังรอการตอบกลับจาก Server ...";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.slice(0, index + 1));
        setIndex((p) => p + 1);

        if (index + 1 === text.length) {
          setTimeout(() => setIsDeleting(true), 600);
        }
      } else {
        setDisplayText(text.slice(0, index - 1));
        setIndex((p) => p - 1);

        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, loading]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center fw-bold">
        {displayText}
      </div>
    );
  }

  // ✅ login แล้ว → ห้ามเข้า login page
  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}