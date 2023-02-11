import Link from "next/link";

export default function diary({props}) {

  return (
    <>
      <div className='min-h-screen'>
        <div className="flex justify-center w-full mt-20">
          <Link href="home/landing" className="font-semibold duration-200 border-opacity-0 outline-none sm:text-base text-zinc-50 dark:bg-zinc-600 bg-zinc-400 hover:bg-zinc-500 btn outline-0 border-spacing-0 hover:scale-105">landing 페이지로 이동</Link>
        </div>
      </div>
    </>
  )
}
