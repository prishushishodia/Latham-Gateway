// schemas/contactPage.js

export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [

    // ─── HERO ─────────────────────────────────────────────────
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'badge',       title: 'Badge Text',             type: 'string' },
        { name: 'headingLine1',title: 'Heading Line 1',         type: 'string' },
        { name: 'headingLine2',title: 'Heading Line 2 (Teal)',  type: 'string' },
        { name: 'subtext',     title: 'Subtext',                type: 'text'   },
      ],
    },

    // ─── CONTACT INFO CARD ────────────────────────────────────
    {
      name: 'contactInfo',
      title: 'Contact Info Card',
      type: 'object',
      fields: [
        { name: 'heading',    title: 'Card Heading',  type: 'string' },
        { name: 'subtext',    title: 'Card Subtext',  type: 'string' },
        { name: 'address',    title: 'Address',       type: 'text'   },
        { name: 'phone',      title: 'Phone Number',  type: 'string' },
        { name: 'email',      title: 'Email Address', type: 'string' },
        { name: 'hoursLine1', title: 'Hours Line 1',  type: 'string' },
        // e.g. "Mon – Fri: 8am – 6pm"
        { name: 'hoursLine2', title: 'Hours Line 2',  type: 'string' },
        // e.g. "Sat: 9am – 2pm"
      ],
    },

    // ─── QUICK STATS ──────────────────────────────────────────
    {
      name: 'stats',
      title: 'Quick Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    },

    // ─── MAP ──────────────────────────────────────────────────
    {
      name: 'map',
      title: 'Map Section',
      type: 'object',
      fields: [
        {
          name: 'embedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          description: 'From Google Maps → Share → Embed a map → copy the src URL from the <iframe> tag',
        },
        {
          name: 'title',
          title: 'Map Title (for accessibility)',
          type: 'string',
          // e.g. "Lathium Gateway Location"
        },
      ],
    },

    // ─── FAQ ──────────────────────────────────────────────────
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'text'   },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'q', title: 'Question', type: 'string' },
                { name: 'a', title: 'Answer',   type: 'text'   },
              ],
              preview: { select: { title: 'q' } },
            },
          ],
        },
      ],
    },

  ],
};
