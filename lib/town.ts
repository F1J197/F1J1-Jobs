export type Division = 'Central' | 'Western' | 'Northern' | 'Eastern'

export const DIVISIONS: Division[] = ['Central', 'Western', 'Northern', 'Eastern']

const SYNONYM_CLUSTERS: Record<string, string[]> = {
  nadi: ['nadi', 'denarau', 'denarau island', 'wailoaloa', 'namaka'],
  'greater-suva': ['suva', 'nasinu', 'nausori', 'lami', 'kinoya', 'nabua'],
  lautoka: ['lautoka', 'vitogo'],
  labasa: ['labasa', 'seaqaqa'],
  savusavu: ['savusavu', 'nabouwalu'],
  sigatoka: ['sigatoka', 'korotogo', 'coral coast'],
  ba: ['ba', 'tavua', 'rakiraki'],
}

const DIVISION_TOWNS: Record<Division, string[]> = {
  Central: ['suva', 'nasinu', 'nausori', 'lami', 'pacific harbour', 'navua', 'korovou'],
  Western: ['nadi', 'denarau', 'lautoka', 'ba', 'sigatoka', 'tavua', 'rakiraki', 'wailoaloa'],
  Northern: ['labasa', 'savusavu', 'taveuni', 'seaqaqa', 'nabouwalu'],
  Eastern: ['levuka', 'kadavu', 'lakeba', 'gau', 'koro'],
}

function fold(value: string): string {
  return value.trim().toLowerCase()
}

function placeEquals(needle: string, alias: string): boolean {
  if (needle === alias) return true
  if (alias.length >= 4 && needle.includes(alias)) return true
  if (needle.length >= 4 && alias.includes(needle)) return true
  return false
}

function clusterIdFor(town: string): string | undefined {
  const needle = fold(town)
  return Object.keys(SYNONYM_CLUSTERS).find((id) =>
    SYNONYM_CLUSTERS[id].some((alias) => placeEquals(needle, alias)),
  )
}

export function divisionFor(town: string): Division | undefined {
  const needle = fold(town)
  const asDivision = DIVISIONS.find((item) => fold(item) === needle)
  if (asDivision) return asDivision
  return DIVISIONS.find((division) =>
    DIVISION_TOWNS[division].some((alias) => placeEquals(needle, alias)),
  )
}

export function townsMatch(listingTown: string, queryTown: string): boolean {
  const listing = fold(listingTown)
  const query = fold(queryTown)
  if (!listing || !query) return false
  if (listing.includes(query) || query.includes(listing)) return true

  const queryDivision = DIVISIONS.find((item) => fold(item) === query)
  if (queryDivision) {
    return divisionFor(listingTown) === queryDivision
  }

  const listingCluster = clusterIdFor(listingTown)
  const queryCluster = clusterIdFor(queryTown)
  return Boolean(listingCluster && queryCluster && listingCluster === queryCluster)
}

export function suggestTowns(queryTown: string): string[] {
  const cluster = clusterIdFor(queryTown)
  if (cluster) {
    return SYNONYM_CLUSTERS[cluster].slice(0, 3)
  }
  const division = DIVISIONS.find((item) => fold(item) === fold(queryTown))
  if (division) return DIVISION_TOWNS[division].slice(0, 4)
  return []
}
