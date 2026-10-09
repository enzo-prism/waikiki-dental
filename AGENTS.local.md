# Waikiki Dental scheduling override

- Every appointment or scheduling CTA must stay on this website and route to
  `/request-appointment/`.
- That page embeds the practice’s approved Jarvis scheduler. Do not add
  another third-party booking system or restore the retired on-site request
  form.
- Phone and email on that page use `site.phone` / `site.email`. Jarvis is
  the only online booking control.
