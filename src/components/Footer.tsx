export function Footer() {
  return (
    <div className="bg-slate-400 dark:bg-slate-800 py-16">
      <div className="mx-auto max-w-[740px] min-w-0 w-full">
        <p>Copyright ©. All Rights Reserved.</p>
        <p>
          {'See source code at GitHub: '}
          <a href="https://github.com/mjy-blog/core">core</a>
          {', '}
          <a href="https://github.com/mjy-blog/theme-example">theme</a>
        </p>
      </div>
    </div>
  );
}
