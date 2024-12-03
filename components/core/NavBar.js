import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <div className="NavBar">
    <div className="NavContainer">
        <Link href={"/"}>
      <h1 className="text-xl font-bold flex">
        <Image src="/remy.png" width={30} height={30} alt="Logo" />
        Remy
      </h1>
        </Link>
      <Link href={"/profile"}>
      <button className="Button flex items-center">
        <Image src="/profile.png" className="p-1" height={25} width={25} alt="profile"/>
        <span className="hidden sm:inline">Profile</span>
      </button>
      </Link>
    </div>
  </div>
  )
}

export default NavBar