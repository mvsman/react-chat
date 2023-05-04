import { useEffect } from 'react';

/**
 * @param element dom element where scrolling is needed (ref.current)
 * @param dep dependence for update scroll position
 */
export const useScrollToBottom = <T extends HTMLElement, S>(
  element: T,
  dep: S
) => {
  useEffect(() => {
    if (element) {
      element.scrollTo(0, element.scrollHeight);
    }
  }, [element, dep]);
};
