// Bilingual content dictionary. All display copy lives here so the whole
// site can switch language instantly. Replace the placeholder Lao/English
// strings and member names with the real details from detail-team.pdf.

export type Lang = "en" | "lo";

export interface FocusArea {
  icon: string; // lucide icon name key handled in the component
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ShowcaseItem {
  type: "image" | "video";
  src: string;
  title: string;
  link?: string; // external link (e.g. TikTok) for videos
}

export interface ShowcaseGroup {
  key: string;
  label: string; // tab label
  items: ShowcaseItem[];
}

export interface Dictionary {
  nav: {
    about: string;
    focus: string;
    performance: string;
    team: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    tag: string;
    title: string;
    body: string;
    mission: { title: string; text: string };
    vision: { title: string; text: string };
  };
  focus: { tag: string; title: string; subtitle: string; items: FocusArea[] };
  tech: { tag: string; title: string };
  stats: { items: Stat[] };
  performance: {
    tag: string;
    title: string;
    subtitle: string;
    groups: ShowcaseGroup[];
  };
  team: { tag: string; title: string; subtitle: string; members: TeamMember[] };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    socials: string;
  };
  footer: { tagline: string; quickLinks: string; rights: string };
}

// Shared, language-independent data
const TEAM_IMGS = {
  president: "/img/our_team/president.jpeg",
  vice: "/img/our_team/vice-president.jpeg",
  cto: "/img/our_team/cto.jpeg",
  iot: "/img/our_team/lead-iot.jpeg",
  prog: "/img/our_team/lead-programming.jpeg",
  graphic: "/img/our_team/lead-graphic.jpeg",
  media: "/img/our_team/lead-media.jpeg",
};

// Real showcase media (paths + external links are language-independent)
const SHOW = {
  dsSpeaker: "/img/performance/Data-Science/speaker-workshop.jpg",
  dsWorkshop: "/img/performance/Data-Science/workshop.jpg",
  progWeb: "/img/performance/programming/web.png",
  vid1: "/img/performance/medic/video-demo-1.mp4",
  vid2: "/img/performance/medic/video-demo-2.mp4",
  vid3: "/img/performance/medic/video-demo-3.mp4",
  tiktok1: "https://www.tiktok.com/@nuolmaker_cs/video/7660453658022235400",
  tiktok2: "https://www.tiktok.com/@nuolmaker_cs/video/7660459484032126215",
  tiktok3: "https://www.tiktok.com/@nuolmaker_cs/video/7660449584497298695",
};

export const content: Record<Lang, Dictionary> = {
  en: {
    nav: {
      about: "About",
      focus: "What We Do",
      performance: "Performance",
      team: "Team",
      contact: "Contact",
      cta: "Join Us",
    },
    hero: {
      badge: "Faculty of Natural Sciences · NUOL",
      titleLead: "Where students build the",
      titleHighlight: "future of technology",
      subtitle:
        "A student-led club at the National University of Laos exploring IoT, programming, data science, design and media — learning by building real projects together.",
      ctaPrimary: "Join the club",
      ctaSecondary: "Meet the team",
    },
    about: {
      tag: "About us",
      title: "We turn curiosity into creations",
      body:
        "Our club brings together students who love to build. Through workshops, hands-on projects and collaboration across disciplines, we help members grow from first line of code to shipped, working technology.",
      mission: {
        title: "Our mission",
        text: "Empower every member with practical skills in technology, design and teamwork — and the confidence to build things that matter.",
      },
      vision: {
        title: "Our vision",
        text: "To become the most active hub of student innovation at NUOL, where ideas quickly become real, working projects.",
      },
    },
    focus: {
      tag: "What we do",
      title: "Five teams, one community",
      subtitle: "Each member joins a discipline and works on real projects with peers and mentors.",
      items: [
        { icon: "cpu", title: "IoT & Hardware", desc: "Sensors, microcontrollers and connected devices that bridge the physical and digital." },
        { icon: "code", title: "Programming", desc: "Web, mobile and software engineering — from prototypes to polished applications." },
        { icon: "bar-chart", title: "Data Science", desc: "Turning raw data into insight with analytics, visualization and machine learning." },
        { icon: "palette", title: "Graphic Design", desc: "Branding, UI and visual identity that make our projects look as good as they work." },
        { icon: "video", title: "Media", desc: "Photography, video and storytelling that share our work with the world." },
      ],
    },
    tech: {
      tag: "Tech stack",
      title: "Technologies we build with",
    },
    stats: {
      items: [
        { value: 120, suffix: "+", label: "Active members" },
        { value: 30, suffix: "+", label: "Projects built" },
        { value: 25, suffix: "+", label: "Events & workshops" },
        { value: 5, suffix: "", label: "Discipline teams" },
      ],
    },
    performance: {
      tag: "Performance",
      title: "See what our teams create",
      subtitle: "Real workshops, projects and stories — made by our members.",
      groups: [
        {
          key: "data",
          label: "Data Science",
          items: [
            { type: "image", src: SHOW.dsSpeaker, title: "Guest speaker workshop" },
            { type: "image", src: SHOW.dsWorkshop, title: "Hands-on data workshop" },
          ],
        },
        {
          key: "prog",
          label: "Programming",
          items: [
            { type: "image", src: SHOW.progWeb, title: "Club web platform" },
          ],
        },
        {
          key: "media",
          label: "Media",
          items: [
            { type: "video", src: SHOW.vid1, title: "Web Development branch (CW)", link: SHOW.tiktok1 },
            { type: "video", src: SHOW.vid2, title: "Programming branch (CPR)", link: SHOW.tiktok2 },
            { type: "video", src: SHOW.vid3, title: "Computer Science branch", link: SHOW.tiktok3 },
          ],
        },
      ],
    },
    team: {
      tag: "Our team",
      title: "Meet the people behind the club",
      subtitle: "A dedicated leadership team guiding each discipline.",
      members: [
        { name: "President", role: "President & Data Science Lead", img: TEAM_IMGS.president },
        { name: "Vice President", role: "Vice President", img: TEAM_IMGS.vice },
        { name: "CTO", role: "Chief Technology Officer", img: TEAM_IMGS.cto },
        { name: "IoT Lead", role: "IoT & Hardware Lead", img: TEAM_IMGS.iot },
        { name: "Programming Lead", role: "Programming Lead", img: TEAM_IMGS.prog },
        { name: "Graphic Lead", role: "Graphic Design Lead", img: TEAM_IMGS.graphic },
        { name: "Media Lead", role: "Media Lead", img: TEAM_IMGS.media },
      ],
    },
    contact: {
      tag: "Get in touch",
      title: "Ready to build with us?",
      subtitle: "Send us a message and we'll get back to you about joining or collaborating.",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send message",
      socials: "Find us on",
    },
    footer: {
      tagline: "Student technology club — Faculty of Natural Sciences, NUOL.",
      quickLinks: "Quick links",
      rights: "All rights reserved.",
    },
  },

  lo: {
    nav: {
      about: "ກ່ຽວກັບພວກເຮົາ",
      focus: "ສິ່ງທີ່ພວກເຮົາເຮັດ",
      performance: "ຜົນງານ",
      team: "ທີມງານ",
      contact: "ຕິດຕໍ່",
      cta: "ເຂົ້າຮ່ວມ",
    },
    hero: {
      badge: "ຄະນະວິທະຍາສາດທຳມະຊາດ · ມຊ",
      titleLead: "ບ່ອນທີ່ນັກສຶກສາສ້າງ",
      titleHighlight: "ອະນາຄົດຂອງເຕັກໂນໂລຊີ",
      subtitle:
        "ຊົມລົມນັກສຶກສາຢູ່ມະຫາວິທະຍາໄລແຫ່ງຊາດ ຄົ້ນຄວ້າ IoT, ການຂຽນໂປຣແກຣມ, ວິທະຍາສາດຂໍ້ມູນ, ການອອກແບບ ແລະ ສື່ — ຮຽນຮູ້ຜ່ານການສ້າງໂຄງການຈິງຮ່ວມກັນ.",
      ctaPrimary: "ເຂົ້າຮ່ວມຊົມລົມ",
      ctaSecondary: "ຮູ້ຈັກທີມງານ",
    },
    about: {
      tag: "ກ່ຽວກັບພວກເຮົາ",
      title: "ພວກເຮົາປ່ຽນຄວາມຢາກຮູ້ໃຫ້ເປັນຜົນງານ",
      body:
        "ຊົມລົມຂອງພວກເຮົາເຕົ້າໂຮມນັກສຶກສາທີ່ມັກການສ້າງສັນ. ຜ່ານກອງປະຊຸມ, ໂຄງການປະຕິບັດຈິງ ແລະ ການຮ່ວມມືຂ້າມສາຂາ ພວກເຮົາຊ່ວຍໃຫ້ສະມາຊິກເຕີບໃຫຍ່ຈາກແຖວແລກຂອງໂຄ້ດ ຈົນເຖິງເຕັກໂນໂລຊີທີ່ໃຊ້ງານໄດ້ຈິງ.",
      mission: {
        title: "ພາລະກິດ",
        text: "ເສີມສ້າງທຸກສະມາຊິກໃຫ້ມີທັກສະຕົວຈິງດ້ານເຕັກໂນໂລຊີ, ການອອກແບບ ແລະ ການເຮັດວຽກເປັນທີມ ພ້ອມຄວາມໝັ້ນໃຈໃນການສ້າງສິ່ງທີ່ມີຄຸນຄ່າ.",
      },
      vision: {
        title: "ວິໄສທັດ",
        text: "ກາຍເປັນສູນກາງນະວັດຕະກຳຂອງນັກສຶກສາທີ່ຫ້າວຫັນທີ່ສຸດຢູ່ ມຊ ບ່ອນທີ່ແນວຄິດກາຍເປັນໂຄງການຈິງຢ່າງໄວ.",
      },
    },
    focus: {
      tag: "ສິ່ງທີ່ພວກເຮົາເຮັດ",
      title: "ຫ້າທີມ, ໜຶ່ງຊຸມຊົນ",
      subtitle: "ແຕ່ລະສະມາຊິກເຂົ້າຮ່ວມສາຂາໜຶ່ງ ແລະ ເຮັດວຽກໃນໂຄງການຈິງກັບໝູ່ ແລະ ຄູຝຶກ.",
      items: [
        { icon: "cpu", title: "IoT ແລະ ຮາດແວ", desc: "ເຊັນເຊີ, ໄມໂຄຣຄອນໂທຣນເລີ ແລະ ອຸປະກອນເຊື່ອມຕໍ່ ທີ່ເຊື່ອມໂລກຈິງກັບໂລກດິຈິຕອລ." },
        { icon: "code", title: "ການຂຽນໂປຣແກຣມ", desc: "ເວັບ, ມືຖື ແລະ ວິສະວະກຳຊອບແວ — ຈາກຕົ້ນແບບເຖິງແອັບພລິເຄຊັນທີ່ສົມບູນ." },
        { icon: "bar-chart", title: "ວິທະຍາສາດຂໍ້ມູນ", desc: "ປ່ຽນຂໍ້ມູນດິບໃຫ້ເປັນຄວາມເຂົ້າໃຈ ດ້ວຍການວິເຄາະ, ການສະແດງຜົນ ແລະ ການຮຽນຮູ້ຂອງເຄື່ອງຈັກ." },
        { icon: "palette", title: "ອອກແບບກຣາຟິກ", desc: "ແບຣນ, UI ແລະ ອັດຕະລັກ ທີ່ເຮັດໃຫ້ໂຄງການເບິ່ງດີເທົ່າກັບການໃຊ້ງານ." },
        { icon: "video", title: "ສື່", desc: "ການຖ່າຍພາບ, ວິດີໂອ ແລະ ການເລົ່າເລື່ອງ ທີ່ແບ່ງປັນຜົນງານຂອງພວກເຮົາສູ່ໂລກ." },
      ],
    },
    tech: {
      tag: "ເຕັກໂນໂລຊີ",
      title: "ເຕັກໂນໂລຊີທີ່ພວກເຮົາໃຊ້ສ້າງ",
    },
    stats: {
      items: [
        { value: 120, suffix: "+", label: "ສະມາຊິກທີ່ຫ້າວຫັນ" },
        { value: 30, suffix: "+", label: "ໂຄງການທີ່ສ້າງແລ້ວ" },
        { value: 25, suffix: "+", label: "ກິດຈະກຳ ແລະ ກອງປະຊຸມ" },
        { value: 5, suffix: "", label: "ທີມສາຂາ" },
      ],
    },
    performance: {
      tag: "ຜົນງານ",
      title: "ເບິ່ງສິ່ງທີ່ທີມພວກເຮົາສ້າງ",
      subtitle: "ກອງປະຊຸມ, ໂຄງການ ແລະ ເລື່ອງລາວຕົວຈິງ — ສ້າງໂດຍສະມາຊິກຂອງພວກເຮົາ.",
      groups: [
        {
          key: "data",
          label: "ວິທະຍາສາດຂໍ້ມູນ",
          items: [
            { type: "image", src: SHOW.dsSpeaker, title: "ກອງປະຊຸມກັບວິທະຍາກອນຮັບເຊີນ" },
            { type: "image", src: SHOW.dsWorkshop, title: "ກອງປະຊຸມຝຶກປະຕິບັດຂໍ້ມູນ" },
          ],
        },
        {
          key: "prog",
          label: "ການຂຽນໂປຣແກຣມ",
          items: [
            { type: "image", src: SHOW.progWeb, title: "ເວັບໄຊທ໌ຂອງຊົມລົມ" },
          ],
        },
        {
          key: "media",
          label: "ສື່",
          items: [
            { type: "video", src: SHOW.vid1, title: "ສາຂາການພັດທະນາເວັບໄຊ (CW)", link: SHOW.tiktok1 },
            { type: "video", src: SHOW.vid2, title: "ສາຂາການພັດທະນາໂປຣແກຣມ (CPR)", link: SHOW.tiktok2 },
            { type: "video", src: SHOW.vid3, title: "ສາຂາວິທະຍາສາດຄອມພິວເຕີ", link: SHOW.tiktok3 },
          ],
        },
      ],
    },
    team: {
      tag: "ທີມງານ",
      title: "ຮູ້ຈັກຄົນທີ່ຢູ່ເບື້ອງຫຼັງຊົມລົມ",
      subtitle: "ທີມຜູ້ນຳທີ່ທຸ່ມເທ ນຳພາແຕ່ລະສາຂາ.",
      members: [
        { name: "ປະທານ", role: "ປະທານ ແລະ ຫົວໜ້າວິທະຍາສາດຂໍ້ມູນ", img: TEAM_IMGS.president },
        { name: "ຮອງປະທານ", role: "ຮອງປະທານ", img: TEAM_IMGS.vice },
        { name: "CTO", role: "ຫົວໜ້າຝ່າຍເຕັກໂນໂລຊີ", img: TEAM_IMGS.cto },
        { name: "ຫົວໜ້າ IoT", role: "ຫົວໜ້າ IoT ແລະ ຮາດແວ", img: TEAM_IMGS.iot },
        { name: "ຫົວໜ້າໂປຣແກຣມ", role: "ຫົວໜ້າການຂຽນໂປຣແກຣມ", img: TEAM_IMGS.prog },
        { name: "ຫົວໜ້າກຣາຟິກ", role: "ຫົວໜ້າອອກແບບກຣາຟິກ", img: TEAM_IMGS.graphic },
        { name: "ຫົວໜ້າສື່", role: "ຫົວໜ້າຝ່າຍສື່", img: TEAM_IMGS.media },
      ],
    },
    contact: {
      tag: "ຕິດຕໍ່ພວກເຮົາ",
      title: "ພ້ອມທີ່ຈະສ້າງກັບພວກເຮົາບໍ?",
      subtitle: "ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາ ແລ້ວພວກເຮົາຈະຕິດຕໍ່ກັບຄືນເລື່ອງການເຂົ້າຮ່ວມ ຫຼື ການຮ່ວມມື.",
      name: "ຊື່ຂອງທ່ານ",
      email: "ອີເມວຂອງທ່ານ",
      message: "ຂໍ້ຄວາມຂອງທ່ານ",
      send: "ສົ່ງຂໍ້ຄວາມ",
      socials: "ຕິດຕາມພວກເຮົາ",
    },
    footer: {
      tagline: "ຊົມລົມເຕັກໂນໂລຊີນັກສຶກສາ — ຄະນະວິທະຍາສາດທຳມະຊາດ, ມຊ.",
      quickLinks: "ລິ້ງດ່ວນ",
      rights: "ສະຫງວນລິຂະສິດທັງໝົດ.",
    },
  },
};
