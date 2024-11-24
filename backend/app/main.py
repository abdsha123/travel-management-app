from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import avltree, priorityqueue, graph, seathashmap, userprofile

app = FastAPI()

# Configure CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains in production for security
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers without redundant prefixes
app.include_router(avltree.router, prefix="/avltree", tags=["AVL Tree"])
app.include_router(priorityqueue.router, prefix="/priorityqueue", tags=["Priority Queue"])
app.include_router(graph.router, prefix="/graph", tags=["Graph"])
app.include_router(seathashmap.router, prefix="/seathashmap", tags=["Seat Hash Map"])
app.include_router(userprofile.router, prefix="/userprofile", tags=["User Profile"])
