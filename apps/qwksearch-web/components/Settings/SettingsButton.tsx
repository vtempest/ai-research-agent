import { Settings } from 'lucide-react';
import { useState } from 'react';
import SettingsDialogue from './SettingsDialogue';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/avatar';
import { useSession } from '@/components/ResearchAgent/hooks/useSession';
import iconConfigure from '@/components/icons/icon-configure.svg';
const SettingsButton = () => {

  const { user, isAuthenticated, isLoading, signIn, signOut } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="p-2.5 rounded-full bg-light-200 text-black/70 dark:bg-dark-200 dark:text-white/70 hover:opacity-70 hover:scale-105 transition duration-200 cursor-pointer active:scale-95"
        onClick={() => setIsOpen(true)}
      >
        <Avatar className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
          <AvatarFallback className="bg-light-200 dark:bg-dark-200 text-black dark:text-white text-xs font-medium">
            <Image
              src={iconConfigure}
              alt='default'
              width={25}
              height={25}
            />
          </AvatarFallback>
        </Avatar>


        {/* <Settings size={19} className="cursor-pointer" /> */}
      </div>
      <AnimatePresence>
        {isOpen && <SettingsDialogue isOpen={isOpen} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
};

export default SettingsButton;
