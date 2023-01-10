'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const ViewTypeTab = () => {

  let pathname = usePathname();

  return (
    <div className="tabs">
        <Link href="/diary/list/grid" className={"mr-2 text-sm font-semibold sm:text-lg lg:mt-3 md:mr-5 xl:text-xl tab tab-bordered hover:text-red-400" + (pathname == "/diary/list/grid" ? " text-zinc-700" : "")}>
            썸네일로 모아보기✨
        </Link> 
        <Link href="/diary/list/calendar" className={"text-sm font-semibold sm:text-lg lg:text-xl tab tab-bordered hover:text-red-400" + (pathname == "/diary/list/calendar" ? " text-zinc-700" : "")}>
            달력으로 모아보기👀
        </Link> 
    </div>
  );
};
  
export default ViewTypeTab;
  