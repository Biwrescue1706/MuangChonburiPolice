import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteLoading() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadedPath, setLoadedPath] = useState(location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedPath(location.pathname);
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isNewPath = loadedPath !== location.pathname;

  useEffect(() => {
    if (!isNewPath) return;

    const timer = setTimeout(() => {
      setLoading(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [isNewPath]);

  if (!loading && !isNewPath) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600" />
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            ระบบจัดการข้อมูล
          </h2>
          <p className="mt-1 text-sm text-gray-500">กำลังโหลดหน้า...</p>
        </div>

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
