import Image from "next/image";
import Link from "next/link";

export const BrandLogo = () => {
  return (
    <Link href={"/"}>
      <Image
        height={38}
        width={200}
        src={"/assets/images/mymakan-logo.png"}
        alt="Brand Logo"
      />
    </Link>
  );
};
