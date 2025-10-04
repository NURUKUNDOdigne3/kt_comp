"use client";

import { useEffect } from "react";
import NProgress from "nprogress";

export default function NProgressHandler() {
  useEffect(() => {
    // Start progress on link clicks
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.href;
      const currentUrl = window.location.href;

      // Only show progress for different pages
      if (href !== currentUrl) {
        NProgress.start();
      }
    };

    // Stop progress on popstate (back/forward)
    const handlePopState = () => {
      NProgress.done();
    };

    // Add listeners to all links
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleAnchorClick as EventListener);
    });

    window.addEventListener("popstate", handlePopState);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick as EventListener);
      });
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
