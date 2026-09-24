import type { ReactNode } from "react";
import { ProfileScrollMotion } from "./ProfileScrollMotion";

const ASSETS = {
  home: {
    src: "/images/linktext/supporting/home.png",
    w: 1200,
    h: 751,
    alt: "LinkText home screen with continue learning, recent articles, and quick review",
  },
  library: {
    src: "/images/linktext/supporting/library.png",
    w: 1200,
    h: 751,
    alt: "Article library with search, filters, and article cards",
  },
  upload: {
    src: "/images/linktext/supporting/upload.png",
    w: 1200,
    h: 750,
    alt: "Upload article screen with file, paste, and URL methods",
  },
} as const;

const ROW_ONE = [
  {
    title: "01 - Home",
    kicker: "A simple entry point back into learning.",
    statement:
      "The Home experience connects users back to their most recent reading and review activities, reducing the friction of deciding what to do next.",
    bullets: [
      "Resume Reading: Continue from the last reading session.",
      "Review Knowledge: Revisit accumulated vocabulary and grammar.",
      "Recent reading: Pick up where you left off with the latest article.",
      "Knowledge overview: Keep vocabulary and grammar progress visible.",
    ],
    shot: "home",
    statementMin: "lg:min-h-[84px]",
  },
  {
    title: "02 - Article Library",
    kicker: "A structured home for reading content.",
    statement:
      "The Article Library gives users a dedicated place to browse existing content, revisit previous articles, and add new material to their learning environment.",
    bullets: [
      "Browse: Revisit saved reading sources.",
      "Search / Filter: Find content with focused controls.",
      "Upload: Add material to the library.",
      "Library content: Browse available articles and uploaded sources.",
    ],
    shot: "library",
    statementMin: "lg:min-h-[84px]",
  },
] as const;

const ROW_TWO = [
  {
    title: "03 - Upload",
    kicker: "Turning new content into a learning source.",
    statement:
      "Users can introduce new reading material into LinkText and transform it into an interactive learning experience.",
    bullets: [
      "Add Content: Bring in a new reading source.",
      "Process: Prepare content for learning.",
      "Start Reading: Move directly into the core flow.",
      "Upload content: Review uploaded material before it becomes available.",
    ],
    shot: "upload",
    statementMin: "lg:min-h-[72px]",
  },
  {
    title: "04 - Profile",
    kicker: "A lightweight space for personal settings.",
    statement:
      "Profile brings account information and personal settings into the same design language as the rest of the product.",
    bullets: [
      "Account: Personal learning settings.",
      "Preferences: Language, credits, and learning defaults.",
      "Profile content: Keep account and credit information visible.",
    ],
    shot: "profile" as const,
    statementMin: "lg:min-h-[72px]",
    padBullets: true,
  },
] as const;

function Divider() {
  return <div className="h-px w-full bg-[#eaeaed]" />;
}

function QuoteRule({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-l-4 border-[var(--lt-ink)] py-2 pl-6">
      <p className="text-lg font-medium leading-6 text-[#5c6378]">{children}</p>
    </div>
  );
}

function Statement({
  children,
  minClassName,
}: {
  children: ReactNode;
  minClassName: string;
}) {
  return (
    <div
      className={`flex w-full items-start border-l-4 border-[var(--lt-ink)] px-6 py-3 ${minClassName}`}
    >
      <p className="text-base font-medium leading-6 text-[#5c6378]">{children}</p>
    </div>
  );
}

function ProductShot({ name }: { name: keyof typeof ASSETS | "profile" }) {
  if (name === "profile") {
    return <ProfileScrollMotion />;
  }
  const { src, w, h, alt } = ASSETS[name];
  return (
    <div className="relative aspect-[588/368] w-full overflow-hidden border border-[#e5e5e5] bg-[var(--lt-neutral-50)]">
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}

function ExperienceCard({
  title,
  kicker,
  statement,
  bullets,
  shot,
  statementMin,
  padBullets = false,
}: {
  title: string;
  kicker: string;
  statement: string;
  bullets: readonly string[];
  shot: keyof typeof ASSETS | "profile";
  statementMin: string;
  padBullets?: boolean;
}) {
  return (
    <article className="flex min-w-0 flex-col gap-3">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl leading-none font-extrabold text-[var(--lt-ink)]">
          {title}
        </h2>
        <p className="text-[15px] leading-[22px] text-[#333]">{kicker}</p>
      </header>
      <Statement minClassName={statementMin}>{statement}</Statement>
      <ul className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-700)]">
        {bullets.map((item) => (
          <li key={item}>• {item}</li>
        ))}
        {padBullets ? (
          <li className="invisible hidden lg:block" aria-hidden>
            •
          </li>
        ) : null}
      </ul>
      <ProductShot name={shot} />
    </article>
  );
}

export function SupportingExperiencesPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="supporting-experiences"
      data-toc=""
      data-id="supporting-experiences"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 pt-16 pb-[120px] md:px-10 lg:px-[120px] lg:pt-[120px]">
        <header className="flex flex-col gap-2">
          <p className="text-[72px] leading-none font-black text-[#e6e6e3]">
            06
          </p>
          <h1 className="text-[36px] leading-none font-extrabold text-[var(--lt-ink)]">
            Supporting Experiences
          </h1>
        </header>

        <div className="flex flex-col gap-3">
          <QuoteRule>
            Extending the product experience beyond the core reading and review
            flows.
          </QuoteRule>
          <div className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            <p>
              While Reading and Review define the core learning experience,
              LinkText also needs a set of supporting surfaces to help users
              navigate, manage, and return to their learning content.
            </p>
            <p>
              I extended the same visual language and component system across
              the Home, Article Library, Upload, and Profile experiences,
              creating a more coherent product experience beyond the core flows.
            </p>
          </div>
        </div>

        <Divider />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ROW_ONE.map((item) => (
            <ExperienceCard key={item.title} {...item} />
          ))}
        </div>

        <Divider />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ROW_TWO.map((item) => (
            <ExperienceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
