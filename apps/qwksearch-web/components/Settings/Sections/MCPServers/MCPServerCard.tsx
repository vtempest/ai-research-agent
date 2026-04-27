import { UIConfigField, MCPServerConfig } from '../../../../lib/config/types';
import { AlertCircle, Server } from 'lucide-react';
import grab from 'grab-url';
import { useState } from 'react';
import { toast } from 'sonner';
import UpdateMCPServer from './UpdateMCPServerDialog';
import DeleteMCPServer from './DeleteMCPServerDialog';

const MCPServerCard = ({
  mcpServer,
  setServers,
  fields,
}: {
  mcpServer: MCPServerConfig;
  fields: UIConfigField[];
  setServers: React.Dispatch<React.SetStateAction<MCPServerConfig[]>>;
}) => {
  const [enabled, setEnabled] = useState(mcpServer.enabled);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await grab(`agent/mcpservers/${mcpServer.id}/toggle`, {
        method: 'POST',
        body: { enabled: !enabled },
      });

      setEnabled(!enabled);
      setServers((prev) =>
        prev.map((s) =>
          s.id === mcpServer.id ? { ...s, enabled: !enabled } : s,
        ),
      );

      toast.success(
        `MCP server ${!enabled ? 'enabled' : 'disabled'} successfully.`,
      );
    } catch (error) {
      console.error('Error toggling MCP server:', error);
      toast.error('Failed to toggle MCP server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={mcpServer.id}
      className="border border-light-200 dark:border-dark-200 rounded-lg overflow-hidden bg-light-primary dark:bg-dark-primary"
    >
      <div className="px-5 py-3.5 flex flex-row justify-between w-full items-center border-b border-light-200 dark:border-dark-200 bg-light-secondary/30 dark:bg-dark-secondary/30">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-blue-500/10 dark:bg-blue-500/10">
            <Server size={14} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm lg:text-sm text-black dark:text-white font-medium">
              {mcpServer.name}
            </p>
            <p className="text-[10px] lg:text-[11px] text-black/50 dark:text-white/50">
              {mcpServer.type} • {enabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>
          <UpdateMCPServer
            fields={fields}
            mcpServer={mcpServer}
            setServers={setServers}
          />
          <DeleteMCPServer mcpServer={mcpServer} setServers={setServers} />
        </div>
      </div>
    </div>
  );
};

export default MCPServerCard;
