'use client';

import MainPage from './chatbot/page';
import SigninPage from './signin/page';
import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname();
    if (pathname == '/chatbot') {
      return <SigninPage />;
    }

    
  return <SigninPage />;
    
};

export default Page;