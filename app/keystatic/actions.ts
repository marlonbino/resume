'use server'

import { cookies } from 'next/headers'
import * as yaml from 'js-yaml'
import {
  getFileContent,
  putFileContent,
  deleteFile,
  listDirectory,
  uploadImage,
} from '@/lib/github-content'
import { getSectionByKey } from '@/lib/admin-schema'

async function assertAuth() {
  const jar = await cookies()
  if (jar.get('ks-auth')?.value !== process.env.KEYSTATIC_ADMIN_PASSWORD) {
    throw new Error('Unauthorized')
  }
}

// Read a singleton's current values
export async function readSingleton(sectionKey: string): Promise<Record<string, unknown>> {
  await assertAuth()
  const section = getSectionByKey(sectionKey)
  if (section.kind !== 'singleton') throw new Error(`${sectionKey} is not a singleton`)
  const { content } = await getFileContent(section.yamlPath)
  const parsed = yaml.load(content)
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    return parsed as Record<string, unknown>
  }
  return {}
}

// Save a singleton
export async function saveSingleton(
  sectionKey: string,
  data: Record<string, unknown>
): Promise<void> {
  await assertAuth()
  const section = getSectionByKey(sectionKey)
  if (section.kind !== 'singleton') throw new Error(`${sectionKey} is not a singleton`)

  let sha: string | null = null
  try {
    const existing = await getFileContent(section.yamlPath)
    sha = existing.sha
  } catch {
    // File doesn't exist yet — create it
  }

  const content = yaml.dump(data, { lineWidth: 120 })
  await putFileContent(
    section.yamlPath,
    content,
    sha,
    `Update ${section.label} singleton via CMS`
  )
}

// List all items in a collection (returns array of {slug, ...fields})
export async function listCollection(
  sectionKey: string
): Promise<Array<Record<string, unknown>>> {
  await assertAuth()
  const section = getSectionByKey(sectionKey)
  if (section.kind !== 'collection') throw new Error(`${sectionKey} is not a collection`)
  if (!section.collectionDir) throw new Error(`${sectionKey} has no collectionDir`)

  const files = await listDirectory(section.collectionDir)
  const yamlFiles = files.filter((f) => f.type === 'file' && f.name.endsWith('.yaml'))

  const items = await Promise.all(
    yamlFiles.map(async (file) => {
      const { content } = await getFileContent(file.path)
      const parsed = yaml.load(content)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>
      }
      return { slug: file.name.replace('.yaml', '') }
    })
  )

  const orderField = section.orderField ?? 'order'
  return items.sort((a, b) => {
    const aOrder = typeof a[orderField] === 'number' ? (a[orderField] as number) : 999
    const bOrder = typeof b[orderField] === 'number' ? (b[orderField] as number) : 999
    return aOrder - bOrder
  })
}

// Read one collection item
export async function readCollectionItem(
  sectionKey: string,
  slug: string
): Promise<Record<string, unknown>> {
  await assertAuth()
  const section = getSectionByKey(sectionKey)
  if (section.kind !== 'collection') throw new Error(`${sectionKey} is not a collection`)
  if (!section.collectionDir) throw new Error(`${sectionKey} has no collectionDir`)

  const filePath = `${section.collectionDir}/${slug}.yaml`
  const { content } = await getFileContent(filePath)
  const parsed = yaml.load(content)
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    return parsed as Record<string, unknown>
  }
  return { slug }
}

// Save a collection item (create or update)
export async function saveCollectionItem(
  sectionKey: string,
  slug: string,
  data: Record<string, unknown>
): Promise<void> {
  await assertAuth()
  const section = getSectionByKey(sectionKey)
  if (section.kind !== 'collection') throw new Error(`${sectionKey} is not a collection`)
  if (!section.collectionDir) throw new Error(`${sectionKey} has no collectionDir`)

  const filePath = `${section.collectionDir}/${slug}.yaml`

  let sha: string | null = null
  try {
    const existing = await getFileContent(filePath)
    sha = existing.sha
  } catch {
    // New file
  }

  // Always include the slug field in the data
  const slugField = section.slugField ?? 'slug'
  const dataWithSlug = { [slugField]: slug, ...data }

  const content = yaml.dump(dataWithSlug, { lineWidth: 120 })
  await putFileContent(
    filePath,
    content,
    sha,
    sha
      ? `Update ${section.label} item "${slug}" via CMS`
      : `Create ${section.label} item "${slug}" via CMS`
  )
}

// Delete a collection item
export async function deleteCollectionItem(sectionKey: string, slug: string): Promise<void> {
  await assertAuth()
  const section = getSectionByKey(sectionKey)
  if (section.kind !== 'collection') throw new Error(`${sectionKey} is not a collection`)
  if (!section.collectionDir) throw new Error(`${sectionKey} has no collectionDir`)

  const filePath = `${section.collectionDir}/${slug}.yaml`
  const { sha } = await getFileContent(filePath)
  await deleteFile(filePath, sha, `Delete ${section.label} item "${slug}" via CMS`)
}

// Upload an image — accepts FormData with 'file' field
export async function uploadImageFile(formData: FormData): Promise<{ filename: string }> {
  await assertAuth()

  const file = formData.get('file') as File | null
  if (!file) throw new Error('No file provided')

  const bytes = await file.arrayBuffer()
  const base64Data = Buffer.from(bytes).toString('base64')
  const filename = file.name

  // Check if file already exists to get sha
  let sha: string | null = null
  try {
    const existing = await getFileContent(`public/${filename}`)
    sha = existing.sha
  } catch {
    // New file
  }

  await uploadImage(filename, base64Data, sha)
  return { filename }
}
