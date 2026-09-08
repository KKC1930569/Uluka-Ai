import { ChallengeCase } from '../../types';

export const CASE_2: ChallengeCase = {
  id: 'ULK-002',
  title: 'THE PHANTOM LEDGER',
  subtitle: 'The Infrastructure Escrow Siphoning',
  difficulty: 'HARD',
  category: 'Corporate Embezzlement & Hawala Laundering',
  briefing: 'Rs 4.2 Crore earmarked for the Metro Rail Expansion project was siphoned from the State Infrastructure Escrow account in three rapid tranches. The fraud bypassed dual-authorization protocols and was converted into offshore crypto liquidity vouchers. The perpetrators used spoofed executive emails and forged digital signatures. Determine which corporate insider orchestrated the authorization bypass.',
  targetQuestion: 'Which executive bypassed internal dual-authorization controls to siphon Rs 4.2 Crore from the infrastructure escrow?',
  suspects: [
    {
      id: 'SUS_201',
      name: 'Arvind Singhania',
      alias: 'The CFO',
      role: 'Chief Financial Officer',
      background: 'Known for contentious disagreements with the board after being passed over for the CEO appointment.',
      alibi: 'Was hosting an investor dinner at the Taj Krishna from 19:30 to 23:00, corroborated by hotel valets.'
    },
    {
      id: 'SUS_202',
      name: 'Meera Sen',
      alias: 'The Compliance Head',
      role: 'Head of Treasury & Compliance',
      background: 'Holds sole physical possession of the hardware master OTP security token for emergency treasury overrides.',
      alibi: 'Claims her security token remained locked inside the executive vault during the transaction period.'
    },
    {
      id: 'SUS_203',
      name: 'Devendra Joshi',
      alias: 'The Auditor',
      role: 'Lead Internal Auditor',
      background: 'Conducts quarterly treasury audits. Flagged an accounting anomaly 48 hours after the funds had already cleared.',
      alibi: 'Reviewing vendor reconciliation spreadsheets from home; IP address logs show routine intranet queries.'
    },
    {
      id: 'SUS_204',
      name: 'Kunal Bhasin',
      alias: 'The DevOps Lead',
      role: 'Principal Infrastructure Engineer',
      background: 'Engineered the automated batch-payment API scripts used for municipal contractor settlements.',
      alibi: 'Boarding an Indigo flight from Hyderabad to Bengaluru at 20:45; boarding pass and tarmac logs verified.'
    }
  ],
  allEntities: [
    { id: 'ENT_ESCROW', label: 'Metro Escrow Acc *0911', type: 'ACCOUNT', description: 'Primary state project fund holding Rs 4.2 Crore.' },
    { id: 'ENT_TOKEN_M', label: 'YubiKey Master Token #8841', type: 'DEVICE', description: 'Hardware multi-factor token assigned to Treasury Head Meera Sen.' },
    { id: 'ENT_SHELL_CO', label: 'Aura Logistics FZE (Dubai)', type: 'ORGANIZATION', description: 'Unregistered offshore conduit that received the first wire tranche.' },
    { id: 'ENT_FORGED_MAIL', label: 'Spoofed Email Alert #FX-99', type: 'DOCUMENT', description: 'Email appearing to be from CFO Arvind Singhania approving urgent wire.' },
    { id: 'ENT_CRYPTO_NODE', label: 'USDT Escrow Bridge 0x4f...91', type: 'ACCOUNT', description: 'Decentralized liquidity pool where funds were converted.' }
  ],
  clues: [
    {
      id: 'CLUE_02_01',
      title: 'Bank Core Transaction Log',
      category: 'FINANCIAL',
      preview: 'Three wire tranches totaling Rs 4.2 Crore at 21:12.',
      content: 'Core banking logs reveal tranches of Rs 1.4 Cr, Rs 1.5 Cr, and Rs 1.3 Cr released within 180 seconds. The wire release was approved via emergency bypass rule using Master Token #8841.',
      timestamp: '21:12:30',
      location: 'State Apex Bank Gateway',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_ESCROW', label: 'Metro Escrow Acc *0911', type: 'ACCOUNT', description: 'Drained municipal fund.' },
        { id: 'ENT_TOKEN_M', label: 'YubiKey Master Token #8841', type: 'DEVICE', description: 'Hardware token used for bypass.' }
      ]
    },
    {
      id: 'CLUE_02_02',
      title: 'Executive Email Server Forensics',
      category: 'DIGITAL',
      preview: 'Header trace on CFO Arvind Singhania approval email.',
      content: 'DKIM and SPF verification failed for CFO Singhania email. The message originated from a temporary VPN exit node in Romania, spoofing Arvind display name. Arvind phone was inactive on the network during this window.',
      timestamp: '20:58:12',
      location: 'Exchange Mail Gateway',
      isKeyLead: true,
      isRedHerring: true,
      redHerringReason: 'The email was a deliberate diversion to frame Arvind Singhania. The banking system did not rely on email; it strictly required the physical hardware token.',
      extractableEntities: [
        { id: 'ENT_FORGED_MAIL', label: 'Spoofed Email Alert #FX-99', type: 'DOCUMENT', description: 'Forged email framing the CFO.' },
        { id: 'SUS_201', label: 'Arvind Singhania', type: 'SUSPECT', description: 'Framed CFO.' }
      ]
    },
    {
      id: 'CLUE_02_03',
      title: 'Hardware Security Token Cryptographic Audit',
      category: 'FORENSICS',
      preview: 'Serial #8841 handshake recorded at 21:11:45.',
      content: 'Hardware token log demonstrates YubiKey #8841 generated a rolling OTP code directly inserted into the bank portal. The serial number #8841 is uniquely assigned and registered to Meera Sen.',
      timestamp: '21:11:45',
      location: 'Treasury Security Vault',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_TOKEN_M', label: 'YubiKey Master Token #8841', type: 'DEVICE', description: 'Meera Sen hardware token.' },
        { id: 'SUS_202', label: 'Meera Sen', type: 'SUSPECT', description: 'Head of Treasury.' }
      ]
    },
    {
      id: 'CLUE_02_04',
      title: 'Offshore Beneficiary Ownership Registry',
      category: 'FINANCIAL',
      preview: 'Corporate registrar filing for Aura Logistics FZE.',
      content: 'Shell entity Aura Logistics FZE in Ras Al Khaimah lists a nominee director. However, corporate bank resolution documents link beneficial ownership and signature authority to Meera Sen Dubai resident card.',
      timestamp: '11:00:00',
      location: 'RAK International Corporate Centre',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_SHELL_CO', label: 'Aura Logistics FZE (Dubai)', type: 'ORGANIZATION', description: 'Offshore shell company.' },
        { id: 'SUS_202', label: 'Meera Sen', type: 'SUSPECT', description: 'Beneficial owner.' }
      ]
    },
    {
      id: 'CLUE_02_05',
      title: 'DevOps Automated Script Execution Records',
      category: 'DIGITAL',
      preview: 'Batch transfer scripts authored by Kunal Bhasin.',
      content: 'The API endpoint used for the transfer was authored by Kunal Bhasin 6 months ago. However, git commit logs confirm the code was standard vendor automation. Kunal was in flight mode aboard Indigo 6E-512 at the time of execution.',
      timestamp: '21:12:00',
      location: 'AWS Production Cluster',
      isKeyLead: false,
      isRedHerring: false,
      extractableEntities: [
        { id: 'SUS_204', label: 'Kunal Bhasin', type: 'SUSPECT', description: 'Exonerated engineer.' }
      ]
    },
    {
      id: 'CLUE_02_06',
      title: 'Mauritius Real Estate Purchase Agreement',
      category: 'DOCUMENT',
      preview: 'Pre-construction villa reservation dated yesterday.',
      content: 'Financial intelligence received a confidential reservation deed for a ,000 beachfront villa in Grand Baie, Mauritius, guaranteed by an escrow receipt originating from Aura Logistics FZE.',
      timestamp: '17:45:00',
      location: 'Port Louis Notary Office',
      isKeyLead: true,
      isRedHerring: false,
      extractableEntities: [
        { id: 'ENT_SHELL_CO', label: 'Aura Logistics FZE (Dubai)', type: 'ORGANIZATION', description: 'Shell company purchasing real estate.' }
      ]
    }
  ],
  solution: {
    correctSuspectId: 'SUS_202',
    correctSuspectName: 'Meera Sen',
    keyLeadClueIds: ['CLUE_02_01', 'CLUE_02_03', 'CLUE_02_04', 'CLUE_02_06'],
    redHerringClueIds: ['CLUE_02_02'],
    essentialRelationships: [
      { source: 'SUS_202', target: 'ENT_TOKEN_M', label: 'Sole Holder of Hardware Token' },
      { source: 'ENT_TOKEN_M', target: 'ENT_ESCROW', label: 'Authorized Emergency Drain' },
      { source: 'ENT_ESCROW', target: 'ENT_SHELL_CO', label: 'Transferred Rs 4.2 Cr to' },
      { source: 'SUS_202', target: 'ENT_SHELL_CO', label: 'Ultimate Beneficial Owner' }
    ],
    explanation: 'Meera Sen orchestrated the embezzlement by physically using her exclusive Master YubiKey #8841 to authorize three emergency bypass wire transfers totaling Rs 4.2 Crore into her offshore shell firm Aura Logistics FZE. To create confusion, she staged a spoofed email from Romanian IPs framing CFO Arvind Singhania. The stolen funds were immediately committed to offshore real estate purchases.',
    keyEvidenceSummary: 'Cryptographic signature logs from Meera Sen assigned YubiKey #8841 and beneficial ownership registry linking her to Aura Logistics FZE.',
    trapExplanation: 'The spoofed email appeared to catch CFO Arvind Singhania red-handed. However, forensic analysis revealed the email headers were forged via external Romanian VPNs and had no cryptographic connection to the bank transfer authorization.'
  }
};
