export interface BlogBlock {
  type: "paragraph" | "quote" | "heading" | "code" | "list";
  text: string;
  subtitle?: string; // citation for quote or language code block (e.g. "typescript")
  items?: string[]; // for lists
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: BlogBlock[];
}

export const blogs: BlogPost[] = [
  {
    slug: "i-am-an-engineer",
    title: "I Am an Engineer. And I Actually Mean That.",
    date: "30 June 2026",
    readTime: "3 min read",
    excerpt:
      "Engineering in India is a funny thing. Ask most people why they chose it and you get one of two answers: either they didn't know what else to do, or someone told them it was the path to a good IT job. I am an engineer, but not in the 'I have a degree' sense. I build things.",
    content: [
      {
        type: "paragraph",
        text: "Engineering in India is a funny thing.",
      },
      {
        type: "paragraph",
        text: 'Ask most people why they chose it and you get one of two answers: either they didn\'t know what else to do, or someone told them it was the path to a good IT job. "Safe." "Stable." "Good package." The whole country seems to be running after something, a number on a salary slip, a job title, a sense of security. Not going to lie, I\'ve been in that race too. There are days when I catch myself thinking about placements, offers, packages.',
      },
      {
        type: "paragraph",
        text: "But then there are these other moments. Quieter ones. Where something just hits me.",
      },
      {
        type: "heading",
        text: "I am an engineer.",
      },
      {
        type: "paragraph",
        text: "Not in the \"I have a degree\" sense. I mean it differently. I build things. I look at broken systems and want to fix them. I get genuinely obsessed with how things work. That's not something I chose on a form. That's just who I am. And when I try to put that feeling into words, I keep coming back to a line from a movie I watched as a kid and didn't think much of at the time. 3 Idiots. You know the one:",
      },
      {
        type: "quote",
        text: "Success ki peeche mat bhag, excellence ke peeche bhag. Success jhak maarke peeche aayegi.",
        subtitle: "3 Idiots",
      },
      {
        type: "paragraph",
        text: "I heard it. I probably clapped. And then I forgot about it. Now, years later, it comes back differently. It's easy to nod at that line. It's a lot harder to actually live by it when every conversation around you is about packages, shortlists, and offer letters. The rat race is loud. Excellence is quiet. But I'm starting to believe the quiet one wins eventually. And if that's true, then the right move isn't to chase things. It's to build them. Document them. Pay attention to them.",
      },
      {
        type: "heading",
        text: "Which is exactly why this blog exists.",
      },
      {
        type: "paragraph",
        text: "I'm not writing this to build an audience. Not to rank on Google or establish a personal brand. I'm writing this because life gets busier, and if I don't document this period, I'll forget it ever looked like this. Someday I'll open this portfolio and scroll all the way back to this post. I'll read it when I'm older, probably busier, hopefully further along. And I want to feel proud, not of any specific achievement, but of the fact that even when I was deep in the rat race, I was paying attention. I was thinking. I was a little different.",
      },
      {
        type: "paragraph",
        text: "And I think that difference comes down to one thing: mindset.",
      },
      {
        type: "paragraph",
        text: "Mindset separates people more than almost anything else. More than luck, more than connections, more than which college you went to. Luck exists, sure. But mindset is the one variable you can actually control. There's a quote people throw around a lot these days as an insult: \"Jack of all trades, master of none.\" A warning against spreading yourself too thin. Except that's not even the full quote. The original goes:",
      },
      {
        type: "quote",
        text: "Jack of all trades, master of none, though oftentimes better than master of one.",
        subtitle: "The Complete Proverb",
      },
      {
        type: "paragraph",
        text: "The person who wrote it wasn't warning against breadth. They were making the case for it.",
      },
      {
        type: "paragraph",
        text: "I consider myself a Jack. I can't tell you what I'll be a master of, or even if I'll be a master of anything at all. But I know I'm better than average at a lot of things. I learn fast, I connect dots across domains, I stay curious. I'll take that over one narrow lane any day. And if you're wondering what that actually looks like in real life, not just as a philosophy:",
      },
      {
        type: "paragraph",
        text: "I watch a lot. <strong>Sitcoms</strong> are my comfort zone: <em>Friends</em>, <em>How I Met Your Mother</em>, <em>Big Bang Theory</em>, <em>Modern Family</em>, <em>Young Sheldon</em>. Then there's the <strong>heavier stuff</strong>: <em>Game of Thrones</em>, <em>Breaking Bad</em>, <em>Suits</em>, <em>Money Heist</em>, <em>Prison Break</em>. And my <strong>actual favourite genre is Sci-fi</strong>, <em>Lost in Space</em>, <em>Stranger Things</em>, and plenty more I haven't listed. I genuinely think great stories teach you things books sometimes can't. The way a well-written character navigates a hard call under pressure, that stays with you. <strong>Sports</strong> are part of the mix too. <em>Cricket</em> and <em>badminton</em> have always been there, I've recently gotten into <em>football</em> and <em>F1</em>, which is a dangerous hobby because suddenly you have opinions about pit stop strategy and you have no idea how that happened. And because <strong>I'm an engineer in the truest sense</strong>: I like building and fixing things, hardware, software, doesn't matter. <em>Multiplayer games with friends</em> are my reset button. <em>The gym</em> keeps me sane. <em>Riding bikes back home in Nashik with the homies</em> is a different kind of therapy.",
      },
      {
        type: "paragraph",
        text: "That's enough for a first post.",
      },
      {
        type: "paragraph",
        text: "You'll get to know me better over time, if I'm in the mood to share. The next posts will be more specific: projects, things I'm building, ideas I'm thinking through. This one was just me showing up and saying something honest.",
      },
      {
        type: "paragraph",
        text: "See you in the next one.",
      },
    ],
  },
];
