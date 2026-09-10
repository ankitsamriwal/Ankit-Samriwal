import { Article } from './chronicles';

export const articles58: Article[] = [
  {
    title: 'The Agent Moved Into the Operating System',
    date: '2026-09-10',
    week: 'Sep 10, 2026',
    category: 'Agentic AI',
    readTime: '4 min read',
    excerpt: 'Nous Research’s Hermes is now a first-class citizen of Omarchy, DHH’s agentic Linux: one runtime across terminal, desktop and menu, re-skinned by the OS theme, and taught the machine it lives on. The agent stopped being an app and became a layer of the OS.',
    tags: ['Agentic AI', 'Omarchy', 'Hermes', 'Open Source', 'Developer Tools'],
    body: [
      'Agents have spent two years living in apps: a chat window here, a CLI there, a sidebar inside somebody else’s product. On 9 September, the agent got a home instead.',
      'The announcement: Nous Research’s open-source Hermes agent is now a first-class citizen of Omarchy, the opinionated Arch Linux and Hyprland setup from DHH, the creator of Ruby on Rails. Omarchy already treated agent CLIs as OS citizens, with Claude Code, Codex and the rest pre-wired into a launcher. Hermes goes further: installable from the OS’s own AI menu, settable as the default terminal agent, and one persistent runtime shared across terminal, desktop app and menu. Switch the Omarchy theme and Hermes re-skins itself to match. The post crossed 184,000 views inside two hours, which tells you the developer world felt the shift, not just saw it.',
      'The detail that actually matters is the skill. Omarchy ships its own skill into Hermes, so the agent knows the machine it runs on: where files live, how the system is configured, how to change the theme, how to tailor and repair the OS itself. Every agent until now has been a guest that needed the room described to it. This one gets the floor plan at move-in. The agent stopped being an app you open and became a layer of the operating system that understands the operating system.',
      'Look at the same week from altitude and the stack is closing around the agent from both ends. From below, the hardware floor is collapsing: a 2.78-trillion-parameter model ran in 8GB of RAM from a single C file, and Edge0 is streaming 35B models into about a gigabyte. From above, the OS is absorbing the agent as a native citizen. Hardware below, operating system above, and the agent in the middle no longer visiting but residing.',
      'For enterprise teams, the questions move down a layer with it. An agent that knows the machine is an agent with standing access to the machine, so governance stops being a prompt-policy conversation and becomes an OS-level one: what it can touch, what it remembers, who audits the skill that taught it. And for builders, the distribution moat is shifting again. The winners will not be the agents with the best demos but the ones whose context packages, skills, ship with the environments people already live in.'
    ],
    takeaways: [
      'Hermes is now a first-class citizen of Omarchy: menu-installable, defaultable in the terminal, one runtime across every surface, re-skinned by the OS theme.',
      'The real news is the shipped skill: the agent is taught the machine itself, so it can navigate, configure and repair the OS it lives on.',
      'The stack is closing from both ends: on-device inference collapses the hardware floor while the OS absorbs the agent from above.',
      'Governance moves down a layer: when the agent knows the machine, access, memory and audit become operating-system questions.'
    ],
    note: 'The agent era’s first phase gave agents tools. This week gave them a home. Tenancy changes what they can be trusted with, and what they must be audited for.'
  }
];
