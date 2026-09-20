import angelaPhoto from "@/imports/IMG_4534-1.jpeg";
import img5835 from "@/imports/IMG_5835-1.jpg";
import img1523 from "@/imports/IMG_1523.jpeg";

type Page = "home" | "about";


interface AboutMeProps {
  onNavigate: (page: Page) => void;
}

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/angela-won-72a51b284/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Email",
    href:"mailto: angelawon4@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1rgu2FNMAOFdkI5OAVwkM_7qacy1ltYJY/view?usp=sharing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const galleryPhotos = [
  {
    src: angelaPhoto as unknown as string,
    alt: "Angela Won",
  },
  {
    src: img5835,
    alt: "Pink flowers",
  },
  {
    src: img1523,
    alt: "Watercolor florals",
  },
];

export default function AboutMe({ onNavigate: _ }: AboutMeProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fdf6f1",
        overflowY: "auto",
        overflowX: "hidden",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Content — padded below fixed nav */}
      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "8rem 3rem 6rem",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(3rem, 6vw, 5rem)",
            color: "#3a1f1f",
            margin: "6rem 0 4rem",
            paddingLeft: "1rem",
            lineHeight: 1.1,
          }}
        >
          About Me
        </h1>

        {/* Photo grid — bleeds past the content margins */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.4rem",
            marginBottom: "3.5rem",
            marginLeft: "calc(-50vw + 50% + 6rem)",
            marginRight: "calc(-50vw + 50% + 6rem)",
          }}
        >
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "5 / 4",
                overflow: "hidden",
                border: "1px solid rgba(190,155,155,0.2)",
                borderRadius: "6px",
                background: "#ede4de",
              }}
            >
              <img
                src={photo.src as string}
                alt={photo.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "rgba(180,130,130,0.35)",
            marginBottom: "2rem",
          }}
        />

        {/* Bio */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(1.15rem, 1.4vw, 1.4rem)",
            fontWeight: 400,
            color: "#6b4a4a",
            lineHeight: 1.85,
            maxWidth: "100%",
            margin: "0 0 1.4rem",
          }}
        >
          Hi, I'm Angela! I'm a student at the University of Michigan studying UX Design with a minor in Human-Centered AI. I'm motivated in being able to use my diverse range of creativity to make functional designs, focusing on building systems that improve positive experiences and interactions.
        </p>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(1.15rem, 1.4vw, 1.4rem)",
            fontWeight: 400,
            color: "#6b4a4a",
            lineHeight: 1.85,
            maxWidth: "100%",
            margin: "0 0 4rem",
          }}
        >
          Before I started studying UX Design and AI, I dove into the field of psychology and cognitive science because understanding society and people's behaviors to make decisions got me curious for new concepts and perspectives. Trailing that curiosity led me to combine it with my own ideas, building one concept onto the next and turning my fascinations about people and designs that meet them where they are, shaped by how they actually behave rather than how I assume they will.
        </p>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(1.15rem, 1.4vw, 1.4rem)",
            fontWeight: 400,
            color: "#6b4a4a",
            lineHeight: 1.85,
            maxWidth: "100%",
            margin: "0 0 8rem",
          }}
        >
          While studying UX Design, I am also the Secretary for the Muay Thai at the University of Michigan club where I organize every practice we hold to the collaborative events we host. I manage the safety waivers and protocols, while trying to balance a learning yet easy-going environment. I am also a part of the video and styling team in MA:E Magazine, where we have photoshoots to represent our meaning of fashion woven into the important message of keeping APIDA culture alive and high-spirited.
        </p>

        {/* Links section */}
        <div style={{ marginBottom: "5rem" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)",
              color: "#3a1f1f",
              margin: "0 0 1.6rem",
            }}
          >
            Let's connect
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {links.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.3rem",
                  border: "1px solid rgba(190,155,155,0.35)",
                  borderRadius: "100px",
                  background: "rgba(255,251,249,0.8)",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#7a4f4f",
                  textDecoration: "none",
                  transition:
                    "background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(245,228,228,0.9)";
                  el.style.borderColor = "rgba(190,140,140,0.55)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(255,251,249,0.8)";
                  el.style.borderColor = "rgba(190,155,155,0.35)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Footer flourish */}
        <div
          style={{
            borderTop: "1px solid rgba(190,155,155,0.18)",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "17px",
              color: "#b09090",
            }}
          >
            Hope we meet soon.
          </span>
          <svg
            width="32"
            height="10"
            viewBox="0 0 32 10"
            fill="none"
            style={{ opacity: 0.4 }}
          >
            <path
              d="M1 8 Q8 2 16 5 Q24 8 31 3"
              stroke="#c4908a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
