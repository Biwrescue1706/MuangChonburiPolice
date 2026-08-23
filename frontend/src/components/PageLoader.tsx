import { useEffect, useState } from "react";

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
          </div>

          {/* Logo / Icon */}
          <div className="mt-5 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              ระบบจัดการข้อมูล
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              กำลังโหลดข้อมูล...
            </p>
          </div>

          {/* จุด Loading */}
          <div className="mt-4 flex gap-1.5">
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}