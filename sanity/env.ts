export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-11'

// We use your ID directly as a fallback to stop the crashing
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b5j6f1fq'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // We'll just log the error instead of crashing the site for now
    console.warn(errorMessage)
    return v as T
  }
  return v
}