import type { FC } from "react";

import Body from "@/components/typography/body/Body";
import Heading from "@/components/typography/heading/Heading";

const ErrorPage: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-surface-600 to-surface-800">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-4">
          <div className="text-6xl">⚠️</div>
          <Heading as="h1" className="text-content-primary">
            Something went wrong
          </Heading>
        </div>

        <div className="space-y-2">
          <Body size="lg" className="text-content-secondary">
            We're experiencing technical difficulties.
          </Body>
          <Body size="md" className="text-content-tertiary">
            Please try refreshing the page or contact support if the problem
            persists.
          </Body>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-surface-500 hover:bg-surface-400 text-content-primary rounded-lg transition-colors"
          >
            <Body size="md" weight="medium">
              Refresh
            </Body>
          </button>

          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <Body size="md" weight="medium">
              Go Home
            </Body>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
