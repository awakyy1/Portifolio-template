import { Link } from "@remix-run/react";
import { LinkedinIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { siteConfig } from "~/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="py-6 text-muted-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <div className="text-sm">
          &copy; {year} {siteConfig.name}.
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={siteConfig.social.github}
            className="relative group inline-block"
          >
            <FaGithub className="h-5 w-5 text-muted-foreground transition-all duration-500 hover:text-custonText" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            to={siteConfig.social.linkedin}
            className="relative group inline-block"
          >
            <LinkedinIcon className="h-5 w-5 text-muted-foreground transition-all duration-500 hover:text-custonText" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
