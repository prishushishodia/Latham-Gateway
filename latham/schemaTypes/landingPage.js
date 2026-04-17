// schemas/landingPage.js

export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [

    // ─── HERO SECTION ─────────────────────────────────────────
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'primaryLabel', title: 'Primary Button Label', type: 'string' },
        { name: 'primaryHref', title: 'Primary Button Href', type: 'string' },
        { name: 'secondaryLabel', title: 'Secondary Button Label', type: 'string' },
        { name: 'secondaryHref', title: 'Secondary Button Href', type: 'string' },
      ],
    },

    // ─── FLOOR BREAKDOWN SECTION ──────────────────────────────
    {
      name: 'floorSection',
      title: 'Floor Breakdown Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        // e.g. "Designed for Your Journey"
        { name: 'subheading', title: 'Subheading', type: 'text' },
        // e.g. "Navigate our facility with ease..."

        {
          name: 'floorCards',
          title: 'Floor Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Card Title',
                  type: 'string',
                  // e.g. "Garden Floor"
                },
                {
                  name: 'subtitle',
                  title: 'Subtitle (Teal)',
                  type: 'string',
                  // e.g. "IV & Wellness"
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Icon Name (lucide-react)',
                  type: 'string',
                  // e.g. "Leaf", "Activity", "Building"
                  description: 'Name of a lucide-react icon (e.g. Leaf, Activity, Building)',
                },
              ],
            },
          ],
        },

        // Patient Portal is a distinct highlighted card
        {
          name: 'patientPortalCard',
          title: 'Patient Portal Card',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            // "Patient Portal"
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
            // "Your Health Dashboard"
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'buttonLabel', title: 'Button Label', type: 'string' },
            // "Access Portal"
            { name: 'buttonHref', title: 'Button Href', type: 'string' },
            // "/patient"
          ],
        },
      ],
    },

    // ─── COMPREHENSIVE CARE / SERVICES SECTION ────────────────
    {
      name: 'servicesSection',
      title: 'Comprehensive Care Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        // "Our Comprehensive Care"
        { name: 'subheading', title: 'Subheading', type: 'text' },
        // "We offer a wide range of services..."
        { name: 'viewAllLabel', title: '"View All" Button Label', type: 'string' },
        // "View All Services"
        { name: 'viewAllHref', title: '"View All" Button Href', type: 'string' },
        // "/services"

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
                  title: 'Card Title',
                  type: 'string',
                  // e.g. "IV Therapy"
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Icon Name (lucide-react)',
                  type: 'string',
                  // e.g. "Droplet", "Shield", "Stethoscope", "Leaf"
                  description: 'Name of a lucide-react icon (e.g. Droplet, Shield, Stethoscope, Leaf)',
                },
                {
                  name: 'learnMoreLabel',
                  title: 'Learn More Label',
                  type: 'string',
                  // "Learn More"
                },
                {
                  name: 'learnMoreHref',
                  title: 'Learn More Href',
                  type: 'string',
                  // "/services"
                },
              ],
            },
          ],
        },
      ],
    },

  ],
};
