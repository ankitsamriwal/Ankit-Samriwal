// Advisory content for the premium homepage.
// Edit freely: everything client-facing on the new page flow lives here.

export const BOOKING_EMAIL = 'ankitsamriwal@gmail.com';

// Leave `fromPrice` empty to show "Fixed fee, scoped after briefing".
// Set it (e.g. "From USD 18,000") once you've settled your rates.
export interface Offer {
  code: string;
  name: string;
  format: string;
  fromPrice: string;
  forWho: string;
  outcome: string;
  includes: string[];
}

export const OFFERS: Offer[] = [
  {
    code: 'I',
    name: 'Agentic Readiness Sprint',
    format: '2 weeks · fixed scope',
    fromPrice: '',
    forWho: 'Leadership teams with an AI mandate and no agreed first move.',
    outcome: 'A ranked portfolio of agent use cases, the platform decision behind them, and a 90-day plan your board can approve.',
    includes: ['Executive and process-owner interviews', 'Use-case scoring against value, risk and data reality', 'Platform and build-vs-buy recommendation', 'Board-ready readout'],
  },
  {
    code: 'II',
    name: 'Sovereign & Air-gapped AI Architecture Review',
    format: '3–4 weeks · fixed scope',
    fromPrice: '',
    forWho: 'Government, defence and regulated finance where data cannot leave the building.',
    outcome: 'A defensible reference architecture for on-premises or sovereign-cloud agents, with the controls your regulator will ask about.',
    includes: ['Seven-layer agentic reference architecture fitted to your estate', 'Model hosting, identity and audit design', 'Regulatory mapping (e.g. CBUAE, PDPL, sector rules)', 'Vendor shortlist and risk register'],
  },
  {
    code: 'III',
    name: 'Fractional AI Programme Director',
    format: 'Monthly retainer · 3-month minimum',
    fromPrice: '',
    forWho: 'Organisations already spending on AI and integrators who need senior delivery cover.',
    outcome: 'Someone senior who owns the programme: governance, vendors, delivery cadence and the hard conversations.',
    includes: ['Programme governance and steering', 'Vendor and SI oversight', 'Delivery assurance across workstreams', 'Two working days a week, scalable'],
  },
];

// Anonymised. Confirm each one is cleared for public reference before publishing.
export interface CaseFile {
  no: string;
  sector: string;
  client: string;
  stage: 'Delivered' | 'Solution architecture';
  problem: string;
  approach: string;
  result: string;
}

export const CASE_FILES: CaseFile[] = [
  {
    no: '014',
    sector: 'Defence',
    client: 'Federal defence entity, GCC',
    stage: 'Solution architecture',
    problem: 'A stakeholder engagement platform had to run fully air-gapped, ruling out the usual SaaS CRM route.',
    approach: 'Built the technical case for a purpose-built stack over an on-premises packaged CRM, then proved it with a working demonstrator.',
    result: 'A justified, deployable architecture with no external dependencies.',
  },
  {
    no: '022',
    sector: 'Banking',
    client: 'Mortgage lender in managed wind-down, UAE',
    stage: 'Solution architecture',
    problem: 'Around 2.3 TB across core banking, CRM, BPM and BI had to be retained for the regulator after the business closed.',
    approach: 'Designed a regulator- and data-protection-compliant archival strategy that keeps records retrievable once the source systems are switched off.',
    result: 'A retention model that lets every source platform be decommissioned.',
  },
  {
    no: '031',
    sector: 'Manufacturing',
    client: 'Industrial manufacturer, UAE',
    stage: 'Delivered',
    problem: 'A legacy ERP was holding back warehouse operations and reporting.',
    approach: 'Led the move to Dynamics 365 Business Central with warehouse management, using a phased data migration to keep the plant running.',
    result: 'Live on the new ERP with warehousing in scope.',
  },
  {
    no: '037',
    sector: 'Retail',
    client: 'European retail group',
    stage: 'Delivered',
    problem: 'An ageing AX 2012 R3 estate with retail point-of-sale needed a supported future.',
    approach: 'Led the migration to Dynamics 365 Finance & Operations with LS Retail.',
    result: 'Retail and finance on a current, supported platform.',
  },
];

export const PROOF: { figure: string; label: string }[] = [
  { figure: '21+', label: 'years in enterprise software' },
  { figure: 'AED 40M+', label: 'portfolio governed' },
  { figure: '6', label: 'regulated sectors' },
  { figure: '80+', label: 'weekly AI Chronicles' },
];

export const CERTS = ['Azure Solutions Architect Expert', 'Azure DevOps Engineer Expert', 'PMP', 'PMI-ACP', 'SAFe Agilist', 'Microsoft Project Ready · Agentic AI'];

export const LAB = [
  {
    name: 'Mailstorm',
    line: 'An agent reads the inbox first and hands back obligations, not messages.',
    url: 'https://mailstorm-v1.vercel.app',
  },
  {
    name: 'Laya typed decisions',
    line: 'A fine-tuned model that returns structured, typed decisions instead of free text.',
    url: 'https://huggingface.co/Ankit1106/laya-typed-decisions',
  },
];
