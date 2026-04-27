import React, { useState } from 'react';
import grab from 'grab-url';
import SettingsField from '../SettingsField';
import { cn } from '../../../lib/utils';

interface StorageProps {
  fields: any;
  values: any;
}

type TabType = 'storage' | 'editor';

const Storage = ({ fields, values }: StorageProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('storage');

  // We'll assume config has both storage and editor fields
  // For now, we'll use the fields and values passed in for storage
  // and will fetch editor fields separately when that tab is active
  const [editorConfig, setEditorConfig] = useState<any>(null);

  React.useEffect(() => {
    if (activeTab === 'editor' && !editorConfig) {
      // Fetch editor config when editor tab is selected
      const fetchEditorConfig = async () => {
        try {
          const data = await grab('config');
          setEditorConfig({
            fields: data.fields.editor,
            values: data.values.editor,
          });
        } catch (error) {
          console.error('Error fetching editor config:', error);
        }
      };
      fetchEditorConfig();
    }
  }, [activeTab, editorConfig]);

  if (!fields || !values) {
    return (
      <div className="px-6 py-4">
        <p className="text-sm text-black/50 dark:text-white/50">
          No storage settings available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-2 px-6 pt-4 pb-2 border-b border-light-200 dark:border-dark-200">
        <button
          onClick={() => setActiveTab('storage')}
          className={cn(
            'px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
            activeTab === 'storage'
              ? 'bg-light-secondary dark:bg-dark-secondary text-black dark:text-white font-medium'
              : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
          )}
        >
          Storage
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={cn(
            'px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
            activeTab === 'editor'
              ? 'bg-light-secondary dark:bg-dark-secondary text-black dark:text-white font-medium'
              : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
          )}
        >
          Editor
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-4 flex flex-col space-y-4 overflow-y-auto">
        {activeTab === 'storage' ? (
          <>
            {Object.keys(fields).map((key) => (
              <SettingsField
                key={key}
                field={fields[key]}
                value={values[key]}
                dataAdd="storage"
              />
            ))}
          </>
        ) : (
          <>
            {editorConfig ? (
              Object.keys(editorConfig.fields || {}).map((key) => (
                <SettingsField
                  key={key}
                  field={editorConfig.fields[key]}
                  value={editorConfig.values[key]}
                  dataAdd="editor"
                />
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-black/50 dark:text-white/50">
                  Loading editor settings...
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Storage;
