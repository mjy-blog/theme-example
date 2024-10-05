export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Copyright ©. All rights reserved.
        </p>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          <a href="https://github.com/mjy-blog/core">Core</a>
          <a href="https://github.com/mjy-blog/theme-example">Theme</a>
        </nav>
      </div>
    </footer>
  );
}
