// schemas/floorBreakdownPage.js

export default {
  name: 'floorBreakdownPage',
  title: 'Floor Breakdown Page',
  type: 'document',
  fields: [

    // ─── NAVBAR ───────────────────────────────────────────────
    {
      name: 'navbar',
      title: 'Navbar',
      type: 'object',
      fields: [
        { name: 'logo', title: 'Logo', type: 'image' },
        { name: 'logoText', title: 'Logo Text', type: 'string' },
        {
          name: 'navLinks',
          title: 'Nav Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Href', type: 'string' },
              ],
            },
          ],
        },
        { name: 'ctaLabel', title: 'CTA Button Label', type: 'string' },
        { name: 'ctaHref', title: 'CTA Button Href', type: 'string' },
      ],
    },

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
          name: 'floorThumbnails',
          title: 'Floor Thumbnails (top-right numbers)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },  // "6", "7", "8"
                { name: 'image', title: 'Image', type: 'image' },
              ],
            },
          ],
        },
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
            { name: 'icon', title: 'Icon', type: 'image' },
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
                { name: 'badge', title: 'Floor Badge', type: 'string' },       // "GROUND FLOOR"
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

        // Floor thumbnail grid (the 5 cards below the active floor)
        {
          name: 'floorGrid',
          title: 'Floor Thumbnail Grid',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'floorCode', title: 'Floor Code', type: 'string' },
                { name: 'badge', title: 'Floor Badge', type: 'string' },
                { name: 'image', title: 'Image', type: 'image' },
                { name: 'title', title: 'Title', type: 'string' },
                {
                  name: 'tags',
                  title: 'Tags',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
                { name: 'isActive', title: 'Is Active', type: 'boolean' },
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
          name: 'certificationBadge',
          title: 'Certification Badge',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },   // "ARCHITECTURAL STANDARD"
            { name: 'value', title: 'Value', type: 'string' },   // "LEED Platinum Certified"
          ],
        },
        {
          name: 'features',
          title: 'Feature List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icon', type: 'image' },
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

    // ─── RENT SPACE SECTION ───────────────────────────────────
    {
      name: 'rentSpace',
      title: 'Rent Space Section',
      type: 'object',
      fields: [
        { name: 'backgroundImage', title: 'Background Image', type: 'image' },
        { name: 'heading', title: 'Heading', type: 'string' },  // "Rent Space at Latham Gateway"
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'primaryLabel', title: 'Primary Button Label', type: 'string' },
        { name: 'primaryHref', title: 'Primary Button Href', type: 'string' },
        { name: 'secondaryLabel', title: 'Secondary Button Label', type: 'string' },
        { name: 'secondaryHref', title: 'Secondary Button Href', type: 'string' },
      ],
    },

    // ─── TRUST BAR ────────────────────────────────────────────
    {
      name: 'trustBar',
      title: 'Trust Bar',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' }, // "A healing space built for your well-being..."
        { name: 'reviewCount', title: 'Review Count', type: 'string' },  // "48 reviews on"
        { name: 'reviewPlatform', title: 'Review Platform', type: 'string' }, // "Trustpilot"
        { name: 'reviewPlatformLogo', title: 'Platform Logo', type: 'image' },
        { name: 'starRating', title: 'Star Rating (1–5)', type: 'number' },
      ],
    },

    // ─── FOOTER ───────────────────────────────────────────────
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'copyrightText', title: 'Copyright Text', type: 'string' }, // "© 2025 Latham Gateway..."
        {
          name: 'footerLinks',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Href', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'platform', title: 'Platform', type: 'string' }, // "facebook", "twitter", "linkedin"
                { name: 'href', title: 'Href', type: 'string' },
                { name: 'icon', title: 'Icon', type: 'image' },
              ],
            },
          ],
        },
      ],
    },

  ],
};