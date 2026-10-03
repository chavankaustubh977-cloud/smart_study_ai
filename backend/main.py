from datetime import datetime, timezone
from typing import Any, Dict
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="ScholarAI Backend API",
    description="FastAPI backend for ScholarAI personalized tutoring & adaptive learning platform",
    version="1.0.0"
)

# 4. Enable CORS so React frontend running on localhost can communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema for POST /api/test
class TestPayload(BaseModel):
    message: str = Field(default="Hello from frontend", description="Test message from client")
    data: Dict[str, Any] = Field(default_factory=dict, description="Arbitrary JSON payload")

# Root Health Check endpoint
@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "service": "ScholarAI Backend",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# 5 & 6. POST endpoint at /api/test
@app.post("/api/test", tags=["Test"])
async def test_endpoint(payload: TestPayload):
    try:
        # Basic validation and confirmation
        if not payload.message.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Field 'message' cannot be empty."
            )

        return {
            "status": "success",
            "message": "Data received successfully by FastAPI backend!",
            "received": {
                "message": payload.message,
                "data": payload.data
            },
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except HTTPException:
        raise
    except Exception as exc:
        # 7. Basic error handling
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing test request: {str(exc)}"
        )

# Global exception handler for unexpected errors
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "status": "error",
            "message": "Internal server error occurred.",
            "detail": str(exc)
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
