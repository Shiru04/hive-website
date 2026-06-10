import { PortalAuthProvider } from "@/context/PortalAuthContext.jsx";

export default function PortalAuthLayout({ children }) {
  return <PortalAuthProvider>{children}</PortalAuthProvider>;
}
