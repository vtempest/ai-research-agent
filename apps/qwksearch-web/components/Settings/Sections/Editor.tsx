import React from 'react';
import SettingsField from '../SettingsField';

interface EditorProps {
  fields: any;
  values: any;
}

const Editor = ({ fields, values }: EditorProps) => {
  if (!fields || !values) {
    return (
      <div className="px-6 py-4">
        <p className="text-sm text-black/50 dark:text-white/50">
          No editor settings available.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 flex flex-col space-y-4">
      {Object.keys(fields).map((key) => (
        <SettingsField
          key={key}
          field={fields[key]}
          value={values[key]}
          dataAdd="editor"
        />
      ))}
    </div>
  );
};

export default Editor;
