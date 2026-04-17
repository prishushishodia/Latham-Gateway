// schemas/floorBreakdownPage.js

export default {
  name: 'floorBreakdownPage',
  title: 'Floor Breakdown Page',
  type: 'document',
  fields: [

    // ─── HERO ─────────────────────────────────────────────────
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'backgroundImage', title: 'Background Image', type: 'image' },
        { name: 'badge', title: 'Badge Text', type: 'string' },          // "FLOOR BREAKDOWN"
        { name: 'headingLine1', title: 'Heading Line 1', type: 'string' }, // "Healing in"
        { name: 'headingLine2', title: 'Heading Line 2 (Teal)', type: 'string' }, // "Harmony."
        { name: 'subtext', title: 'Subtext', type: 'text' },
        {
          name: 'ctas',
          title: 'CTA Buttons',
          type: 'object',
          fields: [
            { name: 'primaryLabel', title: 'Primary Label', type: 'string' },  // "View All Services"
            { name: 'primaryHref', title: 'Primary Href', type: 'string' },
            { name: 'secondaryLabel', title: 'Secondary Label', type: 'string' }, // "Book a Tour"
            { name: 'secondaryHref', title: 'Secondary Href', type: 'string' },
          ],
        },
      ],
    },

    // ─── STATS BAR ────────────────────────────────────────────
    {
      name: 'statsBar',
      title: 'Stats Bar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },       // "5", "10+", "150+", "98%"
            { name: 'label', title: 'Label', type: 'string' },       // "Floors of Care"
          ],
        },
      ],
    },

    // ─── FACILITY DIRECTORY SECTION ───────────────────────────
    {
      name: 'facilityDirectory',
      title: 'Facility Directory Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },            // "FACILITY DIRECTORY"
        { name: 'headingLine1', title: 'Heading Line 1', type: 'string' }, // "Every floor,"
        { name: 'headingLine2', title: 'Heading Line 2 (Teal)', type: 'string' }, // "a purpose."
        { name: 'description', title: 'Description', type: 'text' },

        // Floor tabs + content
        {
          name: 'floors',
          title: 'Floors',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'tabLabel', title: 'Tab Label', type: 'string' },      // "Ground Floor"
                { name: 'floorCode', title: 'Floor Code', type: 'string' },    // "G", "1", "2"...
                { name: 'title', title: 'Floor Title', type: 'string' },       // "The Gateway Atrium"
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'image', title: 'Main Image', type: 'image' },
                { name: 'activeLabel', title: 'Active Label', type: 'string' }, // "ACTIVE FLOOR"
                {
                  name: 'tags',
                  title: 'Tags',
                  type: 'array',
                  of: [{ type: 'string' }],  // ["Welcome Center", "Pharmacy", "Café"]
                },
                {
                  name: 'ctas',
                  title: 'CTA Buttons',
                  type: 'object',
                  fields: [
                    { name: 'primaryLabel', title: 'Primary Label', type: 'string' },
                    { name: 'primaryHref', title: 'Primary Href', type: 'string' },
                    { name: 'secondaryLabel', title: 'Secondary Label', type: 'string' },
                    { name: 'secondaryHref', title: 'Secondary Href', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },

      ],
    },

    // ─── ARCHITECTURE SECTION ─────────────────────────────────
    {
      name: 'architecture',
      title: 'Future-Proof Architecture Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },             // "BUILT FOR WELLNESS"
        { name: 'headingLine1', title: 'Heading Line 1', type: 'string' },  // "Future-Proof"
        { name: 'headingLine2', title: 'Heading Line 2 (Teal)', type: 'string' }, // "Architecture."
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'imageTop', title: 'Top Image', type: 'image' },
        { name: 'imageBottom', title: 'Bottom Image', type: 'image' },
        {
          name: 'features',
          title: 'Feature List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'ctaBox',
          title: 'Ready to Visit CTA Box',
          type: 'object',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },       // "Ready to visit?"
            { name: 'subtext', title: 'Subtext', type: 'text' },
            { name: 'primaryLabel', title: 'Primary Button Label', type: 'string' },
            { name: 'primaryHref', title: 'Primary Button Href', type: 'string' },
            { name: 'secondaryLabel', title: 'Secondary Button Label', type: 'string' },
            { name: 'secondaryHref', title: 'Secondary Button Href', type: 'string' },
          ],
        },
      ],
    },

    // ─── GALLERY SECTION ──────────────────────────────────────
    {
      name: 'gallery',
      title: 'Gallery Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },       // "Inside"
        { name: 'headingAccent', title: 'Heading Accent (Teal)', type: 'string' }, // "Lathum Gateway"
        { name: 'tourLabel', title: 'Tour Link Label', type: 'string' },
        { name: 'tourHref', title: 'Tour Link Href', type: 'string' },
        {
          name: 'photos',
          title: 'Photos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                { name: 'label', title: 'Label', type: 'string' },
              ],
              preview: { select: { title: 'label', media: 'image' } },
            },
          ],
        },
      ],
    },

  ],
};