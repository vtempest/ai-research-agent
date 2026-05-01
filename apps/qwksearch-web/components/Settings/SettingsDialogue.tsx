import {
  ArrowLeft,
  BrainCog,
  ChevronLeft,
  Search,
  Server,
  Sliders,
  ToggleRight,
  FileEdit,
  Database,
  MessageSquareText,
  UserCircle,
} from 'lucide-react';
import Preferences from './Sections/Preferences';
import Account from './Sections/Account';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import grab from 'grab-url';
import { toast } from 'sonner';
import Loader from '../ui/Loader';
import { cn } from '../../lib/utils';
import Models from './Sections/Models/Section';
import MCPServers from './Sections/MCPServers/Section';
import SearchSection from './Sections/Search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Personalization from './Sections/Personalization';
import Storage from './Sections/Storage';
import RewritePrompts from './Sections/RewritePrompts';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

const sections = [
  {
    key: 'account',
    name: 'Account',
    description: 'Manage your profile, password, and linked accounts.',
    icon: UserCircle,
    component: Account,
    dataAdd: 'account',
  },
  {
    key: 'preferences',
    name: 'Preferences',
    description: 'Customize your application preferences.',
    icon: Sliders,
    component: Preferences,
    dataAdd: 'preferences',
  },
  {
    key: 'personalization',
    name: 'Personalization',
    description: 'Customize the behavior and tone of the model.',
    icon: ToggleRight,
    component: Personalization,
    dataAdd: 'personalization',
  },
  {
    key: 'models',
    name: 'Models',
    description: 'Connect to AI services and manage connections.',
    icon: BrainCog,
    component: Models,
    dataAdd: 'modelProviders',
  },
  {
    key: 'mcpservers',
    name: 'MCP Servers',
    description: 'Configure Model Context Protocol servers.',
    icon: Server,
    component: MCPServers,
    dataAdd: 'mcpServers',
  },
  {
    key: 'search',
    name: 'Search',
    description: 'Manage search settings.',
    icon: Search,
    component: SearchSection,
    dataAdd: 'search',
  },
  {
    key: 'storage',
    name: 'Storage',
    description: 'Manage data storage, caching, and editor settings.',
    icon: Database,
    component: Storage,
    dataAdd: 'storage',
  },
  {
    key: 'rewritePrompts',
    name: 'Rewrite Prompts',
    description: 'Configure AI rewriting prompts and templates.',
    icon: MessageSquareText,
    component: RewritePrompts,
    dataAdd: 'rewritePrompts',
  },
];

const SettingsDialogue = ({
  isOpen,
  setIsOpen,
  initialSection,
}: {
  isOpen: boolean;
  setIsOpen: (active: boolean) => void;
  initialSection?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);
  const initialKey = sections.find((s) => s.key === initialSection)?.key ?? sections[0].key;
  const [activeSection, setActiveSection] = useState<string>(initialKey);
  const [selectedSection, setSelectedSection] = useState(
    sections.find((s) => s.key === initialKey)!,
  );

  useEffect(() => {
    setSelectedSection(sections.find((s) => s.key === activeSection)!);
  }, [activeSection]);

  useEffect(() => {
    if (isOpen) {
      const fetchConfig = async () => {
        try {
          const data = await grab('config');

          setConfig(data);
        } catch (error) {
          console.error('Error fetching config:', error);
          toast.error('Failed to load configuration.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchConfig();
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="space-y-4 border border-light-200 dark:border-dark-200 bg-light-primary dark:bg-dark-primary backdrop-blur-lg rounded-none md:rounded-xl h-screen w-screen md:h-[calc(100vh-7%)] md:w-[calc(100vw-7%)] lg:h-[calc(100vh-20%)] lg:w-[calc(100vw-30%)] max-w-screen md:max-w-[calc(100vw-7%)] lg:max-w-[calc(100vw-30%)] overflow-hidden flex flex-col p-0">
        <VisuallyHidden>
          <DialogTitle>Settings</DialogTitle>
        </VisuallyHidden>
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-1 inset-0 h-full overflow-hidden">
            <div className="hidden lg:flex flex-col w-[240px] border-r border-light-200 dark:border-dark-200 h-full px-3 pt-3 overflow-y-auto">
              <button
                onClick={() => setIsOpen(false)}
                className="group flex flex-row items-center hover:bg-light-200 hover:dark:bg-dark-200 p-2 rounded-lg"
              >
                <ChevronLeft
                  size={18}
                  className="text-black/50 dark:text-white/50 group-hover:text-black/70 group-hover:dark:text-white/70"
                />
                <p className="text-black/50 dark:text-white/50 group-hover:text-black/70 group-hover:dark:text-white/70 text-[14px]">
                  Back
                </p>
              </button>
              <div className="flex flex-col items-start space-y-1 mt-8">
                {sections.map((section) => (
                  <button
                    key={section.dataAdd}
                    className={cn(
                      `flex flex-row items-center space-x-2 px-2 py-1.5 rounded-lg w-full text-sm hover:bg-light-200 hover:dark:bg-dark-200 transition duration-200 active:scale-95`,
                      activeSection === section.key
                        ? 'bg-light-200 dark:bg-dark-200 text-black/90 dark:text-white/90'
                        : ' text-black/70 dark:text-white/70',
                    )}
                    onClick={() => setActiveSection(section.key)}
                  >
                    <section.icon size={17} />
                    <p>{section.name}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col overflow-hidden">
              <div className="flex flex-row lg:hidden w-full justify-between px-[20px] my-4 flex-shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="group flex flex-row items-center hover:bg-light-200 hover:dark:bg-dark-200 rounded-lg mr-[40%]"
                >
                  <ArrowLeft
                    size={18}
                    className="text-black/50 dark:text-white/50 group-hover:text-black/70 group-hover:dark:text-white/70"
                  />
                </button>
                <Select
                  value={activeSection}
                  onValueChange={(value) => setActiveSection(value)}
                >
                  <SelectTrigger className="w-full bg-light-primary dark:bg-dark-primary border-light-200 dark:border-dark-200 text-black dark:text-white">
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent className="bg-light-primary dark:bg-dark-primary border-light-200 dark:border-dark-200">
                    {sections.map((section) => (
                      <SelectItem
                        key={section.key}
                        value={section.key}
                        className="text-black dark:text-white focus:bg-light-200 dark:focus:bg-dark-200"
                      >
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedSection.component && (
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="border-b border-light-200/60 px-6 pb-6 lg:pt-6 dark:border-dark-200/60 flex-shrink-0">
                    <div className="flex flex-col">
                      <h4 className="font-medium text-black dark:text-white text-sm lg:text-sm">
                        {selectedSection.name}
                      </h4>
                      <p className="text-[11px] lg:text-xs text-black/50 dark:text-white/50">
                        {selectedSection.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <selectedSection.component
                      fields={config.fields[selectedSection.dataAdd]}
                      values={config.values[selectedSection.dataAdd]}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialogue;
