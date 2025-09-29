import Body from "@/components/typography/body/Body";
import Heading from "@/components/typography/heading/Heading";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-surface-600 to-surface-800">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-4">
          <Heading as="h1" className="text-6xl font-bold text-content-primary">
            404
          </Heading>
          <Heading as="h2" className="text-2xl text-content-primary">
            Page Not Found
          </Heading>
        </div>

        <div className="space-y-2">
          <Body size="lg" className="text-content-secondary">
            The page you're looking for doesn't exist.
          </Body>
          <Body size="md" className="text-content-tertiary">
            It might have been moved, deleted, or you entered the wrong URL.
          </Body>
        </div>

        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
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

export default NotFoundPage;
