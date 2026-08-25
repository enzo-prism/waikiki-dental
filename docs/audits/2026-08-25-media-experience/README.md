# Homepage media experience audit

## Scope

The homepage path from the calm-care hero through social proof, services, the doctor introduction, and the visit call to action. Captured as a logged-out visitor on desktop and mobile before the authentic team-media update.

## Findings

1. **Hero — healthy.** The opening message, patient photography, and primary appointment action communicate calm, capable care quickly.
2. **Review proof — healthy.** The 4.9 rating and review themes establish trust high on the page.
3. **Practice familiarity — missing.** Before this update, visitors saw Dr. Mike but not the broader team or the real office environment. This left a gap between the promise of a welcoming team and visible evidence of that team.
4. **Services — healthy.** The priority treatments are easy to scan and the hierarchy is clear.
5. **Scroll reveal — improved.** Offscreen sections were fully transparent before their scroll-driven animation began, which created large blank regions in full-page capture and could leave content invisible in unusual navigation or capture states. The starting opacity is now 90%, preserving the motion while keeping the page legible.

## Accessibility limits

Screenshots can confirm hierarchy, reflow, and visible contrast risk, but not complete keyboard, screen-reader, or zoom behavior. Those require interactive verification after implementation.

## Accepted evidence

- `01-current-home-desktop.png` and `02-current-home-mobile.png`: initial-load captures showing the pre-update content and the offscreen reveal gap.
- `03-current-home-revealed-desktop.png`: pre-update page after normal scrolling triggered the hidden sections.
- `04-final-team-desktop.png`: final team section at 1440 px.
- `05-final-team-tablet.png`: final team profiles and actions at 768 px.
- `06-final-team-mobile.png` and `07-final-team-mobile-details.png`: the real team image, heading, and copy at 390 px.
- `08-final-full-desktop.png`: complete final homepage after lazy images and scroll states were loaded.

Interactive checks also confirmed no horizontal overflow at 320, 390, 768, or 1440 px; all three new images loaded successfully; buttons retained a 48 px minimum height; and the section's appointment action opened `/request-appointment/` at the top of the page.
