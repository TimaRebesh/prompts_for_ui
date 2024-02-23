import Image from "next/image";

interface AvatarProps {
  src?: string | null,
  alt: string,
  onClick?: () => void;
}

export const Avatar = ({
  src,
  alt,
  onClick
}: AvatarProps) => {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <Image
        src={src || `/assets/icons/noavatar.png`}
        alt={alt}
        width={90}
        height={90}
        className='w-full h-full object-cover'
        onClick={() => onClick && onClick()}
      />
    </div>
  );
};
