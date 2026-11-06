/** Practice facts come from site.ts. General education is linked to the ADA.
 * No medication, sedation depth, permit, fee, or individual outcome is inferred.
 */
export type CareGuide = {
  sections: { heading: string; body: string }[];
  questions: { question: string; answer: string }[];
  links: { href: string; label: string }[];
  source: { href: string; label: string };
};

export const careGuides: Record<string, CareGuide> = {
  "iv-sedation": {
    sections: [
      {
        heading: "Start with a conversation about dental anxiety",
        body: "Waikiki Dental offers monitored IV sedation in Roseville. Tell the team if fear, a strong gag reflex, or a difficult past visit has kept you from care. Your consultation is the place to discuss the treatment you need, the comfort options available, and whether IV sedation fits your health and goals.",
      },
      {
        heading: "Understand your individual sedation plan",
        body: "Sedation and local anesthesia have different roles. Ask how awareness and discomfort will be managed, who will administer and monitor your care, and what qualifications support that plan. The type of treatment, your health, allergies, and anxiety all matter. A consultation does not commit you to sedation or treatment.",
      },
      {
        heading: "Prepare for the consultation",
        body: "Bring a current medication list and explain your health history, allergies, previous experiences with anesthesia, and questions. The team will tell you what information they need before recommending care. Ask for your own written preparation, transportation, and recovery instructions; do not change medications or follow another patient's instructions.",
      },
      {
        heading: "Discuss the treatment and estimate together",
        body: "If you are considering implants or other restorative treatment, ask which visits may involve sedation and how the work will be sequenced. Request an estimate that explains the proposed dental treatment, sedation, and any separate services. The office can discuss current payment arrangements before you decide.",
      },
    ],
    questions: [
      { question: "Will I be completely asleep?", answer: "Do not assume IV sedation means general anesthesia. Ask the dentist what level of awareness is intended for your plan and how you will be monitored. The appropriate approach depends on your health and the procedure." },
      { question: "Is IV sedation right for everyone?", answer: "No. The dentist must assess your health, medications, and planned treatment before recommending it. Tell the team about anxiety when you contact the office so the consultation can address your concerns." },
      { question: "Can I finish all my dental work in one visit?", answer: "The number of visits depends on the treatment and your individual plan. Some care needs separate stages or healing time. Ask what can be combined safely and what will require follow-up." },
      { question: "How do I arrange a sedation consultation?", answer: "Request an appointment online or call the Roseville office at (916) 772-6248. Tell the team you would like to discuss IV sedation. The team will confirm availability and the next step." },
    ],
    links: [
      { href: "/michael-narodovich-dmd/", label: "Meet Dr. Michael Narodovich" },
      { href: "/roseville-dental-implants/", label: "Explore dental implant planning" },
      { href: "/new-patients/", label: "First-visit and payment information" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/anesthesia-and-sedation", label: "American Dental Association: anesthesia and sedation" },
  },
  "roseville-dental-implants": {
    sections: [
      { heading: "Begin with the tooth you want to replace", body: "An implant consultation starts with your missing tooth or teeth, oral health, and goals. At Waikiki Dental in Roseville, ask how an implant-supported restoration would compare with a bridge or removable option. An examination is needed before the dentist can recommend a particular treatment." },
      { heading: "Get a clear plan for each stage", body: "Implant treatment generally involves placement, a period of healing, and a replacement tooth or teeth. Your dentist will explain the sequence, who provides each stage, any additional evaluation or treatment, and the follow-up visits. Healing and the timing of the final restoration vary; one-visit treatment should not be assumed." },
      { heading: "Know what your estimate includes", body: "Ask for an estimate that separates the implant, the connector and replacement tooth, and any other recommended services. Discuss whether imaging, grafting, temporary teeth, sedation, or follow-up would add to the plan. The team can explain current payment arrangements; the final estimate follows an examination." },
      { heading: "Plan for care after the restoration", body: "Implants are a long-term treatment option, with results that depend on the individual case and ongoing care. Ask how to clean around your restoration, when to return for checks, and which changes should prompt a call. A durable result still needs maintenance." },
    ],
    questions: [
      { question: "Can implants replace more than one tooth?", answer: "Implants can support replacement of one or more teeth. The appropriate number of implants and type of restoration depend on your examination and treatment plan. Ask the dentist to compare the suitable options." },
      { question: "Will I need a bone graft?", answer: "That cannot be determined from a website. Ask the dentist how your supporting bone will be evaluated and whether any additional treatment is needed before placement." },
      { question: "Can I ask about IV sedation for implant treatment?", answer: "Yes. Waikiki Dental offers IV sedation consultations. The dentist must review your health and the proposed procedure before deciding whether sedation is appropriate and explaining the plan." },
      { question: "How long will treatment take?", answer: "Placement, healing, and restoration may happen at different visits. Ask for a timeline for your case, including any preliminary treatment, temporary restoration, and follow-up." },
    ],
    links: [
      { href: "/iv-sedation/", label: "Ask about IV sedation" },
      { href: "/michael-narodovich-dmd/", label: "Meet your Roseville dentist" },
      { href: "/dental-crowns/", label: "How dental crowns restore teeth" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/implants", label: "American Dental Association: dental implants" },
  },
};
