"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "./ui/button";

const BackButtonClient = () => {
  const router = useRouter();

  return (
    <Button onClick={router.back} variant="ghost" className="mb-2">
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButtonClient;
