# Synthetic Intelligence Data Generator for ULUKA AI
import random
from datetime import datetime, timedelta

def generate_case_data(case_id: str = "ULK-2047"):
    random.seed(42) # Strict determinism
    
    nodes = []
    edges = []
    
    # 1. GROUP A: Financial Ring (Cyberabad / Guntur)
    nodes.append({
        "id": "PER_001",
        "label": "Ravi Kumar",
        "type": "PERSON",
        "category": "GROUP_A",
        "district": "Cyberabad",
        "aliases": ["Ravi K.", "Ravi Kumr", "R. Kumar"],
        "notes": "Suspected primary coordinator for illicit cash collections in Guntur corridor.",
        "risk_level": "High Activity",
        "tags": ["Cluster A", "Syndicate Lead"]
    })
    nodes.append({
        "id": "PER_002",
        "label": "Suresh Reddy",
        "type": "PERSON",
        "category": "GROUP_A",
        "district": "Hyderabad",
        "aliases": ["S. Reddy", "Surya"],
        "notes": "Handles cash transit logistics and branch account deposits.",
        "risk_level": "Medium Activity",
        "tags": ["Cluster A"]
    })
    nodes.append({
        "id": "PER_003",
        "label": "Mohan Varma",
        "type": "PERSON",
        "category": "GROUP_A",
        "district": "Guntur",
        "aliases": ["M. Varma"],
        "notes": "Operates front warehousing near Guntur APMC market.",
        "risk_level": "Medium Activity",
        "tags": ["Cluster A"]
    })

    # Group A Infrastructure
    nodes.append({
        "id": "PH_001",
        "label": "+91 9876543221",
        "type": "PHONE",
        "imei": "864291048201948",
        "carrier": "Airtel AP",
        "notes": "Burner SIM registered under forged Aadhaar.",
        "tags": ["Cluster A"]
    })
    nodes.append({
        "id": "PH_002",
        "label": "+91 9876543222",
        "type": "PHONE",
        "imei": "864291048201949",
        "carrier": "Jio AP",
        "tags": ["Cluster A"]
    })
    nodes.append({
        "id": "VEH_001",
        "label": "AP39AB1234",
        "type": "VEHICLE",
        "model": "Toyota Fortuner (White)",
        "engine_no": "2GD891274",
        "notes": "Seen crossing Guntur toll plaza frequently late night.",
        "tags": ["Cluster A"]
    })
    nodes.append({
        "id": "ACC_001",
        "label": "HDFC #0941019",
        "type": "ACCOUNT",
        "bank": "HDFC Bank Banjara Hills",
        "turnover": "₹1.42 Cr",
        "tags": ["Cluster A"]
    })
    nodes.append({
        "id": "LOC_001",
        "label": "Guntur Warehouse Yard",
        "type": "LOCATION",
        "coordinates": [16.3067, 80.4365],
        "district": "Guntur",
        "tags": ["Cluster A"]
    })
    nodes.append({
        "id": "CASE_001",
        "label": "FIR #021/2026",
        "type": "CASE",
        "ps": "Cyberabad EOW",
        "sections": "Sec 420, 120B IPC",
        "tags": ["Cluster A"]
    })

    # 2. GROUP B: Logistics & Hawala Ring (Hyderabad / Pune)
    nodes.append({
        "id": "PER_010",
        "label": "Ajay 'Pandu' Singh",
        "type": "PERSON",
        "category": "GROUP_B",
        "district": "Secunderabad",
        "aliases": ["Pandu Bhai", "A. K. Singh"],
        "notes": "Controls transport fleet connecting Cyberabad to interstate transit hubs.",
        "risk_level": "High Activity",
        "tags": ["Cluster B", "Syndicate Lead"]
    })
    nodes.append({
        "id": "PER_011",
        "label": "Manoj Tiwari",
        "type": "PERSON",
        "category": "GROUP_B",
        "district": "Pune / Hyderabad",
        "aliases": ["M. Tiwari"],
        "notes": "Interstate consignment broker.",
        "risk_level": "Medium Activity",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "PER_012",
        "label": "Sunil Patil",
        "type": "PERSON",
        "category": "GROUP_B",
        "district": "Solapur / Hyd",
        "aliases": ["S. Patil"],
        "notes": "Driver supervisor for fleet.",
        "risk_level": "Low Activity",
        "tags": ["Cluster B"]
    })

    # Group B Infrastructure
    nodes.append({
        "id": "PH_010",
        "label": "+91 9765432100",
        "type": "PHONE",
        "imei": "359182049281742",
        "carrier": "Vodafone Idea",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "PH_011",
        "label": "+91 9765432101",
        "type": "PHONE",
        "imei": "359182049281743",
        "carrier": "BSNL TS",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "VEH_002",
        "label": "MH12QR8821",
        "type": "VEHICLE",
        "model": "Mahindra Bolero Pickup",
        "notes": "Frequent night transit between Hyderabad and Pune corridor.",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "ACC_002",
        "label": "ICICI #8841029",
        "type": "ACCOUNT",
        "bank": "ICICI Somajiguda",
        "turnover": "₹2.85 Cr",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "LOC_002",
        "label": "Cyberabad Logistics Hub",
        "type": "LOCATION",
        "coordinates": [17.4399, 78.3772],
        "district": "Cyberabad",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "CASE_002",
        "label": "FIR #039/2026",
        "type": "CASE",
        "ps": "Gopalapuram PS",
        "sections": "Sec 411, 468 IPC",
        "tags": ["Cluster B"]
    })

    # 3. PLANTED HIDDEN INTERMEDIARY (The Bridge)
    nodes.append({
        "id": "PER_050",
        "label": "Vikram 'Vicky' Rao",
        "type": "PERSON",
        "category": "INTERMEDIARY",
        "district": "Nalgonda / Suryapet",
        "aliases": ["V. Rao", "Vicky Anna", "Vikram R."],
        "notes": "Operates midway logistics clearing and private security escort service along NH-65. Never listed on primary FIRs of either group.",
        "risk_level": "Critical Intermediary",
        "is_bridge": True,
        "tags": ["Potential Intermediary", "Bridge Candidate"]
    })
    nodes.append({
        "id": "PH_050",
        "label": "+91 9988776655",
        "type": "PHONE",
        "imei": "869201948201948",
        "carrier": "Airtel TS",
        "notes": "High betweenness phone bridging Guntur and Hyderabad calls.",
        "tags": ["Bridge Phone"]
    })
    nodes.append({
        "id": "VEH_050",
        "label": "TS09XY5512",
        "type": "VEHICLE",
        "model": "Hyundai Creta (Dark Grey)",
        "notes": "Observed meeting vehicles from both Cluster A and Cluster B.",
        "tags": ["Bridge Vehicle"]
    })
    nodes.append({
        "id": "LOC_003",
        "label": "Suryapet Highway Hub",
        "type": "LOCATION",
        "coordinates": [17.1439, 79.6239],
        "district": "Suryapet",
        "notes": "Midpoint transit interchange on NH-65.",
        "tags": ["Bridge Location"]
    })

    # 4. RED HERRINGS & CIVILIAN DISTRACTORS
    nodes.append({
        "id": "LOC_005",
        "label": "Secunderabad Junction Hub",
        "type": "LOCATION",
        "coordinates": [17.4334, 78.5045],
        "district": "Hyderabad",
        "notes": "High-density public railway transit area. Over 19 unrelated case entities pass through daily. Deliberate false lead.",
        "tags": ["Red Herring", "Public Density Hub"]
    })
    nodes.append({
        "id": "PER_025",
        "label": "Ravi Shankar Kumar",
        "type": "PERSON",
        "category": "DISTRACTOR",
        "district": "Vijayawada",
        "aliases": ["R. S. Kumar"],
        "notes": "Civil building contractor. Unrelated identity with phonetically matching name.",
        "risk_level": "Civilian Distractor",
        "tags": ["False Match"]
    })
    nodes.append({
        "id": "PH_025",
        "label": "+91 9440112233",
        "type": "PHONE",
        "carrier": "BSNL AP",
        "tags": ["Distractor Phone"]
    })

    # Add 40 additional realistic network entities (synthetic associates, secondary phones, bank handlers)
    additional_first_names = ["Kiran", "Naresh", "Venkatesh", "Deepak", "Anand", "Satish", "Rajesh", "Prakash", "Sanjay", "Mahesh",
                              "Arun", "Babu", "Gopal", "Dinesh", "Harish", "Jagdish", "Karthik", "Lokesh", "Muralidhar", "Naveen"]
    for i, fn in enumerate(additional_first_names, start=20):
        ln = ["Rao", "Gupta", "Naidu", "Sharma", "Yadav", "Chowdary", "Reddy"][i % 7]
        p_id = f"PER_{i:03d}"
        ph_id = f"PH_{i:03d}"
        cluster_tag = "Cluster A" if i % 2 == 0 else "Cluster B"
        nodes.append({
            "id": p_id,
            "label": f"{fn} {ln}",
            "type": "PERSON",
            "category": "ASSOCIATE",
            "district": "Hyderabad" if i % 2 == 0 else "Guntur",
            "notes": "Secondary courier or account holder observed in peripheral call records.",
            "risk_level": "Low Activity",
            "tags": [cluster_tag, "Secondary Associate"]
        })
        nodes.append({
            "id": ph_id,
            "label": f"+91 98{i:02d}10{i:02d}99",
            "type": "PHONE",
            "carrier": "Airtel" if i % 2 == 0 else "Jio",
            "tags": [cluster_tag]
        })
        # Link associate to phone
        edges.append({
            "id": f"e_uses_{p_id}",
            "source": p_id,
            "target": ph_id,
            "relationship": "USES",
            "confidence": 0.88,
            "source_id": f"CAF_{i:03d}",
            "timestamp": "2026-02-10T10:15:00",
            "description": "Subscriber registration record."
        })
        # Link to main cluster coordinator
        parent_id = "PER_001" if i % 2 == 0 else "PER_010"
        edges.append({
            "id": f"e_assoc_{p_id}_{parent_id}",
            "source": p_id,
            "target": parent_id,
            "relationship": "ASSOCIATED_WITH",
            "confidence": 0.72,
            "source_id": f"FIR_REF_{i}",
            "timestamp": "2026-02-22T14:20:00",
            "description": "Operational coordination on local delivery."
        })
        # Also 8 of them visit Secunderabad Junction (Red Herring)
        if i % 3 == 0:
            edges.append({
                "id": f"e_rh_{p_id}",
                "source": p_id,
                "target": "LOC_005",
                "relationship": "VISITED",
                "confidence": 0.45,
                "source_id": f"TOWER_LOC_{i}",
                "timestamp": "2026-03-01T12:00:00",
                "description": "Cell tower location ping near Secunderabad Station."
            })

    # --- PRIMARY RELATIONSHIPS ---
    # Group A Edges
    edges.append({
        "id": "e_uses_per1",
        "source": "PER_001",
        "target": "PH_001",
        "relationship": "USES",
        "confidence": 0.96,
        "source_id": "CDR_183",
        "timestamp": "2026-01-15T09:30:00",
        "description": "Primary voice and SMS line used by Ravi Kumar."
    })
    edges.append({
        "id": "e_owns_per1_veh",
        "source": "PER_001",
        "target": "VEH_001",
        "relationship": "OWNS",
        "confidence": 0.94,
        "source_id": "VAHAN_044",
        "timestamp": "2026-01-18T11:00:00",
        "description": "Registered owner in Vahan vehicle database."
    })
    edges.append({
        "id": "e_holds_per1_acc",
        "source": "PER_001",
        "target": "ACC_001",
        "relationship": "HOLDS",
        "confidence": 0.95,
        "source_id": "KYC_912",
        "timestamp": "2026-01-20T14:00:00",
        "description": "Designated signatory for current account."
    })
    edges.append({
        "id": "e_inv_per1_case",
        "source": "PER_001",
        "target": "CASE_001",
        "relationship": "INVOLVED_IN",
        "confidence": 0.98,
        "source_id": "FIR_021",
        "timestamp": "2026-02-01T16:00:00",
        "description": "Named in complaint regarding fraudulent remittances."
    })
    edges.append({
        "id": "e_vis_per1_loc1",
        "source": "PER_001",
        "target": "LOC_001",
        "relationship": "VISITED",
        "confidence": 0.91,
        "source_id": "CDR_TOWER_01",
        "timestamp": "2026-02-14T20:15:00",
        "description": "Multiple tower pings at Guntur logistics site."
    })
    edges.append({
        "id": "e_calls_p1_p2",
        "source": "PH_001",
        "target": "PH_002",
        "relationship": "CALLS",
        "confidence": 0.92,
        "source_id": "CDR_183",
        "timestamp": "2026-03-10T18:45:00",
        "description": "14 calls logged between Ravi and Suresh."
    })
    edges.append({
        "id": "e_uses_p2",
        "source": "PER_002",
        "target": "PH_002",
        "relationship": "USES",
        "confidence": 0.93,
        "source_id": "CAF_022",
        "timestamp": "2026-01-10T10:00:00",
        "description": "Subscriber document verified."
    })
    edges.append({
        "id": "e_assoc_p1_p3",
        "source": "PER_001",
        "target": "PER_003",
        "relationship": "ASSOCIATED_WITH",
        "confidence": 0.89,
        "source_id": "INTEL_NOTE_11",
        "timestamp": "2026-02-28T16:30:00",
        "description": "Joint lease agreement for storage godown."
    })

    # Group B Edges
    edges.append({
        "id": "e_uses_p10",
        "source": "PER_010",
        "target": "PH_010",
        "relationship": "USES",
        "confidence": 0.97,
        "source_id": "CDR_039",
        "timestamp": "2026-01-12T11:20:00",
        "description": "Dedicated dispatch SIM for Ajay Singh."
    })
    edges.append({
        "id": "e_owns_p10_veh",
        "source": "PER_010",
        "target": "VEH_002",
        "relationship": "OWNS",
        "confidence": 0.92,
        "source_id": "VAHAN_082",
        "timestamp": "2026-01-14T15:30:00",
        "description": "Commercial fleet permit holder."
    })
    edges.append({
        "id": "e_holds_p10_acc",
        "source": "PER_010",
        "target": "ACC_002",
        "relationship": "HOLDS",
        "confidence": 0.94,
        "source_id": "BANK_STMT_33",
        "timestamp": "2026-01-22T10:00:00",
        "description": "High value wire transfers."
    })
    edges.append({
        "id": "e_inv_p10_case",
        "source": "PER_010",
        "target": "CASE_002",
        "relationship": "INVOLVED_IN",
        "confidence": 0.95,
        "source_id": "FIR_039",
        "timestamp": "2026-02-05T18:00:00",
        "description": "Named as transport operator in freight diversion case."
    })
    edges.append({
        "id": "e_vis_p10_loc2",
        "source": "PER_010",
        "target": "LOC_002",
        "relationship": "VISITED",
        "confidence": 0.89,
        "source_id": "TOWER_CYB_12",
        "timestamp": "2026-02-18T19:00:00",
        "description": "Daily attendance at Cyberabad Logistics Park."
    })
    edges.append({
        "id": "e_calls_p10_p11",
        "source": "PH_010",
        "target": "PH_011",
        "relationship": "CALLS",
        "confidence": 0.90,
        "source_id": "CDR_039",
        "timestamp": "2026-03-08T21:15:00",
        "description": "22 calls between Ajay Singh and Manoj Tiwari."
    })
    edges.append({
        "id": "e_uses_p11",
        "source": "PER_011",
        "target": "PH_011",
        "relationship": "USES",
        "confidence": 0.91,
        "source_id": "CAF_039",
        "timestamp": "2026-01-10T12:00:00",
        "description": "Verified SIM holder."
    })

    # --- PLANTED HIDDEN CONNECTION (Intermediary X) ---
    # Vikram Rao infrastructure
    edges.append({
        "id": "e_uses_p50",
        "source": "PER_050",
        "target": "PH_050",
        "relationship": "USES",
        "confidence": 0.95,
        "source_id": "CAF_050",
        "timestamp": "2026-01-05T08:00:00",
        "description": "Personal secure phone of Vikram Rao."
    })
    edges.append({
        "id": "e_owns_p50_veh",
        "source": "PER_050",
        "target": "VEH_050",
        "relationship": "OWNS",
        "confidence": 0.93,
        "source_id": "VAHAN_050",
        "timestamp": "2026-01-12T14:00:00",
        "description": "Vehicle registered under Vikram Rao."
    })
    edges.append({
        "id": "e_vis_p50_loc3",
        "source": "PER_050",
        "target": "LOC_003",
        "relationship": "VISITED",
        "confidence": 0.94,
        "source_id": "TOLL_091",
        "timestamp": "2026-03-14T23:30:00",
        "description": "Vehicle TS09XY5512 recorded at Suryapet Toll Plaza."
    })

    # BRIDGE EDGE 1: Vikram Rao (Intermediary X) <--> Group A (Ravi Kumar)
    edges.append({
        "id": "e_bridge_call_A",
        "source": "PH_050",
        "target": "PH_001",
        "relationship": "CALLS",
        "confidence": 0.92,
        "source_id": "CDR_183",
        "timestamp": "2026-03-14T22:43:00",
        "description": "Late night 7-minute encrypted voice session between Vikram Rao and Ravi Kumar right before transit.",
        "is_bridge": True
    })
    # BRIDGE EDGE 2: Vikram Rao (Intermediary X) <--> Group B (Ajay Singh)
    edges.append({
        "id": "e_bridge_call_B",
        "source": "PH_050",
        "target": "PH_010",
        "relationship": "CALLS",
        "confidence": 0.91,
        "source_id": "CDR_184",
        "timestamp": "2026-03-15T01:12:00",
        "description": "Confirmation call from Vikram Rao to Ajay Singh upon delivery arriving at Suryapet perimeter.",
        "is_bridge": True
    })
    # Bridge Edge 3: Vehicle co-presence at Suryapet Hub
    edges.append({
        "id": "e_bridge_vis_veh1",
        "source": "VEH_001",
        "target": "LOC_003",
        "relationship": "VISITED",
        "confidence": 0.89,
        "source_id": "FASTAG_091",
        "timestamp": "2026-03-14T23:15:00",
        "description": "White Fortuner AP39AB1234 recorded at Suryapet Toll 15 minutes before Vikram Rao."
    })
    edges.append({
        "id": "e_bridge_vis_veh2",
        "source": "VEH_002",
        "target": "LOC_003",
        "relationship": "VISITED",
        "confidence": 0.87,
        "source_id": "FASTAG_092",
        "timestamp": "2026-03-15T01:30:00",
        "description": "Bolero Pickup MH12QR8821 recorded at Suryapet Toll meeting Vikram Rao vehicle."
    })

    # Distractor edges
    edges.append({
        "id": "e_uses_p25",
        "source": "PER_025",
        "target": "PH_025",
        "relationship": "USES",
        "confidence": 0.90,
        "source_id": "CAF_025",
        "timestamp": "2026-01-08T09:00:00",
        "description": "Legitimate contractor phone line."
    })
    edges.append({
        "id": "e_calls_distractor",
        "source": "PH_025",
        "target": "PH_002",
        "relationship": "CALLS",
        "confidence": 0.35,
        "source_id": "CDR_MISC_09",
        "timestamp": "2026-02-18T10:14:00",
        "description": "Single 12-second misdialed inquiry. Low confidence lead."
    })

    # Entity Resolution Candidates (Noisy records)
    resolutions = [
        {
            "id": "RES_001",
            "recordA": {
                "name": "Ravi Kumar",
                "phone": "+91 9876543221",
                "vehicle": "AP39AB1234",
                "address": "Plot 42, Jubilee Hills, Hyderabad",
                "source": "FIR_021 / Cyberabad EOW"
            },
            "recordB": {
                "name": "Ravi K.",
                "phone": "+91 9876543221",
                "vehicle": "AP39AB1234",
                "address": "Flat 402, Jubilee Heights, Hyd",
                "source": "CDR_183 / Airtel AP"
            },
            "matchScore": 94,
            "weights": {
                "name_similarity": 0.92,
                "phone_match": 1.0,
                "vehicle_match": 1.0,
                "address_similarity": 0.61
            },
            "reasons": [
                "Exact phone match (+91 9876543221)",
                "Exact vehicle match (AP39AB1234)",
                "Name similarity: 92% (Ravi Kumar vs Ravi K.)",
                "Address similarity: 61% (Jubilee Hills / Jubilee Heights)"
            ],
            "status": "UNRESOLVED",
            "entity_id": "PER_001"
        },
        {
            "id": "RES_002",
            "recordA": {
                "name": "Suresh Reddy",
                "phone": "+91 9876543222",
                "vehicle": "TS07FA4412",
                "address": "Road No. 10, Banjara Hills",
                "source": "KYC_912 / HDFC"
            },
            "recordB": {
                "name": "S. Reddy",
                "phone": "+91 9876543222",
                "vehicle": "TS07FA4412",
                "address": "Banjara Hills, Hyderabad",
                "source": "CAF_022 / Jio AP"
            },
            "matchScore": 89,
            "weights": {
                "name_similarity": 0.85,
                "phone_match": 1.0,
                "vehicle_match": 1.0,
                "address_similarity": 0.55
            },
            "reasons": [
                "Exact phone match (+91 9876543222)",
                "Exact vehicle match (TS07FA4412)",
                "Name abbreviation: S. Reddy"
            ],
            "status": "UNRESOLVED",
            "entity_id": "PER_002"
        },
        {
            "id": "RES_003",
            "recordA": {
                "name": "Vikram 'Vicky' Rao",
                "phone": "+91 9988776655",
                "vehicle": "TS09XY5512",
                "address": "Suryapet Bypass",
                "source": "TOLL_091 / FASTag"
            },
            "recordB": {
                "name": "V. Rao",
                "phone": "+91 9988776655",
                "vehicle": "TS09XY5512",
                "address": "NH65 Commercial Arcade, Suryapet",
                "source": "VAHAN_050 / Transport Dept"
            },
            "matchScore": 91,
            "weights": {
                "name_similarity": 0.88,
                "phone_match": 1.0,
                "vehicle_match": 1.0,
                "address_similarity": 0.72
            },
            "reasons": [
                "Exact phone match (+91 9988776655)",
                "Exact vehicle registration (TS09XY5512)",
                "Common Suryapet transit hub jurisdiction"
            ],
            "status": "UNRESOLVED",
            "entity_id": "PER_050"
        },
        {
            "id": "RES_004",
            "recordA": {
                "name": "Ravi Kumar",
                "phone": "+91 9876543221",
                "vehicle": "AP39AB1234",
                "address": "Jubilee Hills, Hyderabad",
                "source": "FIR_021"
            },
            "recordB": {
                "name": "Ravi Shankar Kumar",
                "phone": "+91 9440112233",
                "vehicle": "AP16BQ9901",
                "address": "Governorpet, Vijayawada",
                "source": "CIVIL_CONTRACT_81"
            },
            "matchScore": 41,
            "weights": {
                "name_similarity": 0.74,
                "phone_match": 0.0,
                "vehicle_match": 0.0,
                "address_similarity": 0.15
            },
            "reasons": [
                "Disparate phone numbers",
                "Different vehicle registrations",
                "Different district residency",
                "Low correlation — Likely false match distractor"
            ],
            "status": "UNRESOLVED",
            "entity_id": "PER_025"
        }
    ]

    return {
        "case_id": case_id,
        "nodes": nodes,
        "edges": edges,
        "resolutions": resolutions
    }
