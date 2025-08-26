import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

// Lazy load components for code splitting
const HomePage = lazy(() => import("@/react-app/pages/Home"));

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
