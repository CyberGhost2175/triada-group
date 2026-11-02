'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const HEADER_OFFSET = 88;
export const NAV_SECTION_EVENT = 'triada:nav-section';

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  window.dispatchEvent(new CustomEvent(NAV_SECTION_EVENT, { detail: { id } }));
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const t = window.setTimeout(() => scrollToId(hash), 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.includes('#')) return;

      const url = new URL(a.href, window.location.href);
      const id = url.hash.replace('#', '');
      if (!id) return;

      if (normalizePath(url.pathname) !== normalizePath(window.location.pathname)) {
        return;
      }

      if (scrollToId(id)) {
        e.preventDefault();
        e.stopPropagation();
        window.history.pushState(null, '', `${normalizePath(url.pathname)}${url.hash}`);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
