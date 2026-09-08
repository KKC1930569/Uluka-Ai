import { ChallengeCase } from '../../types';

export const CASE_4: ChallengeCase = {
  id: 'ULK-004',
  title: 'THE GOLDEN FALCON',
  subtitle: 'The Antiquities Transit Heist',
  difficulty: 'HARD',
  category: 'Heritage Crime & Maritime Smuggling',
  briefing: 'An irreplaceable 11th-century Chola bronze idol (The Dancing Falcon) was en route from a temple museum in Thanjavur to the National Conservation Lab in Mumbai. During an overnight staging halt at the JNPT container terminal, the master security crate was breached. The authentic idol was substituted with an expertly crafted lead replica coated in antique patina. Identify the port insider who facilitated the swap.',
  targetQuestion: 'Which port official or security insider unlocked the master container and executed the antiquities swap?',
  suspects: [
    {
      id: 'SUS_401',
      name: 'Prof. Shrikant Iyer',
      alias: 'The Antiquarian',
      role: 'Restoration Consultant & Metallurgist',
      background: 'Authored academic papers on Chola bronze casting. Inspected the idol 48 hours prior to transit.',
      alibi: 'Attending a scholarly dinner in South Mumbai; credit card transactions confirm his dining bill at 21:40.'
    },
    {
      id: 'SUS_402',
      name: 'Captain Mohan Ranawat',
      alias: 'The Port Chief',
      role: 'Container Terminal Operations Supervisor',
      background: 'Controls container staging yard assignments, customs seals, and crane logistics at JNPT Bay 7.',
      alibi: 'Claims he was doing routine rounds in the administrative building and never approached Bay 7.'
    },
    {
      id: 'SUS_403',
      name: 'Bikram Thapa',
      alias: 'The Guard',
      role: 'Armed Transit Escort Commander',
      background: 'Specialist armed guard with 8 years of transit protection experience. Reported severe food poisoning during the shift.',
      alibi: 'Admitted to the port clinic at 01:10 with acute gastric symptoms; medical chart verified.'
    },
    {
      id: 'SUS_404',
      name: 'Deepak Kulkarni',
      alias: 'The Registrar',
      role: 'Museum Shipping Registrar',
      background: 'Certified the original packaging, tamper-proof steel straps, and outward customs declarations.',
      alibi: 'Left JNPT port premises at 18:30 after handing over escort responsibilities to Captain Ranawat.'
    }
  ],
  allEntities: [
    { id: 'ENT_CRATE', label: 'Container CRX-9988', type: 'ORGANIZATION', description: 'Climate-controlled high-security container holding the artifact.' },
    { id: 'ENT_SEAL_CUTTER', label: 'Hydraulic Bolt Shear #JN-12', type: 'EVIDENCE', description: 'Industrial tool used to sever customs security cable seals.' },
    { id: 'ENT_REPLICA', label: 'Lead Replica Idol (Density 11.3)', type: 'EVIDENCE', description: 'Chemically patinated fake idol placed inside the foam case.' },
    { id: 'ENT_KEYCARD_MR', label: 'Supervisor Master Keycard #MR-07', type: 'DOCUMENT', description: 'RFID pass unlocking the high-security bonded yard gate.' },
    { id: 'ENT_ESCROW_ACCOUNT', label: 'Swiss Escrow Transfer #CH-771', type: 'ACCOUNT', description: 'Anonymous escrow deposit of ,000 released upon arrival of crate in port.' }
  ],
  clues: [
    {
      id: 'CLUE_04_01',
      title: 'Bonded Staging Yard Gate Access Log',
      category: 'SURVEILLANCE',
      preview: 'Gate opened at 02:22 using Master Pass #MR-07.',
      content: 'Electronic turnstile records at Bay 7 show Master Supervisor Pass #MR-07 scanned at 02:22. The gate was held open for 14 minutes. Surveillance camera angle 3 had been rotated upward toward the night sky.',
      timestamp: '02:22:10',
      location: 'JNPT High-Security Yard Gate',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_CRATE', label: 'Container CRX-9988', type: 'ORGANIZATION', description: 'Target container.' },
        { id: 'ENT_KEYCARD_MR', label: 'Supervisor Master Keycard #MR-07', type: 'DOCUMENT', description: 'Keycard used to breach gate.' }
      ]
    },
    {
      id: 'CLUE_04_02',
      title: 'Keycard Custody Verification',
      category: 'DOCUMENT',
      preview: 'Master Pass #MR-07 assigned to Captain Mohan Ranawat.',
      content: 'Port Authority biometric locker logs prove Master Pass #MR-07 was checked out by Captain Mohan Ranawat at 22:00 and remained in his physical possession until the morning handover at 06:30.',
      timestamp: '22:00:00',
      location: 'Port Security Locker Room',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_KEYCARD_MR', label: 'Supervisor Master Keycard #MR-07', type: 'DOCUMENT', description: 'Ranawat keycard.' },
        { id: 'SUS_402', label: 'Captain Mohan Ranawat', type: 'SUSPECT', description: 'Possessor of the keycard.' }
      ]
    },
    {
      id: 'CLUE_04_03',
      title: 'Bank Financial Trace: Escort Guard Bikram Thapa',
      category: 'FINANCIAL',
      preview: 'Immediate deposit of Rs 3,00,000 into guard account.',
      content: 'A sudden cash credit of Rs 3,00,000 was flagged in Bikram Thapa account. Investigating agents determined the fund was an emergency loan disbursed by the Port Workers Welfare Union for his daughter urgent surgery.',
      timestamp: '14:30:00',
      location: 'Port Workers Credit Society',
      isKeyLead: false,
      isRedHerring: true,
      redHerringReason: 'The Rs 3,00,000 deposit was an audited union welfare loan for medical emergency, completely unrelated to the antique idol.',
      extractableEntities: [
        { id: 'SUS_403', label: 'Bikram Thapa', type: 'SUSPECT', description: 'Innocent guard.' }
      ]
    },
    {
      id: 'CLUE_04_04',
      title: 'Forensic Metallurgy & Scale Weighing Log',
      category: 'FORENSICS',
      preview: '1.4kg weight discrepancy recorded on automated crane scales.',
      content: 'Automated spreader crane telemetry recorded container CRX-9988 weighing 18,420kg during initial rail offloading, but 18,421.4kg after the 02:22 yard shift. The lead replica was denser than the hollow ancient bronze.',
      timestamp: '03:15:00',
      location: 'Automated Spreader Crane 4',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_REPLICA', label: 'Lead Replica Idol (Density 11.3)', type: 'EVIDENCE', description: 'Denser substitute artifact.' },
        { id: 'ENT_CRATE', label: 'Container CRX-9988', type: 'ORGANIZATION', description: 'Container with modified weight.' }
      ]
    },
    {
      id: 'CLUE_04_05',
      title: 'Port Maintenance Tool Locker Audit',
      category: 'FORENSICS',
      preview: 'Hydraulic Bolt Shear #JN-12 with fresh copper-alloy shavings.',
      content: 'In Captain Ranawat private supervisor workshop, forensic technicians recovered Hydraulic Bolt Shear #JN-12. Micro-spectroscopy identified microscopic bronze and lead flakes matching the severed customs seal cable.',
      timestamp: '09:30:00',
      location: 'Supervisor Workshop Cabin',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_SEAL_CUTTER', label: 'Hydraulic Bolt Shear #JN-12', type: 'EVIDENCE', description: 'Tool used to sever seal.' },
        { id: 'SUS_402', label: 'Captain Mohan Ranawat', type: 'SUSPECT', description: 'Owner of workshop cabin.' }
      ]
    },
    {
      id: 'CLUE_04_06',
      title: 'Overseas Encrypted Escrow Account Intercept',
      category: 'FINANCIAL',
      preview: 'Escrow release condition linked to Container CRX-9988.',
      content: 'Financial intelligence seized an escrow notification from a private trust in Geneva. A milestone tranche of ,000 was set to release to a numbered account upon shipping container CRX-9988 boarding vessel MV Nordik.',
      timestamp: '04:10:00',
      location: 'Geneva Escrow Clearing',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_ESCROW_ACCOUNT', label: 'Swiss Escrow Transfer #CH-771', type: 'ACCOUNT', description: 'Smuggling bounty.' }
      ]
    }
  ],
  solution: {
    correctSuspectId: 'SUS_402',
    correctSuspectName: 'Captain Mohan Ranawat',
    keyLeadClueIds: ['CLUE_04_01', 'CLUE_04_02', 'CLUE_04_04', 'CLUE_04_05', 'CLUE_04_06'],
    redHerringClueIds: ['CLUE_04_03'],
    essentialRelationships: [
      { source: 'SUS_402', target: 'ENT_KEYCARD_MR', label: 'Checked Out Master Keycard' },
      { source: 'ENT_KEYCARD_MR', target: 'ENT_CRATE', label: 'Unlocked Bay 7 at 02:22' },
      { source: 'SUS_402', target: 'ENT_SEAL_CUTTER', label: 'Kept Shear in Private Workshop' },
      { source: 'ENT_REPLICA', target: 'ENT_CRATE', label: 'Substituted inside Crate' }
    ],
    explanation: 'Captain Mohan Ranawat used his authority as Terminal Operations Supervisor to orchestrate the heist. He checked out Master Pass #MR-07, tilted camera 3 away, and accessed Container CRX-9988 at 02:22 while Guard Thapa was incapacitated. He severed the customs seals using Hydraulic Shear #JN-12 (found in his private office with metallic traces) and swapped the priceless Chola idol with a weighted lead fake to satisfy the ,000 foreign smuggling contract.',
    keyEvidenceSummary: 'Master Pass #MR-07 scan at Bay 7, physical tool shear #JN-12 in Ranawat workshop with matching bronze residue, and automated crane scale weight shift.',
    trapExplanation: 'Escort Guard Bikram Thapa received a sudden Rs 3 Lakh deposit and fell ill during the shift, drawing immediate suspicion. However, the deposit was verified as a legitimate hospital loan from the workers welfare society.'
  }
};
