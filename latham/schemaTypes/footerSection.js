// schemas/footerSection.js

export default {
  name: 'footerSection',
  title: 'Footer',
  type: 'document',
  fields: [

    // ─── CTA BLOCK ────────────────────────────────────────────────
    {
      name: 'cta',
      title: 'CTA Block',
      type: 'object',
      fields: [
        { name: 'heading',      title: 'Heading',                type: 'string' },
        { name: 'subtext',      title: 'Subtext',                type: 'text'   },
        { name: 'inquireLabel', title: 'Inquire Button Label',   type: 'string' },
        { name: 'inquireHref',  title: 'Inquire Button Link',    type: 'string' },
        { name: 'contactLabel', title: 'Contact Button Label',   type: 'string' },
        { name: 'contactHref',  title: 'Contact Button Link',    type: 'string' },
      ],
    },

    // ─── NAV LINKS ────────────────────────────────────────────────
    {
      name: 'navLinks',
      title: 'Footer Nav Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href',  title: 'Path',  type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    },

    // ─── COPYRIGHT ────────────────────────────────────────────────
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      // e.g. "© 2026 Lathium Gateway. All Rights Reserved."
    },

  ],
};
