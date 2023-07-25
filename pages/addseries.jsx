import { Addseriestip} from "@components/Addseriestips";
import { AuthLayout } from "@components/AuthLayout";

export default function Page() {
  return (
    <main className="min-h-screen bg-app-black text-app-white-500">
    <AuthLayout>
    <Addseriestip/>
    </AuthLayout>
    </main>
  );
}
