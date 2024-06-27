"use client";
import Link from 'next/link';
import Image from 'next/image';

const HeaderSection: React.FC = () => {
  return (
    <header className="w-full  h-28 lg:h-16 p-4 lg:p-3 flex justify-between items-end lg:items-center mx-auto  max-w-1088 border-b-1  border-gray-200  lg:mb-5">
      <nav className="w-full flex justify-between items-center">
        <Link href="/">
          <Image src="/leefstylist_logo 1.jpg" className='h-10 w-32' alt="Leefstylist Logo" width={100} height={104} />
        </Link>
        <Link href="/">
          <button className="flex items-center text-center font-inter text-lg font-semibold leading-6 text-gray-900 border border-gray-200 rounded-lg py-2.5 px-6">
            Account
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default HeaderSection;