import { Article } from './chronicles';

export const articles79: Article[] = [
  {
    title: 'September 2026: Agents Got a Runtime',
    date: '2026-09-29',
    week: 'Sep 29, 2026',
    category: 'AI Infrastructure',
    readTime: '3 min read',
    excerpt: 'September made the agent stack clearer: stronger models for long jobs, managed harnesses for execution and recovery, and boundaries enforced outside the model.',
    tags: ['Agentic AI', 'AI Models', 'AI Infrastructure', 'September 2026'],
    body: [
      'The month\u2019s agent story was not one model winning a leaderboard. Models got better at multi-step work while the systems around them started to look like real infrastructure: execution, recovery, isolation and permission checks. That second layer is what lets a capable agent work without inheriting every credential in its environment.',
      '## Models that can stay with the task',
      'OpenAI\u2019s GPT-6 Astra pushed computer use and long coding sessions. Claude Fable 5.1 arrived for coding and knowledge work, with Mythos 5.1 on a narrower access track. Anthropic then launched Opus 5.5 and Sonnet 5.5, pitching better cost per completed task, not merely a lower token price. These are vendor claims, not a single independent comparison. The useful unit is the finished job: tool calls, time and cost together.',
      'H company\u2019s Holo4 put open-weight models on the computer-use track. Its 27B model turns screenshots into actions, and the team released trajectories so builders can inspect what it did. Its benchmark figures are its own, and desktop control remains hard. Open weights plus visible traces are still a meaningful alternative to a closed API.',
      '## The harness became a product',
      'OpenAI\u2019s Agents API exposed the Codex harness as a public beta: managed sessions, context handling, tool use and subagents, with a choice of execution environment. Google open-sourced AX, an early distributed runtime built around isolated execution and resumption. AWS updated AgentCore Runtime\u2019s microVMs to reclaim idle memory and make cold starts more consistent. Docker\u2019s Cloud Sandboxes carry a sandbox from laptop to managed compute. The model is only one part of the job now; state and compute have to survive the hours it takes to finish.',
      '## Boundaries outside the model',
      'Nvidia\u2019s OpenShell adds sandboxing, credential handling and policies enforced at the runtime boundary, including controls on outbound API actions. It is an announced architecture, not proof that every unsafe action is solved. Still, the direction is right: a prompt can ask an agent to behave, but permissions have to hold even when it does not.',
      'My September takeaway: pick models by completed work, build for resumable execution, and put the hard limits outside the model. Intelligence is improving quickly. Trust still has to be engineered.',
      'Source: https://openai.com/index/gpt-6-astra/',
      'Source: https://www.anthropic.com/claude-fable-and-mythos-5-1',
      'Source: https://www.anthropic.com/claude-opus-5-5',
      'Source: https://www.anthropic.com/claude-sonnet-5-5',
      'Source: https://huggingface.co/blog/Hcompany/holo4',
      'Source: https://openai.com/index/introducing-the-agents-api/',
      'Source: https://github.com/google/ax',
      'Source: https://aws.amazon.com/about-aws/whats-new/2026/09/new-agentcore-runtime-generally-available/',
      'Source: https://www.docker.com/blog/introducing-cloud-sandboxes-start-on-your-laptop-finish-in-the-cloud/',
      'Source: https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell/'
    ],
    takeaways: [
      'New models pushed longer coding and computer-use work; compare completed tasks, not vendor benchmark charts alone.',
      'The agent harness is becoming a separate product layer for context, tools, recovery and execution.',
      'Isolated runtimes and externally enforced permissions matter as much as a stronger model.'
    ],
    note: 'The model can plan the work. The runtime has to keep it running, and the boundary has to know when to say no.'
  }
];
