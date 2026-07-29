import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useEffect, useRef, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type CurriculumProps = {
  pdfUrl: string;
};

export default function Curriculum({ pdfUrl }: CurriculumProps) {
  // Polyfill para Promise.withResolvers (se necessário)
  if (typeof Promise.withResolvers === "undefined") {
    if (typeof window !== "undefined") {
      // @ts-expect-error: polyfill
      window.Promise.withResolvers = () => {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return { promise, resolve, reject };
      };
    }
  }

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      setPageWidth(Math.min(container.clientWidth, 850));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div ref={containerRef} className="w-full">
      {pageWidth > 0 && (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex w-full flex-col items-center gap-4"
        >
          {Array.from({ length: numPages ?? 1 }, (_, index) => (
            <Page
              key={`page-${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth}
              className="max-w-full overflow-hidden shadow-md"
            />
          ))}
        </Document>
      )}
    </div>
  );
}
