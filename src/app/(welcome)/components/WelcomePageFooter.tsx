import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'
import GithubIcon from './GithubIcon';
import InstagramIcon from './InstagramIcon';
import XIcon from './XIcon';
import FacebookIcon from './FacebookIcon';

const WelcomePageFooter = () => {
  return (
    <footer className="w-full bg-black flex flex-col sm:flex-row justify-around text-white p-2">
      <div className="flex items-center mx-2">
        <img src="/app-icon.png" className="w-[80px] h-[80px]" alt="App icon" /> 
        <h2 className="text-3xl font-bold ml-2">Blog App</h2>
      </div>
      <div className="flex justify-around flex-grow w-full max-w-[700px] scale-[0.7] sm:scale-[1]">
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
          <li className="py-2"><Link href={"https://github.com/vigneshwaran-48"} className="flex items-center"><GithubIcon /><p className="ml-2">Github</p></Link></li>
          <li className="py-2"><Link href={""} className="flex items-center"><FontAwesomeIcon icon={faEnvelope} className="w-[20px]" /><p className="ml-2">Mail</p></Link></li>
          <li className="py-2"><Link href={"/stories"} className="flex items-center"><InstagramIcon /> <p className="ml-2">Instagram</p></Link></li>
          <li className="py-2"><Link href={"/dashboard"} className="flex items-center"><XIcon /> <p className="ml-2">Twitter</p></Link></li>
          <li className="py-2"><Link href={"/search"} className="flex items-center"><FacebookIcon /> <p className="ml-2">Facebook</p></Link></li>
        </ul>
        <ul className="p-2">
          <li><h2 className="text-xl underline py-2">Other Projects</h2></li>
          <li className="py-2"><Link href={"https://github.com/vigneshwaran-48/authorization-server"}>Authorization Server</Link></li>
          <li className="py-2"><Link href={"https://github.com/vigneshwaran-48/TaskManager"}>Task Management</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default WelcomePageFooter;
