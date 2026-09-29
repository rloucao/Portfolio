import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The page's Lenis instance, or null when scrolling is native.
let lenis = null;

// True while scrollToHash is gliding to a target. Scroll-driven effects that
// change the page's height (project rows opening) hold off meanwhile, so the
// target doesn't move mid-trip.
let jumping = false;
export const isJumping = () => jumping;

// Taking over mid-glide cancels it without its onComplete, so any scroll
// input from the reader ends the jump too.
const endJump = () => {
  jumping = false;
};
const USER_INPUT = ["wheel", "touchstart", "keydown"];

/** Freezes page scrolling (e.g. under the mobile menu), or releases it. */
export const lockScroll = (locked) => {
  document.documentElement.classList.toggle("scroll-locked", locked);
  if (locked) lenis?.stop();
  else lenis?.start();
};

/**
 * Scrolls to an in-page anchor like "#work", smoothly when Lenis is on. If
 * the target still moved on the way, it glides the rest on arrival. Room for
 * the fixed nav comes from each section's scroll-margin-top, which both Lenis
 * and native scrolling honour.
 */
export const scrollToHash = (hash) => {
  const target = document.querySelector(hash);
  if (!target) return;
  history.replaceState(null, "", hash);

  if (!lenis) {
    target.scrollIntoView();
    return;
  }

  jumping = true;
  const go = (retries) =>
    lenis.scrollTo(target, {
      onComplete: () => {
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const off = target.getBoundingClientRect().top - margin;
        // At the very top or bottom the page can't get any closer.
        const atEdge = lenis.scroll <= 0 || lenis.scroll >= lenis.limit - 1;
        if (retries > 0 && !atEdge && Math.abs(off) > 2) go(retries - 1);
        else jumping = false;
      },
    });
  go(2);
};

// Every in-page link goes through scrollToHash. Links that handle their own
// click (the mobile menu) prevent the default, and are left alone here.
const onAnchorClick = (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const link = e.target.closest?.('a[href^="#"]');
  const hash = link?.getAttribute("href");
  if (!hash || hash === "#") return;
  e.preventDefault();
  scrollToHash(hash);
};

/**
 * One Lenis instance for the whole page, driven by GSAP's ticker so smooth
 * scrolling and ScrollTrigger read the same scroll position on the same frame.
 * Skipped entirely for reduced motion: native scrolling and native anchors.
 */
const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis();
    document.addEventListener("click", onAnchorClick);
    USER_INPUT.forEach((type) => window.addEventListener(type, endJump, { passive: true }));
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Web fonts change line wrapping, which moves every trigger.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onAnchorClick);
      USER_INPUT.forEach((type) => window.removeEventListener(type, endJump));
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);
};

export default useSmoothScroll;
