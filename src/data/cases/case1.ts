import { ChallengeCase } from '../../types';

export const CASE_1: ChallengeCase = {
  id: 'ULK-001',
  title: 'OPERATION MIDNIGHT ECHO',
  subtitle: 'The Ghost Highway Dispatcher',
  difficulty: 'MEDIUM',
  category: 'Narcotics Logistics & Corridor Interception',
  briefing: 'A multi-district narcotics corridor has been detected moving contraband across State Highway 65. The transport truck (AP-09-TX-4402) made an unlogged 45-minute stopover near Suryapet and dumped satellite tracking. One insider inside the logistics dispatch terminal deliberately masked the GPS telemetry and guided the vehicle through a checkpoint bypass. Identify the rogue dispatcher who coordinated the drop.',
  targetQuestion: 'Which suspect inside the logistics network orchestrated the GPS bypass and coordinated the highway contraband drop?',
  suspects: [
    {
      id: 'SUS_01',
      name: 'Farhan Qureshi',
      alias: 'The Yard Boss',
      role: 'Warehouse Loading Manager',
      background: 'Oversees physical freight loading at Hyderabad central freight hub. 12 years seniority with clean audit records.',
      alibi: 'Logged in on CCTV at Hyderabad loading dock until 22:30, confirmed by biometric punch.'
    },
    {
      id: 'SUS_02',
      name: 'Tanya Verma',
      alias: 'Night Owl',
      role: 'Senior Fleet Routing Dispatcher',
      background: 'Manages remote route allocation and automated geofence monitoring during night-shift cycles.',
      alibi: 'Claims she was monitoring routine telemetry alerts at desk terminal D-44 without manual overrides.'
    },
    {
      id: 'SUS_03',
      name: 'Rajesh Dada Nair',
      alias: 'Highway Broker',
      role: 'Independent Broker & Forwarder',
      background: 'Operates an informal transit office near Suryapet bypass. Known intermediary with prior excise inquiries.',
      alibi: 'States he was attending a transport union dispute in Vijayawada from 21:00 to 02:00.'
    },
    {
      id: 'SUS_04',
      name: 'Sunil Mehta',
      alias: 'The Vendor',
      role: 'Highway Oasis Fuel Station Owner',
      background: 'Leases the highway plaza where truck AP-09-TX-4402 halted during the 45-minute blacked-out window.',
      alibi: 'Supervising cash register shifts and inventory deliveries inside the station retail mart.'
    }
  ],
  allEntities: [
    { id: 'ENT_TRUCK', label: 'Truck AP-09-TX-4402', type: 'VEHICLE', description: 'Heavy freight container truck carrying contraband hidden in FMCG goods.' },
    { id: 'ENT_D44', label: 'Terminal Console D-44', type: 'DEVICE', description: 'Fleet management terminal used for dispatch monitoring and route adjustments.' },
    { id: 'ENT_SURYAPET', label: 'Suryapet Bypass Mile 72', type: 'LOCATION', description: 'Unlit service lane where contraband cargo was transferred.' },
    { id: 'ENT_OASIS', label: 'Highway Oasis Plaza', type: 'LOCATION', description: 'Fuel and diner complex with high volume of civilian transit.' },
    { id: 'ENT_BURNER_A', label: 'Burner Line +91 9849-011244', type: 'PHONE', description: 'Unregistered SIM card recovered from container driver cab.' },
    { id: 'ENT_ACC_OFFSHORE', label: 'Account *6619 (Canara Bank)', type: 'ACCOUNT', description: 'Private savings account held under an undisclosed maiden name.' }
  ],
  clues: [
    {
      id: 'CLUE_01_01',
      title: 'Fleet Telemetry Server Log (Route AP-09-TX)',
      category: 'LOGISTICS',
      preview: 'Telemetry disconnect timestamped at 23:14:02.',
      content: 'Server diagnostic log indicates truck AP-09-TX-4402 ping dropped off GPS at 23:14 near Mile 72. Telemetry logs show a Maintenance Override signal originating from internal dispatcher workstation D-44.',
      timestamp: '23:14:02',
      location: 'Central Dispatch Server, Hyderabad',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_TRUCK', label: 'Truck AP-09-TX-4402', type: 'VEHICLE', description: 'Target transit truck.' },
        { id: 'ENT_D44', label: 'Terminal Console D-44', type: 'DEVICE', description: 'Dispatcher console that issued override.' }
      ]
    },
    {
      id: 'CLUE_01_02',
      title: 'Workstation Access Roster & Badge Swipes',
      category: 'SURVEILLANCE',
      preview: 'Console D-44 operator shift records.',
      content: 'Security swipe logs confirm Console D-44 was assigned to Senior Dispatcher Tanya Verma throughout the night shift. Her active smartcard was docked in the terminal continuously from 20:05 until 03:52.',
      timestamp: '20:05 - 03:52',
      location: 'Operations Control Floor',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_D44', label: 'Terminal Console D-44', type: 'DEVICE', description: 'Tanya Verma active workstation.' },
        { id: 'SUS_02', label: 'Tanya Verma', type: 'SUSPECT', description: 'Active dispatcher on Console D-44.' }
      ]
    },
    {
      id: 'CLUE_01_03',
      title: 'FASTag Toll Records: Suryapet Plaza',
      category: 'SURVEILLANCE',
      preview: 'Plaza lane crossing at 00:15.',
      content: 'FASTag sensors recorded truck AP-09-TX-4402 passing Suryapet Plaza at 00:15—exactly 45 minutes behind schedule. Toll CCTV captured the driver conversing with a dark sedan driver.',
      timestamp: '00:15:10',
      location: 'Suryapet Plaza Lane 4',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_TRUCK', label: 'Truck AP-09-TX-4402', type: 'VEHICLE', description: 'Target transit truck.' },
        { id: 'ENT_SURYAPET', label: 'Suryapet Bypass Mile 72', type: 'LOCATION', description: 'Drop zone near plaza.' }
      ]
    },
    {
      id: 'CLUE_01_04',
      title: 'Highway Oasis CCTV Footage Analysis',
      category: 'SURVEILLANCE',
      preview: '52 vehicles captured between 23:00 and 00:00.',
      content: 'CCTV footage from Sunil Mehta fuel station captures dozens of interstate vehicles and long-haul buses. A dark SUV resembling Rajesh Nair company car is seen in the outer parking lot at 23:35.',
      timestamp: '23:35:00',
      location: 'Highway Oasis Plaza',
      isKeyLead: false,
      isRedHerring: true,
      redHerringReason: 'The SUV was driven by an interstate tourist stopping for tea. Rajesh Nair was over 120km away in Vijayawada with verified toll timestamps.',
      extractableEntities: [
        { id: 'ENT_OASIS', label: 'Highway Oasis Plaza', type: 'LOCATION', description: 'Busy highway rest stop.' },
        { id: 'SUS_04', label: 'Sunil Mehta', type: 'SUSPECT', description: 'Station operator.' }
      ]
    },
    {
      id: 'CLUE_01_05',
      title: 'Bank Wire Intercept (Account *6619)',
      category: 'FINANCIAL',
      preview: 'Rs 8,50,000 credit flagged by FIU-IND.',
      content: 'A sudden wire of Rs 8,50,000 was transferred into Canara Bank Account *6619 via an encrypted fintech bridge 4 hours prior to highway departure. Account registration trace links to Tanya Verma familial maiden name (Tanya Saxena).',
      timestamp: '16:20:00',
      location: 'Fintech Escrow Gate',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_ACC_OFFSHORE', label: 'Account *6619 (Canara Bank)', type: 'ACCOUNT', description: 'Secret recipient account.' },
        { id: 'SUS_02', label: 'Tanya Verma', type: 'SUSPECT', description: 'Beneficiary owner.' }
      ]
    },
    {
      id: 'CLUE_01_06',
      title: 'CDR Tower Dump: Mile 72 Cell Mast',
      category: 'TELECOM',
      preview: 'Encrypted burst communication at 23:18.',
      content: 'Burner Line +91 9849-011244 in truck cab exchanged two 14-second calls with an IP gateway routed through dispatch terminal D-44, right as the vehicle entered the unlogged service lane bypass.',
      timestamp: '23:18:14',
      location: 'Cell Tower HYD-STP-044',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_BURNER_A', label: 'Burner Line +91 9849-011244', type: 'PHONE', description: 'Truck burner line.' },
        { id: 'ENT_D44', label: 'Terminal Console D-44', type: 'DEVICE', description: 'Console communication origin.' }
      ]
    },
    {
      id: 'CLUE_01_07',
      title: 'Loading Bay Freight Manifest',
      category: 'FORENSICS',
      preview: 'Hyderabad warehouse departure inspection sheet.',
      content: 'Physical manifest signed by Farhan Qureshi at 20:00. The seals were certified intact upon leaving the Hyderabad dock. Tampering occurred strictly while on the road, long after warehouse release.',
      timestamp: '20:00:00',
      location: 'Hyderabad Central Dock',
      isKeyLead: false,
      isRedHerring: false,
      extractableEntities: [
        { id: 'SUS_01', label: 'Farhan Qureshi', type: 'SUSPECT', description: 'Warehouse manager.' }
      ]
    }
  ],
  solution: {
    correctSuspectId: 'SUS_02',
    correctSuspectName: 'Tanya Verma',
    keyLeadClueIds: ['CLUE_01_01', 'CLUE_01_02', 'CLUE_01_03', 'CLUE_01_05', 'CLUE_01_06'],
    redHerringClueIds: ['CLUE_01_04'],
    essentialRelationships: [
      { source: 'SUS_02', target: 'ENT_D44', label: 'Operates Workstation' },
      { source: 'ENT_D44', target: 'ENT_TRUCK', label: 'Sent Override Signal to' },
      { source: 'ENT_BURNER_A', target: 'ENT_D44', label: 'Direct Encrypted Call' },
      { source: 'SUS_02', target: 'ENT_ACC_OFFSHORE', label: 'Beneficiary of Rs 8.5L' }
    ],
    explanation: 'Tanya Verma utilized her privileged access at Dispatch Console D-44 to send a remote maintenance override signal, deliberately cutting off satellite GPS tracking on truck AP-09-TX-4402 at Mile 72. She then placed two encrypted voice calls directly to the driver burner phone to navigate the unpatrolled bypass. In return, she received Rs 8,50,000 into her secondary maiden account.',
    keyEvidenceSummary: 'Console D-44 smartcard session bound to Tanya Verma, IP gateway packet logs connecting D-44 to driver burner phone, and financial transfer to account *6619.',
    trapExplanation: 'The Highway Oasis Plaza CCTV showed over 50 commercial vehicles and a car matching Rajesh Nair firm. However, this busy rest stop was a false lead—Rajesh was attending a verified union meeting over 120km away.'
  }
};
