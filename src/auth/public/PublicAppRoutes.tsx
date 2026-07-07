import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicLandingPage } from "@/pages/PublicLandingPage";
import { LevelPage } from "@/pages/LevelPage";

function PublicShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export function PublicAppRoutes() {
  return (
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/:level" element={<LevelPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
