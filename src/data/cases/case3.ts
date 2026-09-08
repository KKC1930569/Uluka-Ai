import { ChallengeCase } from '../../types';

export const CASE_3: ChallengeCase = {
  id: 'ULK-003',
  title: 'THE SILICON BREACH',
  subtitle: 'The Substation SCADA Cyber Sabotage',
  difficulty: 'HARD',
  category: 'Critical Infrastructure & Cyber Warfare',
  briefing: 'A sudden telemetry distortion attacked Substation 4 of the Southern Power Transmission Grid, tripping high-voltage circuit breakers and plunging three industrial zones into an 8-hour blackout. Cyber forensics discovered that an unauthorized hardware implant was physically connected behind the substation relay racks, feeding spoofed phase-angle commands to the SCADA server. Identify who planted the rogue implant.',
  targetQuestion: 'Which suspect physically breached Substation 4 and installed the rogue SCADA hardware implant?',
  suspects: [
    {
      id: 'SUS_301',
      name: 'Dr. Niloufer Patel',
      alias: 'The Grid Architect',
      role: 'Chief Grid Systems Architect',
      background: 'Designed the original digital SCADA architecture. Submitted her official resignation two weeks ago to join an international energy consortium.',
      alibi: 'Attending a video conference with European energy regulators from her home office from 18:00 to 22:00.'
    },
    {
      id: 'SUS_302',
      name: 'Vikramaditya Rao',
      alias: 'The Protection Chief',
      role: 'Senior Relay Protection Engineer',
      background: 'Responsible for field maintenance and physical relay cabinet calibration across regional substations.',
      alibi: 'Claims he was off-duty and working on his personal vintage motorcycle in his residential garage.'
    },
    {
      id: 'SUS_303',
      name: 'Sameer Alvi',
      alias: 'The Contractor',
      role: 'Subcontractor Fiber Splicer',
      background: 'Contracted by a third-party telecom vendor to install fiber optic monitoring lines inside Substation 4.',
      alibi: 'Working in the external cable trench outside the perimeter gate until 19:30.'
    },
    {
      id: 'SUS_304',
      name: 'Pooja Chawla',
      alias: 'The Incident Responder',
      role: 'Lead Cybersecurity Specialist',
      background: 'Audits network intrusion detection systems and reviews firewall exceptions across the state grid.',
      alibi: 'On shift at the central Security Operations Center (SOC) monitoring routine SIEM logs.'
    }
  ],
  allEntities: [
    { id: 'ENT_SUB4', label: 'Substation 4 High-Voltage Relay Bay', type: 'LOCATION', description: 'Target facility housing critical 400kV circuit breaker controls.' },
    { id: 'ENT_PINEAPPLE', label: 'Rogue Wi-Fi Hak5 Implant', type: 'DEVICE', description: 'Miniature dual-band interceptor wired into Ethernet switch port 9.' },
    { id: 'ENT_BADGE_VR', label: 'RFID Keycard #VR-902', type: 'DOCUMENT', description: 'Substation access badge assigned to Vikramaditya Rao.' },
    { id: 'ENT_MAC_ADDR', label: 'MAC Address B4:96:91:FA:21:88', type: 'DEVICE', description: 'Hardware identifier that configured the malicious relay commands.' },
    { id: 'ENT_USB_ALVI', label: 'Kingston 32GB USB Drive', type: 'DEVICE', description: 'Storage media seized from contractor Sameer Alvi toolkit.' }
  ],
  clues: [
    {
      id: 'CLUE_03_01',
      title: 'Substation 4 Perimeter Electronic Lock Log',
      category: 'SURVEILLANCE',
      preview: 'Badge unlock on Relay Bay rear door at 20:14.',
      content: 'The heavy biometric magnetic lock on Relay Bay 4 was opened at 20:14 using physical RFID Keycard #VR-902. Security cameras on that door had their power cords neatly disconnected 60 seconds earlier.',
      timestamp: '20:14:15',
      location: 'Substation 4 Rear Access',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_SUB4', label: 'Substation 4 High-Voltage Relay Bay', type: 'LOCATION', description: 'Site of physical breach.' },
        { id: 'ENT_BADGE_VR', label: 'RFID Keycard #VR-902', type: 'DOCUMENT', description: 'Access keycard used.' }
      ]
    },
    {
      id: 'CLUE_03_02',
      title: 'Physical Evidence: Seized Hardware Implant',
      category: 'FORENSICS',
      preview: 'Concealed Hak5 Wi-Fi interceptor recovered behind rack 3.',
      content: 'Forensic investigators dismantled Relay Rack 3 and discovered a miniaturized Hak5 dual-band Wi-Fi interceptor hidden inside a plastic cable shroud, bridging the air-gapped protection network to an external hotspot.',
      timestamp: '23:45:00',
      location: 'Substation 4 Rack 3',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_PINEAPPLE', label: 'Rogue Wi-Fi Hak5 Implant', type: 'DEVICE', description: 'Physical sabotage hardware.' },
        { id: 'ENT_MAC_ADDR', label: 'MAC Address B4:96:91:FA:21:88', type: 'DEVICE', description: 'Embedded hardware interface.' }
      ]
    },
    {
      id: 'CLUE_03_03',
      title: 'Seized Toolbag Inspection (Sameer Alvi)',
      category: 'FORENSICS',
      preview: 'Kingston 32GB USB found during perimeter lockdown.',
      content: 'Contractor Sameer Alvi was detained at the gate. A 32GB USB was found in his toolkit containing network diagnostic scripts. Deep forensic analysis revealed the USB contained open-source speed test utilities and personal music files, with no malware.',
      timestamp: '21:30:00',
      location: 'Perimeter Security Gate',
      isKeyLead: false,
      isRedHerring: true,
      redHerringReason: 'Sameer USB looked highly suspicious to first responders, but digital forensics confirmed zero exploit payloads or connection to the SCADA protocol.',
      extractableEntities: [
        { id: 'ENT_USB_ALVI', label: 'Kingston 32GB USB Drive', type: 'DEVICE', description: 'Innocent contractor drive.' },
        { id: 'SUS_303', label: 'Sameer Alvi', type: 'SUSPECT', description: 'Contractor falsely suspected.' }
      ]
    },
    {
      id: 'CLUE_03_04',
      title: 'Keycard Assignment Roster',
      category: 'DOCUMENT',
      preview: 'Registry for RFID credentials.',
      content: 'Facility administration records verify Keycard #VR-902 was issued directly to Senior Protection Engineer Vikramaditya Rao. No report of a lost or stolen badge was filed.',
      timestamp: '09:00:00',
      location: 'Substation Admin Office',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_BADGE_VR', label: 'RFID Keycard #VR-902', type: 'DOCUMENT', description: 'Vikramaditya Rao keycard.' },
        { id: 'SUS_302', label: 'Vikramaditya Rao', type: 'SUSPECT', description: 'Keycard owner.' }
      ]
    },
    {
      id: 'CLUE_03_05',
      title: 'Electronic Retailer Invoice Trace',
      category: 'FINANCIAL',
      preview: 'Customized micro-electronic shipment trace.',
      content: 'Investigation of the implant MAC address (B4:96:91:FA:21:88) mapped to a custom hardware order from an electronics importer in Pune, billed to Vikramaditya Rao home address and paid using his personal credit card.',
      timestamp: '14:10:00',
      location: 'Pune Hardware Distributor',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_MAC_ADDR', label: 'MAC Address B4:96:91:FA:21:88', type: 'DEVICE', description: 'MAC address purchased by Rao.' },
        { id: 'SUS_302', label: 'Vikramaditya Rao', type: 'SUSPECT', description: 'Hardware purchaser.' }
      ]
    },
    {
      id: 'CLUE_03_06',
      title: 'Grid Architect Dr. Patel Video Conference Records',
      category: 'DIGITAL',
      preview: 'Zoom session logs and network handshake.',
      content: 'IP logs confirm Dr. Niloufer Patel was actively participating in a recorded international video summit from 18:00 to 22:00. Her webcam, audio, and active desktop screen-sharing were authenticated by the conference server throughout.',
      timestamp: '18:00 - 22:00',
      location: 'European Energy Regulatory Forum',
      isKeyLead: false,
      isRedHerring: false,
      extractableEntities: [
        { id: 'SUS_301', label: 'Dr. Niloufer Patel', type: 'SUSPECT', description: 'Exonerated architect.' }
      ]
    }
  ],
  solution: {
    correctSuspectId: 'SUS_302',
    correctSuspectName: 'Vikramaditya Rao',
    keyLeadClueIds: ['CLUE_03_01', 'CLUE_03_02', 'CLUE_03_04', 'CLUE_03_05'],
    redHerringClueIds: ['CLUE_03_03'],
    essentialRelationships: [
      { source: 'SUS_302', target: 'ENT_BADGE_VR', label: 'Owns Registered Keycard' },
      { source: 'ENT_BADGE_VR', target: 'ENT_SUB4', label: 'Opened Relay Bay 4 at 20:14' },
      { source: 'SUS_302', target: 'ENT_MAC_ADDR', label: 'Purchased Hardware with Card' },
      { source: 'ENT_PINEAPPLE', target: 'ENT_SUB4', label: 'Planted in Rack 3' }
    ],
    explanation: 'Vikramaditya Rao exploited his insider knowledge of Substation 4. He disabled the local security camera, used his personal RFID Keycard #VR-902 to enter the restricted Relay Bay, and wired a rogue Hak5 Wi-Fi interceptor directly into the SCADA switch. He had personally purchased the exact hardware implant weeks earlier under his home address. The implant allowed external actors to inject false phase-angle commands and trip the grid.',
    keyEvidenceSummary: 'Access badge #VR-902 used at 20:14, physical recovery of the implant in Rack 3, and invoice linking the implant MAC address directly to Vikramaditya Rao.',
    trapExplanation: 'Contractor Sameer Alvi was found carrying an unauthorized USB drive near the gate, making him an easy scapegoat. However, forensic analysis verified the USB contained zero malicious code, while the actual attack vector was a wired hardware interceptor inside the locked bay.'
  }
};
