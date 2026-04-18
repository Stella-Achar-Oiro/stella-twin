"""Chat endpoint — SSE streaming with file-based memory."""

import json
import os
from collections.abc import AsyncIterator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel

from app import memory
from app.personality import SYSTEM_PROMPT

router = APIRouter(tags=["chat"])
_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def _get_client() -> AsyncOpenAI:
    return AsyncOpenAI()


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


async def _stream(request: ChatRequest) -> AsyncIterator[str]:
    history = memory.load(request.session_id)
    history.append({"role": "user", "content": request.message})

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history

    full_reply = ""
    stream = await _get_client().chat.completions.create(
        model=_MODEL,
        messages=messages,
        stream=True,
    )
    async for chunk in stream:
        delta = chunk.choices[0].delta.content if chunk.choices else None
        if delta:
            full_reply += delta
            yield f"data: {json.dumps({'token': delta})}\n\n"

    history.append({"role": "assistant", "content": full_reply})
    memory.save(request.session_id, history)
    yield "data: [DONE]\n\n"


@router.post("/chat")
async def chat(request: ChatRequest) -> StreamingResponse:
    return StreamingResponse(
        _stream(request),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
