'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

const modalContentClass =
  'bg-slate-900 border-white/10 text-white max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] sm:max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl shadow-2xl [&>button]:text-slate-400 [&>button:hover]:text-white';

function LegalBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
      {paragraphs.map((p, i) => {
        const isHeading = /^\d+\./.test(p);
        const isFooter = i === paragraphs.length - 1;
        if (isHeading) {
          return (
            <h3 key={i} className="font-semibold text-white pt-2">
              {p}
            </h3>
          );
        }
        return (
          <p key={i} className={isFooter ? 'text-slate-500 pt-2' : undefined}>
            {p}
          </p>
        );
      })}
    </div>
  );
}

export function LegalModals({
  openPrivacy,
  openTerms,
  onClosePrivacy,
  onCloseTerms,
}: {
  openPrivacy: boolean;
  openTerms: boolean;
  onClosePrivacy: () => void;
  onCloseTerms: () => void;
}) {
  const t = useTranslations('legal');
  const privacy = t.raw('privacy') as string[];
  const terms = t.raw('terms') as string[];

  return (
    <>
      <Dialog open={openPrivacy} onOpenChange={(open) => !open && onClosePrivacy()}>
        <DialogContent className={modalContentClass} aria-describedby={undefined}>
          <DialogHeader className="px-4 sm:px-6 pr-12 pt-5 sm:pt-6 pb-4 border-b border-white/10 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-white">
              {t('privacyTitle')}
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1 min-h-0">
            <LegalBody paragraphs={privacy} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openTerms} onOpenChange={(open) => !open && onCloseTerms()}>
        <DialogContent className={modalContentClass} aria-describedby={undefined}>
          <DialogHeader className="px-4 sm:px-6 pr-12 pt-5 sm:pt-6 pb-4 border-b border-white/10 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-white">
              {t('termsTitle')}
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1 min-h-0">
            <LegalBody paragraphs={terms} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
