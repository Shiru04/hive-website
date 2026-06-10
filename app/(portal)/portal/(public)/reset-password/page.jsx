import { Suspense } from "react";
import PortalResetPassword from "@/views/portal/PortalResetPassword.jsx";

export default function Page() {
  return (
    <Suspense>
      <PortalResetPassword />
    </Suspense>
  );
}
