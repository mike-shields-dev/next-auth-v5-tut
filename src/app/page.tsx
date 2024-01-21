import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

import { LoginButton } from './components/auth/login-button';
import { Button } from './components/ui/button';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"], 
});

export default function Home() {
  return (
    <main
      className="
      flex 
      h-full 
      flex-col
      items-center 
      justify-center 
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
      from-sky-400 to-blue-800"
    >
      <div className="text-center space-y-6">
        <h1 className={cn(
            font.className,
            `text-6xl 
            font-semibold 
            text-white 
            drop-shadow-md` 
          )}
        >
          Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <LoginButton>
          <Button variant="secondary" size="lg" className="capitalize">sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
