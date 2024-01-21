"use client";

import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
    href: string;
    label: string;
}

export default function BackButton({ href, label}: BackButtonProps) {
    return (
        <Button variant="link" className="font-normal w-full">
            <Link href={href}>{label}</Link>
        </Button>
    )
} 