import Link from 'next/link';
import React from 'react'

const WelcomePageFooter = () => {
  return (
    <footer className="w-full bg-black flex justify-around text-white p-2">
      <div className="flex items-center mx-2">
        <img src="/app-icon.png" className="w-[50px] h-[50px]" alt="App icon" /> 
        <h2 className="text-2xl font-bold ml-2">Blog App</h2>
      </div>
      <div className="flex justify-around flex-grow max-w-[700px]">
        <ul className="p-2">
          <li><h2 className="text-xl underline py-2">Quick Links</h2></li>
          <li className="py-2"><Link href={"/feeds"}>Feeds</Link></li>
          <li className="py-2"><Link href={"/organizations"}>Organizations</Link></li>
          <li className="py-2"><Link href={"/stories"}>Stories</Link></li>
          <li className="py-2"><Link href={"/dashboard"}>Dashboard</Link></li>
          <li className="py-2"><Link href={"/search"}>Search</Link></li>
        </ul>
        <ul className="p-2">
          <li><h2 className="text-xl underline py-2">Contacts</h2></li>
          <li className="py-2"><Link href={"/feeds"}>Github</Link></li>
          <li className="py-2"><Link href={"/organizations"}>Gmail</Link></li>
          <li className="py-2"><Link href={"/stories"}>Instagram</Link></li>
          <li className="py-2"><Link href={"/dashboard"}>X</Link></li>
          <li className="py-2"><Link href={"/search"}>Facebook</Link></li>
        </ul>
        <ul className="p-2">
          <li><h2 className="text-xl underline py-2">Other Projects</h2></li>
          <li className="py-2"><Link href={"/feeds"}>Github</Link></li>
          <li className="py-2"><Link href={"/organizations"}>Gmail</Link></li>
          <li className="py-2"><Link href={"/stories"}>Instagram</Link></li>
          <li className="py-2"><Link href={"/dashboard"}>X</Link></li>
          <li className="py-2"><Link href={"/search"}>Facebook</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default WelcomePageFooter;
