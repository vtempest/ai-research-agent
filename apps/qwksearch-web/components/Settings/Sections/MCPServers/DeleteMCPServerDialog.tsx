import { Loader2, Trash2 } from 'lucide-react';
import grab from 'grab-url';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MCPServerConfig } from '../../../../lib/config/types';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const DeleteMCPServer = ({
  mcpServer,
  setServers,
}: {
  mcpServer: MCPServerConfig;
  setServers: React.Dispatch<React.SetStateAction<MCPServerConfig[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await grab(`agent/mcpservers/${mcpServer.id}`, {
        method: 'DELETE',
      });

      setServers((prev) => {
        return prev.filter((s) => s.id !== mcpServer.id);
      });

      toast.success('MCP server deleted successfully.');
    } catch (error) {
      console.error('Error deleting MCP server:', error);
      toast.error('Failed to delete MCP server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="group p-1.5 rounded-md hover:bg-light-200 hover:dark:bg-dark-200 transition-colors group"
        title="Delete MCP server"
      >
        <Trash2
          size={14}
          className="text-black/60 dark:text-white/60 group-hover:text-red-500 group-hover:dark:text-red-400"
        />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[600px] max-h-[85vh] flex flex-col border bg-light-primary dark:bg-dark-primary border-light-secondary dark:border-dark-secondary p-0" hideCloseButton>
          <div className="px-6 pt-6 pb-4">
            <DialogTitle className="text-black/90 dark:text-white/90 font-medium">
              Delete MCP server
            </DialogTitle>
          </div>
          <div className="border-t border-light-200 dark:border-dark-200" />
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <p className="text-sm text-black/60 dark:text-white/60">
              Are you sure you want to delete the MCP server &quot;
              {mcpServer.name}&quot;? This action cannot be undone.
            </p>
          </div>
          <div className="px-6 py-6 flex justify-end space-x-2">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-sm border border-light-200 dark:border-dark-200 text-black dark:text-white bg-light-secondary/50 dark:bg-dark-secondary/50 hover:bg-light-secondary hover:dark:bg-dark-secondary hover:border-light-300 hover:dark:border-dark-300 flex flex-row items-center space-x-1 active:scale-95 transition duration-200"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white font-medium disabled:opacity-85 hover:opacity-85 active:scale-95 transition duration-200"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMCPServer;
