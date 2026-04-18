"""File-based conversation memory keyed by session ID."""

import json
import time
from pathlib import Path

_MEMORY_DIR = Path(__file__).resolve().parent.parent.parent / "memory"
_MEMORY_DIR.mkdir(parents=True, exist_ok=True)

MAX_TURNS = 10
TTL_SECONDS = 86400  # 24 h


def _path(session_id: str) -> Path:
    safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in session_id)
    return _MEMORY_DIR / f"{safe}.json"


def load(session_id: str) -> list[dict]:
    p = _path(session_id)
    if not p.is_file():
        return []
    try:
        data = json.loads(p.read_text())
        if time.time() - data.get("updated_at", 0) > TTL_SECONDS:
            p.unlink(missing_ok=True)
            return []
        return data.get("messages", [])
    except (json.JSONDecodeError, KeyError):
        return []


def save(session_id: str, messages: list[dict]) -> None:
    trimmed = messages[-(MAX_TURNS * 2):]
    _path(session_id).write_text(
        json.dumps({"updated_at": time.time(), "messages": trimmed})
    )


def clear(session_id: str) -> None:
    _path(session_id).unlink(missing_ok=True)
