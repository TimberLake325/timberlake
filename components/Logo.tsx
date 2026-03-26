import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ logoHeight = 130, logoWidth = 130, hideText = false, logoType = 'short' }: { logoHeight?: number, logoWidth?: number, hideText?: boolean, logoType?: string }) {
    return (
        <Link href="/" className="flex items-center gap-2 group w-fit
        ">
            <div>
                {
                    logoType === 'short' ? (
                        <Image src="/images/logo-2.png" alt="Logo" width={logoWidth} height={logoHeight} />
                    ) : (
                        <Image src="/images/logo-2.png" alt="Logo" width={logoWidth} height={logoHeight} />
                    )
                }
            </div>
            {!hideText && <div className=" text-2xl lg:text-3xl font-bold tracking-tight text-foreground ml-2">
                {" "}  Timber<span className="text-primary">Lake</span>
                {" "}
                <span className="block sm:inline">Services LLC</span>
            </div>}
        </Link>
    );
}
