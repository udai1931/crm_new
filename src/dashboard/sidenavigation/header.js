import Image from "next/image";
export default function SidenavHeader() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-center object-scale-down h-20 mb-6 bg-body">
      <Image className="object-scale-down hover:animate-bounce" src="/images/logo.png" height={40} width={40} alt="Pepcoding" />
    </div>
  );
}
