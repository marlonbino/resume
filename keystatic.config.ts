import { config, fields, singleton, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'marlonbino', name: 'resume' },
  },

  ui: {
    brand: { name: 'Resume CMS' },
    navigation: {
      'Roseline — Nurse Portfolio': [
        'roseline_hero', 'roseline_about', 'roseline_contact',
        'roseline_impact', 'roseline_experience', 'roseline_education', 'roseline_projects',
      ],
      'Marlon — Dev Portfolio': [
        'marlon_hero', 'marlon_about', 'marlon_contact',
        'marlon_steps', 'marlon_expertise', 'marlon_experience', 'marlon_projects',
      ],
    },
  },

  singletons: {
    roseline_hero: singleton({
      label: 'Roseline — Hero',
      path: 'content/roseline/hero',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Credentials line', description: 'e.g. DNP · MPH · MSN · BSN · RN — Seattle, WA' }),
        bio: fields.text({ label: 'Bio paragraph', multiline: true }),
      },
    }),

    roseline_about: singleton({
      label: 'Roseline — About',
      path: 'content/roseline/about',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        paragraph1: fields.text({ label: 'First paragraph', multiline: true }),
        paragraph2: fields.text({ label: 'Second paragraph', multiline: true }),
        location: fields.text({ label: 'Location & LinkedIn line' }),
      },
    }),

    roseline_contact: singleton({
      label: 'Roseline — Contact',
      path: 'content/roseline/contact',
      format: { data: 'yaml' },
      schema: {
        email: fields.text({ label: 'Email' }),
        linkedinUrl: fields.text({ label: 'LinkedIn URL' }),
        location: fields.text({ label: 'Location display (e.g. 📍 Seattle, WA)' }),
        availability: fields.text({ label: 'Availability line' }),
        whatsappNumber: fields.text({ label: 'WhatsApp number (digits only, e.g. 14255245066)' }),
        introParagraph: fields.text({ label: 'Intro paragraph', multiline: true }),
      },
    }),

    marlon_hero: singleton({
      label: 'Marlon — Hero',
      path: 'content/marlon/hero',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow line' }),
        bio: fields.text({ label: 'Bio paragraph', multiline: true }),
      },
    }),

    marlon_about: singleton({
      label: 'Marlon — About',
      path: 'content/marlon/about',
      format: { data: 'yaml' },
      schema: {
        heading: fields.text({ label: 'Heading', multiline: true }),
        bio: fields.text({ label: 'Bio paragraph', multiline: true }),
        location: fields.text({ label: 'Location line' }),
      },
    }),

    marlon_contact: singleton({
      label: 'Marlon — Contact',
      path: 'content/marlon/contact',
      format: { data: 'yaml' },
      schema: {
        blurb: fields.text({ label: 'Intro paragraph', multiline: true }),
        email: fields.text({ label: 'Email' }),
        githubUrl: fields.text({ label: 'GitHub URL' }),
        huggingfaceUrl: fields.text({ label: 'Hugging Face URL' }),
        availability: fields.text({ label: 'Availability label' }),
        whatsappNumber: fields.text({ label: 'WhatsApp number (digits only)' }),
      },
    }),
  },

  collections: {
    roseline_impact: collection({
      label: 'Roseline — Impact cards',
      path: 'content/roseline/impact/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key (used as filename)' } }),
        order: fields.integer({ label: 'Display order (1 = first)', validation: { isRequired: true, min: 1 } }),
        displayNum: fields.text({ label: 'Metric (e.g. 30%)' }),
        title: fields.text({ label: 'Title' }),
        desc: fields.text({ label: 'Description', multiline: true }),
      },
    }),

    roseline_experience: collection({
      label: 'Roseline — Experience timeline',
      path: 'content/roseline/experience/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key (used as filename)' } }),
        order: fields.integer({ label: 'Display order (1 = top)', validation: { isRequired: true, min: 1 } }),
        period: fields.text({ label: 'Date range (e.g. Dec 2021 — Present)' }),
        org: fields.text({ label: 'Organisation' }),
        role: fields.text({ label: 'Role & Location' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: p => p.value }),
      },
    }),

    roseline_education: collection({
      label: 'Roseline — Education cards',
      path: 'content/roseline/education/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key (used as filename)' } }),
        order: fields.integer({ label: 'Display order (1 = first)', validation: { isRequired: true, min: 1 } }),
        period: fields.text({ label: 'Completion date (e.g. Completed 2026)' }),
        degree: fields.text({ label: 'Degree name' }),
        focus: fields.text({ label: 'Specialisation' }),
        school: fields.text({ label: 'School' }),
        note: fields.text({ label: 'Note (scholarship, capstone, etc.)', multiline: true }),
        accentColor: fields.select({
          label: 'Top border colour',
          options: [
            { label: 'Gold (highlight)', value: 'var(--gold)' },
            { label: 'Purple', value: 'var(--teal)' },
            { label: 'Purple Light', value: 'var(--teal-light)' },
          ],
          defaultValue: 'var(--teal)',
        }),
      },
    }),

    roseline_projects: collection({
      label: 'Roseline — Projects / Consultancy',
      path: 'content/roseline/projects/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key (used as filename)' } }),
        order: fields.integer({ label: 'Display order', validation: { isRequired: true, min: 1 } }),
        label: fields.text({ label: 'Badge (e.g. Consultancy · DNP Capstone)' }),
        client: fields.text({ label: 'Client / Organisation' }),
        title: fields.text({ label: 'Project title' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: p => p.value }),
      },
    }),

    marlon_steps: collection({
      label: 'Marlon — Steps cards',
      path: 'content/marlon/steps/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key' } }),
        order: fields.integer({ label: 'Display order', validation: { isRequired: true, min: 1 } }),
        heading: fields.text({ label: 'Card heading' }),
        body: fields.text({ label: 'Card body', multiline: true }),
      },
    }),

    marlon_expertise: collection({
      label: 'Marlon — Expertise rooms',
      path: 'content/marlon/expertise/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key' } }),
        order: fields.integer({ label: 'Display order', validation: { isRequired: true, min: 1 } }),
        title: fields.text({ label: 'Room title (e.g. Backend Systems)' }),
        desc: fields.text({ label: 'Description (shown on hover)', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: p => p.value }),
      },
    }),

    marlon_experience: collection({
      label: 'Marlon — Experience timeline',
      path: 'content/marlon/experience/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key' } }),
        order: fields.integer({ label: 'Display order', validation: { isRequired: true, min: 1 } }),
        period: fields.text({ label: 'Date range' }),
        org: fields.text({ label: 'Organisation' }),
        role: fields.text({ label: 'Role & Location' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: p => p.value }),
      },
    }),

    marlon_projects: collection({
      label: 'Marlon — Projects',
      path: 'content/marlon/projects/*',
      format: { data: 'yaml' },
      slugField: 'slug',
      schema: {
        slug: fields.slug({ name: { label: 'Key' } }),
        order: fields.integer({ label: 'Display order', validation: { isRequired: true, min: 1 } }),
        period: fields.text({ label: 'Year/range' }),
        role: fields.text({ label: 'Role (e.g. Backend Developer)' }),
        title: fields.text({ label: 'Project name' }),
        subtitle: fields.text({ label: 'Subtitle' }),
        image: fields.text({ label: 'Image filename in /public/ (e.g. project-openhmis.jpg)' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        linkLabel: fields.text({ label: 'Link display text' }),
        linkHref: fields.text({ label: 'Link URL' }),
        linkType: fields.select({
          label: 'Link type',
          options: [
            { label: 'Repository', value: 'Repository' },
            { label: 'Model', value: 'Model' },
            { label: 'Live site', value: 'Live' },
          ],
          defaultValue: 'Repository',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: p => p.value }),
      },
    }),
  },
})
