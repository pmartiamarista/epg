import { currentTimeSelector } from "@/stores/time.selectors";
import { useTimeStore } from "@/stores/timeStore";

/**
 * Hook that provides access to the current time from the time store using date-fns
 *
 * This hook returns the current time as a Date object, which is automatically
 * updated every 30 seconds. It's useful for components that need to react to or
 * display the current time in the EPG, including progress indicators and time markers.
 *
 * @returns {Date} The current time as a Date object
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const currentTime = useCurrentTime();
 *   return <div>{format(currentTime, 'HH:mm')}</div>;
 * };
 * ```
 */

const useCurrentTime = () => {
  const currentTime = useTimeStore(currentTimeSelector);
  return currentTime;
};

export default useCurrentTime;
