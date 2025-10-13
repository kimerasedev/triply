import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/assets/icons/logo.svg";

export default function Footer() {
  return (
    <footer className="w-full max-w-screen flex items-center justify-between px-20 py-10 bg-[#ECEFEC] rounded-t-3xl">
      <Link href="/">
        <Image src={logoUrl} alt="logo" width={80} height={10} />
      </Link>
    </footer>
  );
}
