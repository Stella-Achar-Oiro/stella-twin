# Stella's AI Digital Twin

An AI digital twin that represents Stella Achar Oiro — Software Engineer, Technical Writer, AWS Community Builder, Clinical Officer, and Co-founder at Evarest Technologies.

**Live demo:** [stella-twin.vercel.app](https://stella-twin.vercel.app)  
**API (AWS App Runner):** [3pramfenpd.us-east-1.awsapprunner.com/api/health](https://3pramfenpd.us-east-1.awsapprunner.com/api/health)

Built as a Week 2 project for the [AI in Production](https://github.com/ed-donner/production) course.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.12, OpenAI `gpt-4o-mini` |
| Memory | File-based JSON (per-session, 24 h TTL, 10-turn cap) |
| Package manager | `uv` (backend), `npm` (frontend) |
| Deployment | Vercel (frontend) · AWS App Runner via ECR (backend) |

---

## Local development

### Prerequisites

- Python 3.12+, [`uv`](https://docs.astral.sh/uv/)
- Node.js 18+, npm
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone and install

```bash
git clone https://github.com/Stella-Achar-Oiro/stella-twin.git
cd stella-twin
make install
```

### 2. Configure environment variables

**Backend**

```bash
cp backend/.env.example backend/.env
# Fill in: OPENAI_API_KEY
```

**Frontend**

```bash
cp frontend/.env.local.example frontend/.env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000 (default)
```

### 3. Run

```bash
make dev-api   # FastAPI on :8000
make dev-ui    # Next.js on :3000
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture

```
browser → Next.js App Router (Vercel)
               │  POST /api/chat  ← SSE token stream
               ▼
          FastAPI (AWS App Runner)
               │
               ├── personality.py   system prompt from data/summary.txt + data/facts.txt
               ├── memory.py        file-based session history (JSON, 24 h TTL)
               └── api/chat.py      SSE streaming endpoint
```

**Request flow**

1. User sends a message from `/chat`.
2. Backend loads conversation history from `memory/` (keyed by session ID).
3. Appends system prompt (built from `data/summary.txt` + `data/facts.txt`) and calls OpenAI.
4. Tokens are streamed back as SSE events and appended to the chat bubble in real time.
5. Full reply is saved back to `memory/` for multi-turn context.

---

## Project structure

```
stella-twin/
├── backend/
│   ├── app/
│   │   ├── api/          health, chat endpoints
│   │   ├── factory.py    FastAPI app factory + CORS
│   │   ├── main.py       uvicorn entrypoint
│   │   ├── memory.py     file-based session history
│   │   └── personality.py  system prompt builder
│   └── data/
│       ├── summary.txt   personal bio
│       └── facts.txt     LinkedIn-sourced facts
├── frontend/
│   ├── app/              Next.js App Router pages
│   │   ├── page.tsx      landing page (bio, experience, projects)
│   │   └── chat/         chat interface
│   ├── components/
│   │   └── Chat.tsx      sidebar + streaming chat (client component)
│   └── lib/api.ts        streamChat() SSE utility
└── memory/               runtime session files (git-ignored)
```

---

## Deployment

**Frontend → Vercel**

```bash
cd frontend
npx vercel --prod
```

Set `NEXT_PUBLIC_API_URL` to your App Runner URL in the Vercel dashboard.

**Backend → AWS App Runner**

```bash
# Build for linux/amd64 (required for App Runner on Apple Silicon)
docker build --platform linux/amd64 -t stella-twin-api ./backend

# Push to ECR then create App Runner service
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_URI>
docker tag stella-twin-api:latest <ECR_URI>:latest
docker push <ECR_URI>:latest
```

Required env vars on App Runner:
- `OPENAI_API_KEY`
- `CORS_ORIGINS` (your Vercel URL)
