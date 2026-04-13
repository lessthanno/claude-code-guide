const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Prepend basePath to an internal path */
export const u = (path: string) => `${BASE}${path}`
