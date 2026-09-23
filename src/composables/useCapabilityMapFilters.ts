/**
 * useCapabilityMapFilters — manages filter state via URL query params.
 *
 * Filter dimensions:
 * - kmk: multi-value array of KMK domain slugs
 * - gap: boolean — when true, show only nodes with status needed/partial
 *
 * Design principles:
 * - KD-20: All filter state in URL query params (bookmarkable, shareable)
 * - 3.3: Filter composable reads from and writes to the URL, not component state
 */
import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { CapabilityNodeWithBody } from './useCapabilityNodes.js'
import type { KmkDomainValue } from '../../schemas/capability-node.js'

export interface CapabilityMapFilters {
  kmk: KmkDomainValue[]
  gap: boolean
}

export function useCapabilityMapFilters(nodes: Readonly<ComputedRef<CapabilityNodeWithBody[]> | { value: CapabilityNodeWithBody[] }>) {
  const route = useRoute()
  const router = useRouter()

  const filters = computed<CapabilityMapFilters>(() => {
    const kmkParam = route.query.kmk
    const kmk = Array.isArray(kmkParam)
      ? (kmkParam.filter(Boolean) as KmkDomainValue[])
      : kmkParam
        ? ([kmkParam] as KmkDomainValue[])
        : []
    const gap = route.query.gap === 'true'
    return { kmk, gap }
  })

  const filteredNodes = computed<CapabilityNodeWithBody[]>(() => {
    let result = nodes.value
    const { kmk, gap } = filters.value

    if (gap) {
      result = result.filter(n => n.status === 'needed' || n.status === 'partial')
    }

    if (kmk.length > 0) {
      result = result.filter(n =>
        n['kmk-domains']?.some(d => kmk.includes(d as KmkDomainValue)),
      )
    }

    return result
  })

  function setKmk(domains: KmkDomainValue[]) {
    router.push({
      query: {
        ...route.query,
        kmk: domains.length > 0 ? domains : undefined,
      },
    })
  }

  function toggleKmk(domain: KmkDomainValue) {
    const current = filters.value.kmk
    const next = current.includes(domain)
      ? current.filter(d => d !== domain)
      : [...current, domain]
    setKmk(next)
  }

  function setGap(value: boolean) {
    router.push({
      query: {
        ...route.query,
        gap: value ? 'true' : undefined,
      },
    })
  }

  function resetFilters() {
    router.push({ query: {} })
  }

  return {
    filters,
    filteredNodes,
    setKmk,
    toggleKmk,
    setGap,
    resetFilters,
  }
}
