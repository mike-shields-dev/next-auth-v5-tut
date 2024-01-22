"use client";

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

export function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => console.log("Sign in with Github")}
        className="w-full"
        size="lg"
        variant="outline"
      >
        <FaGithub className="h-5 w-5"/>
      </Button>
      <Button
        onClick={() => console.log("Sign in with Google")}
        className="w-full"
        size="lg"
        variant="outline"
      >
        <FcGoogle className="h-5 w-5"/>
      </Button>
    </div>
  );
}
