import { ChallengeCase } from '../../types';

export const CASE_5: ChallengeCase = {
  id: 'ULK-005',
  title: 'THE BLACK VIPER',
  subtitle: 'The Clandestine Precursor Diversion',
  difficulty: 'EXPERT',
  category: 'Narcotics Precursors & Industrial Conspiracy',
  briefing: 'Over 1,200 Liters of pharmaceutical-grade BMK (Benzyl Methyl Ketone)—a controlled precursor strictly regulated for commercial synthesis—vanished from the bulk storage tanks of Deccan Pharma Ltd. False documentation claimed the batch had suffered thermal degradation and was incinerated at the state hazmat treatment facility. Instead, it was routed to clandestine synthesis labs. Uncover which senior plant director engineered the phantom incineration.',
  targetQuestion: 'Which senior executive orchestrated the false incineration manifest and diverted 1,200L of BMK precursor?',
  suspects: [
    {
      id: 'SUS_501',
      name: 'Dr. Harish Chandra',
      alias: 'The Chief Chemist',
      role: 'Quality Assurance Laboratory Director',
      background: 'Oversees chemical assay certifications and purity standards across all raw material consignments.',
      alibi: 'Conducting spectrophotometry tests in the cleanroom laboratory until 21:00; access card logs verified.'
    },
    {
      id: 'SUS_502',
      name: 'Sanjay Deshmukh',
      alias: 'The Supply Director',
      role: 'Director of Procurement & Material Supply',
      background: 'Authorizes chemical bulk purchases, hazmat transport permits, and waste disposal contracts.',
      alibi: 'Claims he was off-site negotiating bulk solvent contracts at an industrial conference.'
    },
    {
      id: 'SUS_503',
      name: 'Imran Khan',
      alias: 'The Yard Supervisor',
      role: 'Hazmat Tank Loading Yard Foreman',
      background: 'Manages pump hoses, drum transfers, and physical driver gate passes at Loading Bay 3.',
      alibi: 'Supervising tank maintenance crews in the open yard throughout the late-night shift.'
    },
    {
      id: 'SUS_504',
      name: 'Priya Nambiar',
      alias: 'The Liaison Officer',
      role: 'Excise & Environmental Regulatory Liaison',
      background: 'Liaises with State Narcotics Control Bureau to file monthly chemical inventory declarations.',
      alibi: 'Filing routine statutory returns from corporate headquarters downtown.'
    }
  ],
  allEntities: [
    { id: 'ENT_DRUMS', label: '1,200L BMK Precursor Consignment', type: 'EVIDENCE', description: 'Controlled chemical precursor capable of producing millions in illicit synthetic stimulants.' },
    { id: 'ENT_MANIFEST_INCIN', label: 'Hazmat Incineration Certificate #INC-441', type: 'DOCUMENT', description: 'False document claiming the batch was destroyed in the furnace.' },
    { id: 'ENT_TANKER', label: 'Tanker MH-12-Q-7781', type: 'VEHICLE', description: 'Commercial acid transport tanker used to carry diverted chemical.' },
    { id: 'ENT_SEAL_STAMP', label: 'Executive Stamp & Digital Token #SD-09', type: 'DOCUMENT', description: 'Director Deshmukh official authorization signature and seal.' },
    { id: 'ENT_WICKR_HANDLE', label: 'Wickr Alias Alchemist_99', type: 'PHONE', description: 'Encrypted messenger account coordinating clandestine deliveries.' }
  ],
  clues: [
    {
      id: 'CLUE_05_01',
      title: 'State Hazmat Facility Incinerator Telemetry',
      category: 'FORENSICS',
      preview: 'Furnace temperature logs reveal no organic burn at 02:00.',
      content: 'State Hazmat Facility logs for Certificate #INC-441 claim 1,200L of liquid was incinerated at 02:00. However, digital thermal logs show the main burner was shut down for scheduled maintenance all night. No chemical was burned.',
      timestamp: '02:00:00',
      location: 'State Hazmat Treatment Facility, Taloja',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_MANIFEST_INCIN', label: 'Hazmat Incineration Certificate #INC-441', type: 'DOCUMENT', description: 'Fraudulent incineration certificate.' },
        { id: 'ENT_DRUMS', label: '1,200L BMK Precursor Consignment', type: 'EVIDENCE', description: 'Diverted precursor.' }
      ]
    },
    {
      id: 'CLUE_05_02',
      title: 'Disposal Manifest Authorization Signature',
      category: 'DOCUMENT',
      preview: 'Executive authorization signed using Token #SD-09.',
      content: 'Certificate #INC-441 required high-level corporate authorization. Internal system audit shows Director Sanjay Deshmukh personal cryptographic token #SD-09 signed the emergency disposal authorization.',
      timestamp: '18:45:00',
      location: 'Deccan Pharma ERP Portal',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_SEAL_STAMP', label: 'Executive Stamp & Digital Token #SD-09', type: 'DOCUMENT', description: 'Deshmukh personal token.' },
        { id: 'SUS_502', label: 'Sanjay Deshmukh', type: 'SUSPECT', description: 'Authorizing executive.' }
      ]
    },
    {
      id: 'CLUE_05_03',
      title: 'Yard Foreman Imran Khan Cash Audit',
      category: 'FINANCIAL',
      preview: 'Rs 45,000 cash discovered in foreman locker.',
      content: 'Security search of foreman Imran Khan locker found Rs 45,000 in cash envelopes. Imran admitted receiving informal speed-money from delivery drivers to expedite loading queues, but had no access to disposal permits.',
      timestamp: '10:15:00',
      location: 'Loading Yard Locker Room',
      isKeyLead: false,
      isRedHerring: true,
      redHerringReason: 'Imran cash was petty bribery from truck drivers cutting in line for loading slots. He possessed neither the security clearance nor the digital token to authorize the 1,200L diversion.',
      extractableEntities: [
        { id: 'SUS_503', label: 'Imran Khan', type: 'SUSPECT', description: 'Corrupt foreman but innocent of major theft.' }
      ]
    },
    {
      id: 'CLUE_05_04',
      title: 'GPS Tracking: Acid Tanker MH-12-Q-7781',
      category: 'LOGISTICS',
      preview: 'Tanker geofence alert triggered near clandestine warehouse.',
      content: 'Tanker MH-12-Q-7781, registered to Deccan Pharma contracted carrier, loaded the 1,200L at Bay 3 under guise of disposal. Its GPS tracker showed it bypassed the state incinerator and unloaded at an unlicensed industrial godown in Raigad.',
      timestamp: '03:30:00',
      location: 'Raigad Industrial Estate',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_TANKER', label: 'Tanker MH-12-Q-7781', type: 'VEHICLE', description: 'Tanker that transported chemical.' },
        { id: 'ENT_DRUMS', label: '1,200L BMK Precursor Consignment', type: 'EVIDENCE', description: 'Diverted consignment.' }
      ]
    },
    {
      id: 'CLUE_05_05',
      title: 'Encrypted Wickr Communications Recovery',
      category: 'DIGITAL',
      preview: 'Chat logs retrieved from seized burner device in Raigad.',
      content: 'Forensics recovered chat logs between clandestine lab operators and Wickr handle Alchemist_99. The handle confirmed: Disposal cert #INC-441 signed. Tanker MH-12 arriving 03:30. Wire balance to Singapore trustee. The phone running Alchemist_99 connected to Wi-Fi at Sanjay Deshmukh private residence.',
      timestamp: '01:15:00',
      location: 'Encrypted Network Node',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_WICKR_HANDLE', label: 'Wickr Alias Alchemist_99', type: 'PHONE', description: 'Encrypted coordination account.' },
        { id: 'SUS_502', label: 'Sanjay Deshmukh', type: 'SUSPECT', description: 'Operator behind Alchemist_99.' }
      ]
    },
    {
      id: 'CLUE_05_06',
      title: 'Quality Control Lab Assay Log (Dr. Chandra)',
      category: 'FORENSICS',
      preview: 'Initial batch purity certified at 99.4%.',
      content: 'Laboratory notebooks kept by Dr. Harish Chandra showed the chemical batch was tested at 99.4% purity upon factory arrival, contradicting the disposal report claim that the batch had degraded into toxic sludge.',
      timestamp: '14:00:00',
      location: 'QC Chemistry Lab',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'SUS_501', label: 'Dr. Harish Chandra', type: 'SUSPECT', description: 'QC Chemist who proved batch was pure.' }
      ]
    }
  ],
  solution: {
    correctSuspectId: 'SUS_502',
    correctSuspectName: 'Sanjay Deshmukh',
    keyLeadClueIds: ['CLUE_05_01', 'CLUE_05_02', 'CLUE_05_04', 'CLUE_05_05', 'CLUE_05_06'],
    redHerringClueIds: ['CLUE_05_03'],
    essentialRelationships: [
      { source: 'SUS_502', target: 'ENT_SEAL_STAMP', label: 'Controls Authorization Token' },
      { source: 'ENT_SEAL_STAMP', target: 'ENT_MANIFEST_INCIN', label: 'Signed Bogus Incineration Permit' },
      { source: 'ENT_TANKER', target: 'ENT_DRUMS', label: 'Loaded and Diverted Chemical' },
      { source: 'SUS_502', target: 'ENT_WICKR_HANDLE', label: 'Operates Wickr Alias from Home' }
    ],
    explanation: 'Procurement Director Sanjay Deshmukh forged the phantom incineration scheme. Using his personal cryptographic token #SD-09, he authorized Disposal Certificate #INC-441 falsely declaring 1,200L of pure BMK as degraded waste. He then dispatched Tanker MH-12-Q-7781 directly to a clandestine laboratory in Raigad instead of the incinerator. Under the encrypted Wickr alias Alchemist_99 (traced to his home Wi-Fi), he coordinated the delivery in exchange for Singapore wire payments.',
    keyEvidenceSummary: 'Token #SD-09 authorization signature on fake manifest #INC-441, incinerator thermal log showing zero burn, and Wickr Alchemist_99 IP connection to Deshmukh residence.',
    trapExplanation: 'Foreman Imran Khan was found with Rs 45,000 cash in his locker. While guilty of petty bribery for queue-jumping, he had zero access to the executive cryptographic tokens required to authorize the multi-crore chemical diversion.'
  }
};
