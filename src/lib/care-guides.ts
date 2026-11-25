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
  {
    question: "What happens during an orthodontic consultation?",
    answer:
      "We examine your alignment, spacing, crowding, bite, and overall gum and tooth health, then talk through what you want to change so we can recommend the right path.",
  },
  {
    question: "Is Invisalign the right choice for every smile?",
    answer:
      "Not always. Clear aligners work well for many alignment concerns, while certain bite or rotational movements respond better to traditional braces. An exam makes that difference clear.",
  },
  {
    question: "Can adults start orthodontic treatment?",
    answer:
      "Yes. Healthy teeth can be moved at any age, so adults are routinely candidates for either clear aligners or braces once gums and teeth are in good shape.",
  },
];

export const careGuides: Record<string, CareGuide> = {
  "iv-sedation": {
    professionalRecord: {
      href: "https://search.dca.ca.gov/profile/440/4417/44/MS",
      label: "Dr. Narodovich’s Moderate Sedation Permit #44",
      checked: "November 6, 2026",
    },
    sections: [
      {
        heading: "Start with a conversation about dental anxiety",
        body: "At our Roseville office, monitored IV sedation starts with simply talking. Tell us if fear, a strong gag reflex, or a rough past appointment has kept you away from care. Your consultation gives us time to hear your story, understand the treatment you need, and decide together whether IV sedation fits your health and comfort goals.",
      },
      {
        heading: "A clear, personalized comfort plan",
        body: "Sedation helps you relax deeply while local anesthesia keeps the treatment area numb. Before you agree to anything, we explain the level of relaxation planned for your visit, who will administer and monitor your sedation, and how your medical history, allergies, and procedure shape that plan. Coming in to talk never commits you to treatment.",
      },
      {
        heading: "How to prepare for your consultation",
        body: "Bring an up-to-date list of your medications and let us know about any health conditions, allergies, or past experiences with anesthesia. We review everything carefully before recommending sedation and give you written preparation, escort, and recovery instructions tailored to your appointment.",
      },
    ],
    questions: [
      {
        question: "Will I be completely asleep during IV sedation?",
        answer:
          "IV sedation is designed for deep relaxation rather than general anesthesia. During your consultation, Dr. Narodovich explains the exact level of awareness intended for your plan and how you will be monitored throughout the visit.",
      },
      {
        question: "Is IV sedation safe and appropriate for everyone?",
        answer:
          "Not everyone is a candidate. We review your medical history, current medications, and planned procedures first to confirm whether monitored IV sedation is a safe match for you.",
      },
      {
        question: "Can we combine multiple dental treatments into one visit?",
        answer:
          "Sometimes, depending on the procedures involved and whether healing time is needed between stages. We map out what can be completed together safely and what works best across separate visits.",
      },
      {
        question: "How do I schedule an IV sedation consultation?",
        answer:
          "Call or text our Roseville office at (916) 772-6248 and let us know you would like an IV sedation consultation. Our team will walk you through availability and the next step.",
      },
    ],
    links: [
      { href: "/michael-narodovich-dmd/", label: "Meet Dr. Michael Narodovich" },
      { href: "/roseville-dental-implants/", label: "Explore dental implant planning" },
      { href: "/new-patients/", label: "First-visit and payment details" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/anesthesia-and-sedation",
      label: "American Dental Association: anesthesia and sedation",
    },
  },
  "roseville-dental-implants": {
    sections: [
      {
        heading: "Begin with the tooth you want to replace",
        body: "Every implant plan starts with an exam of the missing space, your bite, and your long-term goals. At our Roseville office, we compare dental implants honestly against bridges or removable alternatives so you can weigh how each choice looks, feels, and holds up before deciding.",
      },
      {
        heading: "Know every stage and who handles it",
        body: "Implant care typically moves through three stages: placing the titanium root, giving the bone time to heal around it, and crafting your final replacement tooth. During your consultation, we lay out who handles each step, where each appointment takes place, and when you return to Waikiki Dental if a surgical specialist is part of your plan.",
      },
      {
        heading: "A clear breakdown of your estimate",
        body: "After your exam, we provide a written estimate that separates the implant, the connector, and the final crown, along with any imaging, bone grafting, temporary tooth, or sedation your case calls for. We also check dental insurance benefits and walk through CareCredit options upfront.",
      },
      {
        heading: "Caring for your implant over the long haul",
        body: "Dental implants are a long-term tooth replacement whose durability depends on your overall health and consistent upkeep. We show you how to clean around the restoration at home, set up regular checkups, and let you know what signs should prompt a call.",
      },
    ],
    questions: [
      {
        question: "Can dental implants replace more than one missing tooth?",
        answer:
          "Yes. Implants can support a single crown, multiple teeth, or a larger restoration depending on your exam and bite. We review your options together so you can see what fits best.",
      },
      {
        question: "Will I need a bone graft first?",
        answer:
          "We evaluate your supporting jawbone with imaging during your exam to find out. If bone grafting would help create a stronger foundation, we explain why and include it clearly in your plan.",
      },
      {
        question: "Can I use IV sedation for implant care?",
        answer:
          "Yes, you can ask about monitored IV sedation during your consultation. Dr. Narodovich reviews your health history and planned stages first to confirm whether sedation is appropriate.",
      },
      {
        question: "How long does the full implant process take?",
        answer:
          "Because placement, healing, and final crown delivery happen in stages, total timing varies from person to person. After your exam, we give you a clear timeline including any temporary restoration and follow-up visits.",
      },
    ],
    links: [
      { href: "/iv-sedation/", label: "Learn about IV sedation" },
      { href: "/michael-narodovich-dmd/", label: "Meet Dr. Narodovich" },
      { href: "/dental-crowns/", label: "How lab-made crowns restore teeth" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/implants",
      label: "American Dental Association: dental implants",
    },
  },
  "dental-crowns": {
    sections: [
      {
        heading: "When a crown makes more sense than a filling",
        body: "A crown fits over the entire visible portion of a tooth to restore its shape, comfort, and chewing strength. We typically recommend one when a tooth is cracked, heavily worn, or weakened by a large older filling, or when completing a dental implant. Dr. Narodovich examines the tooth first and explains plainly whether a crown, a filling, or another repair is the smartest choice.",
      },
      {
        heading: "Two calm visits with a lab-made crown",
        body: "We provide traditional crowns crafted by a dental lab rather than same-day milled crowns. At your first Roseville visit, we shape the tooth, take precise records for the lab, and fit a temporary crown to keep you comfortable. At your second visit, we try in the finished lab-made crown, adjust it to your bite, and cement it securely.",
      },
      {
        heading: "Transparent estimates and payment options",
        body: "Before we start, we give you a written estimate covering the crown and any supporting care the tooth needs, such as X-rays or buildup. If you have dental insurance, our front desk checks what your plan may contribute. We accept CareCredit financing, major credit and debit cards, cash, and checks. Medi-Cal is not accepted.",
      },
    ],
    questions: [
      {
        question: "Does Waikiki Dental offer same-day crowns?",
        answer:
          "No. We place traditional lab-made crowns across two visits, with a protective temporary crown in between so our dental lab can tailor the fit and shade to your bite.",
      },
      {
        question: "Will getting a crown be uncomfortable?",
        answer:
          "We numb the tooth thoroughly before shaping it and check in with you throughout the visit. If dental anxiety makes longer appointments tough, ask us about an IV sedation consultation.",
      },
      {
        question: "How should I treat my temporary crown between visits?",
        answer:
          "Chew on the opposite side when you can, steer clear of sticky or very hard foods, and brush and floss gently around it. If the temporary feels loose or comes off, call us at (916) 772-6248 so we can help.",
      },
      {
        question: "How long can a dental crown last?",
        answer:
          "Longevity depends on the underlying tooth, your bite, and everyday habits. Clenching, chewing ice, or skipping cleanings can shorten a crown's lifespan, so we check its fit and edges at every routine exam.",
      },
    ],
    links: [
      { href: "/roseville-dental-implants/", label: "Replacing a missing tooth with an implant" },
      { href: "/iv-sedation/", label: "Explore IV sedation" },
      { href: "/new-patients/", label: "Insurance and payment options" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/crowns",
      label: "American Dental Association: crowns",
    },
  },
  "dental-emergencies": {
    title: "What to do in a dental emergency.",
    sections: [
      {
        heading: "Call our Roseville office first",
        body: "Reach us at (916) 772-6248 and tell us what happened, where the pain is, and whether you notice swelling or bleeding. We are open Monday to Friday and make every effort to get urgent patients in as quickly as our schedule allows.",
      },
      {
        heading: "First steps while you head in",
        body: "If an adult tooth is knocked out, pick it up by the crown rather than the root and keep it moist: gently place it back into the socket if you can, or hold it between your cheek and gum or in a small container of milk, and come in right away. For a cracked tooth, rinse gently with warm water and place a cold compress against your cheek. For a toothache, rinse with warm water and floss gently around the area, and never place aspirin directly against the tooth or gums.",
      },
      {
        heading: "When to go straight to an emergency room",
        body: "Call 911 or head to the nearest emergency room right away if facial swelling affects your breathing or swallowing, if heavy bleeding will not stop, or if you suspect a jaw fracture or head injury. Do not wait for office hours if symptoms are severe.",
      },
    ],
    questions: [
      {
        question: "What counts as an urgent dental problem?",
        answer:
          "Severe or worsening tooth pain, facial or gum swelling, a knocked-out or loosened adult tooth, a cracked or broken tooth, or a lost crown or filling that leaves the tooth sharp or sensitive are all good reasons to call right away.",
      },
      {
        question: "Can you see me today?",
        answer:
          "Call us as early in the day as possible, Monday to Friday. We make every effort to fit urgent cases in quickly, depending on the day's schedule.",
      },
      {
        question: "What should I do if a permanent tooth is knocked out?",
        answer:
          "Handle the tooth only by the white crown, never the root, and keep it moist. Place it back in the socket if it slides in gently; otherwise keep it in milk or inside your cheek and call us immediately.",
      },
      {
        question: "How much does an emergency dental visit cost?",
        answer:
          "Cost depends on the exam, any needed X-rays, and the treatment required to stabilize the tooth. We walk you through a clear estimate before treatment begins. We accept CareCredit, major credit and debit cards, cash, and checks; Medi-Cal is not accepted.",
      },
    ],
    links: [
      { href: "/dental-crowns/", label: "Restoring a broken tooth with a crown" },
      { href: "/iv-sedation/", label: "Nervous about treatment? Learn about IV sedation" },
      { href: "/contact-waikiki-dental/", label: "Office hours and directions" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies",
      label: "American Dental Association: dental emergencies",
    },
  },
  "roseville-invisalign": {
    sections: [
      {
        heading: "Start with an honest orthodontic evaluation",
        body: "Clear aligners straighten many crowding, spacing, and mild bite concerns discreetly, though they are not the ideal tool for every movement. At our Roseville office, we check your bite, gum health, and alignment first, then explain clearly whether Invisalign or traditional braces will give you the strongest result.",
      },
      {
        heading: "Living with clear aligners day to day",
        body: "Invisalign uses a sequence of custom clear trays, each nudging your teeth a small step closer to their target position. You take them out to eat, drink anything besides water, and brush, then pop them right back in. Consistent daily wear keeps treatment moving on schedule, backed by regular checkups at our office.",
      },
      {
        heading: "Plan ahead for cost and retainers",
        body: "At your consultation, we provide a written estimate that lays out the aligners, progress visits, any refinement trays, and your retainers afterward. Our front desk can check whether your dental insurance includes orthodontic benefits, and CareCredit financing is available if you want monthly payments.",
      },
    ],
    questions: [
      {
        question: "Is Invisalign better than traditional braces?",
        answer:
          "It depends on how your teeth need to move. Clear aligners are removable and discreet, while braces provide tighter control for complex bite or rotational shifts. We help you compare both honestly after an exam.",
      },
      {
        question: "Can adults straighten their teeth with Invisalign?",
        answer:
          "Yes. Adults do very well with clear aligners as long as teeth and gums are healthy first. If any decay or gum inflammation is present, we address that before starting alignment.",
      },
      {
        question: "Will I need to wear a retainer after Invisalign?",
        answer:
          "Yes. Teeth naturally try to drift back after orthodontic treatment, so retainers are essential for protecting your results. We include retention planning in your estimate and explain your wear schedule.",
      },
      {
        question: "How long does Invisalign treatment take?",
        answer:
          "Treatment length depends on how much movement your smile needs and how consistently you wear each tray. We give you a personalized estimated timeline during your Roseville evaluation.",
      },
    ],
    links: [
      { href: "/orthodontics/", label: "Compare Invisalign and braces" },
      { href: "/traditional-braces/", label: "Learn about traditional braces" },
      { href: "/new-patients/", label: "Insurance and CareCredit options" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/braces",
      label: "American Dental Association: braces and aligners",
    },
  },
  veneers: {
    sections: [
      {
        heading: "What porcelain veneers can refine",
        body: "Porcelain veneers are thin, custom-crafted shells fitted to the front surface of teeth to improve chips, deep stains, worn edges, uneven shape, or small gaps. Unlike a crown, which wraps the entire tooth for structural reinforcement, a veneer focuses on the visible front surface.",
      },
      {
        heading: "What to weigh before choosing veneers",
        body: "Placing veneers is an irreversible step because a thin layer of enamel is typically shaped so the porcelain sits smoothly and naturally. Any underlying decay or gum disease comes first. If you clench, grind, or have a heavy bite, tell us early so we can advise whether veneers or another option will serve you better. Because veneers are usually cosmetic, dental insurance rarely covers them.",
      },
      {
        heading: "Designing shape and shade together",
        body: "At our Roseville office, we start by listening to what you want your smile to look like. Dr. Narodovich walks you through which teeth are involved, whether brightening surrounding teeth first makes sense for shade matching, and how veneers can stand alone or anchor a broader smile makeover. CareCredit financing is available.",
      },
    ],
    questions: [
      {
        question: "Are porcelain veneers permanent?",
        answer:
          "The preparation to the tooth is permanent because a thin layer of enamel is shaped to seat the porcelain cleanly. Over the years, a veneer can wear, chip, or loosen and eventually need repair or replacement.",
      },
      {
        question: "What is the difference between veneers and crowns?",
        answer:
          "A veneer refines the front surface of a structurally sound tooth for appearance, while a crown covers the entire tooth when it needs added strength as well as a renewed look.",
      },
      {
        question: "Does dental insurance cover porcelain veneers?",
        answer:
          "Usually not, since veneers are typically classified as cosmetic care. Our front desk is always happy to check your specific plan and walk through CareCredit options.",
      },
      {
        question: "Can I whiten my teeth after getting veneers?",
        answer:
          "Whitening brightens natural enamel but does not lighten porcelain. If you want an overall brighter shade, we recommend whitening first so your veneers can be matched cleanly to your new color.",
      },
    ],
    links: [
      { href: "/smile-makeover/", label: "Plan a coordinated smile makeover" },
      { href: "/teeth-whitening/", label: "Professional teeth whitening" },
      { href: "/dental-crowns/", label: "When a dental crown is the better fit" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/veneers",
      label: "American Dental Association: veneers",
    },
  },
  "teeth-whitening": {
    sections: [
      {
        heading: "Why teeth darken over time",
        body: "Coffee, tea, red wine, and tobacco gradually stain outer enamel, while natural aging thins enamel slightly and lets warmer tones beneath show through. Past tooth injuries or certain medications can also affect shade. Pinpointing the cause lets us tell you honestly what whitening can achieve.",
      },
      {
        heading: "What whitening can and cannot lighten",
        body: "Professional whitening lightens natural tooth enamel, not porcelain crowns, veneers, or tooth-colored fillings. Letting us know about any front-tooth restorations helps us avoid uneven color. Mild, temporary sensitivity is common, so tell us if your teeth already feel sensitive.",
      },
      {
        heading: "Why starting with an exam helps",
        body: "A quick exam makes sure discoloration or sensitivity is not hiding decay or a worn filling that should be treated first. At our Roseville office, we talk through realistic shade goals and help time whitening cleanly around big events or upcoming cosmetic work.",
      },
    ],
    questions: [
      {
        question: "Will whitening lighten my crowns or fillings?",
        answer:
          "No. Whitening gel works only on natural tooth enamel, so existing crowns, veneers, and fillings keep their original shade and may need updating to match brighter neighboring teeth.",
      },
      {
        question: "Does professional teeth whitening cause sensitivity?",
        answer:
          "Some patients notice temporary sensitivity to cold or air. Let us know ahead of time if your teeth are already sensitive so we can adjust your approach for comfort.",
      },
      {
        question: "Should I whiten before getting veneers or a crown?",
        answer:
          "Usually yes. Because we match new crowns and veneers to the teeth around them, whitening first ensures your new dental work blends seamlessly with your brighter shade.",
      },
      {
        question: "How long do whitening results last?",
        answer:
          "Results depend heavily on daily habits such as coffee, tea, red wine, or tobacco use. Good brushing, routine cleanings, and occasional touch-ups help keep your smile bright.",
      },
    ],
    links: [
      { href: "/veneers/", label: "Explore porcelain veneers" },
      { href: "/smile-makeover/", label: "Plan a smile makeover" },
      { href: "/cleanings-exams/", label: "Routine cleanings and exams" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening",
      label: "American Dental Association: teeth whitening",
    },
  },
  "smile-makeover": {
    sections: [
      {
        heading: "Start with what you want to change",
        body: "Every smile makeover begins with your priorities: brighter color, smoother edges, closed gaps, straighter alignment, or replacing worn and missing teeth. Dr. Narodovich listens closely and explains which mix of whitening, veneers, crowns, orthodontics, or implants best fits your smile.",
      },
      {
        heading: "Getting the sequence right",
        body: "Order matters for lasting results. We address tooth health and gums first, handle any orthodontic alignment next, brighten natural enamel with whitening, and finish with shade-matched veneers or crowns. When dental implants are part of the plan, we build healing time smoothly into the schedule.",
      },
      {
        heading: "Phased around your calendar and budget",
        body: "You do not have to tackle everything at once. We break out a written estimate for each phase so you can see what comes first and what can wait. Dental insurance may contribute toward restorative steps like crowns or implants while rarely covering purely cosmetic care, and CareCredit financing is available. If longer visits make you anxious, we can also discuss monitored IV sedation.",
      },
    ],
    questions: [
      {
        question: "What treatments can be part of a smile makeover?",
        answer:
          "Depending on your goals and oral health, a plan can combine professional whitening, porcelain veneers, lab-made crowns, Invisalign or braces, and dental implants.",
      },
      {
        question: "Can we complete a smile makeover in stages?",
        answer:
          "Yes. Many patients spread treatment out over several months. We map out the clinical order so you know which steps come first and which ones can comfortably wait.",
      },
      {
        question: "Can I request IV sedation during a smile makeover?",
        answer:
          "Yes. We offer IV sedation consultations where Dr. Narodovich reviews your health history and planned appointments to confirm whether monitored sedation is a good fit.",
      },
      {
        question: "Does insurance help cover a smile makeover?",
        answer:
          "Dental plans sometimes help pay for restorative portions such as crowns or implants, though purely cosmetic treatments are generally out of pocket. We check your benefits before you commit.",
      },
    ],
    links: [
      { href: "/veneers/", label: "Porcelain veneers" },
      { href: "/roseville-invisalign/", label: "Invisalign clear aligners" },
      { href: "/iv-sedation/", label: "IV sedation for longer visits" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/veneers",
      label: "American Dental Association: veneers",
    },
  },
};
