'use client';

import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function BackButton() {

  const router = useRouter();

  return (
    <div className="flex w-full m-3 justify-items-start">
        <div>
          <button onClick={() => router.back()} data-testid="diaryBackButton">
              <ChevronLeftIcon className="block w-6 h-6 text-zinc-600"/>
          </button>
        </div>
    </div>
  )
}
  