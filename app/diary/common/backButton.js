'use client';

import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link";

export default function BackButton() {
    return (
      <div className="flex w-full m-3 justify-items-start">
          <div>
            <Link href="diary/list/calendar">
                <ChevronLeftIcon className="block w-6 h-6 text-zinc-600"/>
            </Link>
          </div>
      </div>
    )
  }
  