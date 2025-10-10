import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";

export default function Footer() {
  return (
    <footer className="w-full max-w-screen h-18 flex items-center justify-between px-10 py-20 bg-gray-200">
      <Link href="/">
        <Image src={logoUrl} alt="logo" width={80} height={10} />
      </Link>
    </footer>
  );
}
