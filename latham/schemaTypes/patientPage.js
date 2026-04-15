// schemas/patientPage.js

export default {
  name: 'patientPage',
  title: 'Patient Portal Page',
  type: 'document',
  fields: [

    // ─── HERO ─────────────────────────────────────────────────────
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'headingLine1', title: 'Heading Line 1',              type: 'string' },
        { name: 'headingLine2', title: 'Heading Line 2 (Teal)',       type: 'string' },
        { name: 'headingLine3', title: 'Heading Line 3 (Teal)',       type: 'string' },
        { name: 'subtext',      title: 'Subtext',                     type: 'text'   },
      ],
    },

    // ─── PORTAL CARDS ─────────────────────────────────────────────
    {
      name: 'portalCards',
      title: 'Portal Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title',       title: 'Card Title',              type: 'string' },
            { name: 'description', title: 'Card Description',        type: 'text'   },
            { name: 'cta',         title: 'Button Label',            type: 'string' },
            {
              name: 'icon',
              title: 'Icon Name (lucide-react)',
              type: 'string',
              description: 'e.g. Shield, BriefcaseMedical, Stethoscope',
            },
            { name: 'iconBg',      title: 'Icon Background (Tailwind class)', type: 'string' },
            { name: 'buttonColor', title: 'Button Hex Color',        type: 'string',
              description: 'e.g. #0a727f' },
            { name: 'href',        title: 'Button Link URL',         type: 'url'    },
          ],
          preview: { select: { title: 'title', subtitle: 'cta' } },
        },
      ],
    },

    // ─── SUPPORT ITEMS ────────────────────────────────────────────
    {
      name: 'supportItems',
      title: 'Support / Trust Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title',       title: 'Title',                   type: 'string' },
            { name: 'description', title: 'Description',             type: 'text'   },
            {
              name: 'icon',
              title: 'Icon Name (lucide-react)',
              type: 'string',
              description: 'e.g. Lock, CircleHelp',
            },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    },

    // ─── CTA BANNER ───────────────────────────────────────────────
    {
      name: 'ctaBanner',
      title: 'CTA Banner',
      type: 'object',
      fields: [
        { name: 'headingLine1', title: 'Heading Line 1',             type: 'string' },
        { name: 'headingLine2', title: 'Heading Line 2',             type: 'string' },
        { name: 'subtext',      title: 'Subtext',                    type: 'text'   },
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

  ],
};
