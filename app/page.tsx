import Link from 'next/link';

export default function Home() {
    
  return (
    <main>
      <div className="fixed w-full drop-shadow-md  top-0 left-0 right-0 h-16 bg-green-600 z-30 transition-all ease duration-150 flex">
        <div className="flex items-center space-x-5 h-full w-full  px-10 sm:px-20 ">
          <Link className="flex items-center" href="/app">
            <span className="text-white inline-block ml-3 font-bold truncate ">Grapholio</span>
          </Link>
          <div className="hidden sm:flex justify-end items-center flex-1">
          <span className="text-white inline-block ml-5 font-bold truncate">How to use  </span>
            <span className="text-white inline-block ml-5 font-bold truncate">who are we </span>
            <span className="text-white inline-block ml-5 font-bold truncate">Support me </span>
          </div>
        </div>
      </div>

    </main>
  )
}


// <div className="fixed w-full drop-shadow-md  top-0 left-0 right-0 h-16 bg-white z-30 transition-all ease duration-150 flex">
//   <div className="flex justify-center items-center space-x-5 h-full max-w-screen-xl mx-auto px-10 sm:px-20">
//     <a className="flex justify-center items-center" href="/">
//       <span className="text-black inline-block ml-3 font-medium truncate">Next.js Conf 2021</span>
//     </a>
//   </div>
// </div>

// <Image
//   className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//   src="/next.svg"
//   alt="Next.js Logo"
//   width={180}
//   height={37}
//   priority
// />



// const manager = new GraphManager();

//       manager.createGraph('graph1', true);
//       const graph = manager.getGraph("graph1");
//       graph?.addVertex("A","RED");
//       graph?.addVertex("B","WHITE");
//       graph?.printGraph()
//       graph?.addEdge("A",'B',2,"GREEN");
//       graph?.printGraph()