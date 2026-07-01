// Server-side only — never import from client components
const BASE_URL = 'https://api.github.com'
const REPO = 'marlonbino/resume'

function getHeaders() {
  const pat = process.env.KEYSTATIC_GITHUB_PAT
  if (!pat) throw new Error('KEYSTATIC_GITHUB_PAT env var is not set')
  return {
    Authorization: `Bearer ${pat}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export async function getFileContent(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${BASE_URL}/repos/${REPO}/contents/${path}`, {
    headers: getHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub GET ${path} failed ${res.status}: ${body}`)
  }
  const json = await res.json()
  const decoded = Buffer.from(json.content, 'base64').toString('utf-8')
  return { content: decoded, sha: json.sha }
}

export async function putFileContent(
  path: string,
  content: string,
  sha: string | null,
  message: string
): Promise<void> {
  const encoded = Buffer.from(content, 'utf-8').toString('base64')
  const body: Record<string, unknown> = { message, content: encoded }
  if (sha) body.sha = sha

  const res = await fetch(`${BASE_URL}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub PUT ${path} failed ${res.status}: ${text}`)
  }
}

export async function deleteFile(path: string, sha: string, message: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/repos/${REPO}/contents/${path}`, {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify({ message, sha }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub DELETE ${path} failed ${res.status}: ${text}`)
  }
}

export async function listDirectory(
  path: string
): Promise<Array<{ name: string; path: string; sha: string; type: string }>> {
  const res = await fetch(`${BASE_URL}/repos/${REPO}/contents/${path}`, {
    headers: getHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub LIST ${path} failed ${res.status}: ${text}`)
  }
  const json = await res.json()
  if (!Array.isArray(json)) throw new Error(`Expected array from GitHub listing ${path}`)
  return json.map((item: { name: string; path: string; sha: string; type: string }) => ({
    name: item.name,
    path: item.path,
    sha: item.sha,
    type: item.type,
  }))
}

export async function uploadImage(
  filename: string,
  base64Data: string,
  sha: string | null
): Promise<void> {
  const body: Record<string, unknown> = {
    message: `Upload image ${filename}`,
    content: base64Data,
  }
  if (sha) body.sha = sha

  const res = await fetch(`${BASE_URL}/repos/${REPO}/contents/public/${filename}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub upload image ${filename} failed ${res.status}: ${text}`)
  }
}
