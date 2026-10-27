import { MARKYT_CONTACT } from '../data/content';

export interface QuestionnaireData {
  businessName: string;
  businessType?: string;
  primaryGoal?: string;
  targetCityOrPanIndia?: string;
  currentMarketing?: string;
  contactNumber?: string;
  additionalNotes?: string;
  source?: string;
}

export function buildWhatsAppQuestionnaireUrl(data: QuestionnaireData): string {
  const parts: string[] = [
    `*🚀 New ₹5,000 Sprint Strategy Inquiry - MARKYT*`,
    ``,
    `*🏢 Business Name:* ${data.businessName.trim() || 'Not specified'}`,
  ];

  if (data.businessType) {
    parts.push(`*📂 Category / Niche:* ${data.businessType}`);
  }
  if (data.primaryGoal) {
    parts.push(`*🎯 30-Day Goal:* ${data.primaryGoal}`);
  }
  if (data.targetCityOrPanIndia) {
    parts.push(`*📍 Target Location:* ${data.targetCityOrPanIndia}`);
  }
  if (data.currentMarketing) {
    parts.push(`*📊 Past Experience:* ${data.currentMarketing}`);
  }
  if (data.contactNumber) {
    parts.push(`*📞 Contact Provided:* ${data.contactNumber}`);
  }
  if (data.additionalNotes) {
    parts.push(`*📝 Extra Details:* ${data.additionalNotes}`);
  }

  parts.push(``);
  parts.push(`*💰 Budget:* ₹5,000 Validation Sprint (Zero Lock-In)`);
  parts.push(``);
  parts.push(`Hi MARKYT team! I've filled out the strategy questionnaire on your website. Please inspect our business model and share our tailored validation sprint blueprint.`);

  const text = parts.join('\n');
  return `https://wa.me/${MARKYT_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildQuickBlueprintWhatsAppUrl(data: {
  businessName: string;
  industry: string;
  goal: string;
  contact?: string;
}): string {
  const parts: string[] = [
    `*🚀 Quick Intake Blueprint Request - MARKYT*`,
    ``,
    `*🏢 Business Name:* ${data.businessName.trim() || 'Not specified'}`,
    `*📂 Industry:* ${data.industry}`,
    `*🎯 Primary Goal:* ${data.goal}`,
    `*💰 Test Budget:* ₹5,000 / 30 Days (Zero Lock-In)`,
  ];

  if (data.contact && data.contact.trim()) {
    parts.push(`*📞 My Contact / Phone:* ${data.contact.trim()}`);
  }

  parts.push(``);
  parts.push(`Hi MARKYT team! I just configured my ₹5,000 validation sprint on your website. Looking forward to discussing the ad angles and daily tracking sheet!`);

  const text = parts.join('\n');
  return `https://wa.me/${MARKYT_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Safely persist submitted inquiries locally so no data is ever lost
export function saveInquiryLocally(inquiry: Record<string, any>): void {
  try {
    const existing = JSON.parse(localStorage.getItem('markyt_saved_inquiries') || '[]');
    existing.unshift({
      ...inquiry,
      id: `inq_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('markyt_saved_inquiries', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // ignore
  }
}
