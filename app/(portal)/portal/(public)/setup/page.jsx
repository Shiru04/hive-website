import { Suspense } from "react";
import PortalSetup from "@/views/portal/PortalSetup.jsx";

export default function Page() {
  return (
    <Suspense>
      <PortalSetup />
    </Suspense>
  );
}
