# Synthetic Intelligence Data Generator for ULUKA AI
import random
from datetime import datetime, timedelta

def generate_ulk_2047():
    random.seed(42)
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
        "label": "Ramesh Naidu",
        "type": "PERSON",
        "category": "GROUP_B",
        "district": "Hyderabad",
        "aliases": ["Naidu Garu", "R.N."],
        "notes": "Oversees inter-state courier clearing and real-estate cash offloading.",
        "risk_level": "High Activity",
        "tags": ["Cluster B", "Syndicate Lead"]
    })
    nodes.append({
        "id": "PER_011",
        "label": "Vijay Sethi",
        "type": "PERSON",
        "category": "GROUP_B",
        "district": "Pune / Cyberabad",
        "aliases": ["V. Sethi", "Trader Vijay"],
        "notes": "Operates bullion and precious gemstone trading counters.",
        "risk_level": "Medium Activity",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "PER_012",
        "label": "Karthik Pillai",
        "type": "PERSON",
        "category": "GROUP_B",
        "district": "Secunderabad",
        "aliases": ["Pillai Bro"],
        "notes": "Transporter managing overnight container dispatches.",
        "risk_level": "Medium Activity",
        "tags": ["Cluster B"]
    })

    # Group B Infrastructure
    nodes.append({
        "id": "PH_010",
        "label": "+91 9123456780",
        "type": "PHONE",
        "imei": "863920194810293",
        "carrier": "Vodafone Idea",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "PH_011",
        "label": "+91 9123456781",
        "type": "PHONE",
        "imei": "863920194810294",
        "carrier": "Airtel TS",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "VEH_010",
        "label": "TS09CD9876",
        "type": "VEHICLE",
        "model": "Mahindra Scorpio (Black)",
        "engine_no": "MH89201928",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "ACC_010",
        "label": "ICICI #4492018",
        "type": "ACCOUNT",
        "bank": "ICICI Bank Somajiguda",
        "turnover": "₹2.88 Cr",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "LOC_002",
        "label": "Shamshabad Transport Hub",
        "type": "LOCATION",
        "coordinates": [17.2403, 78.4294],
        "district": "Cyberabad",
        "tags": ["Cluster B"]
    })
    nodes.append({
        "id": "CASE_002",
        "label": "FIR #108/2026",
        "type": "CASE",
        "ps": "Hyderabad Task Force",
        "sections": "Sec 406, 34 IPC",
        "tags": ["Cluster B"]
    })

    # 3. THE HIDDEN INTERMEDIARY (The Bridge)
    nodes.append({
        "id": "PER_050",
        "label": "Anand Rao",
        "type": "PERSON",
        "category": "INTERMEDIARY",
        "district": "Suryapet / Nalgonda",
        "aliases": ["A. Rao", "Rao Saab", "Anand K."],
        "notes": "CRITICAL BRIDGE: Acts as covert intermediary between Guntur cash ring and Hyderabad logistics. Zero direct phone calls logged between Ravi and Ramesh.",
        "risk_level": "Hidden High Value",
        "tags": ["Bridge Candidate", "Entity Resolution Target"]
    })
    nodes.append({
        "id": "PH_050",
        "label": "+91 9988776655",
        "type": "PHONE",
        "imei": "861928374619283",
        "carrier": "BSNL AP",
        "notes": "Secondary feature phone calling both Group A and Group B cut-outs.",
        "tags": ["Bridge Phone"]
    })
    nodes.append({
        "id": "VEH_050",
        "label": "TS09XY5512",
        "type": "VEHICLE",
        "model": "Maruti Ertiga (Silver)",
        "engine_no": "K15B991204",
        "notes": "FASTag logs match travel times between Suryapet and Hyderabad ring road.",
        "tags": ["Bridge Vehicle"]
    })
    nodes.append({
        "id": "LOC_003",
        "label": "Suryapet Highway Junction Motel",
        "type": "LOCATION",
        "coordinates": [17.1439, 79.6239],
        "district": "Suryapet",
        "notes": "Physical handoff node linking Vijayawada-Hyderabad NH65 highway corridor.",
        "tags": ["Bridge Location"]
    })

    # Additional realistic network entities
    first_names = ["Kiran", "Naresh", "Venkatesh", "Deepak", "Anand", "Satish", "Rajesh", "Prakash", "Sanjay", "Mahesh",
                   "Arun", "Babu", "Gopal", "Dinesh", "Harish", "Jagdish", "Karthik", "Lokesh", "Muralidhar", "Naveen"]
    for i, fn in enumerate(first_names, start=20):
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
            "notes": "Secondary courier or account holder observed in peripheral records.",
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

    # Group A Internal Edges
    edges.extend([
        {"id": "e_a1", "source": "PER_001", "target": "PH_001", "relationship": "USES", "confidence": 0.95, "source_id": "CAF_901", "timestamp": "2026-01-15T09:30:00", "description": "Primary voice line."},
        {"id": "e_a2", "source": "PER_001", "target": "VEH_001", "relationship": "TRAVELS_IN", "confidence": 0.88, "source_id": "TOLL_442", "timestamp": "2026-02-01T23:14:00", "description": "Guntur toll passage."},
        {"id": "e_a3", "source": "PER_001", "target": "ACC_001", "relationship": "OPERATES", "confidence": 0.91, "source_id": "KYC_HDFC", "timestamp": "2026-01-10T11:00:00", "description": "Beneficial signatory."},
        {"id": "e_a4", "source": "PER_001", "target": "PER_002", "relationship": "COORDINATES", "confidence": 0.85, "source_id": "SURV_01", "timestamp": "2026-02-14T14:00:00", "description": "Meeting logged at Jubilee Hills."},
        {"id": "e_a5", "source": "PER_002", "target": "PH_002", "relationship": "USES", "confidence": 0.92, "source_id": "CAF_902", "timestamp": "2026-01-18T10:00:00", "description": "Secondary line."},
        {"id": "e_a6", "source": "PER_002", "target": "PER_003", "relationship": "DISPATCHES_TO", "confidence": 0.82, "source_id": "TRANS_77", "timestamp": "2026-02-18T16:30:00", "description": "Consignment delivery."},
        {"id": "e_a7", "source": "PER_003", "target": "LOC_001", "relationship": "MANAGES", "confidence": 0.94, "source_id": "PROP_REG", "timestamp": "2025-11-20T10:00:00", "description": "Lease deed holder."},
        {"id": "e_a8", "source": "PER_001", "target": "CASE_001", "relationship": "NAMED_IN", "confidence": 0.99, "source_id": "COURT_EOW", "timestamp": "2026-01-05T00:00:00", "description": "Named Accused #2."}
    ])

    # Group B Internal Edges
    edges.extend([
        {"id": "e_b1", "source": "PER_010", "target": "PH_010", "relationship": "USES", "confidence": 0.96, "source_id": "CAF_810", "timestamp": "2026-01-12T08:45:00", "description": "Registered subscriber."},
        {"id": "e_b2", "source": "PER_010", "target": "VEH_010", "relationship": "REGISTERED_OWNER", "confidence": 0.99, "source_id": "VAHAN_TS", "timestamp": "2025-08-12T12:00:00", "description": "Vehicle ownership record."},
        {"id": "e_b3", "source": "PER_010", "target": "ACC_010", "relationship": "OPERATES", "confidence": 0.89, "source_id": "KYC_ICICI", "timestamp": "2025-09-01T15:00:00", "description": "Direct bank account holder."},
        {"id": "e_b4", "source": "PER_010", "target": "PER_011", "relationship": "FINANCES", "confidence": 0.87, "source_id": "BANK_TRX", "timestamp": "2026-02-10T11:20:00", "description": "Hawala debit ledger entries."},
        {"id": "e_b5", "source": "PER_011", "target": "PH_011", "relationship": "USES", "confidence": 0.90, "source_id": "CAF_811", "timestamp": "2026-01-22T09:10:00", "description": "Trade handset."},
        {"id": "e_b6", "source": "PER_010", "target": "PER_012", "relationship": "ORDERS_SHIPMENT", "confidence": 0.84, "source_id": "LOG_WAYBILL", "timestamp": "2026-02-25T19:00:00", "description": "Waybill clearance orders."},
        {"id": "e_b7", "source": "PER_012", "target": "LOC_002", "relationship": "STATIONED_AT", "confidence": 0.91, "source_id": "GPS_LOG", "timestamp": "2026-02-26T03:00:00", "description": "Transport depot supervisor."},
        {"id": "e_b8", "source": "PER_010", "target": "CASE_002", "relationship": "NAMED_IN", "confidence": 0.99, "source_id": "TF_REPORT", "timestamp": "2026-02-02T00:00:00", "description": "Prime suspect in Hawala transit."}
    ])

    # Intermediary Bridge Edges (Planted Connection)
    edges.extend([
        {"id": "e_bridge_call_A", "source": "PH_002", "target": "PH_050", "relationship": "DIRECT_CALL", "confidence": 0.92, "source_id": "CDR_183", "timestamp": "2026-02-14T21:12:00", "description": "14 encrypted voice calls logged between Suresh Reddy and Anand Rao."},
        {"id": "e_bridge_call_B", "source": "PH_050", "target": "PH_011", "relationship": "DIRECT_CALL", "confidence": 0.91, "source_id": "CDR_184", "timestamp": "2026-02-14T21:45:00", "description": "Immediate 8-minute callback to Vijay Sethi following Group A dispatch."},
        {"id": "e_bridge_vis_veh1", "source": "PER_050", "target": "VEH_050", "relationship": "REGISTERED_OWNER", "confidence": 0.99, "source_id": "VAHAN_050", "timestamp": "2025-06-19T10:00:00", "description": "Registered owner of silver Ertiga."},
        {"id": "e_bridge_vis_veh2", "source": "VEH_050", "target": "LOC_003", "relationship": "TOLL_CAPTURE", "confidence": 0.94, "source_id": "TOLL_091", "timestamp": "2026-02-15T01:30:00", "description": "FASTag entry at Suryapet junction motel matching exchange window."}
    ])

    resolutions = [
        {
            "id": "RES_001",
            "recordA": {"name": "Ravi Kumar", "phone": "+91 9876543221", "vehicle": "AP39AB1234", "address": "Jubilee Hills, Hyderabad", "source": "FIR_021"},
            "recordB": {"name": "R. Kumar", "phone": "+91 9876543221", "vehicle": "AP39AB1234", "address": "Road No. 36 Jubilee Hills, Hyderabad", "source": "VAHAN_AP"},
            "matchScore": 96,
            "weights": {"name_similarity": 0.85, "phone_match": 1.0, "vehicle_match": 1.0, "address_similarity": 0.95},
            "reasons": ["Exact phone match (+91 9876543221)", "Exact vehicle match (AP39AB1234)", "Address phonetic match"],
            "status": "UNRESOLVED",
            "entity_id": "PER_001"
        },
        {
            "id": "RES_002",
            "recordA": {"name": "Suresh Reddy", "phone": "+91 9876543222", "vehicle": None, "address": "Dilsukhnagar, Hyderabad", "source": "CAF_902"},
            "recordB": {"name": "Surya Reddy", "phone": "+91 9876543222", "vehicle": None, "address": "Chaitanyapuri Main Rd, Hyderabad", "source": "BANK_HDFC"},
            "matchScore": 84,
            "weights": {"name_similarity": 0.72, "phone_match": 1.0, "vehicle_match": 0.0, "address_similarity": 0.81},
            "reasons": ["Exact phone match (+91 9876543222)", "Close geographical address (Chaitanyapuri / Dilsukhnagar)"],
            "status": "UNRESOLVED",
            "entity_id": "PER_002"
        },
        {
            "id": "RES_003",
            "recordA": {"name": "Anand Rao", "phone": "+91 9988776655", "vehicle": "TS09XY5512", "address": "Suryapet Highway, Nalgonda", "source": "CDR_LOG"},
            "recordB": {"name": "A. Rao", "phone": "+91 9988776655", "vehicle": "TS09XY5512", "address": "NH65 Junction, Suryapet", "source": "FASTAG_PORTAL"},
            "matchScore": 91,
            "weights": {"name_similarity": 0.88, "phone_match": 1.0, "vehicle_match": 1.0, "address_similarity": 0.72},
            "reasons": ["Exact phone match (+91 9988776655)", "Exact vehicle registration (TS09XY5512)", "Common Suryapet transit hub jurisdiction"],
            "status": "UNRESOLVED",
            "entity_id": "PER_050"
        }
    ]

    return {"case_id": "ULK-2047", "nodes": nodes, "edges": edges, "resolutions": resolutions}


def generate_ulk_1892():
    random.seed(1892)
    nodes = []
    edges = []

    # 1. BENGALURU THEFT RING (Luxury SUV targeting)
    nodes.append({
        "id": "PER_101",
        "label": "Imran 'Mechanic' Khan",
        "type": "PERSON",
        "category": "THEFT_LEAD",
        "district": "Bengaluru Urban",
        "aliases": ["Imran K.", "Chotu Mechanic", "I. Khan"],
        "notes": "Master electronic key cloner and CAN-bus immobilizer hacker. Steals Fortuners in under 90 seconds.",
        "risk_level": "High Threat",
        "tags": ["Theft Crew", "Hacker"]
    })
    nodes.append({
        "id": "PER_102",
        "label": "Vikram 'Vicky' Hegde",
        "type": "PERSON",
        "category": "RECON_SPOTTER",
        "district": "Bengaluru South",
        "aliases": ["Vicky", "V. Hegde"],
        "notes": "Surveys apartment basement parking in Whitefield & Koramangala to locate target SUVs.",
        "risk_level": "Medium Threat",
        "tags": ["Theft Crew"]
    })
    nodes.append({
        "id": "PER_103",
        "label": "Rajesh Rao",
        "type": "PERSON",
        "category": "DOCUMENT_FORGER",
        "district": "Bengaluru Central",
        "aliases": ["RTO Rajesh", "R. Rao"],
        "notes": "Procures counterfeit RTO smart cards, high-security registration plates (HSRP), and bogus NOCs.",
        "risk_level": "Medium Threat",
        "tags": ["Theft Crew", "RTO Broker"]
    })

    # Bengaluru Infrastructure
    nodes.append({
        "id": "PH_101",
        "label": "+91 9845012345",
        "type": "PHONE",
        "imei": "865910482019401",
        "carrier": "Airtel Karnataka",
        "notes": "Burner phone active only during 01:00 to 04:30 AM heist operations.",
        "tags": ["Burner"]
    })
    nodes.append({
        "id": "PH_102",
        "label": "+91 9731298765",
        "type": "PHONE",
        "carrier": "Jio Karnataka",
        "tags": ["Theft Crew"]
    })
    nodes.append({
        "id": "DEV_101",
        "label": "Autel MaxiIM IM608 Pro",
        "type": "DEVICE",
        "notes": "Handheld key programming & ECU diagnostics tablet used to clone Toyota/Mahindra smart keys.",
        "tags": ["Forensic Evidence"]
    })
    nodes.append({
        "id": "VEH_101",
        "label": "KA05MN4412",
        "type": "VEHICLE",
        "model": "Toyota Fortuner (Cloned Plate)",
        "engine_no": "1GD-FTV-89102",
        "notes": "Stolen from HSR Layout; clone plates bearing registration of legitimate vehicle in Mangalore.",
        "tags": ["Target Vehicle"]
    })
    nodes.append({
        "id": "LOC_101",
        "label": "Madiwala Underground Parking",
        "type": "LOCATION",
        "coordinates": [12.9226, 77.6174],
        "district": "Bengaluru Urban",
        "tags": ["Staging Area"]
    })
    nodes.append({
        "id": "CASE_101",
        "label": "FIR #402/2026 Madiwala PS",
        "type": "CASE",
        "sections": "Sec 379, 420, 468 IPC",
        "tags": ["Crime Registration"]
    })

    # 2. HOSUR & CHITTOOR CHOP SHOP / CARRIER SYNDICATE
    nodes.append({
        "id": "PER_110",
        "label": "Farhan Qureshi",
        "type": "PERSON",
        "category": "CHOP_SHOP_HEAD",
        "district": "Hosur / Krishnagiri",
        "aliases": ["Farhan Bhai", "F. Qureshi"],
        "notes": "Owns industrial lathe & hydraulic stamp workshop in Hosur. Re-stamps chassis VIN numbers.",
        "risk_level": "High Threat",
        "tags": ["Hosur Syndicate", "Chassis Stamper"]
    })
    nodes.append({
        "id": "PER_111",
        "label": "Anita Roy",
        "type": "PERSON",
        "category": "BUYER_NETWORK",
        "district": "Chittoor / Chennai",
        "aliases": ["A. Roy", "Madamji"],
        "notes": "Channels sanitized luxury vehicles to buyers in Andhra Pradesh and Tamil Nadu.",
        "risk_level": "High Threat",
        "tags": ["Hosur Syndicate", "Fence"]
    })
    nodes.append({
        "id": "PER_112",
        "label": "Suresh Goud",
        "type": "PERSON",
        "category": "CARRIER_OPERATOR",
        "district": "Hosur",
        "aliases": ["Driver Suresh"],
        "notes": "Drives 6-car interstate hydraulic carrier truck with false compartment paper manifests.",
        "risk_level": "Medium Threat",
        "tags": ["Hosur Syndicate"]
    })

    # Hosur Infrastructure
    nodes.append({
        "id": "PH_110",
        "label": "+91 9443219876",
        "type": "PHONE",
        "carrier": "BSNL Tamil Nadu",
        "tags": ["Hosur Syndicate"]
    })
    nodes.append({
        "id": "VEH_110",
        "label": "TN24ZZ7781",
        "type": "VEHICLE",
        "model": "BharatBenz 6-Car Multi-Deck Transporter",
        "notes": "Transports re-chassised vehicles across state borders disguised as factory delivery runs.",
        "tags": ["Heavy Carrier"]
    })
    nodes.append({
        "id": "LOC_110",
        "label": "Hosur Phase-II Industrial Yard",
        "type": "LOCATION",
        "coordinates": [12.7409, 77.8253],
        "district": "Hosur",
        "tags": ["Chop Shop"]
    })
    nodes.append({
        "id": "LOC_111",
        "label": "Chittoor Border Warehouse",
        "type": "LOCATION",
        "coordinates": [13.2172, 79.1003],
        "district": "Chittoor",
        "tags": ["Transit Depot"]
    })
    nodes.append({
        "id": "ACC_110",
        "label": "Axis #8839201",
        "type": "ACCOUNT",
        "bank": "Axis Bank Hosur Main",
        "turnover": "₹94 Lakhs",
        "tags": ["Payment Escrow"]
    })
    nodes.append({
        "id": "CASE_110",
        "label": "FIR #189/2026 Hosur South PS",
        "type": "CASE",
        "sections": "Sec 411, 413, 120B IPC",
        "tags": ["Crime Registration"]
    })

    # 3. INTERMEDIARY / COVERT COURIER (Ramesh 'Auto' Babu)
    nodes.append({
        "id": "PER_150",
        "label": "Ramesh 'Auto' Babu",
        "type": "PERSON",
        "category": "INTERMEDIARY",
        "district": "Attibele / Anekal",
        "aliases": ["Ramesh B.", "Pilot Ramesh"],
        "notes": "CRITICAL LINK: Piloting stolen vehicles through Karnataka-Tamil Nadu Attibele toll corridor. Uses secondary phone to alert Farhan workshop 15 minutes before arrival.",
        "risk_level": "High Priority",
        "tags": ["Bridge Candidate", "Entity Resolution Target"]
    })
    nodes.append({
        "id": "PH_150",
        "label": "+91 9900112233",
        "type": "PHONE",
        "carrier": "Airtel Karnataka",
        "notes": "Bridge line called by Imran right after vehicle heist, and calling Farhan right before toll gate.",
        "tags": ["Bridge Phone"]
    })
    nodes.append({
        "id": "VEH_150",
        "label": "KA01AB9012",
        "type": "VEHICLE",
        "model": "Mahindra Scorpio (Pilot Escort)",
        "notes": "Escort vehicle equipped with FASTag scanner blocker and strobe light.",
        "tags": ["Bridge Vehicle"]
    })
    nodes.append({
        "id": "LOC_150",
        "label": "Attibele Border Toll Plaza",
        "type": "LOCATION",
        "coordinates": [12.7797, 77.7719],
        "district": "Bengaluru Border",
        "notes": "Key ANPR camera choke point crossing from Karnataka into Tamil Nadu.",
        "tags": ["Choke Point"]
    })

    # Add 25 synthetic associates (drivers, battery fitters, spotters)
    syndicate_names = ["Girish", "Manjunath", "Pradeep", "Raghu", "Sunil", "Basavaraj", "Chandru", "Vinay", "Harish", "Praveen",
                       "Selvam", "Murugan", "Karthik", "Ganesh", "Saravanan", "Naveen", "Sharath", "Santosh", "Vijay", "Anil"]
    for i, name in enumerate(syndicate_names, start=20):
        p_id = f"PER_{i+100}"
        ph_id = f"PH_{i+100}"
        is_bengaluru = (i % 2 == 0)
        nodes.append({
            "id": p_id,
            "label": f"{name} {['Gowda', 'Shetty', 'Kumar', 'Reddy', 'Pillai', 'Nadar'][i % 6]}",
            "type": "PERSON",
            "category": "SYNDICATE_ASSOCIATE",
            "district": "Bengaluru" if is_bengaluru else "Hosur",
            "notes": "Secondary runner or garage helper observed on workshop CCTV.",
            "risk_level": "Low Activity",
            "tags": ["Bengaluru Crew" if is_bengaluru else "Hosur Crew"]
        })
        nodes.append({
            "id": ph_id,
            "label": f"+91 9845{i:02d}77{i:02d}",
            "type": "PHONE",
            "carrier": "Jio",
            "tags": ["Peripheral SIM"]
        })
        edges.append({
            "id": f"e_uses_{p_id}",
            "source": p_id,
            "target": ph_id,
            "relationship": "USES",
            "confidence": 0.86,
            "source_id": f"CAF_AUTO_{i}",
            "timestamp": "2026-02-05T12:00:00",
            "description": "Subscriber account."
        })
        parent = "PER_101" if is_bengaluru else "PER_110"
        edges.append({
            "id": f"e_assoc_{p_id}_{parent}",
            "source": p_id,
            "target": parent,
            "relationship": "REPORTS_TO",
            "confidence": 0.74,
            "source_id": f"CONFIDENTIAL_SOURCE_{i}",
            "timestamp": "2026-02-18T18:00:00",
            "description": "Logistical coordination."
        })

    # Edges - Bengaluru Internal
    edges.extend([
        {"id": "e_bng_1", "source": "PER_101", "target": "PH_101", "relationship": "USES", "confidence": 0.98, "source_id": "CDR_MADIWALA", "timestamp": "2026-02-01T02:15:00", "description": "Operational burner."},
        {"id": "e_bng_2", "source": "PER_101", "target": "DEV_101", "relationship": "OPERATES", "confidence": 0.94, "source_id": "FORENSIC_LAB", "timestamp": "2026-02-01T02:40:00", "description": "Key programmer sync."},
        {"id": "e_bng_3", "source": "PER_101", "target": "VEH_101", "relationship": "STOLE_AND_DROVE", "confidence": 0.91, "source_id": "CCTV_HSR", "timestamp": "2026-02-01T03:05:00", "description": "Captured driving away."},
        {"id": "e_bng_4", "source": "PER_101", "target": "PER_102", "relationship": "DISPATCHES", "confidence": 0.85, "source_id": "SURV_KORAMANGALA", "timestamp": "2026-01-29T21:00:00", "description": "Target scouting rendezvous."},
        {"id": "e_bng_5", "source": "PER_101", "target": "PER_103", "relationship": "ORDERS_PAPERS", "confidence": 0.89, "source_id": "WHATSAPP_FORENSIC", "timestamp": "2026-01-30T16:20:00", "description": "Ordered clone RC smart card."},
        {"id": "e_bng_6", "source": "PER_101", "target": "LOC_101", "relationship": "STAGES_AT", "confidence": 0.93, "source_id": "PARKING_TICKET", "timestamp": "2026-02-01T03:45:00", "description": "Cold storage before transit."},
        {"id": "e_bng_7", "source": "PER_101", "target": "CASE_101", "relationship": "PRIME_SUSPECT_IN", "confidence": 0.99, "source_id": "FIR_402", "timestamp": "2026-02-02T08:00:00", "description": "FIR registration."}
    ])

    # Edges - Hosur/Chittoor Internal
    edges.extend([
        {"id": "e_hsr_1", "source": "PER_110", "target": "PH_110", "relationship": "USES", "confidence": 0.95, "source_id": "CAF_HOSUR", "timestamp": "2026-01-10T10:00:00", "description": "Workshop primary line."},
        {"id": "e_hsr_2", "source": "PER_110", "target": "LOC_110", "relationship": "OPERATES", "confidence": 0.99, "source_id": "TNEB_POWER_METER", "timestamp": "2025-05-10T00:00:00", "description": "Chop shop leaseholder."},
        {"id": "e_hsr_3", "source": "PER_110", "target": "ACC_110", "relationship": "RECEIVES_FUNDS", "confidence": 0.92, "source_id": "BANK_STATEMENT", "timestamp": "2026-02-05T14:30:00", "description": "Vehicle conversion payment."},
        {"id": "e_hsr_4", "source": "PER_110", "target": "PER_111", "relationship": "SUPPLIES_TO", "confidence": 0.88, "source_id": "LEDGER_SEIZED", "timestamp": "2026-02-08T11:00:00", "description": "Sanitized SUV handoff."},
        {"id": "e_hsr_5", "source": "PER_110", "target": "VEH_110", "relationship": "LOADS_ONTO", "confidence": 0.87, "source_id": "CCTV_SIPCOT", "timestamp": "2026-02-09T04:00:00", "description": "Multi-car carrier loading."},
        {"id": "e_hsr_6", "source": "PER_111", "target": "LOC_111", "relationship": "STORAGE_VAULT", "confidence": 0.90, "source_id": "POLICE_RAID", "timestamp": "2026-02-12T17:00:00", "description": "Buyer inspection warehouse."},
        {"id": "e_hsr_7", "source": "PER_110", "target": "CASE_110", "relationship": "CHARGED_IN", "confidence": 0.99, "source_id": "CHARGE_SHEET", "timestamp": "2026-02-15T00:00:00", "description": "Interstate theft syndicate ringleader."}
    ])

    # Intermediary Edges (Ramesh 'Auto' Babu Bridge)
    edges.extend([
        {"id": "e_bridge_car_1", "source": "PER_101", "target": "PER_150", "relationship": "HANDS_OVER_CAR", "confidence": 0.92, "source_id": "STAGING_CCTV", "timestamp": "2026-02-01T04:10:00", "description": "Vehicle handoff in Electronic City lay-by."},
        {"id": "e_bridge_call_1", "source": "PH_101", "target": "PH_150", "relationship": "DISPATCH_CALL", "confidence": 0.94, "source_id": "CDR_ATTIBELE", "timestamp": "2026-02-01T04:15:00", "description": "2-minute departure confirmation call."},
        {"id": "e_bridge_call_2", "source": "PH_150", "target": "PH_110", "relationship": "INCOMING_ALERT", "confidence": 0.93, "source_id": "CDR_HOSUR", "timestamp": "2026-02-01T04:42:00", "description": "Notice to open Hosur garage doors."},
        {"id": "e_bridge_toll", "source": "PER_150", "target": "LOC_150", "relationship": "TOLL_PASSAGE", "confidence": 0.97, "source_id": "FASTAG_ANPR", "timestamp": "2026-02-01T04:35:00", "description": "Attibele toll booth ANPR camera record."},
        {"id": "e_bridge_car_2", "source": "PER_150", "target": "LOC_110", "relationship": "DELIVERS_TO", "confidence": 0.91, "source_id": "CCTV_SIPCOT_GATE", "timestamp": "2026-02-01T04:55:00", "description": "Vehicle driven directly into workshop compound."}
    ])

    resolutions = [
        {
            "id": "RES_101",
            "recordA": {"name": "Farhan Qureshi", "phone": "+91 9443219876", "vehicle": "TN24ZZ7781", "address": "Sipcot Phase-II, Hosur", "source": "GST_INSPECTION"},
            "recordB": {"name": "Farhan A. Qureshi", "phone": "+91 9443219876", "vehicle": "TN24ZZ7781", "address": "Plot 42 Industrial Estate, Hosur", "source": "VAHAN_TN"},
            "matchScore": 95,
            "weights": {"name_similarity": 0.88, "phone_match": 1.0, "vehicle_match": 1.0, "address_similarity": 0.92},
            "reasons": ["Exact phone match (+91 9443219876)", "Exact commercial vehicle match (TN24ZZ7781)", "Identical industrial estate premises"],
            "status": "UNRESOLVED",
            "entity_id": "PER_110"
        },
        {
            "id": "RES_102",
            "recordA": {"name": "Imran Khan", "phone": "+91 9845012345", "vehicle": "KA05MN4412", "address": "Madiwala Old Garage, Bengaluru", "source": "FIR_402"},
            "recordB": {"name": "Imran P. Khan", "phone": "+91 9845012345", "vehicle": "KA05MN4412", "address": "Tavarekere Main Rd, Bengaluru", "source": "POLICE_FIELD_REPORT"},
            "matchScore": 92,
            "weights": {"name_similarity": 0.84, "phone_match": 1.0, "vehicle_match": 1.0, "address_similarity": 0.80},
            "reasons": ["Exact burner phone match", "Exact seized SUV registration match", "Adjacent Bengaluru south police limits"],
            "status": "UNRESOLVED",
            "entity_id": "PER_101"
        }
    ]

    return {"case_id": "ULK-1892", "nodes": nodes, "edges": edges, "resolutions": resolutions}


def generate_ulk_1104():
    random.seed(1104)
    nodes = []
    edges = []

    # 1. PORT DOCK WORKERS & CUSTOMS CLEARING CLUSTER
    nodes.append({
        "id": "PER_201",
        "label": "Capt. Hemant Bose",
        "type": "PERSON",
        "category": "PORT_OPERATIONS",
        "district": "Visakhapatnam Harbour",
        "aliases": ["Capt. Bose", "Harbour Master"],
        "notes": "Coordinated berthing schedules and offloading priority at Berth #4 for targeted vessels.",
        "risk_level": "High Threat (Archived)",
        "tags": ["Port Staff", "Vessel Coordination"]
    })
    nodes.append({
        "id": "PER_202",
        "label": "Anand Swamy",
        "type": "PERSON",
        "category": "CUSTOMS_BROKER",
        "district": "Visakhapatnam Port Zone",
        "aliases": ["A. Swamy", "Agent Anand"],
        "notes": "Customs House Broker who stamped automated 'Green Channel' release without physical container inspection.",
        "risk_level": "Resolved / Apprehended",
        "tags": ["Customs Agent", "Resolved"]
    })
    nodes.append({
        "id": "PER_203",
        "label": "Murugan Pillai",
        "type": "PERSON",
        "category": "STEVEDORE_CHIEF",
        "district": "Gajuwaka / Vizag",
        "aliases": ["M. Pillai", "Supervisor Murugan"],
        "notes": "Foreman overseeing container unlashing and yard staging at CFS Gajuwaka.",
        "risk_level": "Resolved",
        "tags": ["Port Staff"]
    })

    # Port Infrastructure
    nodes.append({
        "id": "PH_201",
        "label": "+91 8912345678",
        "type": "PHONE",
        "carrier": "BSNL Maritime Coastal",
        "tags": ["Official Port Line"]
    })
    nodes.append({
        "id": "PH_202",
        "label": "Thuraya Maritime #88216",
        "type": "PHONE",
        "carrier": "Thuraya Satellite Telecommunications",
        "notes": "Encrypted satellite terminal used for deep-sea offshore approach comms.",
        "tags": ["Satphone"]
    })
    nodes.append({
        "id": "DEV_201",
        "label": "Container MSKU-992140-7",
        "type": "DEVICE",
        "notes": "40ft refrigerated high-cube container falsely declared as industrial chemical raw material.",
        "tags": ["Seized Container"]
    })
    nodes.append({
        "id": "LOC_201",
        "label": "Berth #4 Deep Water Quay",
        "type": "LOCATION",
        "coordinates": [17.6983, 83.2985],
        "district": "Visakhapatnam Port",
        "tags": ["Discharge Berth"]
    })
    nodes.append({
        "id": "CASE_201",
        "label": "DRI Seizure Memo #08/2026",
        "type": "CASE",
        "sections": "Customs Act 1962 Sec 111, 135",
        "tags": ["DRI Enforcement"]
    })

    # 2. OVERSEAS CONSIGNOR & INLAND TRUCKING SYNDICATE
    nodes.append({
        "id": "PER_210",
        "label": "David Chen",
        "type": "PERSON",
        "category": "CONSIGNOR_OVERSEAS",
        "district": "Singapore / Straits Logistics",
        "aliases": ["Chen Wei", "Mr. Chen"],
        "notes": "Consignor who dispatched deceptive bills of lading through maritime intermediary forwarding firms.",
        "risk_level": "International Red Notice",
        "tags": ["Overseas Consignor"]
    })
    nodes.append({
        "id": "PER_211",
        "label": "Rakesh Naidu",
        "type": "PERSON",
        "category": "INLAND_LOGISTICS",
        "district": "Anakapalle / Vizag",
        "aliases": ["Transporter Rakesh", "R. Naidu"],
        "notes": "Provided heavy low-bed chassis trailers to clear container past customs gate within 45 minutes.",
        "risk_level": "Resolved",
        "tags": ["Drayage Logistics"]
    })
    nodes.append({
        "id": "PER_212",
        "label": "Sunil Verma",
        "type": "PERSON",
        "category": "CLEARING_FINANCIER",
        "district": "Visakhapatnam City",
        "aliases": ["S. Verma", "Vermaji"],
        "notes": "Provided underwriting bank guarantee and escrow letters of credit.",
        "risk_level": "Resolved",
        "tags": ["Trade Finance"]
    })

    # Consignor & Inland Infrastructure
    nodes.append({
        "id": "PH_210",
        "label": "+91 9440887766",
        "type": "PHONE",
        "carrier": "Airtel AP Coastal",
        "tags": ["Logistics Line"]
    })
    nodes.append({
        "id": "VEH_210",
        "label": "AP31TT5510",
        "type": "VEHICLE",
        "model": "Tata Prima 4928 Container Drayage Trailer",
        "notes": "Special heavy prime mover cleared to enter customs bonded gate.",
        "tags": ["Container Drayage"]
    })
    nodes.append({
        "id": "LOC_210",
        "label": "CFS Gajuwaka Storage Yard",
        "type": "LOCATION",
        "coordinates": [17.6891, 83.2104],
        "district": "Visakhapatnam Inland",
        "tags": ["Bonded CFS"]
    })
    nodes.append({
        "id": "ACC_210",
        "label": "Standard Chartered Escrow #772910",
        "type": "ACCOUNT",
        "bank": "Standard Chartered Maritime Banking",
        "turnover": "₹4.10 Cr",
        "tags": ["Freight Escrow"]
    })
    nodes.append({
        "id": "ORG_201",
        "label": "Coromandel Clearing & Logistics LLP",
        "type": "ORGANIZATION",
        "notes": "Customs registered front agency with suspended corporate license.",
        "tags": ["Shell Company"]
    })

    # 3. INTERMEDIARY / CORRUPT SURVEYOR (Harish 'Surveyor' Rao)
    nodes.append({
        "id": "PER_250",
        "label": "Harish 'Surveyor' Rao",
        "type": "PERSON",
        "category": "INTERMEDIARY",
        "district": "Gangavaram / Vizag",
        "aliases": ["Surveyor Harish", "H. Rao"],
        "notes": "CRITICAL INTERMEDIARY: Licensed marine cargo surveyor who issued falsified Clean Inspection Certificate and swapped high-security bolt seal.",
        "risk_level": "Apprehended Bridge",
        "tags": ["Bridge Candidate", "Entity Resolution Target"]
    })
    nodes.append({
        "id": "DEV_250",
        "label": "RFID Seal #88192-TAMPERED",
        "type": "DEVICE",
        "notes": "Electronic customs bolt seal found with micro-cut shackle and forged seal stamp.",
        "tags": ["Tampered Seal", "Forensic Item"]
    })
    nodes.append({
        "id": "PH_250",
        "label": "+91 9988112244",
        "type": "PHONE",
        "carrier": "Jio AP",
        "notes": "Communications link directly between Customs Agent Anand and Inland Drayage Rakesh.",
        "tags": ["Bridge Phone"]
    })
    nodes.append({
        "id": "LOC_250",
        "label": "Gangavaram Port Toll Barrier",
        "type": "LOCATION",
        "coordinates": [17.6251, 83.2415],
        "district": "Gangavaram",
        "notes": "Outbound inspection gate where physical seal scan was bypassed.",
        "tags": ["Inspection Gate"]
    })

    # Associates
    dock_associates = ["Srinivas", "Appa Rao", "Kondala", "Balaram", "Chitti Babu", "Rambabu", "Satyanarayana", "Venkat Rao", "Prasad", "Govind"]
    for i, name in enumerate(dock_associates, start=1):
        p_id = f"PER_{i+220}"
        ph_id = f"PH_{i+220}"
        nodes.append({
            "id": p_id,
            "label": f"{name} {['Patnaik', 'Venkata', 'Chowdhury', 'Dora', 'Naidu'][i % 5]}",
            "type": "PERSON",
            "category": "DOCK_CREW",
            "district": "Visakhapatnam",
            "notes": "Port gatekeeper or gantry crane operator interviewed during DRI probe.",
            "risk_level": "Witness / Low Risk",
            "tags": ["Dock Crew"]
        })
        nodes.append({
            "id": ph_id,
            "label": f"+91 8912{i:02d}99{i:02d}",
            "type": "PHONE",
            "carrier": "BSNL",
            "tags": ["Port Staff SIM"]
        })
        edges.append({
            "id": f"e_uses_{p_id}",
            "source": p_id,
            "target": ph_id,
            "relationship": "USES",
            "confidence": 0.85,
            "source_id": f"PORT_ID_{i}",
            "timestamp": "2026-01-05T08:00:00",
            "description": "Port security gate pass badge."
        })
        parent = "PER_203" if i % 2 == 0 else "PER_211"
        edges.append({
            "id": f"e_assoc_{p_id}_{parent}",
            "source": p_id,
            "target": parent,
            "relationship": "WORKS_UNDER",
            "confidence": 0.76,
            "source_id": f"SHIFT_ROSTER_{i}",
            "timestamp": "2026-01-20T22:00:00",
            "description": "Berth operations duty log."
        })

    # Internal Edges - Port Cluster
    edges.extend([
        {"id": "e_prt_1", "source": "PER_201", "target": "PH_201", "relationship": "USES", "confidence": 0.99, "source_id": "PORT_AUTHORITY", "timestamp": "2026-01-10T09:00:00", "description": "Harbour master desk line."},
        {"id": "e_prt_2", "source": "PER_201", "target": "LOC_201", "relationship": "SUPERVISES", "confidence": 0.95, "source_id": "VESSEL_SCHEDULE", "timestamp": "2026-01-25T14:00:00", "description": "Priority berthing assignment."},
        {"id": "e_prt_3", "source": "PER_201", "target": "DEV_201", "relationship": "CLEARED_DISCHARGE", "confidence": 0.93, "source_id": "CRANE_LOG", "timestamp": "2026-01-26T01:15:00", "description": "Offloaded container onto quayside."},
        {"id": "e_prt_4", "source": "PER_202", "target": "ORG_201", "relationship": "DIRECTOR_OF", "confidence": 0.98, "source_id": "MCA_REGISTRATION", "timestamp": "2025-04-12T00:00:00", "description": "Customs broker license holder."},
        {"id": "e_prt_5", "source": "PER_202", "target": "DEV_201", "relationship": "STAMPED_RELEASE", "confidence": 0.97, "source_id": "CUSTOMS_ICEGATE", "timestamp": "2026-01-26T03:00:00", "description": "Bypassed X-ray scanner requirement."},
        {"id": "e_prt_6", "source": "PER_203", "target": "LOC_201", "relationship": "CREW_LEAD", "confidence": 0.90, "source_id": "PORT_POLICE", "timestamp": "2026-01-26T01:30:00", "description": "Supervised crane offloading."},
        {"id": "e_prt_7", "source": "PER_202", "target": "CASE_201", "relationship": "SUBJECT_OF", "confidence": 0.99, "source_id": "DRI_NOTICE", "timestamp": "2026-01-28T16:00:00", "description": "Charge-sheeted under Customs Act."}
    ])

    # Inland Edges
    edges.extend([
        {"id": "e_inl_1", "source": "PER_210", "target": "ORG_201", "relationship": "CONSIGNOR_TO", "confidence": 0.92, "source_id": "BILL_OF_LADING", "timestamp": "2026-01-08T10:00:00", "description": "Ocean freight manifest."},
        {"id": "e_inl_2", "source": "PER_211", "target": "VEH_210", "relationship": "OPERATES", "confidence": 0.96, "source_id": "TRANSPORT_WAYBILL", "timestamp": "2026-01-26T03:30:00", "description": "Heavy drayage truck dispatched."},
        {"id": "e_inl_3", "source": "PER_211", "target": "LOC_210", "relationship": "DESTINATION_DEPOT", "confidence": 0.94, "source_id": "GATE_ENTRY_RECORD", "timestamp": "2026-01-26T05:00:00", "description": "Container delivered to Gajuwaka CFS."},
        {"id": "e_inl_4", "source": "PER_212", "target": "ACC_210", "relationship": "SIGNATORY", "confidence": 0.91, "source_id": "BANK_ESCROW", "timestamp": "2026-01-15T12:00:00", "description": "Maritime escrow account holder."}
    ])

    # Surveyor Intermediary Edges (Planted Bridge)
    edges.extend([
        {"id": "e_bridge_surv_1", "source": "PER_202", "target": "PER_250", "relationship": "BRIBERY_COMMISSION", "confidence": 0.94, "source_id": "FORENSIC_PHONE", "timestamp": "2026-01-25T18:00:00", "description": "Commission payment to issue fake inspection seal."},
        {"id": "e_bridge_surv_2", "source": "PH_201", "target": "PH_250", "relationship": "STATUS_UPDATE", "confidence": 0.91, "source_id": "CDR_PORT_GATE", "timestamp": "2026-01-26T02:10:00", "description": "Call alerting surveyor that container reached quayside."},
        {"id": "e_bridge_surv_3", "source": "PER_250", "target": "DEV_250", "relationship": "AFFIXED_FORGED_SEAL", "confidence": 0.98, "source_id": "DRI_LAB_REPORT", "timestamp": "2026-01-26T02:45:00", "description": "Replaced original container seal with tampered clone."},
        {"id": "e_bridge_surv_4", "source": "PH_250", "target": "PH_210", "relationship": "CLEARANCE_CALL", "confidence": 0.93, "source_id": "CDR_LOG_DRI", "timestamp": "2026-01-26T03:15:00", "description": "Gave green signal to trailer driver Rakesh Naidu to haul container past gate."},
        {"id": "e_bridge_surv_5", "source": "VEH_210", "target": "LOC_250", "relationship": "GATE_PASSAGE", "confidence": 0.95, "source_id": "ANPR_GANGAVARAM", "timestamp": "2026-01-26T04:00:00", "description": "Container cleared through inspection gate."}
    ])

    resolutions = [
        {
            "id": "RES_201",
            "recordA": {"name": "Murugan Pillai", "phone": "+91 8912345678", "vehicle": "AP31TT5510", "address": "Gajuwaka Industrial Belt, Vizag", "source": "PORT_ROSTER"},
            "recordB": {"name": "M. Pillai", "phone": "+91 8912345678", "vehicle": "AP31TT5510", "address": "CFS Gate 2, Gajuwaka, Vizag", "source": "CUSTOMS_CHA_RECORD"},
            "matchScore": 94,
            "weights": {"name_similarity": 0.85, "phone_match": 1.0, "vehicle_match": 1.0, "address_similarity": 0.88},
            "reasons": ["Exact phone match (+91 8912345678)", "Exact trailer drayage association", "Geographical proximity in Gajuwaka CFS zone"],
            "status": "UNRESOLVED",
            "entity_id": "PER_203"
        }
    ]

    return {"case_id": "ULK-1104", "nodes": nodes, "edges": edges, "resolutions": resolutions}


def generate_custom_case_data(case_id: str, case_data: dict):
    """Dynamically builds nodes and edges for user-created custom cases."""
    nodes = []
    edges = []
    
    # Process suspects
    for s in case_data.get("suspects", []):
        sid = s.get("id") if isinstance(s, dict) else f"SUS_{len(nodes)+1}"
        sname = s.get("name") if isinstance(s, dict) else str(s)
        srole = s.get("role", "Prime Suspect") if isinstance(s, dict) else "Suspect"
        snotes = s.get("notes", "") if isinstance(s, dict) else ""
        nodes.append({
            "id": sid,
            "label": sname,
            "type": "PERSON",
            "category": "SUSPECT",
            "district": case_data.get("district", "Primary Jurisdiction"),
            "notes": snotes or f"Identified person of interest: {srole}",
            "risk_level": "High Activity",
            "tags": ["Suspect", srole]
        })

    # Process vehicles
    for v in case_data.get("vehicles", []):
        vid = v.get("id") if isinstance(v, dict) else f"VEH_{len(nodes)+1}"
        vlabel = v.get("label") if isinstance(v, dict) else str(v)
        nodes.append({
            "id": vid,
            "label": vlabel,
            "type": "VEHICLE",
            "notes": v.get("notes", "Identified transit vehicle") if isinstance(v, dict) else "Identified transit vehicle",
            "tags": ["Vehicle"]
        })

    # Process phones / devices
    for p in case_data.get("phones", []):
        pid = p.get("id") if isinstance(p, dict) else f"PH_{len(nodes)+1}"
        plabel = p.get("label") if isinstance(p, dict) else str(p)
        nodes.append({
            "id": pid,
            "label": plabel,
            "type": "PHONE",
            "notes": p.get("notes", "Target communications endpoint") if isinstance(p, dict) else "Target communications endpoint",
            "tags": ["Telecom"]
        })

    # Process locations
    for loc in case_data.get("locations", []):
        lid = loc.get("id") if isinstance(loc, dict) else f"LOC_{len(nodes)+1}"
        llabel = loc.get("label") if isinstance(loc, dict) else str(loc)
        nodes.append({
            "id": lid,
            "label": llabel,
            "type": "LOCATION",
            "district": case_data.get("district", "Jurisdiction"),
            "notes": loc.get("notes", "Operational scene or checkpoint") if isinstance(loc, dict) else "Operational scene or checkpoint",
            "tags": ["Location"]
        })

    # Process organizations / accounts
    for org in case_data.get("organizations", []):
        oid = org.get("id") if isinstance(org, dict) else f"ORG_{len(nodes)+1}"
        olabel = org.get("label") if isinstance(org, dict) else str(org)
        nodes.append({
            "id": oid,
            "label": olabel,
            "type": "ORGANIZATION",
            "notes": org.get("notes", "Corporate entity or financial facilitator") if isinstance(org, dict) else "Corporate entity or financial facilitator",
            "tags": ["Organization"]
        })

    # Process evidence / documents
    for ev in case_data.get("evidence", []):
        eid = ev.get("id") if isinstance(ev, dict) else f"EVI_{len(nodes)+1}"
        elabel = ev.get("label") if isinstance(ev, dict) else str(ev)
        nodes.append({
            "id": eid,
            "label": elabel,
            "type": "EVIDENCE",
            "notes": ev.get("notes", "Documentary or forensic artifact") if isinstance(ev, dict) else "Documentary or forensic artifact",
            "tags": ["Evidence"]
        })

    # Process connections
    for i, conn in enumerate(case_data.get("connections", [])):
        edges.append({
            "id": conn.get("id", f"e_custom_{i+1}"),
            "source": conn.get("source"),
            "target": conn.get("target"),
            "relationship": conn.get("relationship", "CONNECTED_TO"),
            "confidence": float(conn.get("confidence", 0.85)),
            "source_id": conn.get("source_id", "INVESTIGATOR_NOTES"),
            "timestamp": conn.get("timestamp", datetime.now().isoformat()),
            "description": conn.get("description", f"Link: {conn.get('relationship', 'CONNECTED_TO')}")
        })

    # If no edges were provided or very few, auto-link nodes sequentially to form a coherent graph
    if len(edges) < 2 and len(nodes) >= 2:
        for i in range(len(nodes) - 1):
            edges.append({
                "id": f"e_auto_{i+1}",
                "source": nodes[i]["id"],
                "target": nodes[i+1]["id"],
                "relationship": "ASSOCIATED_WITH",
                "confidence": 0.85,
                "source_id": "CASE_FILE",
                "timestamp": datetime.now().isoformat(),
                "description": f"Operational relationship established in {case_id}."
            })

    resolutions = []
    if len(nodes) >= 2:
        first = nodes[0]
        resolutions.append({
            "id": f"RES_{case_id}_01",
            "recordA": {"name": first["label"], "phone": "+91 9800000001", "source": "CASE_FILE_A"},
            "recordB": {"name": first["label"], "phone": "+91 9800000001", "source": "DATABASE_B"},
            "matchScore": 92,
            "weights": {"name_similarity": 0.9, "phone_match": 1.0, "vehicle_match": 0.5, "address_similarity": 0.7},
            "reasons": ["High correlation with primary suspect dossier", "Common telephone index"],
            "status": "UNRESOLVED",
            "entity_id": first["id"]
        })

    return {
        "case_id": case_id,
        "nodes": nodes,
        "edges": edges,
        "resolutions": resolutions
    }


def generate_case_data(case_id: str = "ULK-2047", custom_cases: dict = None):
    """Central dispatch for case data generation."""
    cid = (case_id or "ULK-2047").strip().upper()
    
    if custom_cases and cid in custom_cases:
        return generate_custom_case_data(cid, custom_cases[cid])
    
    if cid == "ULK-1892":
        return generate_ulk_1892()
    elif cid == "ULK-1104":
        return generate_ulk_1104()
    elif cid == "ULK-2047":
        return generate_ulk_2047()
    else:
        if custom_cases and case_id in custom_cases:
            return generate_custom_case_data(case_id, custom_cases[case_id])
        return generate_ulk_2047()
