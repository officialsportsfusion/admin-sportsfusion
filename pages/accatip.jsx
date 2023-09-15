import { Freetips } from "@components/FreeTips";
import { Series } from "@components/Series";
import { AuthLayout } from "@components/AuthLayout";
import { FreeAcca } from "@components/AccaTips";


export default function Page() {
  return (
    <main className="min-h-screen text-app-white-500">
      <AuthLayout>
      <FreeAcca/>
      </AuthLayout>
    </main>
  );
}
