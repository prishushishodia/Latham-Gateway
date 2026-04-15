// schemas/servicesPage.js

export default {
  name: 'servicesPage',
  title: 'Services Page',
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
          // e.g. "Complete Care Services"
        },
        {
          name: 'headingLine1',
          title: 'Heading Line 1',
          type: 'string',
          // e.g. "Comprehensive"
        },
        {
          name: 'headingLine2',
          title: 'Heading Line 2 (Teal)',
          type: 'string',
          // e.g. "Wellness Center"
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'text',
          // e.g. "Experience a new standard of healthcare..."
        },
      ],
    },

    // ─── SERVICE CARDS ────────────────────────────────────────
    {
      name: 'serviceCards',
      title: 'Service Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              // e.g. "Dental Care"
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'cta',
              title: 'CTA Label',
              type: 'string',
              // e.g. "Learn More" or "Explore Treatments"
            },
            {
              name: 'icon',
              title: 'Icon Name (lucide-react)',
              type: 'string',
              description: 'One of: Activity, Droplets, Plane, Stethoscope, Syringe, Truck, UserRound, UtensilsCrossed, Weight',
            },
            {
              name: 'image',
              title: 'Hover Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Image revealed on card hover',
            },
            {
              name: 'featured',
              title: 'Featured Card',
              type: 'boolean',
              description: 'Featured cards are taller and more prominent',
              initialValue: false,
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'cta' },
          },
        },
      ],
    },

    // ─── CTA BANNER (bottom of page) ──────────────────────────
    {
      name: 'ctaBanner',
      title: 'CTA Banner',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          // e.g. "Ready to prioritize your health?"
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'text',
          // e.g. "Schedule an appointment today..."
        },
        {
          name: 'primaryLabel',
          title: 'Primary Button Label',
          type: 'string',
          // e.g. "Book Appointment"
        },
        {
          name: 'primaryHref',
          title: 'Primary Button Href',
          type: 'string',
          // e.g. "/contact"
        },
        {
          name: 'secondaryLabel',
          title: 'Secondary Button Label',
          type: 'string',
          // e.g. "Contact Us"
        },
        {
          name: 'secondaryHref',
          title: 'Secondary Button Href',
          type: 'string',
          // e.g. "/contact"
        },
      ],
    },

  ],
};
