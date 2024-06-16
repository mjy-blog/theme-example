import { ExternalLink } from './ExternalLink';

export function Footer() {
  return (
    <div className="bg-slate-400 dark:bg-slate-800 py-16 px-4">
      <div className="mx-auto max-w-[740px] min-w-0 w-full">
        <p>Copyright ©. All Rights Reserved.</p>
        <p>
          {'View source code at GitHub: '}
          <ExternalLink href="https://github.com/mjy-blog/core">
            core
          </ExternalLink>
          {', '}
          <ExternalLink href="https://github.com/mjy-blog/theme-example">
            theme
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}
