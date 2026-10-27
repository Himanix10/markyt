export interface FunnelStage {
  id: string;
  name: string;
  shortDesc: string;
  channels: string[];
  whatWeDo: string;
  metricTracked: string;
  iconName: string;
  isRetargetLoop?: boolean;
}

export interface ServiceItem {
  name: string;
  category: 'performance' | 'beyond';
  bestFor: string;
  description: string;
  deliverables: string[];
  icon: string;
  tag: string;
}

export interface StepProcess {
  number: number;
  title: string;
  summary: string;
  details: string;
  isMilestone?: boolean;
  costNote?: string;
  icon: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  icon: string;
  badge: string;
  commonBurn: string;
  ourApproach: string;
  recommendedChannels: string[];
}

export interface SheetRow {
  day: string;
  channel: string;
  amountSpent: number;
  impressions: number;
  cpm: number;
  linkClicks: number;
  ctr: string;
  cpc: number;
  leads: number;
  conversionRate: string;
  costPerLead: number;
  strategicNote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScriptBeat {
  id: number;
  title: string;
  timeRange: string;
  startSeconds: number;
  endSeconds: number;
  vo: string;
  voHighlightWords: string[];
  visualCue: string;
  audioCue: string;
  tag: string;
  costImpact?: {
    label: string;
    amount: string;
    isOldExpense: boolean;
  };
}

export interface VideoShowcaseItem {
  id: string;
  title: string;
  category: string;
  businessType: string;
  videoSrc: string;
  duration: string;
  hookText: string;
  roas: string;
  cpl: string;
  leadsGenerated: string;
  strategySummary: string;
  tags: string[];
}

export interface WhoWeAreProps {
  onOpenQuestionnaire?: () => void;
  onNavigateToCreatives?: () => void;
}
