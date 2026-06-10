import NotFound from "@/views/NotFound.jsx";

export const metadata = {
  title: "Page Not Found | Hive Media",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound />;
}
