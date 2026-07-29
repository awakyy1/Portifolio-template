import { useState } from "react";
import { Link } from "@remix-run/react";
import { ModeToggle } from "~/components/mode-toggle";
import { ChevronDown, FileText, Menu, Wrench } from "lucide-react";
import { useLanguage } from "~/lib/language-context";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const menuItems = [
    { name: language === "en" ? "Home" : "Início", href: "/" },
    { name: language === "en" ? "About" : "Sobre", href: "/#about" },
    {
      name: language === "en" ? "Experience" : "Experiência",
      href: "/#timeline",
    },
    { name: language === "en" ? "Contact" : "Contato", href: "/contact" },
  ];
  const aboutItems = [
    {
      name: language === "en" ? "Résumé" : "Currículo",
      href: "/curriculum",
      icon: FileText,
    },
    {
      name: language === "en" ? "Tools" : "Ferramentas",
      href: "/uses",
      icon: Wrench,
    },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-[hsl(var(--background))]/95 backdrop-blur">
      <nav className="container mx-auto flex min-h-20 items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "pt" : "en")}
            className="h-9 min-w-12 rounded-md px-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={
              language === "en"
                ? "Mudar idioma para português"
                : "Switch language to English"
            }
          >
            {language === "en" ? "PT" : "EN"}
          </button>
        </div>

        <ul className="hidden items-center space-x-6 md:flex">
          {menuItems.map((item) => (
            <li key={item.name} className="group relative">
              <Link
                to={item.href}
                className="flex items-center gap-1 py-2"
                aria-haspopup={item.href === "/#about" ? "menu" : undefined}
              >
                <span className="relative cursor-pointer">
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
                {item.href === "/#about" && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                )}
              </Link>

              {item.href === "/#about" && (
                <div className="invisible absolute left-1/2 top-full w-52 origin-top -translate-x-1/2 -translate-y-2 scale-95 pt-3 opacity-0 blur-[2px] transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:blur-0">
                  <div
                    className="relative rounded-xl border border-border/70 bg-background/95 p-2 shadow-xl shadow-black/10 backdrop-blur-md"
                    role="menu"
                  >
                    <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-border/70 bg-background" />
                    {aboutItems.map((aboutItem) => {
                      const Icon = aboutItem.icon;
                      return (
                        <Link
                          key={aboutItem.href}
                          to={aboutItem.href}
                          role="menuitem"
                          className="group/submenu relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-sm text-foreground transition-all duration-200 hover:translate-x-0.5 hover:bg-accent hover:text-custonText focus:bg-accent focus:outline-none"
                        >
                          <Icon className="h-4 w-4 transition-transform duration-200 group-hover/submenu:scale-110" />
                          {aboutItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-custonText focus:outline-none"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">
            {language === "en" ? "Open menu" : "Abrir menu"}
          </span>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border/50 md:hidden">
          <nav className="space-y-1 px-4 py-3 sm:px-6">
            {menuItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block rounded-md px-2 py-3 text-foreground transition-colors hover:bg-accent hover:text-custonText"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.href === "/#about" && (
                  <div className="ml-4 border-l border-border pl-2">
                    {aboutItems.map((aboutItem) => {
                      const Icon = aboutItem.icon;
                      return (
                        <Link
                          key={aboutItem.href}
                          to={aboutItem.href}
                          className="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-custonText"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          {aboutItem.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
