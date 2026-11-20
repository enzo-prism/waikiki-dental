/** Practice facts come from site.ts. General education is linked to the ADA.
 * No medication, sedation depth, permit, fee, or individual outcome is inferred.
 */
export type CareGuide = {
  /** Section heading; defaults to "Answers before you choose your care." */
  title?: string;
  sections: { heading: string; body: string }[];
  questions: { question: string; answer: string }[];
  links: { href: string; label: string }[];
  source: { href: string; label: string };
  professionalRecord?: { href: string; label: string; checked: string };
};

/** Visible on /orthodontics/ and marked up as FAQPage there. */
export const orthodonticsQuestions = [
  { question: "What does the first visit cover?", answer: "The dentist reviews alignment, spacing, crowding, bite, oral health, and what you want to change." },
  { question: "Is Invisalign right for every case?", answer: "No. Some tooth movements and bite concerns need the control of braces. An evaluation makes that distinction clear." },
  { question: "Can adults have orthodontic treatment?", answer: "Yes. Adults can be evaluated for clear aligners or braces as long as their teeth and supporting tissues are healthy enough for movement." },
];

export const careGuides: Record<string, CareGuide> = {
  "iv-sedation": {
    professionalRecord: { href: "https://search.dca.ca.gov/profile/440/4417/44/MS", label: "Dr. Narodovich’s Moderate Sedation Permit #44", checked: "November 6, 2026" },
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
  "dental-crowns": {
    sections: [
      { heading: "When a crown is the right repair", body: "A crown covers the whole visible part of a tooth to restore its shape, size, and strength. Dentists recommend one when a tooth is cracked, badly worn, weakened by a large filling, or no longer has enough structure to hold a filling. A crown can also cover a dental implant. Dr. Narodovich examines the tooth first and explains whether a crown, a filling, or another option makes more sense." },
      { heading: "Two visits, with a lab-made crown", body: "Waikiki Dental provides traditional crowns. At the first visit the tooth is shaped and protected with a temporary crown, and a dental lab makes your permanent crown to fit your bite. At the second visit the lab-made crown is fitted, adjusted, and cemented. Same-day crowns are not offered at this office." },
      { heading: "Know what your estimate includes", body: "Ask for an estimate that lists the crown and any other recommended care, such as imaging or treatment the tooth needs first. If you have dental insurance, ask the office to check what your plan may cover. CareCredit financing, major credit and debit cards, cash, and checks are accepted. Medi-Cal is not accepted." },
    ],
    questions: [
      { question: "Does Waikiki Dental offer same-day crowns?", answer: "No. Waikiki Dental provides traditional lab-made crowns in two visits, with a temporary crown protecting the tooth in between." },
      { question: "Does getting a crown hurt?", answer: "The tooth is numbed before it is shaped, and the team paces the visit around your comfort. If dental anxiety is the bigger obstacle, ask about an IV sedation consultation." },
      { question: "How do I care for a temporary crown?", answer: "Chew on the other side when you can, avoid sticky or very hard foods, and clean the area gently. If the temporary crown comes off or feels loose, call the office at (916) 772-6248." },
      { question: "How long does a dental crown last?", answer: "It depends on the tooth, your bite, and your home care. Grinding, chewing ice or hard objects, and skipped cleanings shorten a crown's life. Ask the dentist what to watch for at your follow-up visits." },
    ],
    links: [
      { href: "/roseville-dental-implants/", label: "Replacing a missing tooth instead" },
      { href: "/iv-sedation/", label: "Ask about IV sedation" },
      { href: "/new-patients/", label: "Insurance and payment options" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/crowns", label: "American Dental Association: crowns" },
  },
  "dental-emergencies": {
    title: "What to do in a dental emergency.",
    sections: [
      { heading: "Call the office first", body: "Call Waikiki Dental at (916) 772-6248 and describe what happened, where it hurts, and whether there is swelling or bleeding. The Roseville office is open Monday to Friday, and the team makes every effort to see urgent cases as quickly as possible." },
      { heading: "What to do on the way", body: "For a knocked-out adult tooth, hold it by the crown, not the root, and keep it moist: place it back in the socket if you can, or keep it between your cheek and gum or in milk, and come in right away. For a cracked tooth, rinse with warm water and use a cold compress on your face. For a toothache, rinse with warm water and floss gently to remove trapped food. Do not put aspirin on the tooth or gums." },
      { heading: "When to go to an emergency room instead", body: "Go to an emergency room or call 911 if facial swelling makes it hard to breathe or swallow, if bleeding will not stop, or if you have a possible jaw fracture or head injury. If the office is closed and symptoms are severe, do not wait for office hours." },
    ],
    questions: [
      { question: "What counts as a dental emergency?", answer: "Severe tooth pain, facial swelling, a knocked-out or loosened adult tooth, a cracked or broken tooth, and a lost crown or filling that leaves the tooth sharp or sensitive are all reasons to call the office promptly." },
      { question: "Can I be seen today?", answer: "Call as early in the day as you can. The team makes every effort to see urgent cases quickly, and availability depends on the day's schedule. The office is open Monday to Friday." },
      { question: "What should I do with a knocked-out tooth?", answer: "Pick it up by the crown, keep it moist, and come in right away. Try to place it back in the socket without touching the root; if you cannot, keep it between your cheek and gum or in milk." },
      { question: "How much does an emergency visit cost?", answer: "It depends on the exam, any X-rays, and the treatment the tooth needs. Ask the team for an estimate before treatment. CareCredit, major credit and debit cards, cash, and checks are accepted; Medi-Cal is not." },
    ],
    links: [
      { href: "/dental-crowns/", label: "Repairing a broken tooth with a crown" },
      { href: "/iv-sedation/", label: "Anxious about treatment? IV sedation" },
      { href: "/contact-waikiki-dental/", label: "Directions and office hours" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies", label: "American Dental Association: dental emergencies" },
  },
  "roseville-invisalign": {
    sections: [
      { heading: "Start with an orthodontic evaluation", body: "Clear aligners work well for many crowding, spacing, and mild bite concerns, but not every tooth movement. At Waikiki Dental in Roseville, the dentist reviews your alignment, bite, gum health, and goals, then explains whether Invisalign or traditional braces fits the movement your teeth need." },
      { heading: "How treatment works day to day", body: "Invisalign uses a series of custom clear aligners, each moving the teeth a small step. You remove them to eat, drink anything but water, and brush, then put them straight back in. Aligners only move teeth while you wear them, so your dentist will give you a daily wear schedule and check progress at regular visits." },
      { heading: "Plan for cost and retention", body: "Ask for an estimate that includes the aligners, check-ups, any refinement aligners, and retainers. If you have dental insurance, ask the office whether your plan includes orthodontic coverage. CareCredit financing is available. After treatment, retainers hold teeth in their new position." },
    ],
    questions: [
      { question: "Is Invisalign better than braces?", answer: "Neither is better for everyone. Aligners are nearly invisible and removable; braces give more control for complex alignment and bite problems. An evaluation tells you which one suits your case." },
      { question: "Can adults get Invisalign?", answer: "Yes. Healthy teeth can be moved at any age. Gum disease or decay needs treatment first." },
      { question: "Will I need a retainer after Invisalign?", answer: "Yes. Teeth can drift after any orthodontic treatment, so plan on a retainer and ask how often to wear it." },
      { question: "How long does Invisalign take?", answer: "It depends on how far your teeth need to move and how consistently you wear the aligners. The dentist can give you an estimated timeline after the evaluation." },
    ],
    links: [
      { href: "/orthodontics/", label: "Compare Invisalign and braces" },
      { href: "/traditional-braces/", label: "Traditional braces" },
      { href: "/new-patients/", label: "Insurance and CareCredit" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/braces", label: "American Dental Association: braces and aligners" },
  },
  veneers: {
    sections: [
      { heading: "What veneers can change", body: "Porcelain veneers are thin, custom-made shells bonded to the front of the teeth. They can improve teeth that are chipped, stained, worn, uneven, or slightly gapped. Unlike a crown, a veneer covers only the front surface of the tooth." },
      { heading: "Know before you commit", body: "Veneers are not reversible: a thin layer of enamel is usually removed so they sit naturally. Decay and gum disease need treatment first. If you clench or grind, or have a deep overbite, veneers may not be the best choice, so tell the dentist. Veneers are usually considered cosmetic and may not be covered by insurance." },
      { heading: "Plan the shape and shade together", body: "At Waikiki Dental in Roseville, start by describing what you want to change. Dr. Narodovich can explain which teeth would need veneers, whether whitening first would help the shade match, and how veneers fit into a larger smile makeover. CareCredit financing is available." },
    ],
    questions: [
      { question: "Are veneers permanent?", answer: "The change to your teeth is. Enamel is removed to place them, so a tooth that has had a veneer will always need one. A veneer can chip, wear, or loosen over time and may need repair or replacement." },
      { question: "Veneers or crowns: what is the difference?", answer: "A veneer covers the front surface of a healthy tooth for appearance. A crown covers the whole tooth and is used when it needs strength as well as shape." },
      { question: "Does insurance pay for veneers?", answer: "Usually not, because veneers are considered cosmetic unless a dentist finds them medically necessary. Ask the office to check your plan." },
      { question: "Can I whiten my teeth after veneers?", answer: "Whitening does not change the color of porcelain. If you want brighter teeth overall, whiten first so the veneers can be matched to the new shade." },
    ],
    links: [
      { href: "/smile-makeover/", label: "Plan a full smile makeover" },
      { href: "/teeth-whitening/", label: "Professional teeth whitening" },
      { href: "/dental-crowns/", label: "When a crown is the better fit" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/veneers", label: "American Dental Association: veneers" },
  },
  "teeth-whitening": {
    sections: [
      { heading: "Why teeth change color", body: "Coffee, tea, red wine, and tobacco stain the enamel surface. With age, enamel thins and more of the yellower layer beneath shows through. An injury or some medications can also darken a tooth. Knowing the cause helps the dentist tell you what whitening can realistically change." },
      { heading: "What whitening can and cannot change", body: "Whitening lightens natural tooth enamel. It does not change the color of crowns, veneers, or fillings, so tell the team about any dental work on your front teeth. Sensitivity during or after whitening is common and usually temporary; mention any sensitivity you already have." },
      { heading: "Start with an exam", body: "A dentist can check whether a stain or sensitivity has a cause that needs treatment first, such as decay or a worn filling. At Waikiki Dental in Roseville, ask what whitening may achieve for your shade and how to plan it around an event or other cosmetic work." },
    ],
    questions: [
      { question: "Will whitening work on my crowns or fillings?", answer: "No. Whitening only lightens natural enamel. Existing crowns, veneers, and fillings keep their color and may need replacing to match newly whitened teeth." },
      { question: "Does teeth whitening cause sensitivity?", answer: "Some people feel temporary sensitivity. Tell the dentist if your teeth are already sensitive so the plan can account for it." },
      { question: "Should I whiten before getting veneers or crowns?", answer: "Usually, yes. Restorations are matched to the shade of the teeth around them, so whitening first lets new work match your brighter smile." },
      { question: "How long do whitening results last?", answer: "It depends on your habits. Coffee, tea, red wine, and tobacco bring stains back sooner. Ask the team about touch-ups." },
    ],
    links: [
      { href: "/veneers/", label: "Porcelain veneers" },
      { href: "/smile-makeover/", label: "Plan a smile makeover" },
      { href: "/cleanings-exams/", label: "Cleanings and exams" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening", label: "American Dental Association: teeth whitening" },
  },
  "smile-makeover": {
    sections: [
      { heading: "Start with what you want to change", body: "A smile makeover is a plan, not a single procedure. Tell the dentist what bothers you about your smile: color, chips, gaps, crowding, worn or missing teeth. Dr. Narodovich can explain which combination of whitening, veneers, crowns, orthodontics, or implants could address it." },
      { heading: "The order matters", body: "Healthy teeth and gums come first, so decay or gum disease is treated before cosmetic work. Alignment usually comes next, then whitening, then veneers or crowns matched to the final shade. Implants that replace missing teeth need healing time, which shapes the timeline." },
      { heading: "Phase it around your budget and calendar", body: "Ask for an estimate for each phase so you can decide what to do now and what can wait. CareCredit financing is available, and insurance may cover restorative parts of a plan but rarely purely cosmetic ones. If long or multiple visits make you anxious, ask whether IV sedation fits your plan." },
    ],
    questions: [
      { question: "What can a smile makeover include?", answer: "Any combination of whitening, porcelain veneers, crowns, Invisalign or braces, and dental implants, chosen around your goals and the health of your teeth." },
      { question: "Can a smile makeover be done in stages?", answer: "Yes. Many patients phase treatment over months. Ask the dentist which steps need to happen first and which can wait." },
      { question: "Is IV sedation available for a smile makeover?", answer: "Waikiki Dental offers IV sedation consultations. The dentist reviews your health and the planned treatment before deciding whether sedation is appropriate." },
      { question: "Will insurance cover a smile makeover?", answer: "Insurance may help with restorative work such as crowns or implants, but purely cosmetic treatment is usually not covered. Ask the office to check your plan." },
    ],
    links: [
      { href: "/veneers/", label: "Porcelain veneers" },
      { href: "/roseville-invisalign/", label: "Invisalign clear aligners" },
      { href: "/iv-sedation/", label: "IV sedation for longer visits" },
    ],
    source: { href: "https://www.mouthhealthy.org/all-topics-a-z/veneers", label: "American Dental Association: veneers" },
  },
};
