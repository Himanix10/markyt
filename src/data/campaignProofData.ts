export interface CampaignProofData {
  campaign: string;
  campaignType?: string; // e.g. 'Carousel', 'Video', 'Reel'
  isDayOne?: boolean;
  isPurchase?: boolean;
  badge?: {
    text: string;
    variant: 'emerald' | 'amber';
  };
  status: 'Active' | 'Completed';
  results: number;
  resultsUnit: string;
  resultsSub?: string;
  costPerResult: string;
  costPerUnit: string;
  amountSpent: string;
  budgetNote?: string;
}

export const CAMPAIGN_PROOF_ROWS: CampaignProofData[] = [
  {
    campaign: 'Clothing Brand',
    isPurchase: true,
    status: 'Completed',
    results: 57,
    resultsUnit: 'website purchases',
    costPerResult: '₹175.44',
    costPerUnit: 'per purchase',
    amountSpent: '₹10,000.00',
    budgetNote: '₹10.00K spent'
  },
  {
    campaign: 'Premium Wooden Slabs',
    campaignType: 'Carousel',
    status: 'Active',
    results: 200,
    resultsUnit: 'conversations',
    costPerResult: '₹27.89',
    costPerUnit: 'per conv.',
    amountSpent: '₹5,550.58',
    budgetNote: '₹3.69K spent'
  },
  {
    campaign: 'Premium Wooden Slabs',
    campaignType: 'Video',
    status: 'Active',
    results: 154,
    resultsUnit: 'conversations',
    costPerResult: '₹72.38',
    costPerUnit: 'per conv.',
    amountSpent: '₹11,146.68',
    budgetNote: '₹5,000 budget'
  },
  {
    campaign: 'Skin Clinic',
    status: 'Completed',
    results: 68,
    resultsUnit: 'conversations',
    costPerResult: '₹62.31',
    costPerUnit: 'per conv.',
    amountSpent: '₹4,237.27',
    budgetNote: '₹3.78K spent'
  },
  {
    campaign: 'Fitness Coach',
    status: 'Active',
    results: 30,
    resultsUnit: 'conversations',
    costPerResult: '₹86.03',
    costPerUnit: 'per conv.',
    amountSpent: '₹2,580.83',
    budgetNote: 'Ad set budget'
  },
  {
    campaign: 'Therapist',
    status: 'Active',
    results: 13,
    resultsUnit: 'conversations',
    costPerResult: '₹126.64',
    costPerUnit: 'per conv.',
    amountSpent: '₹1,646.26',
    budgetNote: 'Ad set budget'
  },
  {
    campaign: 'Clothing Brand',
    isPurchase: true,
    status: 'Active',
    results: 32,
    resultsUnit: 'website purchases',
    costPerResult: '₹273.25',
    costPerUnit: 'per purchase',
    amountSpent: '₹8,743.90',
    budgetNote: 'Ad set budget'
  },
  {
    campaign: 'Clothing Brand',
    isPurchase: true,
    status: 'Completed',
    results: 36,
    resultsUnit: 'website purchases',
    costPerResult: '₹120.35',
    costPerUnit: 'per purchase',
    amountSpent: '₹4,332.44',
    budgetNote: 'Ad set budget'
  }
];
