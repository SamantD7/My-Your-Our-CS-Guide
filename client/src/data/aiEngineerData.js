export const AI_ENGINEER_DATA = [
  {
    n: "1",
    title: "Python + libraries",
    sub: "Master Python core, data science stack, environments, and project setup",
    badge: "Week 1–2",
    badgeBg: "rgba(79, 255, 176, 0.1)",
    badgeC: "var(--accent)",
    timeTxt: "2 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(79, 255, 176, 0.1)",
    numC: "var(--accent)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "Python Core & Data Libraries",
        topics: [
          { name: "Python core", detail: "Variables, loops, functions, OOP, exceptions", done: false },
          { name: "NumPy", detail: "Arrays, math operations, broadcasting", done: false },
          { name: "Pandas", detail: "DataFrames, cleaning, groupby, merge", done: false },
          { name: "Matplotlib / Seaborn", detail: "Plots, charts, visual EDA", done: false },
          { name: "Scikit-learn", detail: "Models, train/test split, metrics", done: false },
          { name: "PyTorch basics", detail: "Tensors, nn.Module, training loop", done: false }
        ]
      },
      {
        title: "Environments & Development Workflow",
        topics: [
          { name: "Virtual environments", detail: "venv, pip freeze, requirements.txt — project isolation", done: false },
          { name: "Git + GitHub", detail: "Commits, branches, push, PRs, README", done: false },
          { name: "Jupyter Notebooks", detail: "Cell structure, markdown, interactive analysis", done: false }
        ]
      }
    ],
    project: { name: "Push a clean Pandas analysis notebook to GitHub with a proper README", color: "#0F6E56", bg: "var(--surface2)", lc: "#0F6E56" },
    resources: ["Python docs", "Real Python", "GitHub Quickstart"],
    prompt: "What should a Python project README contain to impress recruiters?"
  },
  {
    n: "2",
    title: "MERN stack",
    sub: "Build modern full-stack web applications with React, Node, Express, MongoDB, and AI integration",
    badge: "Week 3–4",
    badgeBg: "rgba(123, 97, 255, 0.1)",
    badgeC: "var(--accent2)",
    timeTxt: "2 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(123, 97, 255, 0.1)",
    numC: "var(--accent2)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "MERN Stack Foundations",
        topics: [
          { name: "MongoDB", detail: "Documents, queries, aggregation pipelines, Atlas", done: false },
          { name: "Express.js", detail: "REST APIs, middleware, routing, CORS", done: false },
          { name: "React.js", detail: "Components, hooks, state management, React Router", done: false },
          { name: "Node.js", detail: "Server runtime, async/await, npm ecosystem", done: false }
        ]
      },
      {
        title: "Full-Stack AI Integration",
        topics: [
          { name: "SSE streaming", detail: "Send LLM tokens to React in real-time via Server-Sent Events", done: false },
          { name: "Chat history in MongoDB", detail: "Schema: userId, sessionId, messages[], timestamps", done: false },
          { name: "Axios → Python service", detail: "Node calls FastAPI backend, handles errors gracefully", done: false },
          { name: "File upload (Multer)", detail: "Accept PDF/DOCX from user, stream to Python service", done: false }
        ]
      }
    ],
    project: { name: "Upgrade an existing MERN app with a streaming chat UI + MongoDB message history", color: "#0F6E56", bg: "var(--surface2)", lc: "#0F6E56" },
    resources: ["MDN SSE docs", "Multer npm", "Mongoose docs"],
    prompt: "Show me how to implement Server-Sent Events in Node.js for streaming LLM responses to React"
  },
  {
    n: "3",
    title: "ML & deep learning",
    sub: "Machine learning algorithms, neural network architectures, and practical model deployment",
    badge: "Week 5–7",
    badgeBg: "rgba(255, 169, 77, 0.1)",
    badgeC: "var(--warn)",
    timeTxt: "2–3 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(255, 169, 77, 0.1)",
    numC: "var(--warn)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "ML & Neural Network Foundations",
        topics: [
          { name: "Supervised learning", detail: "Regression, classification, loss functions", done: false },
          { name: "Neural networks", detail: "Layers, activation, backprop, gradients", done: false },
          { name: "CNNs & RNNs", detail: "Image processing, sequence models", done: false },
          { name: "Training concepts", detail: "Overfitting, regularization, batch norm", done: false }
        ]
      },
      {
        title: "Practical ML Engineering & Projects",
        topics: [
          { name: "End-to-end regression", detail: "Load CSV → clean → train → evaluate → save model", done: false },
          { name: "Text classifier", detail: "Sentiment analysis on movie reviews — classic first NLP project", done: false },
          { name: "PyTorch training loop", detail: "Write train() and evaluate() functions from scratch", done: false },
          { name: "Streamlit UI", detail: "Wrap your model — input form → prediction → display result", done: false },
          { name: "Model saving/loading", detail: "torch.save, joblib — persist model for serving", done: false },
          { name: "Kaggle competition", detail: "Submit to any beginner competition — Titanic, House Prices", done: false }
        ]
      }
    ],
    project: { name: "Sentiment classifier: train on IMDB dataset → Streamlit UI → deploy on Hugging Face Spaces", color: "#854F0B", bg: "var(--surface2)", lc: "#854F0B" },
    resources: ["Kaggle datasets", "fast.ai course", "Andrej Karpathy YouTube"],
    prompt: "Give me a step-by-step plan to build a sentiment classifier in PyTorch with a Streamlit UI"
  },
  {
    n: "4",
    title: "GenAI & LLM fundamentals",
    sub: "Learn to talk to AI models from code",
    badge: "Week 8–9",
    badgeBg: "rgba(123, 97, 255, 0.1)",
    badgeC: "var(--accent2)",
    timeTxt: "2 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(123, 97, 255, 0.1)",
    numC: "var(--accent2)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "How LLMs work (concepts)",
        topics: [
          { name: "Tokens & context window", detail: "LLM reads tokens not words. Context = its short-term memory", done: false },
          { name: "Temperature & sampling", detail: "Temperature 0 = deterministic, 1 = creative. Top-p, top-k", done: false },
          { name: "System vs user prompt", detail: "System = personality/rules. User = what you ask. Both matter.", done: false },
          { name: "How transformers work", detail: "Attention mechanism — which words matter for each prediction", done: false }
        ]
      },
      {
        title: "Prompt engineering",
        topics: [
          { name: "Zero-shot prompting", detail: "Just ask. 'Classify this review as positive or negative: ...'", done: false },
          { name: "Few-shot prompting", detail: "Give 2–3 examples before your real question — accuracy jumps", done: false },
          { name: "Chain-of-thought", detail: "Add 'think step by step' — model reasons better, fewer errors", done: false },
          { name: "Output formatting", detail: "Ask for JSON, XML, markdown — parse the output in your code", done: false },
          { name: "System prompt design", detail: "Role, rules, tone, format constraints — this shapes everything", done: false },
          { name: "Prompt injection basics", detail: "How users can hijack your prompt — and how to defend", done: false }
        ]
      },
      {
        title: "API usage in code",
        topics: [
          { name: "Anthropic SDK", detail: "pip install anthropic → client.messages.create() → done", done: false },
          { name: "OpenAI SDK", detail: "pip install openai → client.chat.completions.create()", done: false },
          { name: "Streaming in Python", detail: "stream=True → for chunk in stream: print(chunk) in real time", done: false },
          { name: "Function / tool calling", detail: "Define a Python function, tell LLM about it, it calls it", done: false },
          { name: "Vision API", detail: "Send image + text to Claude/GPT — read charts, screenshots", done: false },
          { name: "Cost awareness", detail: "Count tokens, cache prompts, set max_tokens — save money", done: false }
        ]
      }
    ],
    project: { name: "CLI chatbot with: system prompt personality + conversation memory + one tool (weather API or calculator)", color: "#534AB7", bg: "var(--surface2)", lc: "#534AB7" },
    resources: ["Anthropic docs", "OpenAI cookbook", "Prompt Engineering Guide (promptingguide.ai)"],
    prompt: "Show me a Python example of a chatbot with conversation memory and tool calling using the Anthropic SDK"
  },
  {
    n: "5",
    title: "Embeddings & vector databases",
    sub: "The engine that powers RAG",
    badge: "Week 10–11",
    badgeBg: "rgba(123, 97, 255, 0.1)",
    badgeC: "var(--accent2)",
    timeTxt: "2 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(123, 97, 255, 0.1)",
    numC: "var(--accent2)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "Embedding concepts",
        topics: [
          { name: "What embeddings are", detail: "Text → list of 1536 numbers. Similar meaning = similar numbers", done: false },
          { name: "Cosine similarity", detail: "Measure angle between two vectors — closer = more similar", done: false },
          { name: "Embedding models", detail: "text-embedding-3-small (OpenAI), all-MiniLM (free local), BGE", done: false },
          { name: "Why keyword search fails", detail: "'car' and 'automobile' — keywords miss it, vectors don't", done: false }
        ]
      },
      {
        title: "Vector databases",
        topics: [
          { name: "ChromaDB", detail: "Runs locally in Python. Best for learning — zero setup needed", done: false },
          { name: "FAISS", detail: "Facebook's library — fastest local search, used in research", done: false },
          { name: "Pinecone", detail: "Cloud vector DB — free tier, production-ready, easy API", done: false },
          { name: "Qdrant", detail: "Open-source alternative to Pinecone — can self-host", done: false }
        ]
      },
      {
        title: "Chunking strategies",
        topics: [
          { name: "Fixed-size chunks", detail: "Split every 500 chars. Simple but loses context at boundaries", done: false },
          { name: "Recursive splitting", detail: "Split by paragraph → sentence → word. Smarter and cleaner", done: false },
          { name: "Semantic chunking", detail: "Split where meaning changes, not where character count hits", done: false },
          { name: "Metadata tagging", detail: "Store source, page, date with each chunk — filter later", done: false }
        ]
      }
    ],
    project: { name: "Semantic search over 200+ Wikipedia articles — compare keyword search vs vector search results side by side", color: "#534AB7", bg: "var(--surface2)", lc: "#534AB7" },
    resources: ["ChromaDB docs", "Pinecone learning center", "LangChain text splitters docs"],
    prompt: "Explain embeddings and cosine similarity in simple terms and show me a ChromaDB example in Python"
  },
  {
    n: "6",
    title: "RAG systems — your core skill",
    sub: "Most in-demand GenAI skill — master this",
    badge: "Week 12–15",
    badgeBg: "rgba(255, 92, 92, 0.1)",
    badgeC: "var(--danger)",
    timeTxt: "3–4 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(255, 92, 92, 0.1)",
    numC: "var(--danger)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "Basic RAG pipeline",
        topics: [
          { name: "Document loaders", detail: "LangChain loaders for PDF, URL, CSV, Notion, YouTube transcript", done: false },
          { name: "Text splitting", detail: "RecursiveCharacterTextSplitter — chunk_size=1000, overlap=200", done: false },
          { name: "Embed + store", detail: "Embed all chunks → upsert into ChromaDB or Pinecone", done: false },
          { name: "Retrieval", detail: "Embed query → similarity search → get top-k chunks", done: false },
          { name: "Prompt injection", detail: "Stuff retrieved chunks into prompt: 'Use this context: {context}'", done: false },
          { name: "Answer generation", detail: "LLM reads context + question → answers with grounded facts", done: false }
        ]
      },
      {
        title: "LangChain / LlamaIndex",
        topics: [
          { name: "LCEL chains", detail: "LangChain Expression Language — pipe operators for clean chains", done: false },
          { name: "RetrievalQA chain", detail: "One-liner RAG chain — good for learning the flow", done: false },
          { name: "Conversational RAG", detail: "Add chat history — user can ask follow-up questions", done: false },
          { name: "LlamaIndex basics", detail: "Alternative to LangChain — better for complex document QA", done: false }
        ]
      },
      {
        title: "Make it production-quality",
        topics: [
          { name: "Source citations", detail: "Return chunk metadata with answer — show user which doc it came from", done: false },
          { name: "Fallback handling", detail: "If no relevant chunk found, say 'I don't know' — not hallucinate", done: false },
          { name: "Reranking", detail: "Cohere rerank API — sort retrieved chunks by actual relevance", done: false },
          { name: "Streaming answers", detail: "Stream RAG response token by token — feels faster to user", done: false }
        ]
      }
    ],
    project: { name: "'Chat with any PDF' app: upload PDF → chunk + embed → ask questions → get cited answers with streaming", color: "#993C1D", bg: "var(--surface2)", lc: "#993C1D" },
    resources: ["LangChain RAG tutorial", "LlamaIndex docs", "Greg Kamradt chunking notebook"],
    prompt: "Walk me through building a RAG system with LangChain that streams answers and shows source citations"
  },
  {
    n: "7",
    title: "AI agents",
    sub: "AI that thinks in loops and takes actions",
    badge: "Week 16–18",
    badgeBg: "rgba(255, 92, 92, 0.1)",
    badgeC: "var(--danger)",
    timeTxt: "2–3 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(255, 92, 92, 0.1)",
    numC: "var(--danger)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "Core agent concepts",
        topics: [
          { name: "ReAct pattern", detail: "Reason → Act → Observe. The loop every agent runs inside", done: false },
          { name: "Tool / function calling", detail: "You define Python functions, LLM decides when to call them", done: false },
          { name: "Agent memory", detail: "Short-term = context window. Long-term = vector DB between sessions", done: false },
          { name: "Stopping condition", detail: "Agent decides when it has enough info to give final answer", done: false }
        ]
      },
      {
        title: "Build agent tools",
        topics: [
          { name: "Web search tool", detail: "Tavily API — agent searches Google, reads results, uses facts", done: false },
          { name: "Calculator tool", detail: "Agent can't do math reliably — give it a real calculator function", done: false },
          { name: "RAG tool", detail: "Agent calls your vector DB when it needs to look up documents", done: false },
          { name: "Code execution tool", detail: "Agent writes Python code, runs it, reads output — powerful", done: false },
          { name: "API caller tool", detail: "Agent calls weather, stocks, or any REST API you define", done: false }
        ]
      },
      {
        title: "Agent frameworks",
        topics: [
          { name: "LangChain AgentExecutor", detail: "Simplest way to start. Define tools, pass to agent, run.", done: false },
          { name: "LangGraph", detail: "Draw agent as a graph — more control over flow and loops", done: false },
          { name: "Anthropic tool use", detail: "Claude natively supports tool calling — cleaner than LangChain", done: false },
          { name: "Human-in-the-loop", detail: "Agent pauses, asks human to approve before doing risky action", done: false }
        ]
      }
    ],
    project: { name: "Research agent: takes any question → searches web → searches your docs → writes a structured report", color: "#993C1D", bg: "var(--surface2)", lc: "#993C1D" },
    resources: ["LangGraph docs", "Anthropic tool use docs", "Tavily API docs"],
    prompt: "Build me a simple AI agent with web search and RAG tools using LangChain step by step"
  },
  {
    n: "8",
    title: "Full-stack AI app (your unique edge)",
    sub: "MERN + Python RAG + Agents = complete product",
    badge: "Week 19–23",
    badgeBg: "rgba(255, 169, 77, 0.1)",
    badgeC: "var(--warn)",
    timeTxt: "4–5 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(255, 169, 77, 0.1)",
    numC: "var(--warn)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "Python backend (FastAPI)",
        topics: [
          { name: "FastAPI setup", detail: "pip install fastapi uvicorn — async routes, Pydantic models", done: false },
          { name: "RAG endpoint", detail: "POST /query → embed → retrieve → stream LLM response", done: false },
          { name: "Upload endpoint", detail: "POST /upload → accept PDF → chunk → embed → store in vector DB", done: false },
          { name: "Agent endpoint", detail: "POST /agent → run agent loop → stream back steps + final answer", done: false },
          { name: "Auth middleware", detail: "Verify JWT from Node before processing any AI request", done: false }
        ]
      },
      {
        title: "Node.js bridge",
        topics: [
          { name: "Proxy to FastAPI", detail: "Express route → axios.post to Python → pipe response back", done: false },
          { name: "Streaming relay", detail: "SSE: pipe FastAPI stream through Node to React client", done: false },
          { name: "Chat history", detail: "Save every message to MongoDB with userId + sessionId", done: false },
          { name: "Rate limiting", detail: "Express-rate-limit — stop users from burning your API budget", done: false }
        ]
      },
      {
        title: "React frontend",
        topics: [
          { name: "Chat UI with streaming", detail: "Append tokens as they arrive — use useRef to avoid re-renders", done: false },
          { name: "File upload UI", detail: "Drag-drop PDF, progress bar, success state, error handling", done: false },
          { name: "Source citations UI", detail: "Expandable drawer showing which doc chunks were used", done: false },
          { name: "Session sidebar", detail: "List past chats from MongoDB, click to restore — like ChatGPT", done: false }
        ]
      },
      {
        title: "Deployment",
        topics: [
          { name: "Docker Compose", detail: "docker-compose.yml: node service + python service + mongo", done: false },
          { name: "Railway / Render", detail: "Push to GitHub → auto-deploy both services — free tier works", done: false },
          { name: "Vercel (React)", detail: "npx vercel → done. Set VITE_API_URL env var to point to backend", done: false },
          { name: "Env vars + secrets", detail: ".env files, never commit API keys, use platform secret managers", done: false }
        ]
      }
    ],
    project: { name: "Full SaaS: users sign up → upload their docs → chat with AI → history saved → deployed publicly", color: "#854F0B", bg: "var(--surface2)", lc: "#854F0B" },
    resources: ["FastAPI docs", "Railway docs", "Vercel docs", "Docker Compose tutorial"],
    prompt: "Design the complete architecture for a full-stack RAG SaaS with MERN frontend and Python backend"
  },
  {
    n: "9",
    title: "MLOps & monitoring basics",
    sub: "Keep your AI app honest and alive in production",
    badge: "Week 24–25",
    badgeBg: "rgba(79, 255, 176, 0.1)",
    badgeC: "var(--accent)",
    timeTxt: "2 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(79, 255, 176, 0.1)",
    numC: "var(--accent)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "Observability",
        topics: [
          { name: "LangSmith tracing", detail: "Every LLM call logged — see exact prompt, response, latency, cost", done: false },
          { name: "Langfuse (free alt)", detail: "Open-source LangSmith alternative — self-hostable, great UI", done: false },
          { name: "Token cost logging", detail: "Log input/output tokens per request — know what you're spending", done: false },
          { name: "Error tracking", detail: "Catch and log LLM failures, timeouts, empty responses gracefully", done: false }
        ]
      },
      {
        title: "RAG quality",
        topics: [
          { name: "RAGAS eval", detail: "Measure faithfulness, answer relevance, context recall — automatically", done: false },
          { name: "Hallucination checks", detail: "Did the answer come from the context or did model make it up?", done: false },
          { name: "Fallback responses", detail: "'I don't have enough info' is better than a confident wrong answer", done: false },
          { name: "Prompt versioning", detail: "Track prompt changes — did v2 perform better than v1?", done: false }
        ]
      }
    ],
    project: { name: "Add LangSmith tracing + RAGAS eval + cost logging dashboard to your RAG app", color: "#3B6D11", bg: "var(--surface2)", lc: "#3B6D11" },
    resources: ["LangSmith docs", "RAGAS GitHub", "Langfuse docs"],
    prompt: "How do I add LangSmith tracing and RAGAS evaluation to my LangChain RAG pipeline?"
  },
  {
    n: "10",
    title: "Portfolio & job readiness",
    sub: "Turn everything into opportunities",
    badge: "Week 26–27",
    badgeBg: "rgba(79, 255, 176, 0.1)",
    badgeC: "var(--accent)",
    timeTxt: "2 weeks",
    timeBg: "var(--surface2)",
    timeC: "var(--muted)",
    numBg: "rgba(79, 255, 176, 0.1)",
    numC: "var(--accent)",
    done: false,
    progress: 0,
    sections: [
      {
        title: "3 projects that get you hired",
        topics: [
          { name: "Project 1 — ML", detail: "Sentiment classifier or price predictor. Shows you can train + deploy a model", done: false },
          { name: "Project 2 — RAG", detail: "Chat with PDF or domain-specific knowledge base. Shows GenAI skills", done: false },
          { name: "Project 3 — Full SaaS", detail: "MERN + Python RAG with auth + history. Shows you can ship a real product", done: false }
        ]
      },
      {
        title: "How to present yourself",
        topics: [
          { name: "GitHub", detail: "Clean READMEs with screenshots, live demo link, tech stack badge", done: false },
          { name: "LinkedIn headline", detail: "'AI Engineer | MERN + GenAI | RAG & Agents' — be specific", done: false },
          { name: "Technical blog", detail: "Write one post per project. Devto or Hashnode — free, indexed by Google", done: false },
          { name: "Open source", detail: "Fix one bug in LangChain or LlamaIndex — instant credibility", done: false }
        ]
      },
      {
        title: "Jobs to target",
        topics: [
          { name: "AI/LLM Engineer", detail: "Hottest title right now. Your MERN + RAG combo fits perfectly", done: false },
          { name: "Full-stack AI Developer", detail: "Product companies building AI features — your exact profile", done: false },
          { name: "ML Engineer", detail: "Broader role, more stable — good if you want bigger companies", done: false },
          { name: "AI Startup early hire", detail: "Indian AI startups hiring generalists — MERN + AI = perfect fit", done: false }
        ]
      }
    ],
    project: { name: "All 3 projects live + a blog post for each + active GitHub = interview-ready", color: "#5F5E5A", bg: "var(--surface2)", lc: "#5F5E5A" },
    resources: ["dev.to", "Hashnode", "GitHub profile README guide", "LinkedIn AI Engineer profiles"],
    prompt: "How should I structure my GitHub profile and projects to get AI engineer interviews?"
  }
];
