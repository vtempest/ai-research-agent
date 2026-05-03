import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import SettingsContent from './SettingsContent';

const SettingsDialogue = ({
  isOpen,
  setIsOpen,
  initialSection,
}: {
  isOpen: boolean;
  setIsOpen: (active: boolean) => void;
  initialSection?: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="space-y-4 border border-light-200 dark:border-dark-200 bg-light-primary dark:bg-dark-primary backdrop-blur-lg rounded-none md:rounded-xl h-screen w-screen md:h-[calc(100vh-7%)] md:w-[calc(100vw-7%)] lg:h-[calc(100vh-20%)] lg:w-[calc(100vw-30%)] max-w-screen md:max-w-[calc(100vw-7%)] lg:max-w-[calc(100vw-30%)] overflow-hidden flex flex-col p-0">
        <VisuallyHidden>
          <DialogTitle>Settings</DialogTitle>
        </VisuallyHidden>
        <SettingsContent onClose={() => setIsOpen(false)} initialSection={initialSection} />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialogue;
