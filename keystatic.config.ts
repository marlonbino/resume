import { config, fields, singleton, collection } from '@keystatic/core'

const DO_NOT_CHANGE = 'Internal ID — do not edit this field'

export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'marlonbino', name: 'resume' },
  },

  ui: {
    brand: { name: 'Resume CMS' },
    navigation: {
      'Roseline — Nurse Portfolio': [
        'roseline_hero',
        'roseline_about',
        'roseline_contact',
        'roseline_impact',
        'roseline_experience',
        'roseline_education',
        'roseline_projects',
      ],
      'Marlon — Dev Portfolio': [
        'marlon_hero',
        'marlon_about',
        'marlon_contact',
        'marlon_steps',
        'marlon_expertise',
        'marlon_experience',
        'marlon_projects',
      ],
    },
  },

  singletons: {
    // ── Roseline ──────────────────────────────────────────────────────────────

    roseline_hero: singleton({
      label: 'Hero — Opening Screen',
      path: 'content/roseline/hero',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Credentials bar',
          description: 'The small line of text above your name on the opening screen (e.g. DNP · MPH · MSN · BSN · RN — Seattle, WA)',
        }),
        heroImage: fields.text({
          label: 'Hero background photo',
          description: 'Filename in /public/ (e.g. /hero-ros2.png). Use the Upload Image button to replace it.',
        }),
        bio: fields.text({
          label: 'Introduction text',
          description: 'The short paragraph that describes what you do — shown below your name on the opening screen.',
          multiline: true,
        }),
      },
    }),

    roseline_about: singleton({
      label: 'About — Your Story',
      path: 'content/roseline/about',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({
          label: 'Section heading',
          description: 'The large title at the top of the About section.',
        }),
        aboutImage: fields.text({
          label: 'About photo',
          description: 'Filename in /public/ (e.g. /about-ros2.jpeg). Use the Upload Image button to replace it.',
        }),
        paragraph1: fields.text({
          label: 'First paragraph',
          description: 'The first block of text in your About section.',
          multiline: true,
        }),
        paragraph2: fields.text({
          label: 'Second paragraph',
          description: 'The second block of text (optional continuation).',
          multiline: true,
        }),
        location: fields.text({
          label: 'Location line',
          description: 'Shown at the bottom of the About section (e.g. 📍 Seattle, WA · linkedin.com/in/roseline-buyeka).',
        }),
      },
    }),

    roseline_contact: singleton({
      label: 'Contact — Get In Touch',
      path: 'content/roseline/contact',
      format: { data: 'yaml' },
      schema: {
        introParagraph: fields.text({
          label: 'Opening message',
          description: 'The short paragraph shown above your contact details.',
          multiline: true,
        }),
        email: fields.text({
          label: 'Email address',
          description: 'Your email — shown as a clickable link.',
        }),
        linkedinUrl: fields.text({
          label: 'LinkedIn URL',
          description: 'Your full LinkedIn profile link (e.g. https://linkedin.com/in/roseline-buyeka).',
        }),
        location: fields.text({
          label: 'Location tag',
          description: 'Shown as a small label (e.g. 📍 Seattle, WA).',
        }),
        availability: fields.text({
          label: 'Availability status',
          description: 'The green-dot status line (e.g. Open to consulting opportunities).',
        }),
        whatsappNumber: fields.text({
          label: 'WhatsApp number',
          description: 'Digits only, no spaces or dashes (e.g. 14255245066 for a US number).',
        }),
      },
    }),

    // ── Marlon ────────────────────────────────────────────────────────────────

    marlon_hero: singleton({
      label: 'Hero — Opening Screen',
      path: 'content/marlon/hero',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({
          label: 'Tagline',
          description: 'The small line above your name (e.g. Software Developer · Nairobi).',
        }),
        heroImage: fields.text({
          label: 'Hero background photo',
          description: 'Filename in /public/ (e.g. /hero-dev.jpg). Use the Upload Image button to replace it.',
        }),
        bio: fields.text({
          label: 'Introduction text',
          description: 'The short paragraph shown below your name on the opening screen.',
          multiline: true,
        }),
      },
    }),

    marlon_about: singleton({
      label: 'About — Your Story',
      path: 'content/marlon/about',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({
          label: 'Section heading',
          description: 'The large title at the top of the About section.',
          multiline: true,
        }),
        aboutImage: fields.text({
          label: 'About photo',
          description: 'Filename in /public/ (e.g. /portrait-figure.jpg). Use the Upload Image button to replace it.',
        }),
        bio: fields.text({
          label: 'Bio paragraph',
          description: 'A short paragraph about your background and approach.',
          multiline: true,
        }),
        location: fields.text({
          label: 'Location line',
          description: 'Shown at the bottom of the About section (e.g. ↳ Nairobi · Kenya).',
        }),
      },
    }),

    marlon_contact: singleton({
      label: 'Contact — Get In Touch',
      path: 'content/marlon/contact',
      format: { data: 'yaml' },
      schema: {
        blurb: fields.text({
          label: 'Opening message',
          description: 'The short paragraph shown above your contact details.',
          multiline: true,
        }),
        email: fields.text({
          label: 'Email address',
        }),
        githubUrl: fields.text({
          label: 'GitHub profile URL',
        }),
        huggingfaceUrl: fields.text({
          label: 'Hugging Face profile URL',
        }),
        availability: fields.text({
          label: 'Availability status',
          description: 'The green-dot status label (e.g. Open to work).',
        }),
        whatsappNumber: fields.text({
          label: 'WhatsApp number',
          description: 'Digits only, no spaces (e.g. 254799979067).',
        }),
      },
    }),
  },

  collections: {
    // ── Roseline ──────────────────────────────────────────────────────────────

    roseline_impact: collection({
      label: 'Impact Numbers',
      path: 'content/roseline/impact/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on page',
          description: '1 = first card, 2 = second, and so on.',
          validation: { isRequired: true, min: 1 },
        }),
        displayNum: fields.text({
          label: 'The number or percentage',
          description: 'The large metric shown on the card (e.g. 30% or 100+).',
        }),
        title: fields.text({
          label: 'Card title',
          description: 'A short title for this result (e.g. Transition of Care scale-up).',
        }),
        desc: fields.text({
          label: 'Card description',
          description: 'One or two sentences explaining the impact in plain language.',
          multiline: true,
        }),
      },
    }),

    roseline_experience: collection({
      label: 'Work Experience',
      path: 'content/roseline/experience/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on timeline',
          description: '1 = most recent role at the top.',
          validation: { isRequired: true, min: 1 },
        }),
        period: fields.text({
          label: 'Dates',
          description: 'e.g. Dec 2021 — Present',
        }),
        org: fields.text({
          label: 'Organisation / Employer',
        }),
        role: fields.text({
          label: 'Job title & location',
          description: 'e.g. Director of Clinical Services · Seattle, WA',
        }),
        desc: fields.text({
          label: 'What you did there',
          description: 'A paragraph describing your responsibilities and achievements.',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Skill or keyword' }),
          { label: 'Skills / Keywords', itemLabel: p => p.value },
        ),
      },
    }),

    roseline_education: collection({
      label: 'Education',
      path: 'content/roseline/education/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on page',
          description: '1 = first card shown.',
          validation: { isRequired: true, min: 1 },
        }),
        period: fields.text({
          label: 'Completion year',
          description: 'e.g. Completed 2026',
        }),
        degree: fields.text({
          label: 'Degree name',
          description: 'e.g. Doctor of Nursing Practice (DNP)',
        }),
        focus: fields.text({
          label: 'Specialisation / Focus area',
        }),
        school: fields.text({
          label: 'School / University',
        }),
        note: fields.text({
          label: 'Additional note',
          description: 'Optional — scholarship, capstone project, honours, etc.',
          multiline: true,
        }),
        accentColor: fields.select({
          label: 'Card accent colour',
          description: 'The colour of the top border on this education card.',
          options: [
            { label: 'Gold — use for your most recent / top degree', value: 'var(--gold)' },
            { label: 'Purple', value: 'var(--teal)' },
            { label: 'Purple Light', value: 'var(--teal-light)' },
          ],
          defaultValue: 'var(--teal)',
        }),
      },
    }),

    roseline_projects: collection({
      label: 'Projects & Consultancy',
      path: 'content/roseline/projects/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on page',
          description: '1 = first project shown.',
          validation: { isRequired: true, min: 1 },
        }),
        label: fields.text({
          label: 'Badge label',
          description: 'The small tag shown at the top of the card (e.g. Consultancy · DNP Capstone).',
        }),
        client: fields.text({
          label: 'Client / Organisation',
        }),
        title: fields.text({
          label: 'Project title',
        }),
        desc: fields.text({
          label: 'Description',
          description: 'What was the project? What did you do? What was the outcome?',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Skill or keyword' }),
          { label: 'Skills / Keywords', itemLabel: p => p.value },
        ),
      },
    }),

    // ── Marlon ────────────────────────────────────────────────────────────────

    marlon_steps: collection({
      label: 'How I Work — Steps',
      path: 'content/marlon/steps/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on page',
          description: '1 = first card.',
          validation: { isRequired: true, min: 1 },
        }),
        heading: fields.text({
          label: 'Card heading',
        }),
        body: fields.text({
          label: 'Card body text',
          multiline: true,
        }),
      },
    }),

    marlon_expertise: collection({
      label: 'Areas of Expertise',
      path: 'content/marlon/expertise/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on page',
          description: '1 = first card.',
          validation: { isRequired: true, min: 1 },
        }),
        title: fields.text({
          label: 'Area title',
          description: 'e.g. Backend Systems',
        }),
        desc: fields.text({
          label: 'Description',
          description: 'Shown when someone hovers over the card.',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Technology / skill' }),
          { label: 'Technologies', itemLabel: p => p.value },
        ),
      },
    }),

    marlon_experience: collection({
      label: 'Work Experience',
      path: 'content/marlon/experience/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position on timeline',
          description: '1 = most recent.',
          validation: { isRequired: true, min: 1 },
        }),
        period: fields.text({
          label: 'Dates',
          description: 'e.g. 2023 — Present',
        }),
        org: fields.text({
          label: 'Company / Organisation',
        }),
        role: fields.text({
          label: 'Job title & location',
        }),
        desc: fields.text({
          label: 'What you did there',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Technology / skill' }),
          { label: 'Technologies', itemLabel: p => p.value },
        ),
      },
    }),

    marlon_projects: collection({
      label: 'Projects',
      path: 'content/marlon/projects/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({
          name: { label: 'Internal ID', description: DO_NOT_CHANGE },
        }),
        order: fields.integer({
          label: 'Position in carousel',
          description: '1 = first project shown.',
          validation: { isRequired: true, min: 1 },
        }),
        period: fields.text({
          label: 'Year / date range',
          description: 'e.g. 2024',
        }),
        role: fields.text({
          label: 'Your role',
          description: 'e.g. Backend Developer',
        }),
        title: fields.text({
          label: 'Project name',
        }),
        subtitle: fields.text({
          label: 'Subtitle',
          description: 'A short tagline for the project.',
        }),
        image: fields.text({
          label: 'Image filename',
          description: 'File must be in the /public/ folder (e.g. project-openhmis.jpg). Ask Marlon to upload the image.',
        }),
        desc: fields.text({
          label: 'Description',
          description: 'What was built, what problem it solves, what your contribution was.',
          multiline: true,
        }),
        linkLabel: fields.text({
          label: 'Link text',
          description: 'What the link says (e.g. openhmis/core or view-on-github).',
        }),
        linkHref: fields.text({
          label: 'Link URL',
          description: 'The full URL (e.g. https://github.com/marlonbino/openhmis).',
        }),
        linkType: fields.select({
          label: 'Link type',
          options: [
            { label: 'GitHub repository', value: 'Repository' },
            { label: 'ML / AI model', value: 'Model' },
            { label: 'Live website', value: 'Live' },
          ],
          defaultValue: 'Repository',
        }),
        tags: fields.array(
          fields.text({ label: 'Technology / skill' }),
          { label: 'Technologies', itemLabel: p => p.value },
        ),
      },
    }),
  },
})
