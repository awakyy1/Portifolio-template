import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { DecoderText } from "~/components/decoder-text";
import { motion } from "framer-motion";
import { useLanguage } from "~/lib/language-context";

const tools = [
  {
    lang: "Figma",
    desc: "Para o Design eu uso o Figma, é minha principal ferramenta para design de UI atualmente.",
    descEn: "Figma is my primary tool for interface design and visual prototyping.",
    link: "https://www.figma.com/pt-br/",
  },
  {
    lang: "Visual Studio Code",
    desc: "Meu principal editor de texto",
    descEn: "My primary code editor.",
    link: "https://code.visualstudio.com/",
  },
  {
    lang: "React",
    desc: "Tenho preferencia em utilizar React devido a minha familiaridade com ele.",
    descEn: "I use React to build component-based, responsive interfaces.",
    link: "https://react.dev/",
  },
  {
    lang: "Three.JS",
    desc: "Estive estudando recentemente e gosto muito do visual unico que ela traz para os projetos.",
    descEn: "I use Three.js to explore interactive 3D experiences for the web.",
    link: "https://threejs.org/",
  },
  {
    lang: "TailwindCSS",
    desc: "Adquiri experiencia com o tailwind trabalhando em alguns projetos internos de duas empresas na qual trabalhei e gosto do seu funcionamento",
    descEn: "I have used Tailwind CSS in professional internal projects to build consistent interfaces.",
    link: "https://tailwindcss.com/",
  },
  {
    lang: "Framer Motion",
    desc: "Para as animações no JavaScript eu utilizo o Framer Motion,devido a praticidade de adicionar animações aos projetos",
    descEn: "I use Framer Motion for accessible, maintainable interface animations.",
    link: "https://motion.dev/",
  },
  {
    lang: "ShadCN",
    desc: "Alguns componentes e temas utilizados neste projeto o ShadCN, são componentes projetados para copiar e colar em seus aplicativos, com TailwindCSS.",
    descEn: "This portfolio uses selected shadcn/ui components built with Tailwind CSS.",
    link: "https://ui.shadcn.com/",
  },
  {
    lang: "Daisy",
    desc: "Gosto de utilizar alguns componentes vindo da biblioteca DaisyUI durante minhas tarefas de rotina também.",
    descEn: "I use DaisyUI components when they are a practical fit for a project.",
    link: "https://daisyui.com",
  },
];

const tools2 = [
  {
    lang: "Python",
    desc: "Trabalhei com muitas automações usando python além desenvolvimento de ferramentas internas, bots, scripts.",
    descEn: "I use Python for automation, internal tools, bots, scripts, and backend development.",
    link: "https://www.python.org",
  },
  {
    lang: "Apache Airflow",
    desc: "Utilizei diariamente o airflow para execução de dags com tarefas recorrentes dentro do ciclo de vida da empresa.",
    descEn: "I have used Airflow in daily work to run recurring workflows and data tasks.",
    link: "https://airflow.apache.org",
  },
  {
    lang: "GLPI",
    desc: "Para gestão de projetos, aplicação de metodologias ageis dentro da equipe e gestão de chamados fiz uso do GLPI dentro do ambiente corporativo.",
    descEn: "I have used GLPI in a corporate environment for service requests and team workflows.",
    link: "https://glpi-project.org/pt-br/",
  },
  {
    lang: "Angular",
    desc: "Atuei na manutenção e desenvolvimento de funcionalidades dentro de um ambiente em angular para gestão do negocio.",
    descEn: "I have maintained and developed Angular features for business management systems.",
    link: "https://angular.dev",
  },
  {
    lang: "Meta",
    desc: "Para BI gosto de utilizar a ferramenta open source metabase que permite a criação e gestão de dashboards e relatorios de maneira muito simples e pratica.",
    descEn: "I use Metabase to create and maintain practical business dashboards and reports.",
    link: "https://www.metabase.com",
  },
  {
    lang: "R",
    desc: "Gosto de utilizar R e Rstudio para tarefas envolvendo grandes volumes de dados.",
    descEn: "I use R and RStudio for data analysis and data-intensive tasks.",
    link: "https://www.r-project.org",
  },
];

const system = [
  {
    title: "Desktop",
    titleEn: "Desktop",
    desc: " i5-8500 // RTX3060 - OC",
  },
  {
    title: "Sistema operacional",
    titleEn: "Operating system",
    desc: "Windows / Debian",
  },
  {
    title: "Monitor",
    titleEn: "Monitor",
    desc: "LG 23MP55HQ // Dell P2219H",
  },
  {
    title: "Mouse",
    titleEn: "Mouse",
    desc: "Logitech 203",
  },
  {
    title: "Teclado",
    titleEn: "Keyboard",
    desc: "Custom Mitra White",
  },
  {
    title: "Headset",
    titleEn: "Headset",
    desc: "Samsung buds FE",
  },
];

export default function Uses() {
  const { language } = useLanguage();
  const [designTool] = tools;
  const [backTool] = tools2;
  const devTools = tools.slice(1);
  const stackGroups =
    language === "en"
      ? [
          {
            title: "Backend & APIs",
            skills: ["Python", "Django", "Django REST Framework", "C#", "REST APIs"],
          },
          {
            title: "Frontend",
            skills: ["TypeScript", "JavaScript", "Angular", "React", "Tailwind CSS"],
          },
          {
            title: "Databases & Data",
            skills: ["PostgreSQL", "MariaDB", "SQL", "Airflow", "dbt"],
          },
          {
            title: "Infrastructure & Cloud",
            skills: ["Linux", "Docker", "AWS", "Servers & VPS", "Git"],
          },
          {
            title: "Monitoring & Observability",
            skills: ["Zabbix", "Checkmk", "Prometheus", "Grafana", "Log analysis"],
          },
          {
            title: "Automation & Testing",
            skills: ["Selenium", "Automation scripts", "Bots", "API validation"],
          },
        ]
      : [
          {
            title: "Backend e APIs",
            skills: ["Python", "Django", "Django REST Framework", "C#", "APIs REST"],
          },
          {
            title: "Frontend",
            skills: ["TypeScript", "JavaScript", "Angular", "React", "Tailwind CSS"],
          },
          {
            title: "Bancos de Dados e Dados",
            skills: ["PostgreSQL", "MariaDB", "SQL", "Airflow", "dbt"],
          },
          {
            title: "Infraestrutura e Cloud",
            skills: ["Linux", "Docker", "AWS", "Servidores e VPS", "Git"],
          },
          {
            title: "Monitoramento e Observabilidade",
            skills: ["Zabbix", "Checkmk", "Prometheus", "Grafana", "Análise de logs"],
          },
          {
            title: "Automação e Testes",
            skills: ["Selenium", "Scripts de automação", "Bots", "Validação de APIs"],
          },
        ];

  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden">
      <div>
        <img
          className="fixed left-0 top-0 h-full w-full object-cover opacity-15 dark:opacity-10"
          src="/assets/rei-ayanami-rei.gif"
          width="550"
          height="550"
          alt="raiden mei"
        />
      </div>
      <motion.div
        className="container relative z-10 mb-10 flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="my-6">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            <DecoderText
              text={language === "en" ? "Tools I Use" : "Ferramentas que Uso"}
              delay={500}
            />
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-foreground/75">
            {language === "en"
              ? "A practical overview of the tools and technologies I use for software development, automation, data, and design."
              : "Uma visão prática das ferramentas e tecnologias que utilizo em desenvolvimento, automação, dados e design."}
          </p>
        </div>

        <section className="mb-10" aria-labelledby="core-stack-title">
          <h2
            id="core-stack-title"
            className="text-2xl font-semibold text-foreground"
          >
            {language === "en" ? "Core Technical Stack" : "Stack Técnica Principal"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/70">
            {language === "en"
              ? "Technologies and tools I use across software development, automation, data, and production operations."
              : "Tecnologias e ferramentas que utilizo em desenvolvimento de software, automação, dados e operação de ambientes produtivos."}
          </p>
          <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {stackGroups.map((group) => (
              <div
                key={group.title}
                className="border-l-2 border-foreground/15 pl-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {group.skills.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Design</h1>
          <p className="mt-4 flex flex-wrap items-start gap-y-1 leading-relaxed text-foreground/75">
            <ChevronRight className="shrink-0 text-[#52677a] dark:text-[#a9bfd3]" />{" "}
            <Link to={designTool.link}>
              <span className="group relative mx-1 cursor-pointer font-medium text-[#52677a] dark:text-[#a9bfd3]">
                {designTool.lang}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#52677a] transition-all duration-300 ease-in-out group-hover:w-full dark:bg-[#a9bfd3]" />
              </span>
            </Link>
            {language === "en" ? designTool.descEn : designTool.desc}
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {language === "en" ? "Development" : "Desenvolvimento"}
          </h1>
          {devTools.map((tool, index) => (
            <div key={index} className="my-4">
              <p className="flex flex-wrap items-start gap-y-1 leading-relaxed text-foreground/75">
                <ChevronRight className="mt-1 shrink-0 text-[#52677a] dark:text-[#a9bfd3]" />
                <Link to={tool.link} className="whitespace-nowrap">
                  <span className="group relative mx-1 cursor-pointer font-medium text-[#52677a] dark:text-[#a9bfd3]">
                    {tool.lang}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#52677a] transition-all duration-300 ease-in-out group-hover:w-full dark:bg-[#a9bfd3]" />
                  </span>
                </Link>
                <span className="whitespace-normal">
                  {language === "en" ? tool.descEn : tool.desc}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="my-6">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            <DecoderText
              text={language === "en" ? "Other Technologies" : "Outras Tecnologias"}
              delay={500}
            />
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-foreground/75">
            {language === "en"
              ? "My professional experience also includes automation, data workflows, internal systems, and operational tools."
              : "Minha experiência profissional também inclui automação, fluxos de dados, sistemas internos e ferramentas operacionais."}
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {language === "en" ? "Automation and Data" : "Automação e Dados"}
          </h1>
          {tools2.map((backTool, index) => (
            <div key={index} className="my-4">
              <p className="flex flex-wrap items-start gap-y-1 leading-relaxed text-foreground/75">
                <ChevronRight className="mt-1 shrink-0 text-[#52677a] dark:text-[#a9bfd3]" />
                <Link to={backTool.link} className="whitespace-nowrap">
                  <span className="group relative mx-1 cursor-pointer font-medium text-[#52677a] dark:text-[#a9bfd3]">
                    {backTool.lang}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#52677a] transition-all duration-300 ease-in-out group-hover:w-full dark:bg-[#a9bfd3]" />
                  </span>
                </Link>
                <span className="whitespace-normal">
                  {language === "en" ? backTool.descEn : backTool.desc}
                </span>
              </p>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-semibold ">
          {language === "en" ? "Workstation" : "Sistema"}
        </h1>
        {system.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 border-b py-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <h1 className="font-semibold text-foreground/80">
                {language === "en" ? item.titleEn : item.title}
            </h1>
            <span className="text-foreground/65">{item.desc}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
