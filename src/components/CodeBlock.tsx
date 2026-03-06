import React, { useEffect, useState, useRef } from 'react';
import { CodeBlock as TokisCodeBlock } from '@tokis/react';

// Lazy-load highlight.js languages
let hljs: typeof import('highlight.js').default | null = null;

async function getHljs() {
  if (hljs) return hljs;
  const mod = await import('highlight.js/lib/core');
  const jsx = await import('highlight.js/lib/languages/xml');
  const tsx = await import('highlight.js/lib/languages/typescript');
  const bash = await import('highlight.js/lib/languages/bash');
  const css = await import('highlight.js/lib/languages/css');
  const json = await import('highlight.js/lib/languages/json');
  const js = await import('highlight.js/lib/languages/javascript');

  const h = mod.default;
  h.registerLanguage('xml', jsx.default);
  h.registerLanguage('html', jsx.default);
  h.registerLanguage('jsx', jsx.default);
  h.registerLanguage('tsx', tsx.default);
  h.registerLanguage('typescript', tsx.default);
  h.registerLanguage('ts', tsx.default);
  h.registerLanguage('bash', bash.default);
  h.registerLanguage('shell', bash.default);
  h.registerLanguage('css', css.default);
  h.registerLanguage('json', json.default);
  h.registerLanguage('javascript', js.default);
  h.registerLanguage('js', js.default);
  hljs = h;
  return h;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string | undefined>(undefined);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let cancelled = false;

    getHljs().then((h) => {
      if (cancelled || !isMounted.current) return;
      try {
        const result = h.highlight(code.trim(), { language });
        if (!cancelled) setHighlighted(result.value);
      } catch {
        // Fallback for unregistered languages
        const result = h.highlightAuto(code.trim());
        if (!cancelled) setHighlighted(result.value);
      }
    });

    return () => {
      cancelled = true;
      isMounted.current = false;
    };
  }, [code, language]);

  return (
    <TokisCodeBlock
      code={code.trim()}
      language={language}
      filename={filename}
      highlightedHtml={highlighted}
      showLineNumbers={showLineNumbers}
      className={className}
    />
  );
}
