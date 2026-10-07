export interface MemoryItem {
  id: string;
  image: string;
  caption: string;
  subcaption?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'auto' | 'none';
  fit?: 'cover' | 'contain';
  position?: string;
  tag?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswerText: string;
  wrongReaction: string;
}

export interface MemoryCard {
  id: number;
  text: string;
  highlight?: boolean;
}

export const BIRTHDAY_DATA = {
  name: "Abinaya",
  nickname: "Abi",
  date: "October 8th",
  year: "2026",
  dateShort: "08.10",
  author: "Mugi",
  authorFullName: "Mugesh",

  hero: {
    titleLine1: "HAPPY",
    titleLine2: "BIRTHDAY",
    titleLine3: "ABINAYA",
    subtitle: "October 8th — a day worth remembering.",
    tagline: "Someone made a little universe for you.",
    cta: "Enter your little universe"
  },

  intro: {
    header: "This isn't just a birthday wish.",
    subhead: "It's a collection of little things that reminded me of you.",
    tags: [
      "Dr. Abinaya — Manipal Hospital.",
      "Family First.",
      "Her Father's Pride.",
      "Coffee.",
      "Ice cream.",
      "Harry.",
      "Your smile & kindness.",
      "And a hundred little things you probably don't even realize people notice."
    ]
  },

  coffee: {
    number: "01",
    title: "COFFEE",
    quote: "If happiness had a smell, I have a feeling it would smell like freshly brewed coffee.",
    text: "And somehow, you make even ordinary things feel a little warmer.",
    interactionText: "One coffee for you",
    badge: "Essential Ritual",
    image: "/images/coffee.jpeg"
  },

  chocolate: {
    number: "02",
    title: "CHOCOLATE",
    line1: "Some things are simply impossible to resist.",
    line2: "Chocolate is definitely one of them.",
    playful: "Priority level 100: chocolate comes first.",
    cards: [
      {
        title: "Dark Chocolate",
        note: "For the sophisticated chocolate lover."
      },
      {
        title: "Milk Chocolate",
        note: "Sweet, comforting, and impossible to refuse."
      },
      {
        title: "Chocolate Cake",
        note: "Because one piece is never enough."
      },
      {
        title: "Chocolate First",
        note: "Birthday rule: eat the chocolate first."
      }
    ]
  },

  doctor: {
    number: "02",
    title: "HEALING & HEART",
    badge: "MANIPAL HOSPITAL • SALEM",
    hospital: "Doctor at Manipal Hospital, Salem",
    ecgQuote: "Every life has ups and downs. If it is a straight line, there is no life in it.",
    philosophy: "A pulse that goes up and down is the very proof of life, growth, and beating heart. You bring that heartbeat of care to every patient and everyone around you.",
    familyText: "Beyond the stethoscope and white coat, what shines brightest is your deep love for your family — and above all, the priceless bond with your father.",
    cards: [
      {
        id: "02.1",
        title: "Healing Hands",
        subtitle: "Dr. Abinaya",
        note: "Doctor at Manipal Hospital, Salem. Caring for lives with grace, empathy, and unmatched dedication."
      },
      {
        id: "02.2",
        title: "Family First",
        subtitle: "Pure Devotion",
        note: "Above every accolade, she loves and protects her family more than anything in this world."
      },
      {
        id: "02.3",
        title: "Father's Pride",
        subtitle: "A Daughter's Hero",
        note: "Holding the deepest respect and immense love for her father — her inspiration, strength, and greatest cheerleader."
      },
      {
        id: "02.4",
        title: "The Rhythm of Life",
        subtitle: "ECG Philosophy",
        note: "Every life has ups and downs. If it's a straight line, there's no life in it. Embrace every peak and valley."
      }
    ]
  },

  iceCream: {
    number: "03",
    title: "ICE CREAM",
    question: "One scoop?",
    answer: "Absolutely not.",
    rule: "Birthday rules: You get as many as you want.",
    image: "/images/icecream.jpeg",
    flavors: [
      { name: "Coffee Crunch", color: "from-amber-900/60 to-amber-950/80" },
      { name: "Dark Chocolate", color: "from-stone-900 to-black" },
      { name: "Classic Vanilla", color: "from-amber-100/20 to-neutral-900" },
      { name: "Wild Strawberry", color: "from-rose-950/50 to-neutral-900" },
      { name: "Cookies & Cream", color: "from-neutral-800 to-neutral-950" },
      { name: "Salted Caramel", color: "from-amber-700/30 to-neutral-900" }
    ],
    footerNote: "Your choice. Unlimited refills unlocked!"
  },

  harry: {
    number: "04",
    title: "HARRY",
    subtitle: "And then there's Harry.",
    text1: "Every good story needs a loyal sidekick.",
    text2: "Yours just happens to have four paws.",
    text3: "I'm pretty sure Harry already knows how special you are.",
    image: "/images/harrys.jpeg"
  },

  thingsINotice: [
    "You're caring.",
    "You're lovable.",
    "You make people feel comfortable.",
    "You have a softness that isn't easy to explain.",
    "You care more than you probably realize.",
    "And somehow, without even trying, you became someone I genuinely enjoy thinking about.",
    "Maybe that's why I wanted to make this."
  ],

  quiz: [
    {
      id: 1,
      question: "Where does Dr. Abinaya practice healing lives?",
      options: ["City Clinic", "Manipal Hospital, Salem", "Apollo Hospital", "General Healthcare"],
      correctIndex: 1,
      correctAnswerText: "Manipal Hospital in Salem",
      wrongReaction: "Hmm... Doctor Abinaya works at Manipal Hospital in Salem!"
    },
    {
      id: 2,
      question: "What is Abinaya's absolute top priority in life?",
      options: ["Her Family & Father", "Endless Shopping", "Social Media", "Staying in bed"],
      correctIndex: 0,
      correctAnswerText: "Her beloved family and father",
      wrongReaction: "Her family and father are her absolute heart!"
    },
    {
      id: 3,
      question: "What's Abinaya's essential everyday drink?",
      options: ["Plain soda", "Freshly brewed coffee", "Iced energy drink", "Lukewarm water"],
      correctIndex: 1,
      correctAnswerText: "Coffee",
      wrongReaction: "Coffee is her ultimate ritual!"
    },
    {
      id: 4,
      question: "Who is Harry?",
      options: ["Her brother", "Her dog", "Her friend", "Her secret bodyguard"],
      correctIndex: 1,
      correctAnswerText: "Her dog",
      wrongReaction: "Harry is her beloved four-pawed companion!"
    }
  ],

  cards: [
    { id: 1, text: "You deserve good days." },
    { id: 2, text: "You deserve people who appreciate you." },
    { id: 3, text: "You deserve reasons to smile." },
    { id: 4, text: "You deserve moments that feel effortless." },
    { id: 5, text: "And today, you deserve all of them.", highlight: true }
  ],

  letter: {
    salutation: "Abinaya,",
    lines: [
      "I don't really know how to write something that perfectly explains what makes you special.",
      "So I won't try.",
      "I'll just say this...",
      "Some people enter your life without making much noise.",
      "And somehow, you end up remembering them more than you expected.",
      "You're one of those people for me.",
      "I hope this birthday gives you a thousand reasons to smile, a hundred moments worth remembering, and at least one really good cup of coffee.",
      "Stay exactly the kind, caring and lovable person you are.",
      "Happy Birthday, Abi."
    ],
    signOff: "— Mugi"
  },

  memories: [
    {
      id: "1",
      image: "/images/abi.jpeg",
      caption: "A moment worth keeping.",
      subcaption: "Soft sunlight & quiet laughter.",
      aspectRatio: "portrait",
      tag: "October Magic"
    },
    {
      id: "2",
      image: "/images/abi1.jpeg",
      caption: "You probably don't know how beautiful this moment was.",
      subcaption: "The effortless grace you always carry.",
      aspectRatio: "landscape",
      tag: "Unfiltered"
    },
    {
      id: "3",
      image: "/images/abi2.jpeg",
      caption: "Some pictures just feel like memories.",
      subcaption: "Warmed by coffee and gentle quiet.",
      aspectRatio: "square",
      tag: "Serenity"
    },
    {
      id: "4",
      image: "/images/abi3.jpeg",
      caption: "That genuine smile that changes the whole room.",
      subcaption: "Caught in the middle of a joke.",
      aspectRatio: "auto",
      fit: "contain",
      position: "center",
      tag: "Joy"
    },
    {
      id: "5",
      image: "/images/abi4.jpeg",
      caption: "A little coffee, a quiet afternoon, perfect harmony.",
      subcaption: "Her favorite comfort hour.",
      aspectRatio: "landscape",
      tag: "Coffee Hour"
    },
    {
      id: "6",
      image: "/images/abi11.jpeg",
      caption: "Harry's favorite human in the world.",
      subcaption: "Paws and endless devotion.",
      aspectRatio: "portrait",
      tag: "With Harry"
    },
    {
      id: "7",
      image: "/images/abi15.jpeg",
      caption: "Soft spoken, deeply caring, unforgettable.",
      subcaption: "A quiet moment of reflection.",
      aspectRatio: "square",
      tag: "Essence"
    },
    {
      id: "8",
      image: "/images/abi9.jpeg",
      caption: "Making ordinary moments feel a little less ordinary.",
      subcaption: "Somewhere between afternoon and sunset.",
      aspectRatio: "auto",
      fit: "contain",
      position: "center",
      tag: "Golden Hour"
    },
    {
      id: "9",
      image: "/images/abi5.jpeg",
      caption: "Healing lives, bringing warmth to every soul.",
      subcaption: "Dr. Abinaya — pure grace and dedication.",
      aspectRatio: "portrait",
      tag: "Healing Heart"
    },
    {
      id: "10",
      image: "/images/abi14.jpeg",
      caption: "A day made specifically to celebrate you.",
      subcaption: "October 8th — forever special.",
      aspectRatio: "square",
      tag: "Celebration"
    },
    {
      id: "11",
      image: "/images/abi10.jpeg",
      caption: "Quiet strength and pure heart.",
      subcaption: "The little things that make you Abi.",
      aspectRatio: "portrait",
      tag: "Pure Grace"
    },
    {
      id: "12",
      image: "/images/abi6.jpeg",
      caption: "A laughter that feels like home.",
      subcaption: "Unfiltered happiness in every frame.",
      aspectRatio: "landscape",
      tag: "Radiance"
    },
    {
      id: "13",
      image: "/images/abi7.jpeg",
      caption: "Her father's pride, her family's anchor.",
      subcaption: "Boundless love and cherished roots.",
      aspectRatio: "square",
      tag: "Family Heart"
    },
    {
      id: "14",
      image: "/images/abi8.jpeg",
      caption: "Simple moments made timeless.",
      subcaption: "A glimpse of everyday magic.",
      aspectRatio: "portrait",
      tag: "Timeless"
    },
    {
      id: "15",
      image: "/images/abi12.jpeg",
      caption: "Wishing you a year as bright as your smile.",
      subcaption: "Happy Birthday Abinaya — 08.10.",
      aspectRatio: "auto",
      fit: "contain",
      position: "center",
      tag: "Birthday Universe"
    }
  ]
};