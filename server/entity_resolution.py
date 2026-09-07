# Entity Resolution & Matching Logic for ULUKA AI
from difflib import SequenceMatcher
import re

# Configurable Scoring Weights (Section 9)
RESOLUTION_WEIGHTS = {
    "name_similarity": 0.40,
    "phone_match": 0.30,
    "vehicle_match": 0.20,
    "address_similarity": 0.10
}

def normalize_text(text: str) -> str:
    if not text:
        return ""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s]', '', text)
    return re.sub(r'\s+', ' ', text)

def normalize_phone(phone: str) -> str:
    if not phone:
        return ""
    # Strip all non-digits
    digits = re.sub(r'\D', '', phone)
    # Strip leading 91 or 0
    if len(digits) > 10 and digits.startswith("91"):
        digits = digits[2:]
    elif len(digits) > 10 and digits.startswith("0"):
        digits = digits[1:]
    return digits

def normalize_vehicle(veh: str) -> str:
    if not veh:
        return ""
    return re.sub(r'[\s\-]', '', veh).upper()

def calculate_similarity(a: str, b: str) -> float:
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, normalize_text(a), normalize_text(b)).ratio()

def compute_entity_match(rec_a: dict, rec_b: dict) -> dict:
    reasons = []
    
    # 1. Name similarity (40%)
    name_sim = calculate_similarity(rec_a.get("name", ""), rec_b.get("name", ""))
    reasons.append(f"Name similarity: {round(name_sim * 100)}% ('{rec_a.get('name')}' vs '{rec_b.get('name')}')")
    
    # 2. Phone match (30%)
    phone_a = normalize_phone(rec_a.get("phone", ""))
    phone_b = normalize_phone(rec_b.get("phone", ""))
    if phone_a and phone_b and phone_a == phone_b:
        phone_match = 1.0
        reasons.append(f"[MATCH] Exact phone match ({rec_a.get('phone')})")
    elif phone_a and phone_b and phone_a[-6:] == phone_b[-6:]:
        phone_match = 0.5
        reasons.append(f"[PARTIAL] Partial phone match ({phone_a[-6:]})")
    else:
        phone_match = 0.0
        if phone_a and phone_b:
            reasons.append("[DIFF] Disparate phone numbers")
            
    # 3. Vehicle match (20%)
    veh_a = normalize_vehicle(rec_a.get("vehicle", ""))
    veh_b = normalize_vehicle(rec_b.get("vehicle", ""))
    if veh_a and veh_b and veh_a == veh_b:
        veh_match = 1.0
        reasons.append(f"[MATCH] Exact vehicle match ({veh_a})")
    else:
        veh_match = 0.0
        if veh_a and veh_b:
            reasons.append(f"[DIFF] Different vehicle registrations ({veh_a} vs {veh_b})")
            
    # 4. Address similarity (10%)
    addr_a = rec_a.get("address", "")
    addr_b = rec_b.get("address", "")
    if addr_a and addr_b:
        addr_sim = calculate_similarity(addr_a, addr_b)
        if addr_sim > 0.6:
            reasons.append(f"[MATCH] Address similarity: {round(addr_sim * 100)}%")
        else:
            reasons.append(f"[PARTIAL] Address similarity: {round(addr_sim * 100)}%")
    else:
        addr_sim = 0.0

    # Calculate weighted match score
    w = RESOLUTION_WEIGHTS
    raw_score = (
        (name_sim * w["name_similarity"]) +
        (phone_match * w["phone_match"]) +
        (veh_match * w["vehicle_match"]) +
        (addr_sim * w["address_similarity"])
    )
    score_percentage = round(raw_score * 100)

    return {
        "score": score_percentage,
        "raw_score": round(raw_score, 3),
        "weights_applied": w,
        "breakdown": {
            "name_similarity": round(name_sim, 2),
            "phone_match": phone_match,
            "vehicle_match": veh_match,
            "address_similarity": round(addr_sim, 2)
        },
        "reasons": reasons,
        "prototype_label": "PROTOTYPE MATCH SCORE (Not a real-world identity probability)"
    }
