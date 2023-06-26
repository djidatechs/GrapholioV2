import Link from "next/link"

export default function AppWrapper ({children}:{children:React.ReactNode}) {
    return (
        <div>
            <Navbar/>
            <div className="mt-[68px] ">
            {children}
            </div>
        </div>
    )
}





function Navbar () {
    return (
        <div className="fixed w-full drop-shadow-md  top-0 left-0 right-0 h-16 bg-green-600 z-30 transition-all ease duration-150 flex">
        <div className="flex items-center space-x-5 h-full w-full px-10 sm:px-20">
          <Link className="flex items-center" href="/app">
            <span className="text-white inline-block ml-3 font-bold truncate">Grapholio</span>
          </Link>
          <div className=" flex justify-end items-center flex-1">
            <span className="text-white inline-block ml-3 font-bold truncate">Library</span>
            <span className="text-white inline-block ml-3 font-bold truncate">Import graph</span>
          </div>
        </div>
      </div>
    )
}