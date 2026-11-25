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
    question: "What happens during an orthodontic consultation in Roseville?",
    answer:
      "We examine your alignment, spacing, crowding, bite, and overall gum and tooth health, then talk through what you want to change so we can recommend Invisalign or traditional braces.",
  },
  {
    question: "Is Invisalign the right choice for every smile?",
    answer:
      "Not always. Clear aligners work well for many crowding, spacing, and mild bite concerns, while complex rotations or larger bite shifts often respond better to traditional braces. An exam makes that distinction clear.",
  },
  {
    question: "Can adults start orthodontic treatment?",
    answer:
      "Yes. Healthy teeth can be moved at any age, so adults from Roseville, Granite Bay, Rocklin, and Lincoln routinely choose clear aligners or braces once teeth and gums are healthy.",
  },
  {
    question: "How much does orthodontic treatment cost in Roseville?",
    answer:
      "Your cost depends on the complexity of tooth movement, treatment length, and whether you choose Invisalign or braces. After your exam, we provide a written estimate covering aligners or brackets, checkups, and retainers, and our team checks any orthodontic insurance benefits and CareCredit options.",
  },
  {
    question: "How long do Invisalign or braces usually take?",
    answer:
      "Treatment timelines vary based on how far your teeth need to move and, for clear aligners, consistent daily wear. We give you a personalized estimated timeline after evaluating your bite.",
  },
  {
    question: "Will I need a retainer after orthodontic treatment?",
    answer:
      "Yes. Teeth naturally shift over time after alignment, so wearing a retainer as directed protects your finished smile.",
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
        body: "Looking for sedation dentistry in Roseville? At Waikiki Dental, monitored IV sedation starts with an unhurried conversation. Tell us if dental anxiety, a strong gag reflex, trouble getting numb, or a rough past appointment has kept you away from the dentist. We welcome patients from Roseville, Granite Bay, Rocklin, and Lincoln for consultations focused on listening first and planning comfortable care around your goals.",
      },
      {
        heading: "How monitored IV sedation works",
        body: "Many patients search for sleep dentistry because they want to feel deeply relaxed and remember little of their appointment. Clinically, monitored IV sedation is conscious sedation rather than general anesthesia: medication calms your nervous system while local anesthesia keeps the treatment area numb. Before you commit to anything, Dr. Narodovich explains the planned level of awareness, who will administer and monitor your sedation, and whether IV sedation or oral conscious sedation fits your health history.",
      },
      {
        heading: "Dental treatments you can pair with IV sedation",
        body: "Patients often ask about sedation dentistry when planning dental implants, traditional lab-made crowns, composite fillings, or catching up on multiple needed treatments after years away from care. During your Roseville consultation, we review what can be combined comfortably and what requires separate healing stages, alongside a written estimate separating sedation and dental fees.",
      },
      {
        heading: "Preparing for your consultation and visit",
        body: "Bring a current list of medications and share your medical history, allergies, and past experiences with anesthesia. If IV sedation is recommended for your treatment visit, we provide written preparation instructions ahead of time and go over arrangements for a trusted adult to drive you home and stay with you during recovery.",
      },
    ],
    questions: [
      {
        question: "Is IV sedation the same as sleep dentistry or general anesthesia?",
        answer:
          "Many people casually call IV sedation sleep dentistry because patients feel deeply relaxed and often remember very little afterward. Clinically, however, it is monitored moderate conscious sedation rather than general anesthesia. Dr. Narodovich explains the exact level of awareness intended for your visit during your consultation.",
      },
      {
        question: "Is IV sedation dentistry safe and right for everyone?",
        answer:
          "Not everyone is a candidate for IV sedation. Dr. Narodovich reviews your medical history, current medications, allergies, and planned dental treatment first to confirm whether monitored IV sedation is safe and appropriate for you.",
      },
      {
        question: "Can I complete multiple dental procedures in one sedation visit?",
        answer:
          "Often we can group compatible care into fewer visits, depending on the procedures you need and whether healing time is required between stages. We lay out what can be completed together safely and what works best across separate appointments.",
      },
      {
        question: "Will I need someone to drive me home after IV sedation?",
        answer:
          "Yes. Because sedation medication affects alertness and coordination, you will need a responsible adult to drive you home after a sedation appointment. We provide written preparation and recovery instructions tailored to your visit.",
      },
      {
        question: "How do I schedule an IV sedation consultation in Roseville?",
        answer:
          "Call or text our Roseville office at (916) 772-6248 and ask for an IV sedation consultation. Our front desk will check availability and help you plan your first visit.",
      },
    ],
    links: [
      { href: "/michael-narodovich-dmd/", label: "Meet Dr. Michael Narodovich" },
      { href: "/roseville-dental-implants/", label: "Explore dental implants in Roseville" },
      { href: "/dental-crowns/", label: "Two-visit lab-made dental crowns" },
      { href: "/new-patients/", label: "Insurance, CareCredit, and first-visit info" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/anesthesia-and-sedation",
      label: "American Dental Association: anesthesia and sedation",
    },
  },
  "roseville-dental-implants": {
    sections: [
      {
        heading: "Dental implants vs. dental bridges and dentures",
        body: "Replacing a missing tooth in Roseville starts with examining the space, surrounding teeth, gum health, and jawbone support. A dental implant replaces both the root and visible crown without relying on neighboring healthy teeth for support. During your consultation, we compare single or multiple implants honestly against dental bridges and removable options so you can choose what fits your health and goals.",
      },
      {
        heading: "Clear stages from placement to your final crown",
        body: "Implant treatment usually progresses through three stages: placing the titanium implant post into the jawbone, allowing healing time so bone stabilizes around it, and attaching the abutment and custom-shaded crown. At our Roseville office, we spell out who handles each stage, where each visit happens, and when you return to Waikiki Dental if a surgical specialist is involved in placement.",
      },
      {
        heading: "What affects dental implant cost in Roseville",
        body: "Because every mouth is different, we provide a written estimate after your exam that breaks out the implant post, connector abutment, and final crown separately, along with any digital imaging, bone grafting, temporary tooth, or IV sedation your case requires. Our team also checks dental insurance benefits and explains CareCredit financing options upfront. Medi-Cal is not accepted.",
      },
      {
        heading: "Long-term care for your dental implant",
        body: "Dental implants are designed for long-term tooth replacement, and their durability depends on healthy gums, a balanced bite, and regular dental visits. We show you how to clean around your implant crown at home and monitor surrounding bone and tissue at every routine exam.",
      },
    ],
    questions: [
      {
        question: "Can dental implants replace one tooth or multiple missing teeth?",
        answer:
          "Yes. Dental implants can support a single replacement crown, multiple missing teeth, or a larger restoration depending on your exam, jawbone support, and bite.",
      },
      {
        question: "Will I need a bone graft before getting a dental implant?",
        answer:
          "We evaluate your supporting jawbone with imaging during your Roseville consultation. If additional bone support would create a stronger foundation for an implant, we explain why and include that step clearly in your treatment plan.",
      },
      {
        question: "Can I use IV sedation during dental implant treatment?",
        answer:
          "Yes, you can discuss monitored IV sedation at your implant consultation. Dr. Narodovich reviews your medical history and planned stages first to confirm whether sedation is appropriate for your care.",
      },
      {
        question: "How long does the dental implant process take from start to finish?",
        answer:
          "Because placement, bone healing, and final crown delivery happen in stages, total timing varies by case. After examining your tooth site, we give you a clear timeline including any temporary restoration and follow-up visits.",
      },
    ],
    links: [
      { href: "/iv-sedation/", label: "IV sedation dentistry for anxious patients" },
      { href: "/dental-crowns/", label: "Custom lab-made dental crowns" },
      { href: "/michael-narodovich-dmd/", label: "Meet Dr. Michael Narodovich" },
      { href: "/new-patients/", label: "Payment and CareCredit options" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/implants",
      label: "American Dental Association: dental implants",
    },
  },
  "dental-crowns": {
    sections: [
      {
        heading: "When a dental crown is the right repair",
        body: "A dental crown covers the entire visible part of a tooth to restore its natural shape, comfort, and chewing strength. We recommend a crown when a tooth is cracked, broken, worn down, weakened by a large older filling, or restoring a dental implant. Dr. Narodovich examines the tooth first and explains clearly whether a crown, a composite filling, or a porcelain veneer is the smartest option.",
      },
      {
        heading: "Two calm visits with a lab-made dental crown",
        body: "At our Roseville office, we provide traditional lab-made crowns over two visits rather than same-day milled crowns. During your first visit, we numb the tooth comfortably, shape it conservatively, capture detailed records for our dental lab, and place a protective temporary crown. At your second visit, we try in the lab-crafted crown, check your bite and shade carefully, and cement it securely.",
      },
      {
        heading: "What affects dental crown cost in Roseville",
        body: "Before treatment starts, we give you a written estimate covering the crown and any supporting care the tooth needs, such as digital X-rays or core buildup. Our front desk checks what your dental insurance plan may cover, and we accept CareCredit financing, major credit and debit cards, cash, and checks. Medi-Cal is not accepted.",
      },
    ],
    questions: [
      {
        question: "Does Waikiki Dental offer same-day crowns?",
        answer:
          "No. We provide traditional lab-made crowns over two visits, with a protective temporary crown in between so our dental lab can tailor the fit, contours, and shade to your bite.",
      },
      {
        question: "Does getting a dental crown hurt?",
        answer:
          "We numb the tooth thoroughly before shaping it and check in with you throughout the appointment. If dental anxiety makes restorative visits stressful, ask us about an IV sedation consultation.",
      },
      {
        question: "How do I care for a temporary crown, and what if it comes off?",
        answer:
          "Chew on the opposite side when you can, avoid sticky or very hard foods, and brush and floss gently around the area. If your temporary crown feels loose or comes off, call our Roseville office at (916) 772-6248.",
      },
      {
        question: "How long does a lab-made dental crown last?",
        answer:
          "A crown's lifespan depends on the tooth underneath, your bite forces, and everyday care. Teeth grinding, chewing ice, or skipping cleanings can shorten its life, so we inspect your crown margins at every routine exam.",
      },
    ],
    links: [
      { href: "/roseville-dental-implants/", label: "Replacing a missing tooth with an implant" },
      { href: "/composite-fillings/", label: "Tooth-colored fillings for smaller repairs" },
      { href: "/iv-sedation/", label: "Ask about IV sedation" },
      { href: "/new-patients/", label: "Insurance and CareCredit options" },
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
        heading: "Call our Roseville emergency dentist first",
        body: "If you have a sudden toothache, facial or gum swelling, a broken tooth, or a lost crown, call Waikiki Dental at (916) 772-6248. Tell our team where it hurts and what happened so we can advise you right away. Our Roseville office is open Monday to Friday, and we make every effort to see urgent dental cases as quickly as our schedule allows.",
      },
      {
        heading: "Immediate steps before you reach the office",
        body: "For a knocked-out adult tooth, pick it up by the white crown rather than the root and keep it moist: gently place it back into the socket if it slides in easily, or keep it in milk or inside your cheek and come in immediately. For a cracked or broken tooth, rinse gently with warm water and apply a cold compress to your cheek. For a toothache, rinse with warm water and floss carefully to clear trapped food, and never put aspirin directly on the tooth or gums.",
      },
      {
        heading: "When to go straight to an emergency room",
        body: "Call 911 or go to the nearest hospital emergency room immediately if facial or neck swelling makes it hard to breathe or swallow, if heavy bleeding will not stop, or if you suspect a jaw fracture or head injury. Never wait for dental office hours when symptoms are severe.",
      },
    ],
    questions: [
      {
        question: "What counts as a dental emergency?",
        answer:
          "Severe or worsening tooth pain, facial or gum swelling, signs of infection, a knocked-out or loosened adult tooth, a cracked or broken tooth, and a lost crown or filling that leaves the tooth sharp or sensitive are all reasons to call our Roseville office promptly.",
      },
      {
        question: "Can an emergency dentist in Roseville see me today?",
        answer:
          "Call us as early in the day as possible, Monday to Friday, at (916) 772-6248. We make every effort to fit urgent dental problems in quickly depending on the day's schedule.",
      },
      {
        question: "What should I do if a permanent tooth gets knocked out?",
        answer:
          "Hold the tooth only by the crown, avoid touching the root, and keep it moist. Place it gently back in the socket if possible; otherwise keep it in milk or between your cheek and gum and call us right away.",
      },
      {
        question: "How much does an emergency dental visit cost in Roseville?",
        answer:
          "Your cost depends on the exam, any needed digital X-rays, and the treatment required to relieve pain and stabilize the tooth. We give you a clear estimate before treatment begins. CareCredit, major credit and debit cards, cash, and checks are accepted; Medi-Cal is not accepted.",
      },
    ],
    links: [
      { href: "/dental-crowns/", label: "Repairing a broken tooth with a crown" },
      { href: "/digital-x-ray/", label: "How digital X-rays locate hidden pain" },
      { href: "/iv-sedation/", label: "Anxious about urgent treatment? IV sedation" },
      { href: "/contact-waikiki-dental/", label: "Roseville office hours and directions" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies",
      label: "American Dental Association: dental emergencies",
    },
  },
  "roseville-invisalign": {
    sections: [
      {
        heading: "Start with an Invisalign consultation in Roseville",
        body: "Invisalign clear aligners straighten many crowding, spacing, and mild bite concerns without metal brackets or wires, though they are not the ideal tool for every movement. At our Roseville office, we evaluate your bite, gum health, and smile goals first, then compare Invisalign honestly with traditional braces so you choose the approach that works best.",
      },
      {
        heading: "How clear aligners fit everyday life",
        body: "Invisalign uses a series of custom clear trays, each gently shifting your teeth step by step. You remove the aligners to eat, drink anything besides water, brush, and floss, then put them right back in. Wearing aligners consistently each day keeps your timeline on track alongside brief progress checks at our office.",
      },
      {
        heading: "What affects Invisalign cost and retainers",
        body: "At your Roseville consultation, we provide a clear written estimate covering your aligners, progress visits, any refinement trays, and the retainers needed to keep your teeth straight afterward. Our front desk can check whether your dental insurance includes orthodontic benefits, and CareCredit financing can spread out-of-pocket costs into monthly payments. Medi-Cal is not accepted.",
      },
    ],
    questions: [
      {
        question: "Is Invisalign better than traditional braces?",
        answer:
          "Neither option is automatically better for every bite. Clear aligners are discreet and removable, while braces provide greater mechanical control for complex rotations or larger bite changes. An orthodontic exam shows which fits your teeth best.",
      },
      {
        question: "Can adults get Invisalign in Roseville?",
        answer:
          "Yes. Healthy teeth can move at any age, and many adults choose Invisalign to address crowding, spacing, or teeth that shifted years after earlier braces. Any gum inflammation or decay is treated first.",
      },
      {
        question: "Will I need a retainer after Invisalign?",
        answer:
          "Yes. Teeth naturally drift back without retention, so retainers are a key part of protecting your results. We include retainers in your written estimate and review your wear schedule.",
      },
      {
        question: "How long does Invisalign treatment usually take?",
        answer:
          "Treatment length depends on how far your teeth need to move and how consistently you wear your trays every day. We share an estimated timeline tailored to your bite at your consultation.",
      },
    ],
    links: [
      { href: "/orthodontics/", label: "Compare Invisalign and braces" },
      { href: "/traditional-braces/", label: "Traditional braces in Roseville" },
      { href: "/teeth-whitening/", label: "Brighten your smile after alignment" },
      { href: "/new-patients/", label: "Insurance and CareCredit financing" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/braces",
      label: "American Dental Association: braces and aligners",
    },
  },
  "traditional-braces": {
    sections: [
      {
        heading: "When traditional braces are the smartest choice",
        body: "While clear aligners work well for many mild to moderate cases, traditional brackets and wires remain the most dependable orthodontic option for significant crowding, rotated teeth, spacing, and complex bite alignment. At our Roseville office, we evaluate your bite thoroughly and explain why braces or Invisalign will deliver the cleanest, most predictable outcome.",
      },
      {
        heading: "Steady, precise tooth movement for teens and adults",
        body: "Traditional braces work continuously because they stay in place throughout treatment, applying steady, gentle guidance without relying on remembering to reinsert trays. Regular adjustment visits at Waikiki Dental let us fine-tune tooth position and bite comfort step by step.",
      },
      {
        heading: "Written orthodontic estimates and retention",
        body: "After your evaluation, we give you a written estimate covering braces, adjustment visits, and the retainers needed once your brackets come off. Our front desk checks dental insurance plans for orthodontic coverage, and CareCredit financing is available for monthly payments. Medi-Cal is not accepted.",
      },
    ],
    questions: [
      {
        question: "Are traditional braces only for kids and teens?",
        answer:
          "No. Healthy teeth can be aligned at any age, and many Roseville adults choose traditional braces when their bite needs precise control that clear aligners cannot match.",
      },
      {
        question: "How do braces compare with Invisalign?",
        answer:
          "Braces stay on your teeth around the clock and excel at complex bite and rotation control, whereas Invisalign trays are removable and nearly invisible. We compare both honestly during your orthodontic exam.",
      },
      {
        question: "How do I keep my teeth healthy while wearing braces?",
        answer:
          "Careful daily brushing around brackets, flossing with threaders or a water flosser, avoiding very hard or sticky foods, and keeping routine dental cleanings help protect enamel and gums throughout treatment.",
      },
      {
        question: "Will I need retainers after my braces come off?",
        answer:
          "Yes. Retainers keep teeth from shifting back into their old positions once active orthodontic treatment finishes. We include retention guidance as part of your plan.",
      },
    ],
    links: [
      { href: "/orthodontics/", label: "Explore all orthodontic options" },
      { href: "/roseville-invisalign/", label: "Compare with Invisalign clear aligners" },
      { href: "/cleanings-exams/", label: "Routine cleanings during orthodontics" },
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
        body: "Porcelain veneers are thin, custom-crafted shells fitted to the front surface of teeth to address chips, deep stains, worn edges, uneven shapes, or small gaps. Unlike a dental crown, which wraps the entire tooth for structural strength, a veneer focuses on refining the visible front surface for natural cosmetic balance.",
      },
      {
        heading: "What to weigh before committing to veneers",
        body: "Veneers are an irreversible cosmetic step because a thin layer of enamel is typically shaped so the porcelain sits smoothly without looking bulky. Any decay or gum disease comes first. If you clench, grind your teeth, or have a heavy bite, let us know early so we can advise whether veneers or another option will hold up best. Dental insurance rarely covers purely cosmetic veneers.",
      },
      {
        heading: "Planning natural shape and shade in Roseville",
        body: "At our Roseville office, Dr. Narodovich starts by listening to what you want to change and showing how veneers fit your facial proportions. We discuss which teeth should be included, whether whitening surrounding teeth first helps shade matching, and how CareCredit financing can fit your budget.",
      },
    ],
    questions: [
      {
        question: "Are porcelain veneers permanent?",
        answer:
          "The preparation to the tooth is permanent because a thin layer of enamel is shaped to seat the porcelain cleanly. Over the years, a veneer can wear, chip, or loosen and eventually require repair or replacement.",
      },
      {
        question: "What is the difference between porcelain veneers and dental crowns?",
        answer:
          "A porcelain veneer covers only the front surface of a structurally sound tooth for cosmetic improvement, while a dental crown wraps the whole tooth when it also needs strength and protection.",
      },
      {
        question: "Does dental insurance pay for porcelain veneers?",
        answer:
          "Usually not, since veneers are typically considered cosmetic care unless a dentist documents medical necessity. Our team can check your specific plan and go over CareCredit options.",
      },
      {
        question: "Should I whiten my teeth before getting veneers?",
        answer:
          "Yes, if you want a brighter overall shade. Whitening lightens natural enamel but will not change porcelain, so whitening first lets your veneers match your brighter teeth cleanly.",
      },
    ],
    links: [
      { href: "/smile-makeover/", label: "Plan a full smile makeover" },
      { href: "/teeth-whitening/", label: "Professional teeth whitening in Roseville" },
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
        body: "Coffee, tea, red wine, and tobacco stain outer tooth enamel over time, while normal aging thins enamel slightly and lets warmer tones underneath show through. Past tooth injuries or certain medications can also darken a tooth. Identifying the cause helps us tell you honestly what professional teeth whitening in Roseville can achieve.",
      },
      {
        heading: "What teeth whitening can and cannot lighten",
        body: "Professional whitening lightens natural tooth enamel, not porcelain crowns, veneers, or tooth-colored fillings. Telling us about any existing dental work on your front teeth helps us plan an even shade. Mild, temporary sensitivity is common, so let us know if your teeth are already sensitive.",
      },
      {
        heading: "Why starting with a dental exam helps",
        body: "Checking your teeth before whitening ensures discoloration or sensitivity is not coming from a cavity or a worn filling that needs care first. At our Roseville office, we talk through realistic shade expectations and help time whitening cleanly around big events or upcoming veneers and crowns.",
      },
    ],
    questions: [
      {
        question: "Will teeth whitening lighten crowns, veneers, or fillings?",
        answer:
          "No. Whitening gel only brightens natural enamel. Existing crowns, veneers, and composite fillings keep their current color and may need updating if you want them to match newly brightened neighboring teeth.",
      },
      {
        question: "Does professional teeth whitening cause tooth sensitivity?",
        answer:
          "Temporary sensitivity to cold or air can happen during or shortly after whitening. Let us know ahead of time if you already have sensitive teeth so we can tailor your approach for comfort.",
      },
      {
        question: "Should I whiten before getting porcelain veneers or crowns?",
        answer:
          "Usually yes. Because new restorations are shade-matched to surrounding teeth, whitening first lets your new crown or veneers blend naturally with your brighter smile.",
      },
      {
        question: "How long do teeth whitening results last?",
        answer:
          "Longevity depends on daily habits such as coffee, tea, red wine, or tobacco use. Routine cleanings, solid home brushing, and occasional touch-ups help maintain your shade.",
      },
    ],
    links: [
      { href: "/veneers/", label: "Porcelain veneers in Roseville" },
      { href: "/smile-makeover/", label: "Plan a coordinated smile makeover" },
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
        heading: "Cosmetic dentistry built around your priorities",
        body: "Every smile makeover in Roseville starts with what bothers you most: dull shade, chipped edges, small gaps, crowding, worn teeth, or missing teeth. Dr. Narodovich listens closely and explains which combination of teeth whitening, porcelain veneers, lab-made crowns, Invisalign or braces, and dental implants best fits your smile.",
      },
      {
        heading: "Why clinical sequence matters",
        body: "Getting the order right protects both health and appearance. We treat decay and gum health first, complete any orthodontic alignment next, brighten natural enamel with whitening, and finish with shade-matched veneers or crowns. When dental implants are included, we weave healing time smoothly into your plan.",
      },
      {
        heading: "Phased around your calendar, comfort, and budget",
        body: "You do not have to finish everything in one stretch. We give you a written estimate broken down by phase so you can prioritize what comes first and what can wait. Insurance may help with restorative work like crowns or implants while rarely covering purely cosmetic steps, and CareCredit financing is available. If longer visits make you anxious, ask about monitored IV sedation.",
      },
    ],
    questions: [
      {
        question: "What treatments can a smile makeover include?",
        answer:
          "Depending on your goals and oral health, a Roseville smile makeover can combine professional teeth whitening, porcelain veneers, lab-made crowns, Invisalign or traditional braces, and dental implants.",
      },
      {
        question: "Can a smile makeover be phased over several months?",
        answer:
          "Yes. Many patients complete treatment in planned stages to fit their calendar and budget. We map out the clinical order so you know which steps come first.",
      },
      {
        question: "Is IV sedation available for longer smile makeover appointments?",
        answer:
          "Yes. We offer monitored IV sedation consultations where Dr. Narodovich reviews your medical history and planned care to confirm whether sedation is appropriate.",
      },
      {
        question: "Does dental insurance help cover a smile makeover?",
        answer:
          "Dental insurance sometimes contributes toward restorative steps such as crowns or implants, while purely cosmetic care is usually out of pocket. Our front desk checks your plan before treatment starts.",
      },
    ],
    links: [
      { href: "/veneers/", label: "Porcelain veneers" },
      { href: "/roseville-invisalign/", label: "Invisalign clear aligners" },
      { href: "/roseville-dental-implants/", label: "Dental implants for missing teeth" },
      { href: "/iv-sedation/", label: "IV sedation for longer visits" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/veneers",
      label: "American Dental Association: veneers",
    },
  },
  "cleanings-exams": {
    sections: [
      {
        heading: "What happens at a dental cleaning and exam in Roseville",
        body: "Routine preventive visits do far more than polish your teeth. At Waikiki Dental in Roseville, a comprehensive checkup includes a gentle cleaning to remove plaque and hardened tartar, careful gum measurements, an oral cancer screening, a review of older fillings or crowns, and digital X-rays only when clinically helpful. We explain what we see in plain language so there are never surprises.",
      },
      {
        heading: "A calm family dentist in Roseville for every age",
        body: "Whether you have kept up with six-month visits or it has been years since your last dental cleaning, our Roseville team welcomes adults, teens, and children from Roseville, Granite Bay, Rocklin, and Lincoln without lecture or rush. If sensitivity or dental anxiety makes routine cleanings hard, tell us ahead of time so we can pace the visit around your comfort.",
      },
      {
        heading: "Checkup frequency, insurance, and payment options",
        body: "Many patients visit every six months, while some gum or restorative needs benefit from a tailored schedule. Call our office at (916) 772-6248 before your visit so we can check your dental insurance coverage. We accept major credit and debit cards, cash, checks, and CareCredit financing; Medi-Cal is not accepted.",
      },
    ],
    questions: [
      {
        question: "How often should I get a dental cleaning and exam?",
        answer:
          "Most patients do well with a cleaning and exam every six months, though Dr. Narodovich may recommend a customized interval based on your gum health, cavity history, and existing dental work.",
      },
      {
        question: "What is included in a routine dental exam at Waikiki Dental?",
        answer:
          "Your visit includes a tooth-by-tooth exam, gum health evaluation, oral cancer screening, a check of existing fillings or crowns, and targeted digital X-rays only when needed.",
      },
      {
        question: "Is Waikiki Dental a family dentist accepting new patients in Roseville?",
        answer:
          "Yes. We welcome new individual and family patients from Roseville, Granite Bay, Rocklin, and Lincoln, from kids' first dental visits to adult preventive, restorative, and sedation care.",
      },
      {
        question: "What if it has been several years since my last dental cleaning?",
        answer:
          "You will never get a lecture here. Start with an unhurried exam so we can assess your teeth and gums honestly, talk through comfort options including IV sedation if needed, and build a step-by-step plan at your pace.",
      },
    ],
    links: [
      { href: "/digital-x-ray/", label: "How digital dental X-rays support exams" },
      { href: "/early-dental-care/", label: "Kids' first dental visits in Roseville" },
      { href: "/composite-fillings/", label: "Tooth-colored composite fillings" },
      { href: "/new-patients/", label: "New patient forms and insurance info" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/dental-care-concerns/questions-about-going-to-the-dentist",
      label: "American Dental Association: questions about going to the dentist",
    },
  },
  "digital-x-ray": {
    sections: [
      {
        heading: "Why digital dental X-rays matter during an exam",
        body: "Even the most careful visual exam can only inspect outer tooth surfaces. Digital dental X-rays at our Roseville office show what is happening between tight teeth, beneath older fillings or crowns, along tooth roots, and inside the supporting jawbone. Catching hidden decay or bone changes early usually means simpler, more conservative treatment.",
      },
      {
        heading: "Low-dose imaging taken only when clinically needed",
        body: "Modern digital sensors produce crisp diagnostic images with very low radiation exposure, and images appear chairside within seconds so Dr. Narodovich can walk you through findings clearly. We never take X-rays by habit alone; timing depends on your age, oral health, cavity risk, and any symptoms you are noticing.",
      },
      {
        heading: "How imaging guides restorative and implant care",
        body: "Clear radiographs are essential for diagnosing sudden toothaches, evaluating whether a tooth needs a filling or a lab-made crown, checking bone support for dental implants, and monitoring growing smiles. We review any recommended imaging and its role in your written estimate before proceeding.",
      },
    ],
    questions: [
      {
        question: "How often do I need dental X-rays?",
        answer:
          "Not at every visit. Frequency depends on your current oral health, age, cavity or gum-disease risk, and whether you have pain or older dental work that needs monitoring.",
      },
      {
        question: "Are digital dental X-rays safe?",
        answer:
          "Modern digital dental X-rays use very low radiation doses, and we take them only when the diagnostic information genuinely helps protect your teeth and gums. Tell us if you are pregnant or have health questions before imaging.",
      },
      {
        question: "What can a dental X-ray find that a dentist cannot see visually?",
        answer:
          "Digital X-rays reveal cavities starting between teeth, decay under existing fillings or crowns, root infections, cysts, impacted teeth, and bone loss around gums.",
      },
      {
        question: "Can I see my digital X-rays during my appointment?",
        answer:
          "Yes. Digital images display right away so Dr. Narodovich can show you what looks healthy and explain any area that needs attention.",
      },
    ],
    links: [
      { href: "/cleanings-exams/", label: "Routine cleanings and dental exams" },
      { href: "/composite-fillings/", label: "Treating early decay with composite fillings" },
      { href: "/roseville-dental-implants/", label: "Dental implant planning in Roseville" },
      { href: "/dental-emergencies/", label: "Urgent toothache diagnostics" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/x-rays",
      label: "American Dental Association: dental X-rays",
    },
  },
  "early-dental-care": {
    sections: [
      {
        heading: "Calm, positive first dental visits in Roseville",
        body: "A child's earliest appointments set the tone for how they feel about dental care as they grow. At Waikiki Dental in Roseville, we keep kids' visits gentle, patient, and low-pressure, introducing tools at an easy pace so young patients feel proud and relaxed in the chair.",
      },
      {
        heading: "When children should start seeing a dentist",
        body: "The American Dental Association recommends scheduling a child's first dental checkup by age one or within six months after the first tooth appears. Early visits allow us to monitor incoming teeth, check bite development, watch for early childhood decay, and answer parents' everyday questions about brushing, fluoride, and snacks.",
      },
      {
        heading: "Preventive habits that grow with your family",
        body: "As baby teeth give way to permanent teeth, routine exams, gentle cleanings, fluoride, and protective sealants when appropriate help keep cavities away. Families across Roseville, Granite Bay, Rocklin, and Lincoln appreciate having children's preventive care and adult dentistry under one calm roof.",
      },
    ],
    questions: [
      {
        question: "When should my child have their first dental visit?",
        answer:
          "The American Dental Association recommends a first visit by a child's first birthday or within six months of the first tooth coming in, so healthy habits and comfort start early.",
      },
      {
        question: "What happens during a child's first appointment at Waikiki Dental?",
        answer:
          "We move at your child's comfort level, gently checking teeth and gums, demonstrating simple brushing tips, and giving parents straightforward guidance on preventing cavities.",
      },
      {
        question: "How can I prepare a nervous child for the dentist?",
        answer:
          "Keep the tone light and matter-of-fact, schedule during a rested part of the day, and let our Roseville team know beforehand if your child feels shy so we can take extra time introducing everything gently.",
      },
      {
        question: "Does Waikiki Dental see parents and children in the same office?",
        answer:
          "Yes. We provide family-centered preventive and restorative care so children, teens, and adults can build long-term comfort with the same Roseville team.",
      },
    ],
    links: [
      { href: "/cleanings-exams/", label: "Family cleanings and dental exams" },
      { href: "/orthodontics/", label: "Future orthodontic options for growing smiles" },
      { href: "/new-patients/", label: "New patient forms and insurance info" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/life-stages/babies-and-kids",
      label: "American Dental Association: babies and kids dental health",
    },
  },
  "composite-fillings": {
    sections: [
      {
        heading: "Natural-looking cavity repair in Roseville",
        body: "When tooth decay or a small chip needs attention, a tooth-colored composite filling restores strength and seals the tooth without leaving dark metal behind. We match the composite resin closely to your natural enamel shade so the finished repair blends smoothly into your smile.",
      },
      {
        heading: "Conservative, comfort-first placement",
        body: "Composite fillings allow us to preserve more healthy surrounding tooth structure than traditional metal fillings. After numbing the area thoroughly and removing decay, Dr. Narodovich places the resin in careful layers, hardens it with a curing light, and polishes the contours so your bite feels natural.",
      },
      {
        heading: "When a filling is enough and when a crown makes more sense",
        body: "Composite fillings work best for small to moderate cavities and minor chips. If a tooth has a deep crack or has lost too much natural structure to support a filling reliably, we explain plainly why a two-visit lab-made crown offers stronger protection and provide a written estimate before treatment. Medi-Cal is not accepted.",
      },
    ],
    questions: [
      {
        question: "Are tooth-colored composite fillings strong enough for back teeth?",
        answer:
          "Yes. Modern composite resin is designed to handle everyday chewing on both front and back teeth for small to moderate cavities, while larger fractures may be better protected with a dental crown.",
      },
      {
        question: "Does getting a composite filling hurt?",
        answer:
          "We numb the tooth thoroughly before removing decay and check on your comfort throughout the visit. If dental anxiety has kept you from treating cavities, ask us about an IV sedation consultation.",
      },
      {
        question: "How long do composite fillings usually last?",
        answer:
          "Lifespan varies with the size of the filling, your bite habits, and home care. Routine cleanings and exams let us check existing fillings early for wear or leakage.",
      },
      {
        question: "Can older silver fillings be replaced with tooth-colored fillings?",
        answer:
          "When an older metal filling is worn, leaking, or shows new decay underneath, we can evaluate whether a composite filling or a dental crown is the best replacement option.",
      },
    ],
    links: [
      { href: "/dental-crowns/", label: "When a tooth needs a lab-made crown instead" },
      { href: "/digital-x-ray/", label: "Spotting cavities early with digital X-rays" },
      { href: "/cleanings-exams/", label: "Preventing cavities with routine checkups" },
      { href: "/iv-sedation/", label: "Nervous about treatment? IV sedation" },
    ],
    source: {
      href: "https://www.mouthhealthy.org/all-topics-a-z/composite-fillings",
      label: "American Dental Association: composite fillings",
    },
  },
};
