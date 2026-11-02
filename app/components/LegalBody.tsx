export function LegalBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed">
      {paragraphs.map((p, i) => {
        const isHeading = /^\d+\./.test(p);
        const isFooter = i === paragraphs.length - 1;
        if (isHeading) {
          return (
            <h2 key={i} className="!text-lg pt-2 text-text">
              {p}
            </h2>
          );
        }
        return (
          <p key={i} className={isFooter ? 'text-muted pt-2' : undefined}>
            {p}
          </p>
        );
      })}
    </div>
  );
}
