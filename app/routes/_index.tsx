import { Link, useLoaderData } from "@remix-run/react";
import { SendHorizontal } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import type { MetaFunction } from "@remix-run/node";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import type { Project, Skill } from "~/types";
import { skillIcons } from "~/consts";
import { getProjects, getSkills } from "~/models";
import ScrollIndicator from "~/components/ScrollIndicator";
import { DecoderText } from "~/components/decoder-text";
import ShapeMorph from "~/components/ShapeMorph.client";
import { ClientOnly } from "~/components/client-only";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Typewriter from "~/components/fancy/typewriter";
import { useLanguage } from "~/lib/language-context";
import { siteConfig } from "~/config/site";

const content = {
  en: {
    greeting: "Hello",
    rolePrefix: "Software Engineer focused on ",
    roles: ["Backend", "Automation", "Production Systems"],
    summary:
      "Software Engineer based in Brazil with professional experience in backend and full-stack development, automation, APIs, databases, data pipelines, monitoring, and production systems.",
    background:
      "I hold a bachelor's degree in Software Engineering and have two years of experience at Northstar Labs, where I currently work as a Software Developer. My work spans software development, automation, databases, infrastructure, observability, and production environments.",
    goals:
      "I am fluent in English, speak native Portuguese, and have Japanese at approximately JLPT N4 level. I am open to software engineering, backend, automation, QA, DevOps, infrastructure, data, and related technology roles.",
    resume: "View my résumé",
    tools: "Explore my tools",
    contact: "Send me a message",
    timeline: "Professional Experience and Education",
    achievementsTitle: "Key Achievements",
    achievementsIntro:
      "Selected outcomes from my current role, focused on reliability, visibility, and operational improvement.",
    projectsTitle: "Selected Projects",
    projectLabel: "Project",
    projectsIntro:
      "A few systems I designed and delivered as part of a broader professional role.",
    projects: [
      {
        title: "Omnichannel GLPI Service Desk Bot",
        company: "Northstar Labs",
        description:
          "Service desk bot integrated with Microsoft Teams and WhatsApp, featuring live GLPI forms, native approvals, proactive status notifications, technician alerts, and image attachments.",
        skills: ["Python", "GLPI API", "Azure Bot Framework", "Adaptive Cards"],
      },
      {
        title: "SharePoint Permissions Manager",
        company: "Northstar Labs",
        description:
          "SPFx Web Part for auditing and managing granular SharePoint Online permissions, custom access levels, and inheritance, supported by a service-oriented architecture and 44 automated tests.",
        skills: ["React", "TypeScript", "SPFx", "PnPjs", "Fluent UI", "TDD"],
      },
      {
        title: "Airflow Observability Hub",
        company: "Northstar Labs",
        description:
          "Unified dashboards consuming the REST APIs of 6 Airflow instances, including diagnosis and correction of an incompatible API authentication backend.",
        skills: ["Apache Airflow", "REST API", "Grafana", "Monitoring"],
      },
      {
        title: "Living Infrastructure Documentation",
        company: "Northstar Labs",
        description:
          "Automation that reads network topology in real time and publishes an interactive SVG diagram to the internal wiki on a scheduled workflow.",
        skills: ["Python", "SVG", "Cron", "Wiki.js", "Network Automation"],
      },
    ],
    events: [
      {
        period: "2021",
        title: "Started Software Engineering degree",
        organization: "State University",
        description:
          "Began my academic foundation in software engineering, systems development, databases, and the software development lifecycle.",
        skills: ["Software Engineering", "Databases", "Web Development"],
      },
      {
        period: "Dec 2023 – Jun 2024",
        title: "Full-stack Developer Intern",
        organization: "Brightside Studio",
        description:
          "Started my professional software journey by contributing to full-stack systems and learning to turn business needs into maintainable features.",
        skills: ["Full-stack Development", "Web Systems", "Problem Solving"],
      },
      {
        period: "Nov 18, 2024 – Present",
        title: "Mid-level Software Developer",
        organization: "Northstar Labs · 2 years at the company · Remote",
        description:
          "Develop and maintain backend and full-stack solutions, APIs, internal platforms, automations, database workflows, and production infrastructure. The projects below are selected highlights from a broader role.",
        skills: [
          "Python",
          "TypeScript",
          "REST APIs",
          "SQL",
          "Docker",
          "Linux",
        ],
      },
      {
        period: "Selected project",
        title: "Observability platform from implementation to operation",
        organization: "Northstar Labs",
        description:
          "Built and maintain an observability platform covering approximately 95 targets across more than 30 machines for 8 clients. Migrated 7.9 GB of historical metrics and 18 dashboards without data loss, created reusable dashboards, and developed custom Python exporters.",
        skills: [
          "Prometheus",
          "Grafana",
          "Alertmanager",
          "Zabbix",
          "Checkmk",
          "Python",
        ],
      },
      {
        period: "Selected project",
        title: "Database reliability and performance",
        organization: "Production databases",
        description:
          "Led the recovery and cutover of a 40 GB MariaDB production cluster with 58 databases and about 2,000 tables. Audited 1,983 tables, recovered 419 business records, corrected replication monitoring, and tuned PostgreSQL workloads.",
        skills: [
          "MariaDB",
          "PostgreSQL",
          "GTID Replication",
          "SQL",
          "Performance Tuning",
          "RCA",
        ],
      },
      {
        period: "Selected projects",
        title: "Automation and internal platforms",
        organization: "Business systems and integrations",
        description:
          "Built a GLPI service desk bot integrated with Microsoft Teams and WhatsApp, developed a SharePoint permissions Web Part with 44 automated tests, and created Airflow observability dashboards across 6 instances.",
        skills: [
          "Python",
          "React",
          "TypeScript",
          "SPFx",
          "Microsoft Graph",
          "Airflow API",
        ],
      },
      {
        period: "Selected projects",
        title: "Infrastructure, networks, and operational automation",
        organization: "Production environments",
        description:
          "Standardized provisioning with Ansible, managed a Tailscale network with more than 30 devices, published internal services with Traefik and TLS, and optimized cAdvisor collection from 185% to 2% CPU usage.",
        skills: [
          "Ansible",
          "Tailscale",
          "Traefik",
          "Docker Compose",
          "Linux",
          "cAdvisor",
        ],
      },
      {
        period: "2026",
        title: "Bachelor's Degree completed",
        organization: "Software Engineering",
        description:
          "Completed my degree and consolidated the academic foundation behind my professional experience in software and production systems.",
        skills: ["Bachelor's Degree", "Software Development"],
      },
    ],
  },
  pt: {
    greeting: "Olá",
    rolePrefix: "Engenheiro de Software com foco em ",
    roles: ["Backend", "Automação", "Sistemas em Produção"],
    summary:
      "Engenheiro de Software no Brasil, com experiência profissional em desenvolvimento backend e full stack, automação, APIs, bancos de dados, pipelines de dados, monitoramento e sistemas em produção.",
    background:
      "Sou formado em Engenharia de Software e tenho dois anos de experiência na Northstar Labs, onde atualmente trabalho como Desenvolvedor de Software. Minha atuação abrange desenvolvimento, automação, bancos de dados, infraestrutura, observabilidade e ambientes de produção.",
    goals:
      "Tenho inglês fluente, português nativo e japonês em nível aproximado JLPT N4. Estou aberto a oportunidades em engenharia de software, backend, automação, QA, DevOps, infraestrutura, dados e áreas relacionadas.",
    resume: "Veja meu currículo",
    tools: "Conheça minhas ferramentas",
    contact: "Envie uma mensagem",
    timeline: "Experiência Profissional e Formação",
    achievementsTitle: "Principais Realizações",
    achievementsIntro:
      "Resultados selecionados da minha atuação atual, com foco em confiabilidade, visibilidade e melhoria operacional.",
    projectsTitle: "Projetos Selecionados",
    projectLabel: "Projeto",
    projectsIntro:
      "Alguns sistemas que projetei e entreguei como parte de uma atuação profissional mais ampla.",
    projects: [
      {
        title: "Bot Omnichannel de Chamados GLPI",
        company: "Northstar Labs",
        description:
          "Bot de atendimento integrado ao Microsoft Teams e WhatsApp, com formulários dinâmicos do GLPI, aprovações nativas, notificações proativas, alertas para técnicos e anexos de imagens.",
        skills: ["Python", "GLPI API", "Azure Bot Framework", "Adaptive Cards"],
      },
      {
        title: "Gerenciador de Permissões do SharePoint",
        company: "Northstar Labs",
        description:
          "Web Part SPFx para auditoria e gestão granular de permissões no SharePoint Online, níveis customizados e herança, com arquitetura orientada a serviços e 44 testes automatizados.",
        skills: ["React", "TypeScript", "SPFx", "PnPjs", "Fluent UI", "TDD"],
      },
      {
        title: "Central de Observabilidade do Airflow",
        company: "Northstar Labs",
        description:
          "Dashboards unificados consumindo as APIs REST de 6 instâncias Airflow, incluindo diagnóstico e correção de um backend de autenticação incompatível.",
        skills: ["Apache Airflow", "API REST", "Grafana", "Monitoramento"],
      },
      {
        title: "Documentação Viva de Infraestrutura",
        company: "Northstar Labs",
        description:
          "Automação que lê a topologia de rede em tempo real e publica um diagrama SVG interativo na wiki interna por meio de uma rotina agendada.",
        skills: ["Python", "SVG", "Cron", "Wiki.js", "Automação de Redes"],
      },
    ],
    events: [
      {
        period: "2021",
        title: "Início da graduação em Engenharia de Software",
        organization: "Universidade Estadual",
        description:
          "Iniciei minha formação acadêmica em engenharia de software, desenvolvimento de sistemas, bancos de dados e ciclo de desenvolvimento.",
        skills: ["Engenharia de Software", "Bancos de Dados", "Desenvolvimento Web"],
      },
      {
        period: "Dez 2023 – Jun 2024",
        title: "Estágio em Desenvolvimento Full Stack",
        organization: "Brightside Studio",
        description:
          "Iniciei minha jornada profissional contribuindo com sistemas full stack e aprendendo a transformar necessidades de negócio em funcionalidades sustentáveis.",
        skills: ["Desenvolvimento Full Stack", "Sistemas Web", "Resolução de Problemas"],
      },
      {
        period: "18 Nov 2024 – Presente",
        title: "Desenvolvedor de Software Pleno",
        organization: "Northstar Labs · 2 anos de empresa · Remoto",
        description:
          "Desenvolvo e mantenho soluções backend e full stack, APIs, plataformas internas, automações, fluxos de bancos de dados e infraestrutura de produção. Os projetos abaixo são destaques selecionados de uma atuação mais ampla.",
        skills: [
          "Python",
          "TypeScript",
          "APIs REST",
          "SQL",
          "Docker",
          "Linux",
        ],
      },
      {
        period: "Projeto selecionado",
        title: "Plataforma de observabilidade da implantação à operação",
        organization: "Northstar Labs",
        description:
          "Construí e mantenho uma plataforma de observabilidade que cobre aproximadamente 95 alvos em mais de 30 máquinas de 8 clientes. Migrei 7,9 GB de métricas históricas e 18 dashboards sem perda de dados, criei painéis reutilizáveis e exporters customizados em Python.",
        skills: [
          "Prometheus",
          "Grafana",
          "Alertmanager",
          "Zabbix",
          "Checkmk",
          "Python",
        ],
      },
      {
        period: "Projeto selecionado",
        title: "Confiabilidade e performance de bancos de dados",
        organization: "Bancos de produção",
        description:
          "Conduzi a recuperação e o cutover de um cluster MariaDB de produção com 40 GB, 58 bancos e cerca de 2.000 tabelas. Auditei 1.983 tabelas, recuperei 419 registros de negócio, corrigi o monitoramento da replicação e realizei tuning de PostgreSQL.",
        skills: [
          "MariaDB",
          "PostgreSQL",
          "Replicação GTID",
          "SQL",
          "Performance Tuning",
          "RCA",
        ],
      },
      {
        period: "Projetos selecionados",
        title: "Automação e plataformas internas",
        organization: "Sistemas de negócio e integrações",
        description:
          "Construí um bot de chamados GLPI integrado ao Microsoft Teams e WhatsApp, desenvolvi uma Web Part de permissões do SharePoint com 44 testes automatizados e criei dashboards de observabilidade para 6 instâncias Airflow.",
        skills: [
          "Python",
          "React",
          "TypeScript",
          "SPFx",
          "Microsoft Graph",
          "Airflow API",
        ],
      },
      {
        period: "Projetos selecionados",
        title: "Infraestrutura, redes e automação operacional",
        organization: "Ambientes de produção",
        description:
          "Padronizei provisionamento com Ansible, administrei uma rede Tailscale com mais de 30 dispositivos, publiquei serviços internos com Traefik e TLS e otimizei a coleta do cAdvisor de 185% para 2% de uso de CPU.",
        skills: [
          "Ansible",
          "Tailscale",
          "Traefik",
          "Docker Compose",
          "Linux",
          "cAdvisor",
        ],
      },
      {
        period: "2026",
        title: "Conclusão do Bacharelado",
        organization: "Engenharia de Software",
        description:
          "Concluí a graduação, consolidando a base acadêmica que sustenta minha experiência profissional em software e sistemas em produção.",
        skills: ["Bacharelado", "Desenvolvimento de Software"],
      },
    ],
  },
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 }
  })
};

type TimelineItemProps = {
  period: string;
  title: string;
  organization: string;
  description: string;
  skills: readonly string[];
  isLeft: boolean;
  index: number;
};

const TimelineItem = ({
  period,
  title,
  organization,
  description,
  skills,
  isLeft,
  index,
}: TimelineItemProps) => {
  const card = (
    <article
      className={`my-3 w-full rounded-xl border border-foreground/10 bg-[hsl(var(--timeline-cards))] p-5 text-foreground shadow-md ${
        isLeft
          ? "md:col-start-1 md:col-end-5 md:ml-auto"
          : "md:col-start-6 md:col-end-10 md:mr-auto"
      } md:my-4`}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">
        {period}
      </p>
      <h3 className="text-lg font-semibold leading-snug">{title}</h3>
      <p className="mt-1 text-sm font-medium text-foreground/75">
        {organization}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
        {description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-foreground/15 bg-background/35 px-2.5 py-1 text-xs font-medium"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <motion.div
      className="flex w-full md:contents"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {isLeft && card}
      <motion.div className="relative hidden md:col-start-5 md:col-end-6 md:mx-auto md:block">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-[hsl(var(--timeline-line))] pointer-events-none"></div> 
        </div>
        <motion.div
          className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[hsl(var(--timelinedots))] shadow"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.3, duration: 0.4 }}
        ></motion.div>
      </motion.div>
      {!isLeft && card}
    </motion.div>
  );
};

const TimelineDot = ({ index }: { index: number }) => (
  <motion.div
    className="relative hidden md:col-start-5 md:col-end-6 md:mx-auto md:block"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: index * 0.3, duration: 0.4 }}
  >
    <div className="w-6 h-6 rounded-full bg-[hsl(var(--timelinedots))] shadow mx-auto"></div>
  </motion.div>
);

export const meta: MetaFunction = () => {
  return [
    { title: `${siteConfig.name} | ${siteConfig.role}` },
    {
      name: "description",
      content: siteConfig.description,
    },
  ];
};

export async function loader() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);
  //teste
  return {
    projects,
    skills,
  };
}

export default function Main() {
  const { projects, skills } = useLoaderData<typeof loader>();
  const { language } = useLanguage();
  const copy = content[language];
  const historyEvents = copy.events.filter(
    (_, index) =>
      index === 0 ||
      index === 1 ||
      index === 2 ||
      index === copy.events.length - 1,
  );
  const achievements = copy.events.filter((_, index) =>
    [3, 4, 6].includes(index),
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll();
  const defaultAnimation = (duration: number) => {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration },
    };
  };

  const textAnimation = defaultAnimation(2);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      <motion.div
        className="progress-bar z-10"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section
            id="home"
            className="flex min-h-[calc(100svh-5rem)] w-full items-center py-8 sm:py-12 md:py-16"
          >
            <div className="container relative flex px-4 sm:px-6 lg:px-8">
              <ClientOnly>{() => <ShapeMorph />}</ClientOnly>

              <div className="relative z-[2] grid w-full grid-cols-1 items-center gap-2 md:grid-cols-2 md:gap-6 lg:gap-12">
                <div className="z-[2] flex flex-col justify-center space-y-4">
                  <motion.div {...textAnimation} className="space-y-2 ">
                    <h1 className="self-start text-2xl text-muted-foreground tracking-widest uppercase">
                      <DecoderText text={siteConfig.name} delay={500} />
                    </h1>
                    <div className="break-words text-3xl font-semibold tracking-tighter text-secondary-foreground sm:text-4xl lg:text-5xl xl:text-6xl/none">
                      <span>{copy.rolePrefix}</span>
                      <Typewriter
                        text={[...copy.roles]}
                        speed={70}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-gray/90 to-rose-300"
                        waitTime={1500}
                        deleteSpeed={40}
                        cursorChar={"_"}
                      />
                    </div>
                  </motion.div>
                </div>

                <div
                  className="h-[280px] w-full sm:h-[360px] md:h-[500px] lg:h-[600px]"
                  aria-hidden="true"
                />
              </div>

              <ScrollIndicator />
            </div>
          </section>

          <section id="about">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="container mx-auto px-4 py-12"
            >
              <h1 className="text-2xl text-foreground tracking-widest uppercase font-semibold">
                <DecoderText text={copy.greeting} delay={500} />
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16"
              >
                <div className="w-full max-w-2xl text-muted-foreground">
                  <div className="gap-4 flex flex-col tracking-wide">
                    <p>
                      {copy.summary}{" "}
                      <Link to={"/curriculum"}>
                        <span className="relative cursor-pointer group text-[#A4BDD5]">
                          {copy.resume}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                        </span>
                      </Link>
                      .
                    </p>
                    <p>
                      {copy.background}{" "}
                      <Link to={"/uses"}>
                        <span className="relative cursor-pointer group text-[#A4BDD5]">
                          {copy.tools}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                        </span>
                      </Link>
                      .
                    </p>
                    <p>{copy.goals}</p>
                    <Link to={"/contact"}>
                      <button
                        type="button"
                        className="font-semibold relative overflow-hidden bg-transparent text-purple-300 px-4 py-1 transition duration-300 group"
                      >
                        <span className="absolute inset-0 bg-custonText transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
                        <span className="flex flex-row relative gap-2 items-center z-10 text-foreground   ">
                          <SendHorizontal />
                          {copy.contact}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="relative w-full max-w-[550px]">
                  <p className="absolute -right-28 top-10 hidden rotate-90 text-7xl font-bold text-[#A4BDD5] xl:block">
                      私は
                  </p>

                  <motion.img
                    className="aspect-square h-auto w-full rounded-lg object-cover"
                    src="https://i.pinimg.com/736x/87/63/36/87633699bb10003f380a0b393dff4192.jpg"
                    alt={siteConfig.name}
                  />
                </div>
              </motion.div>

              <div className="container mx-auto py-12 md:py-16 lg:py-20">
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Carousel
                        plugins={[
                          Autoplay({
                            delay: 1500,
                          }),
                        ]}
                        className="w-full"
                      >
                        <CarouselContent className="-ml-4">
                          {skills.map((s: Skill, index: number) => (
                            <CarouselItem
                              key={index}
                              className="basis-1/4 pl-1 sm:basis-1/6 md:basis-[12.5%] lg:basis-1/12"
                            >
                              <div className="p-1">
                                <span className="text-2xl font-semibold">
                                  {skillIcons[
                                    s.title as keyof typeof skillIcons
                                  ]?.()}
                                </span>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="timeline">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-semibold uppercase tracking-widest text-foreground">
                <DecoderText text={copy.timeline} delay={500} />
              </h2>
              <div className="mx-auto flex w-full max-w-5xl flex-col py-4 md:grid md:grid-cols-9 md:px-2">
                <TimelineDot index={0} />
                {historyEvents.map((event, index) => (
                  <TimelineItem
                    key={`${event.period}-${event.title}`}
                    period={event.period}
                    title={event.title}
                    organization={event.organization}
                    description={event.description}
                    skills={event.skills}
                    isLeft={index % 2 === 0}
                    index={index + 1}
                  />
                ))}
                <TimelineDot index={historyEvents.length + 1} />
              </div>
            </div>
          </section>

          <section id="achievements">
            <motion.div
              className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold uppercase tracking-widest text-foreground">
                {copy.achievementsTitle}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                {copy.achievementsIntro}
              </p>
              <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <article
                    key={achievement.title}
                    className="border-t border-foreground/20 pt-5"
                  >
                    <span className="text-xs font-semibold tracking-[0.18em] text-foreground/45">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                      {achievement.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {achievement.description}
                    </p>
                    <p className="mt-4 text-xs leading-relaxed text-foreground/50">
                      {achievement.skills.join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="projects">
            <motion.div
              className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold uppercase tracking-widest text-foreground">
                {copy.projectsTitle}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                {copy.projectsIntro}
              </p>
              <div className="mt-8 grid gap-x-12 md:grid-cols-2">
                {copy.projects.map((project, index) => (
                  <article
                    key={project.title}
                    className="group border-t border-foreground/20 py-6"
                  >
                    <p className="text-xs font-semibold tracking-[0.18em] text-foreground/45">
                      {copy.projectLabel.toUpperCase()} 0{index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foreground/55">
                      {project.company}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs leading-relaxed text-foreground/50">
                      {project.skills.join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
