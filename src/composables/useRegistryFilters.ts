/**
 * useRegistryFilters — manages registry filter state via URL query params.
 *
 * Filter dimensions (Phase 1):
 * - dsgvo: multi-value array of DSGVO status values
 * - capability: filter by capability node ID (used when navigating from a node detail)
 *
 * Deferred (use x- fields until graduated):
 * - subjects, min-age/max-age, classroom-moment, active-passive
 *
 * Design principle KD-20: all filter state in URL query params.
 */
import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RegistryEntryWithBody } from './useRegistryEntries.js'
import type { DsgvoStatusValue } from '../../schemas/registry-entry.js'

export interface RegistryFilters {
  dsgvo: DsgvoStatusValue[]
  capability: string | null
}

export function useRegistryFilters(
  entries: Readonly<ComputedRef<RegistryEntryWithBody[]> | { value: RegistryEntryWithBody[] }>,
) {
  const route = useRoute()
  const router = useRouter()

  const filters = computed<RegistryFilters>(() => {
    const dsgvoParam = route.query.dsgvo
    const dsgvo = Array.isArray(dsgvoParam)
      ? (dsgvoParam.filter(Boolean) as DsgvoStatusValue[])
      : dsgvoParam
        ? ([dsgvoParam] as DsgvoStatusValue[])
        : []
    const capability = (route.query.capability as string) || null
    return { dsgvo, capability }
  })

  const filteredEntries = computed<RegistryEntryWithBody[]>(() => {
    let result = entries.value
    const { dsgvo, capability } = filters.value

    if (dsgvo.length > 0) {
      result = result.filter(e => dsgvo.includes((e.dsgvo ?? 'unknown') as DsgvoStatusValue))
    }

    if (capability) {
      result = result.filter(e => e.capabilities.includes(capability))
    }

    return result
  })

  // Count entries per DSGVO status (from unfiltered entries, for filter panel counts)
  const dsgvoCounts = computed(() => {
    const counts: Record<DsgvoStatusValue, number> = {
      'frontend-only': 0,
      'claimed-safe': 0,
      unknown: 0,
    }
    for (const entry of entries.value) {
      const s = (entry.dsgvo ?? 'unknown') as DsgvoStatusValue
      if (s in counts) counts[s]++
    }
    return counts
  })

  function toggleDsgvo(status: DsgvoStatusValue) {
    const current = filters.value.dsgvo
    const next = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status]
    router.push({
      query: {
        ...route.query,
        dsgvo: next.length > 0 ? next : undefined,
      },
    })
  }

  function setCapability(id: string | null) {
    router.push({
      query: {
        ...route.query,
        capability: id ?? undefined,
      },
    })
  }

  function resetFilters() {
    router.push({ query: {} })
  }

  return {
    filters,
    filteredEntries,
    dsgvoCounts,
    toggleDsgvo,
    setCapability,
    resetFilters,
  }
}
