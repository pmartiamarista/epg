import {
  forwardRef,
  type ImgHTMLAttributes,
  type SyntheticEvent,
  useReducer,
} from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback image URL to show when main image fails to load. Defaults to app logo. */
  fallbackSrc?: string;
}

interface ImageState {
  /** Current image source being displayed */
  currentSrc: string;
  /** Whether the main image has failed to load */
  hasError: boolean;
  /** Whether any image is currently loading */
  isLoading: boolean;
}

type ImageAction =
  | { type: "LOAD_SUCCESS"; src: string }
  | { type: "LOAD_ERROR"; fallbackSrc: string }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "RESET"; originalSrc: string };

const imageReducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case "LOAD_SUCCESS":
      return {
        ...state,
        currentSrc: action.src,
        hasError: false,
        isLoading: false,
      };
    case "LOAD_ERROR":
      return {
        ...state,
        currentSrc: action.fallbackSrc,
        hasError: true,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "RESET":
      return {
        currentSrc: action.originalSrc,
        hasError: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

/**
 * Image Component with Automatic Fallback
 *
 * A robust image component that automatically shows a fallback image
 * when the main image fails to load. Handles network errors, 404s, and
 * other loading failures gracefully.
 *
 * @param props - Image props including src, fallbackSrc, alt, and styling
 * @returns JSX Image element with fallback functionality
 *
 * @example
 * ```tsx
 * // With custom fallback
 * <Image
 *   src="https://example.com/image.jpg"
 *   fallbackSrc="https://fallback.com/placeholder.jpg"
 *   alt="Program thumbnail"
 *   className="w-64 h-48 rounded-lg"
 * />
 *
 * // Using default app logo fallback
 * <Image
 *   src="https://example.com/image.jpg"
 *   alt="Channel logo"
 *   className="w-16 h-16 rounded-full"
 * />
 * ```
 */
const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fallbackSrc, alt, className, onError, ...props }, ref) => {
    // Default to app logo if no fallback provided
    const defaultFallbackSrc = fallbackSrc || "/logo.svg";

    const [state, dispatch] = useReducer(imageReducer, {
      currentSrc: src ?? "",
      hasError: false,
      isLoading: true,
    });

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      if (!state.hasError) {
        dispatch({ type: "LOAD_ERROR", fallbackSrc: defaultFallbackSrc });
      }

      // Call original onError handler if provided
      onError?.(event);
    };

    const handleLoad = () => {
      dispatch({ type: "LOAD_SUCCESS", src: state.currentSrc });
    };

    return (
      <img
        ref={ref}
        src={state.currentSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    );
  }
);

export default Image;
