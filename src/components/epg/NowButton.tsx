import { type FC, memo } from "react";

interface NowButtonProps {
  onScrollToNow: () => void;
}

const NowButton: FC<NowButtonProps> = ({ onScrollToNow }) => {
  return (
    <button
      onClick={onScrollToNow}
      className="fixed top-4 right-4 z-40 bg-bg-active text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-accent-blue-hover transition-colors duration-200 shadow-lg"
    >
      Now
    </button>
  );
};

export default memo(NowButton);
