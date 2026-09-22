import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Height of the fixed nav, so anchor jumps don't land under it.
const NAV_OFFSET = -72;

/**
 * One Lenis instance for the whole page, driven by GSAP's ticker so smooth
 * scrolling and ScrollTrigger read the same scroll position on the same frame.
 * Skipped entirely for reduced motion: native scrolling and native anchors.
 */
const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ anchors: { offset: NAV_OFFSET } });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Web fonts change line wrapping, which moves every trigger.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;
