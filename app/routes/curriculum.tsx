import { Download } from "lucide-react";
import { ClientOnly } from "~/components/client-only";
import Curriculum from "~/components/Curriculum.client";
import { DecoderText } from "~/components/decoder-text";
import { useLanguage } from "~/lib/language-context";
import { siteConfig } from "~/config/site";

export default function curriculum() {
  const { language } = useLanguage();
  const resumePath = siteConfig.resumePath;

  return (
    <div className="flex min-h-[calc(100svh-5rem)] w-full flex-col items-center px-4 pb-10 sm:px-6">
      <h1 className="text-center text-xl font-semibold uppercase tracking-widest text-foreground sm:text-2xl">
        <DecoderText
          text={language === "en" ? "My Résumé" : "Meu Currículo"}
          delay={500}
        />
      </h1>

      <span className="text-center text-gray-400 font-xs">
        {language === "en"
          ? "View or download my current résumé."
          : "Veja ou baixe meu currículo atual."}
      </span>
      <div className="flex w-full max-w-5xl flex-col items-center justify-start gap-4 pt-8 sm:pt-10">
        {resumePath ? (
          <>
            <a
              href={resumePath}
              download={siteConfig.resumeDownloadName}
              className="font-semibold relative overflow-hidden bg-transparent text-custonText px-4 py-1 transition duration-300 group"
            >
              <span className="absolute inset-0 bg-custonText transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
              <span className="flex flex-row relative gap-2 items-center z-10 text-foreground ">
                <Download />{" "}
                {language === "en" ? "Download résumé" : "Baixar currículo"}
              </span>
            </a>
            <div className="w-full overflow-hidden rounded-md">
              <ClientOnly>
                {() => <Curriculum pdfUrl={resumePath} />}
              </ClientOnly>
            </div>
          </>
        ) : (
          <div className="w-full rounded-xl border border-dashed border-foreground/20 bg-card/30 p-8 text-center text-sm leading-relaxed text-muted-foreground">
            {language === "en"
              ? "Add public/resume.pdf and set resumePath in app/config/site.ts to enable this page."
              : "Adicione public/resume.pdf e defina resumePath em app/config/site.ts para ativar esta página."}
          </div>
        )}
      </div>
    </div>
  );
}
