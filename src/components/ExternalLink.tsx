import { PropsWithChildren } from 'react';

export interface ExternalLinkProps extends PropsWithChildren {
  href: string;
  target?: '_self' | '_blank';
}

export function ExternalLink({ href, target, children }: ExternalLinkProps) {
  return (
    <a
      className="text-blue-800 dark:text-blue-500 underline"
      href={href}
      target={target}
    >
      {children}
    </a>
  );
}
