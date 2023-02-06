'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const ViewTypeTab = () => {

  let pathname = usePathname();

  return (
    <div className="tabs">
      <Link data-testid="calendarListTab" href="diary/list/calendar" className={"text-sm mr-2 md:mr-5 font-semibold sm:text-lg lg:text-xl tab tab-bordered hover:text-red-400" + (pathname == "/diary/list/calendar" ? " text-zinc-700" : "")}>
          달력으로 모아보기👀
      </Link> 
      <Link data-testid="gridListTab" href="diary/list/grid" className={"text-sm font-semibold sm:text-lg lg:mt-3 xl:text-xl tab tab-bordered hover:text-red-400" + (pathname == "/diary/list/grid" ? " text-zinc-700" : "")}>
          썸네일로 모아보기✨
      </Link> 
    </div>
  );
};
  
export default ViewTypeTab;
  