import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href='/' className='flex gap-2 flex-center'>
      <Image
        src='/assets/images/logo.svg'
        alt='logo'
        width={30}
        height={30}
        className='object-contain'
      />
      <p className='logo_text'>AI Prompts</p>
    </Link>
  );
};

export default Logo;