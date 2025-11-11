import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Link2 }   from 'lucide-react';
import { title, favicon } from './customize-docs';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-2">
        {/* <Link2 /> */}
        <Image src='/favicon.ico' alt={title} width={24} height={24} />
        {title}
      </span>
    ),
  },
};
