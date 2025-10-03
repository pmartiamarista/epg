import { type FC } from "react";

import Body from "@/components/typography/body/Body";

const LoadingPage: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border-primary mx-auto mb-4" />
        <Body size="lg" weight="medium" className="text-text-secondary">
          LOADING...
        </Body>
      </div>
    </div>
  );
};

export default LoadingPage;
