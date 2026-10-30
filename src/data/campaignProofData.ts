export interface CampaignProofData {
  campaign: string;
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
    campaign: 'Premium Wooden Slabs (Carousel)',
    status: 'Active',
    results: 132,
    resultsUnit: 'conversations',
    costPerResult: '₹27.94',
    costPerUnit: 'per conv.',
    amountSpent: '₹3,688.08',
    budgetNote: '₹3.69K spent'
  },
  {
    campaign: 'Premium Wooden Slabs (Video)',
    status: 'Active',
    results: 101,
    resultsUnit: 'conversations',
    costPerResult: '₹46.12',
    costPerUnit: 'per conv.',
    amountSpent: '₹4,658.17',
    budgetNote: '₹5,000 budget'
  },
  {
    campaign: 'Skin Clinic',
    status: 'Active',
    results: 60,
    resultsUnit: 'conversations',
    costPerResult: '₹62.98',
    costPerUnit: 'per conv.',
    amountSpent: '₹3,778.80',
    budgetNote: '₹3.78K spent'
  },
  {
    campaign: 'Fitness Coach',
    status: 'Active',
    results: 15,
    resultsUnit: 'conversations',
    costPerResult: '₹62.62',
    costPerUnit: 'per conv.',
    amountSpent: '₹939.27',
    budgetNote: 'Ad set budget'
  },
  {
    campaign: 'Therapist',
    isDayOne: true,
    badge: {
      text: 'Day 2 Data',
      variant: 'amber'
    },
    status: 'Active',
    results: 6,
    resultsUnit: 'conversations',
    costPerResult: '₹71.82',
    costPerUnit: 'per conv.',
    amountSpent: '₹430.92',
    budgetNote: 'Ad set budget'
  }
];

