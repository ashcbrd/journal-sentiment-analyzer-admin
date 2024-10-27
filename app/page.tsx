import BackgroundPattern from "@/components/background-pattern";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/lib/check-auth";
import Link from "next/link";

export default function Home() {
  const isAuthenticated = checkAuth();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-6 h-max z-10">
        <h1 className="text-5xl leading-[60px] text-center font-bold w-[80%] mx-auto text-primary">
          Smart Journal: Leveraging BERT Algorithm for Enhanced Sentiment
          Detection
        </h1>

        <Link href={isAuthenticated ? "/students" : "/auth"}>
          <Button className="px-20 text-xl py-6 rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
      <BackgroundPattern />
    </div>
  );
}
