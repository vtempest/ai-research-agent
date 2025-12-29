import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Link2 }   from 'lucide-react';
import { title } from './customize-docs';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-2">
        <Link2 />
        {title}
      </span>
    ),
  },
};
