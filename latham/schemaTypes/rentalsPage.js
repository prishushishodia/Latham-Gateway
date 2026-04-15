// schemas/rentalsPage.js

export default {
  name: 'rentalsPage',
  title: 'Rentals Page',
  type: 'document',
  fields: [

    // ─── HERO SECTION ─────────────────────────────────────────
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          // e.g. "Second Floor Leasing"
        },
        {
          name: 'headingLine1',
          title: 'Heading Line 1',
          type: 'string',
          // e.g. "The Future of"
        },
        {
          name: 'headingLine2',
          title: 'Heading Line 2 (Teal Italic)',
          type: 'string',
          // e.g. "Clinical Space"
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'text',
        },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'availableArea',
          title: 'Available Area',
          type: 'string',
          // e.g. "2,400 - 8,500 SQFT"
        },
        {
          name: 'status',
          title: 'Leasing Status',
          type: 'string',
          // e.g. "Now Leasing"
        },
      ],
    },

    // ─── FEATURES SECTION ─────────────────────────────────────
    {
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          // e.g. "Premium Features"
        },
        {
          name: 'features',
          title: 'Feature Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                {
                  name: 'icon',
                  title: 'Icon Name (lucide-react)',
                  type: 'string',
                  description: 'One of: Building2, UserRoundCheck, Trees, Car',
                },
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        },
        {
          name: 'interiorImage',
          title: 'Interior Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'virtualTourTitle',
          title: 'Virtual Tour Overlay Title',
          type: 'string',
          // e.g. "Virtual Tour Available"
        },
        {
          name: 'virtualTourDescription',
          title: 'Virtual Tour Overlay Description',
          type: 'text',
        },
      ],
    },

    // ─── INQUIRY SECTION ──────────────────────────────────────
    {
      name: 'inquirySection',
      title: 'Leasing Inquiry Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          // e.g. "Leasing Inquiry"
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'text',
          // e.g. "Fill out the form below..."
        },
      ],
    },

    // ─── LOCATION SECTION ─────────────────────────────────────
    {
      name: 'locationSection',
      title: 'Location Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Map Badge Text',
          type: 'string',
          // e.g. "Prime District"
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          // e.g. "Strategic Location"
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'text',
        },
        {
          name: 'image',
          title: 'Location / Map Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'locationPoints',
          title: 'Location Points',
          type: 'array',
          of: [{ type: 'string' }],
          // e.g. ["3 mins to central transit access", ...]
        },
      ],
    },

  ],
};
