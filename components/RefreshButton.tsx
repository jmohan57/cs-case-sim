"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Icons from "./icons";

export default () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => router.refresh())}>
      <Icons.arrowRotate className={pending ? "animate-spin" : ""} />
    </button>
  );
};
