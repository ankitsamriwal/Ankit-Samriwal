import React from 'react';

type TechItem = { name: string; icon?: string };

// Row A — AI: models, agent tooling, inference, vector/RAG
const AI_ITEMS: TechItem[] = [
  { name: "OpenAI", icon: "/icons/openai.svg" },
  { name: "Anthropic", icon: "/icons/anthropic.svg" },
  { name: "Gemini", icon: "/icons/gemini.svg" },
  { name: "DeepSeek", icon: "/icons/deepseek.svg" },
  { name: "Hugging Face", icon: "/icons/hugging-face.svg" },
  { name: "Claude Code", icon: "/icons/claude-code.svg" },
  { name: "Codex", icon: "/icons/codex.svg" },
  { name: "Google AI Studio", icon: "/icons/google-ai-studio.svg" },
  { name: "Microsoft Copilot Studio" },
  { name: "GitHub Copilot", icon: "/icons/github-copilot.svg" },
  { name: "LangChain", icon: "/icons/langchain.svg" },
  { name: "LangGraph", icon: "/icons/langgraph.svg" },
  { name: "Ollama", icon: "/icons/ollama.svg" },
  { name: "vLLM", icon: "/icons/vllm.svg" },
  { name: "GGUF" },
  { name: "RAG" },
  { name: "Pinecone" },
  { name: "Qdrant", icon: "/icons/qdrant.svg" },
  { name: "Supabase", icon: "/icons/supabase.svg" },
  { name: "Redis", icon: "/icons/redis.svg" },
  { name: "AWS Bedrock", icon: "/icons/aws-bedrock.svg" },
];

// Row B — engineering: ML/DL, MLOps, DevOps/infra, core stack
const ENGINEERING_ITEMS: TechItem[] = [
  { name: "PyTorch", icon: "/icons/pytorch.svg" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
  { name: "scikit-learn", icon: "/icons/scikit-learn.svg" },
  { name: "MLflow", icon: "/icons/mlflow.svg" },
  { name: "Weights & Biases", icon: "/icons/weights-biases.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
  { name: "Azure DevOps", icon: "/icons/azure-devops.svg" },
  { name: "Azure", icon: "/icons/azure.svg" },
  { name: "Azure Fabric", icon: "/icons/azure-fabric.svg" },
  { name: "AWS S3", icon: "/icons/aws-s3.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Three.js", icon: "/icons/threejs.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "Flutter", icon: "/icons/flutter.svg" },
];

const Chip: React.FC<{ item: TechItem }> = ({ item }) => (
  <div
    className="
      px-6 py-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md
      transition-all duration-300
      hover:bg-white/10 hover:border-white/30 hover:scale-105 cursor-default
      flex items-center gap-3
    "
  >
    {item.icon && (
      <img src={item.icon} alt={`${item.name} logo`} className="w-6 h-6" loading="lazy" />
    )}
    <span className="text-sm font-semibold tracking-wide whitespace-nowrap text-neutral-200">{item.name}</span>
  </div>
);

const Row: React.FC<{ items: TechItem[]; reverse?: boolean }> = ({ items, reverse }) => {
  // 4 sets so translateX(-50%) lands exactly where set 1 began = seamless loop
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="flex w-max gap-4 py-2 animate-scroll group-hover:[animation-play-state:paused]" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {list.map((item, index) => (
        <Chip key={`${item.name}-${index}`} item={item} />
      ))}
    </div>
  );
};

const TechCarousel: React.FC = () => {
  return (
    <div className="w-full overflow-hidden relative group py-6">
      {/* Gradients for smooth fade effect on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none"></div>

      <div className="flex flex-col gap-2">
        <Row items={AI_ITEMS} />
        <Row items={ENGINEERING_ITEMS} reverse />
      </div>
    </div>
  );
};

export default TechCarousel;
