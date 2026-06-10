import PortalProtectedRoute from "@/components/portal/PortalProtectedRoute.jsx";
import PortalLayout from "@/components/portal/PortalLayout.jsx";

export default function ProtectedPortalLayout({ children }) {
  return (
    <PortalProtectedRoute>
      <PortalLayout>{children}</PortalLayout>
    </PortalProtectedRoute>
  );
}
