

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

export const Loading = ({ fullScreen = false, text = 'Loading...' }: LoadingProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* The Blazing Spinner */}
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-blazing opacity-20"></div>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-dark-800 border-t-blazing shadow-lg shadow-blazing/20"></div>
      </div>
      
      {/* Text with blinking dots */}
      <p className="animate-pulse text-xs font-bold uppercase tracking-widest text-gray-500 font-display">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return <div className="flex w-full items-center justify-center py-12">{content}</div>;
};