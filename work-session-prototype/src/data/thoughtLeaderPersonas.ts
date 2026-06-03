export type Persona = {
  screenName: string;
  handle: string;
  status: "online" | "away" | "idle";
  awayMessage?: string;
  section: "musings" | "guest" | "dabbling" | "chat";
  snippet?: string;
};

export const PERSONAS: Persona[] = [
  {
    screenName: "Chief Paradigm Officer",
    handle: "cpo_thoughts_99",
    status: "online",
    section: "musings",
    snippet: "Synergy is a feeling, not a metric.",
  },
  {
    screenName: "DisruptOrDie42",
    handle: "disrupt_or_die",
    status: "away",
    awayMessage: "pivoting to blockchain for napkins",
    section: "musings",
  },
  {
    screenName: "Guest: The Layer Collapse",
    handle: "guest_piece_01",
    status: "online",
    section: "guest",
    snippet: "When UI becomes the product...",
  },
  {
    screenName: "Guest: Tiny Rituals",
    handle: "guest_piece_02",
    status: "idle",
    section: "guest",
  },
  {
    screenName: "Currently: AIM Nostalgia",
    handle: "dabbling_aim",
    status: "online",
    section: "dabbling",
    awayMessage: "currently dabbling in retro UX",
  },
  {
    screenName: "Let's Chat — Product",
    handle: "lets_chat_pm",
    status: "online",
    section: "chat",
    snippet: "Hareem: is guest pieces a folder?",
  },
  {
    screenName: "Roshan (mocked)",
    handle: "roshan_api",
    status: "away",
    awayMessage: "API mocked — do not ship",
    section: "chat",
  },
  {
    screenName: "hareem",
    handle: "xxbballshawty02xx",
    status: "online",
    section: "chat",
    awayMessage: "currently: product & design at squint AI",
  },
];

export const SECTION_LABELS: Record<Persona["section"], string> = {
  musings: "Musings",
  guest: "Guest Pieces",
  dabbling: "Currently Dabbling In",
  chat: "Let's Chat",
};
