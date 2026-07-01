export type FieldType = 'text' | 'multiline' | 'integer' | 'select' | 'tags' | 'image'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  description?: string
  options?: { label: string; value: string }[]
  required?: boolean
}

export interface SectionDef {
  key: string
  label: string
  group: 'roseline' | 'marlon'
  kind: 'singleton' | 'collection'
  yamlPath: string
  collectionDir?: string
  fields: FieldDef[]
  slugField?: string
  orderField?: string
}

export const SECTIONS: SectionDef[] = [
  // ── Roseline Singletons ──────────────────────────────────────────────────
  {
    key: 'roseline_hero',
    label: 'Hero',
    group: 'roseline',
    kind: 'singleton',
    yamlPath: 'content/roseline/hero.yaml',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'multiline' },
    ],
  },
  {
    key: 'roseline_about',
    label: 'About',
    group: 'roseline',
    kind: 'singleton',
    yamlPath: 'content/roseline/about.yaml',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'paragraph1', label: 'Paragraph 1', type: 'multiline' },
      { key: 'paragraph2', label: 'Paragraph 2', type: 'multiline' },
      { key: 'location', label: 'Location', type: 'text' },
    ],
  },
  {
    key: 'roseline_contact',
    label: 'Contact',
    group: 'roseline',
    kind: 'singleton',
    yamlPath: 'content/roseline/contact.yaml',
    fields: [
      { key: 'introParagraph', label: 'Intro Paragraph', type: 'multiline' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'availability', label: 'Availability', type: 'text' },
      { key: 'whatsappNumber', label: 'WhatsApp Number', type: 'text' },
    ],
  },

  // ── Roseline Collections ─────────────────────────────────────────────────
  {
    key: 'roseline_impact',
    label: 'Impact',
    group: 'roseline',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/roseline/impact',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'displayNum', label: 'Display Number', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'multiline' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
  {
    key: 'roseline_experience',
    label: 'Experience',
    group: 'roseline',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/roseline/experience',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'org', label: 'Organisation', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'desc', label: 'Description', type: 'multiline' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
  {
    key: 'roseline_education',
    label: 'Education',
    group: 'roseline',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/roseline/education',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'focus', label: 'Focus', type: 'text' },
      { key: 'school', label: 'School', type: 'text' },
      { key: 'note', label: 'Note', type: 'multiline' },
      {
        key: 'accentColor',
        label: 'Accent Color',
        type: 'select',
        options: [
          { label: 'Gold', value: 'var(--gold)' },
          { label: 'Purple', value: 'var(--teal)' },
          { label: 'Purple Light', value: 'var(--teal-light)' },
        ],
      },
    ],
  },
  {
    key: 'roseline_projects',
    label: 'Projects',
    group: 'roseline',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/roseline/projects',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'client', label: 'Client', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'multiline' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
  },

  // ── Marlon Singletons ────────────────────────────────────────────────────
  {
    key: 'marlon_hero',
    label: 'Hero',
    group: 'marlon',
    kind: 'singleton',
    yamlPath: 'content/marlon/hero.yaml',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'multiline' },
    ],
  },
  {
    key: 'marlon_about',
    label: 'About',
    group: 'marlon',
    kind: 'singleton',
    yamlPath: 'content/marlon/about.yaml',
    fields: [
      { key: 'heading', label: 'Heading', type: 'multiline' },
      { key: 'bio', label: 'Bio', type: 'multiline' },
      { key: 'location', label: 'Location', type: 'text' },
    ],
  },
  {
    key: 'marlon_contact',
    label: 'Contact',
    group: 'marlon',
    kind: 'singleton',
    yamlPath: 'content/marlon/contact.yaml',
    fields: [
      { key: 'blurb', label: 'Blurb', type: 'multiline' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
      { key: 'huggingfaceUrl', label: 'HuggingFace URL', type: 'text' },
      { key: 'availability', label: 'Availability', type: 'text' },
      { key: 'whatsappNumber', label: 'WhatsApp Number', type: 'text' },
    ],
  },

  // ── Marlon Collections ───────────────────────────────────────────────────
  {
    key: 'marlon_steps',
    label: 'Steps',
    group: 'marlon',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/marlon/steps',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Body', type: 'multiline' },
    ],
  },
  {
    key: 'marlon_expertise',
    label: 'Expertise',
    group: 'marlon',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/marlon/expertise',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'multiline' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
  {
    key: 'marlon_experience',
    label: 'Experience',
    group: 'marlon',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/marlon/experience',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'org', label: 'Organisation', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'desc', label: 'Description', type: 'multiline' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
  {
    key: 'marlon_projects',
    label: 'Projects',
    group: 'marlon',
    kind: 'collection',
    yamlPath: '',
    collectionDir: 'content/marlon/projects',
    slugField: 'slug',
    orderField: 'order',
    fields: [
      { key: 'order', label: 'Order', type: 'integer', required: true },
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      {
        key: 'image',
        label: 'Image',
        type: 'image',
        description: 'Filename in /public/ — use Upload Image button',
      },
      { key: 'desc', label: 'Description', type: 'multiline' },
      { key: 'linkLabel', label: 'Link Label', type: 'text' },
      { key: 'linkHref', label: 'Link URL', type: 'text' },
      {
        key: 'linkType',
        label: 'Link Type',
        type: 'select',
        options: [
          { label: 'Repository', value: 'Repository' },
          { label: 'Model', value: 'Model' },
          { label: 'Live', value: 'Live' },
        ],
      },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
]

export function getSectionByKey(key: string): SectionDef {
  const section = SECTIONS.find((s) => s.key === key)
  if (!section) throw new Error(`Section not found: ${key}`)
  return section
}
