import { motion } from "framer-motion";
import { AiOutlineDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLanguage } from "~/lib/language-context";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex w-full items-center justify-center pb-4 sm:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-sm text-muted-foreground mb-2">
          {language === "en" ? "Scroll to explore" : "Role para explorar"}
        </span>
        <AiOutlineDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </div>
  );
}
