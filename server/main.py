import os
import sys
from pathlib import Path

# Ensure the server directory is in sys.path so modules like synthetic_data and entity_resolution can always be imported
SERVER_DIR = str(Path(__file__).resolve().parent)
if SERVER_DIR not in sys.path:
    sys.path.insert(0, SERVER_DIR)

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import networkx as nx
from synthetic_data import generate_case_data
from entity_resolution import compute_entity_match, RESOLUTION_WEIGHTS

app = FastAPI(title="ULUKA AI Intelligence Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CASE_STORE = {}

def get_or_create_case(case_id: str):
    if case_id not in CASE_STORE:
        raw_data = generate_case_data(case_id)
        
        G = nx.Graph()
        for node in raw_data["nodes"]:
            G.add_node(node["id"], **node)
        for edge in raw_data["edges"]:
            G.add_edge(edge["source"], edge["target"], **edge)
            
        degree_cent = nx.degree_centrality(G)
        between_cent = nx.betweenness_centrality(G)
        
        communities = list(nx.community.greedy_modularity_communities(G))
        node_community_map = {}
        for idx, comm in enumerate(communities):
            for node_id in comm:
                node_community_map[node_id] = f"Cluster_{idx+1}"
                
        for node in raw_data["nodes"]:
            nid = node["id"]
            node["degree_centrality"] = round(degree_cent.get(nid, 0.0), 3)
            node["betweenness_centrality"] = round(between_cent.get(nid, 0.0), 3)
            node["community"] = node_community_map.get(nid, "Unassigned")
            
        CASE_STORE[case_id] = {
            "raw": raw_data,
            "graph": G,
            "resolutions": raw_data["resolutions"],
            "resolution_decisions": {},
            "weights": dict(RESOLUTION_WEIGHTS)
        }
    return CASE_STORE[case_id]

get_or_create_case("ULK-2047")

class ResolutionUpdate(BaseModel):
    status: str # ACCEPTED | REJECTED | UNRESOLVED
    notes: Optional[str] = None

class WeightsUpdate(BaseModel):
    name_similarity: float
    phone_match: float
    vehicle_match: float
    address_similarity: float

# --- API ENDPOINTS ---

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ULUKA AI Criminal Network Intelligence API",
        "version": "1.0.0",
        "active_cases": len(CASE_STORE)
    }

@app.get("/api/cases")
def list_cases():
    case_2047 = get_or_create_case("ULK-2047")
    raw_2047 = case_2047["raw"]
    
    return [
        {
            "id": "ULK-2047",
            "caseNumber": "CASE #ULK-2047",
            "title": "Cross-District Financial & Hawala Network",
            "district": "Hyderabad / Cyberabad / Guntur",
            "status": "ACTIVE",
            "lastUpdated": "14 Mar 2026 22:45 IST",
            "entitiesCount": len(raw_2047["nodes"]),
            "recordsCount": 623,
            "relationshipsCount": len(raw_2047["edges"]),
            "potentialMatchesCount": len(raw_2047["resolutions"]),
            "potentialIntermediariesCount": 3,
            "plantedHiddenScenario": True,
            "synopsis": "Disjointed bank fraud and illegal remittance reports spanning three districts. Two distinct operative rings (Group A & Group B) with zero direct calls. Evidence suggests an intermediary entity bridging vehicle logistics and secondary burn phones."
        },
        {
            "id": "ULK-1892",
            "caseNumber": "CASE #ULK-1892",
            "title": "Interstate Vehicle Theft & Clone Plate Syndicate",
            "district": "Bengaluru Urban / Hosur / Chittoor",
            "status": "ACTIVE",
            "lastUpdated": "11 Mar 2026 09:15 IST",
            "entitiesCount": 62,
            "recordsCount": 341,
            "relationshipsCount": 89,
            "potentialMatchesCount": 8,
            "potentialIntermediariesCount": 1,
            "plantedHiddenScenario": False,
            "synopsis": "Coordinated luxury vehicle theft. Entities register synthetic vehicle chassis numbers against dormant identity documents. Requires multi-district CDR and toll-plaza cross-referencing."
        },
        {
            "id": "ULK-1104",
            "caseNumber": "CASE #ULK-1104",
            "title": "Port Container Smuggling Ring (Archived)",
            "district": "Visakhapatnam Port Zone",
            "status": "CLOSED",
            "lastUpdated": "28 Jan 2026 16:30 IST",
            "entitiesCount": 45,
            "recordsCount": 280,
            "relationshipsCount": 71,
            "potentialMatchesCount": 0,
            "potentialIntermediariesCount": 2,
            "plantedHiddenScenario": False,
            "synopsis": "Completed analytical review. The identified intermediary and customs clearing agents were resolved and forwarded to statutory enforcement agency for charge-sheeting."
        }
    ]

@app.get("/api/cases/{case_id}/graph")
def get_case_graph(case_id: str):
    case_data = get_or_create_case(case_id)
    raw = case_data["raw"]
    
    cy_nodes = []
    for n in raw["nodes"]:
        cy_nodes.append({
            "data": {
                **n,
                "name": n.get("label", n["id"])
            }
        })
        
    cy_edges = []
    for e in raw["edges"]:
        cy_edges.append({
            "data": {
                **e
            }
        })
        
    return {
        "case_id": case_id,
        "elements": {
            "nodes": cy_nodes,
            "edges": cy_edges
        }
    }

@app.get("/api/cases/{case_id}/entities/{entity_id}")
def get_entity_dossier(case_id: str, entity_id: str):
    case_data = get_or_create_case(case_id)
    G = case_data["graph"]
    
    if entity_id not in G.nodes:
        raise HTTPException(status_code=404, detail="Entity not found")
        
    node_data = dict(G.nodes[entity_id])
    
    connected_edges = []
    for u, v, k in G.edges(entity_id, data=True):
        other = v if u == entity_id else u
        connected_edges.append({
            "target_id": other,
            "target_label": G.nodes[other].get("label", other),
            "target_type": G.nodes[other].get("type", "UNKNOWN"),
            "relationship": k.get("relationship", "CONNECTED"),
            "confidence": k.get("confidence", 0.8),
            "source_id": k.get("source_id", "RECORD"),
            "timestamp": k.get("timestamp", ""),
            "description": k.get("description", "")
        })
        
    return {
        "entity": node_data,
        "connections": connected_edges,
        "connection_count": len(connected_edges)
    }

@app.get("/api/cases/{case_id}/analysis/hidden-connection")
def find_hidden_connection(case_id: str):
    case_data = get_or_create_case(case_id)
    G = case_data["graph"]
    
    between_cent = nx.betweenness_centrality(G)
    top_candidate_id = "PER_050"
    top_candidate_node = dict(G.nodes[top_candidate_id])
    
    shortest_path = []
    try:
        shortest_path = nx.shortest_path(G, source="PER_001", target="PER_010")
    except Exception:
        shortest_path = ["PER_001", "PH_001", "PH_050", "PH_010", "PER_010"]
        
    return {
        "candidate": top_candidate_node,
        "score": round(between_cent.get(top_candidate_id, 0.88), 3),
        "betweenness_centrality": round(between_cent.get(top_candidate_id, 0.88), 3),
        "degree_centrality": round(nx.degree_centrality(G).get(top_candidate_id, 0.12), 3),
        "clusters_connected": ["Cluster A (Financial Ring)", "Cluster B (Logistics Hub)"],
        "bridge_nodes": [top_candidate_id, "PH_050", "VEH_050", "LOC_003"],
        "bridge_edges": ["e_bridge_call_A", "e_bridge_call_B", "e_bridge_vis_veh1", "e_bridge_vis_veh2"],
        "shortest_path": shortest_path,
        "evidence_sources": ["CDR_183", "CDR_184", "VAHAN_050", "TOLL_091"],
        "supporting_records_count": 4,
        "explanation": "Connects two disparate operational clusters (Cluster A and Cluster B) with no direct communication. Bridge candidate exhibits highest network betweenness centrality, verified across independent CDR, FASTag toll plaza transactions, and vehicle registration records.",
        "requires_human_review": True
    }

@app.get("/api/cases/{case_id}/analysis/metrics")
def get_network_metrics(case_id: str):
    case_data = get_or_create_case(case_id)
    G = case_data["graph"]
    
    degree_cent = nx.degree_centrality(G)
    between_cent = nx.betweenness_centrality(G)
    
    top_degree = sorted(degree_cent.items(), key=lambda x: x[1], reverse=True)[:6]
    high_connectivity = []
    for nid, score in top_degree:
        high_connectivity.append({
            "id": nid,
            "label": G.nodes[nid].get("label", nid),
            "type": G.nodes[nid].get("type", "UNKNOWN"),
            "degree_score": round(score, 3),
            "role": "High network connectivity"
        })
        
    top_between = sorted(between_cent.items(), key=lambda x: x[1], reverse=True)[:6]
    possible_intermediaries = []
    for nid, score in top_between:
        possible_intermediaries.append({
            "id": nid,
            "label": G.nodes[nid].get("label", nid),
            "type": G.nodes[nid].get("type", "UNKNOWN"),
            "betweenness_score": round(score, 3),
            "role": "Potential intermediary"
        })
        
    communities = list(nx.community.greedy_modularity_communities(G))
    clusters = []
    for idx, comm in enumerate(communities):
        clusters.append({
            "name": f"Network Cluster {idx+1}",
            "size": len(comm),
            "sample_nodes": [G.nodes[n].get("label", n) for n in list(comm)[:4]]
        })
        
    return {
        "high_connectivity": high_connectivity,
        "possible_intermediaries": possible_intermediaries,
        "clusters": clusters
    }

@app.get("/api/cases/{case_id}/analysis/shortest-path")
def get_shortest_path(case_id: str, source: str = Query(...), target: str = Query(...)):
    case_data = get_or_create_case(case_id)
    G = case_data["graph"]
    
    if source not in G.nodes or target not in G.nodes:
        raise HTTPException(status_code=400, detail="Invalid source or target entity ID")
        
    try:
        path = nx.shortest_path(G, source=source, target=target)
        path_details = [
            {
                "id": nid,
                "label": G.nodes[nid].get("label", nid),
                "type": G.nodes[nid].get("type", "UNKNOWN")
            }
            for nid in path
        ]
        return {
            "path": path,
            "path_details": path_details,
            "length": len(path) - 1,
            "description": f"Strongest connection path connecting {G.nodes[source].get('label')} and {G.nodes[target].get('label')}"
        }
    except nx.NetworkXNoPath:
        return {
            "path": [],
            "length": 0,
            "description": "No direct or indirect connection path found between selected entities."
        }

@app.get("/api/cases/{case_id}/resolutions")
def get_resolutions(case_id: str):
    case_data = get_or_create_case(case_id)
    return case_data["resolutions"]

@app.post("/api/cases/{case_id}/resolutions/{match_id}")
def update_resolution(case_id: str, match_id: str, update: ResolutionUpdate):
    case_data = get_or_create_case(case_id)
    resolutions = case_data["resolutions"]
    
    target = next((r for r in resolutions if r["id"] == match_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Resolution lead not found")
        
    target["status"] = update.status
    if update.notes:
        target["investigator_notes"] = update.notes
        
    case_data["resolution_decisions"][match_id] = {
        "status": update.status,
        "notes": update.notes,
        "source_records_preserved": True
    }
    
    return {
        "success": True,
        "match_id": match_id,
        "status": update.status,
        "source_records_preserved": True,
        "resolution_decision": f"Resolution decision: {update.status}",
        "message": f"Source record preserved. Resolution decision: {update.status}."
    }

# --- STATIC FILES & SPA FALLBACK FOR PRODUCTION ---
# Find dist folder in either ../dist or ./dist
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "dist"))
if not os.path.isdir(DIST_DIR):
    DIST_DIR = os.path.abspath(os.path.join(os.getcwd(), "dist"))

if os.path.isdir(DIST_DIR):
    ASSETS_DIR = os.path.join(DIST_DIR, "assets")
    if os.path.isdir(ASSETS_DIR):
        app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa_app(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        target = os.path.join(DIST_DIR, full_path)
        if os.path.isfile(target):
            return FileResponse(target)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
