"use client";

import { useRouter } from 'next/navigation';
import SettingsContent from '@/components/Settings/SettingsContent';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col bg-light-primary dark:bg-dark-primary overflow-hidden">
      <SettingsContent onClose={() => router.back()} />
    </div>
  );
}
