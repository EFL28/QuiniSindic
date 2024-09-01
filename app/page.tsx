import Link from "next/link";
import Sindic from '@/public/quinisindic-noBG.png';
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-light dark:bg-dark dark:text-white">
      {/* <Link href={"/home"}> */}
        <Image src={Sindic} alt="QuiniSindic logo" width={300} height={300} />
      {/* </Link> */}
      <div className="text-2xl font-bold">Bienvenidos a QuiniSindic</div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Link href={"/signup"}>
          <button className="bg-primary hover:bg-primary-hover rounded w-32 py-2 font-semibold text-white">
            Regístrate
          </button>
        </Link>
        <Link href={"/login"}>
          <button className="bg-primary hover:bg-primary-hover rounded w-32 py-2 font-semibold text-white">
            Inicia Sesión
          </button>
        </Link>
      </div>
    </div>
  );
}