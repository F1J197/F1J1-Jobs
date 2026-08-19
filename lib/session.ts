// Demo Session seam. NextAuth (Facebook/Google) arrives via scripts/retire-extra-repos.sh — do not wire it here.

export type SessionUser = {
  id: string
  name: string
  role: 'JOB_SEEKER' | 'EMPLOYER'
  companyId?: string
}

export interface Session {
  current(): SessionUser | null
}

export function createMemorySession(user: SessionUser | null): Session {
  return {
    current() {
      return user
    },
  }
}
