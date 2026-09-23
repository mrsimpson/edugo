<!--
  LandingView — product landing page at route /.

  Narrative arc (single dark canvas):
    Hero punchline → problem tabs (auto-advance, lock on click) →
    explanatory text → ecosystem conclusion →
    solution tabs (synced persona) → how it works → CTA → footer

  KD-40: pure system-ui sans-serif throughout; no serif, no external fonts
-->
<template>
  <div class="min-h-screen bg-slate-900 text-white" style="font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;">

    <!-- ══════════════════════════════════════════
         HERO — punchline, then problem cards, then explanation
    ══════════════════════════════════════════ -->
    <section class="relative overflow-hidden" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
      <!-- Grid decoration -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 48px 48px;"
        aria-hidden="true"
      />

      <div class="relative max-w-4xl mx-auto px-6 py-20 w-full">

        <!-- Punchline -->
        <h1
          class="font-extrabold leading-none tracking-tight text-white mb-4 whitespace-pre-line"
          style="font-size: clamp(2.75rem, 8vw, 5.5rem);"
        >
          {{ copy.hero.headline }}
        </h1>
        <p class="text-slate-400 mb-12" style="font-size: clamp(1rem, 2vw, 1.25rem);">
          {{ copy.hero.subtitle }}
        </p>

        <!-- Problem tabs — auto-advance, large quote -->
        <div class="mb-12">
          <!-- Tab row -->
          <div class="flex flex-wrap gap-2 mb-6" role="tablist" :aria-label="copy.problems.tabsAriaLabel">
            <button
              v-for="(p, key) in personaMap"
              :key="key"
              role="tab"
              :aria-selected="activePersona === key"
              :aria-controls="`problem-panel-${key}`"
              :id="`problem-tab-${key}`"
              class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border"
              :class="activePersona === key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-blue-500 hover:text-white'"
              @click="selectPersona(key)"
            >
              <span aria-hidden="true">{{ p.problem.icon }}</span>
              {{ p.problem.role }}
            </button>
          </div>

          <!-- Problem card — single large quote -->
          <transition name="slide" mode="out-in">
            <div
              :key="activePersona"
              :id="`problem-panel-${activePersona}`"
              role="tabpanel"
              :aria-labelledby="`problem-tab-${activePersona}`"
              class="max-w-2xl"
            >
              <blockquote class="text-slate-200 leading-relaxed" style="font-size: clamp(1.1rem, 2.5vw, 1.375rem);">
                <span class="text-blue-400 text-3xl leading-none select-none mr-1" aria-hidden="true">„</span>
                {{ personaMap[activePersona].problem.quote }}
                <span class="text-blue-400 text-3xl leading-none select-none mr-1" aria-hidden="true">“</span>
              </blockquote>
            </div>
          </transition>

          <!-- Progress bar — below the quote, hidden once locked -->
          <div
            v-if="!personaLocked"
            class="h-px bg-slate-700 rounded-full mt-8 overflow-hidden max-w-xs"
            aria-hidden="true"
          >
            <div
              class="h-full bg-blue-500 rounded-full"
              :style="{ width: `${progressPct}%`, transition: progressPct === 0 ? 'none' : `width ${TICK_MS}ms linear` }"
            />
          </div>
          <div v-else class="mt-8" />
        </div>

        <!-- Scroll cue -->
        <div class="text-slate-600 text-sm flex items-center gap-2">
          <span class="animate-bounce inline-block" aria-hidden="true">↓</span>
          <span>{{ copy.problems.scrollCue }}</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         ECOSYSTEM CONCLUSION
    ══════════════════════════════════════════ -->
    <section class="bg-slate-800 py-16 sm:py-20" aria-labelledby="ecosystem-heading">
      <div class="max-w-3xl mx-auto px-6">
        <h2
          id="ecosystem-heading"
          class="font-extrabold tracking-tight text-white mb-6 whitespace-pre-line"
          style="font-size: clamp(1.75rem, 4.5vw, 3rem); line-height: 1.15;"
        >
          {{ copy.ecosystemProblem.headline }}
        </h2>

        <!-- Body first — explains what the ecosystem problem actually means -->
        <p class="text-slate-300 leading-relaxed mb-8" style="font-size: 1.0625rem;">
          {{ copy.ecosystemProblem.body }}
        </p>

        <p class="text-slate-300 leading-relaxed" style="font-size: 1.0625rem;">
          {{ copy.ecosystemProblem.bridge }}
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         SOLUTION TABS — persona synced from above
    ══════════════════════════════════════════ -->
    <section class="bg-white py-16 sm:py-20" aria-labelledby="solutions-heading">
      <div class="max-w-4xl mx-auto px-6">

        <!-- Tab row -->
        <div class="flex flex-wrap justify-center gap-2 mb-10" role="tablist" :aria-label="copy.solutions.tabsAriaLabel">
          <button
            v-for="(p, key) in personaMap"
            :key="key"
            role="tab"
            :aria-selected="activePersona === key"
            :aria-controls="`solution-panel-${key}`"
            :id="`solution-tab-${key}`"
            class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border"
            :class="activePersona === key
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'"
            @click="selectPersona(key)"
          >
            <span aria-hidden="true">{{ p.solution.icon }}</span>
            {{ p.solution.role }}
          </button>
        </div>

        <!-- Solution card -->
        <transition name="slide" mode="out-in">
          <div
            :key="activePersona"
            :id="`solution-panel-${activePersona}`"
            role="tabpanel"
            :aria-labelledby="`solution-tab-${activePersona}`"
            class="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-12 max-w-2xl mx-auto"
          >
            <div class="flex items-center gap-4 mb-6">
              <span class="text-4xl" aria-hidden="true">{{ personaMap[activePersona].solution.icon }}</span>
              <div>
                <p class="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {{ personaMap[activePersona].solution.role }}
                </p>
                <h2
                  id="solutions-heading"
                  class="font-bold text-slate-900 leading-snug"
                  style="font-size: clamp(1.125rem, 2.5vw, 1.5rem);"
                >
                  {{ personaMap[activePersona].solution.headline }}
                </h2>
              </div>
            </div>

            <div class="space-y-4">
              <p
                v-for="(paragraph, i) in personaMap[activePersona].solution.story.split('\n\n')"
                :key="i"
                class="text-slate-600 leading-relaxed"
                style="font-size: 1rem;"
              >
                {{ paragraph }}
              </p>
            </div>

            <a
              :href="personaMap[activePersona].solution.ctaHref"
              class="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              {{ personaMap[activePersona].solution.cta }} →
            </a>
          </div>
        </transition>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         HOW IT WORKS
    ══════════════════════════════════════════ -->
    <section class="bg-slate-50 py-16 sm:py-20" aria-labelledby="how-heading">
      <div class="max-w-4xl mx-auto px-6">
        <ol class="grid grid-cols-1 sm:grid-cols-3 gap-10 list-none" role="list">
          <li v-for="step in copy.howItWorks.steps" :key="step.number" class="flex flex-col gap-3">
            <span class="text-6xl font-extrabold text-blue-200 leading-none select-none" aria-hidden="true">
              {{ step.number }}
            </span>
            <h3 class="text-base font-semibold text-slate-900">{{ step.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ step.description }}</p>
          </li>
        </ol>

        <!-- Static capability map mockup -->
        <div class="mt-16" role="img" :aria-label="copy.solutions.mapPreviewAriaLabel">
          <p class="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4 text-center">
            {{ copy.solutions.mapPreviewLabel }}
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            <div
              v-for="mock in mockNodes"
              :key="mock.id"
              class="rounded-xl border p-4 flex flex-col gap-2 select-none"
              :class="mock.statusClass"
            >
              <span
                class="self-start inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="mock.badgeClass"
              >{{ mock.statusLabel }}</span>
              <p class="text-xs font-semibold text-slate-800 leading-snug">{{ mock.title }}</p>
              <p class="text-xs text-slate-500">{{ mock.count }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         FINAL CTA
    ══════════════════════════════════════════ -->
    <section class="py-16 sm:py-20 bg-blue-700 text-white" aria-labelledby="final-cta-heading">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2
          id="final-cta-heading"
          class="font-bold mb-4"
          style="font-size: clamp(1.5rem, 4vw, 2.25rem);"
        >
          {{ copy.cta.title }}
        </h2>
        <p class="text-blue-200 leading-relaxed mb-8">
          {{ copy.cta.description }}
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a
            :href="copy.cta.primaryHref"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            {{ copy.cta.primary }} →
          </a>
          <a
            :href="copy.cta.secondaryHref"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-sm border border-blue-500"
          >
            {{ copy.cta.secondary }}
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         FOOTER
    ══════════════════════════════════════════ -->
    <footer class="bg-slate-900 text-slate-400 py-10">
      <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p class="text-white font-semibold text-sm mb-1">edugo</p>
          <p class="text-xs leading-relaxed max-w-xs">{{ copy.footer.tagline }}</p>
          <p class="text-xs mt-2 text-slate-500">{{ copy.footer.dsgvo }}</p>
        </div>
        <nav aria-label="Footer-Navigation">
          <ul class="flex flex-wrap gap-4 list-none p-0 m-0">
            <li v-for="link in copy.footer.links" :key="link.label">
              <a
                :href="link.href"
                class="text-xs hover:text-white transition-colors"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              >{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { de } from '../i18n/de.js'

const copy = de.landing

// ── Persona state ──────────────────────────────────────────────────────────
type PersonaKey = 'teacher' | 'navigator' | 'builder'
const PERSONA_KEYS: PersonaKey[] = ['teacher', 'navigator', 'builder']

const activePersona = ref<PersonaKey>('teacher')
const personaLocked = ref(false)

function selectPersona(key: PersonaKey) {
  activePersona.value = key
  personaLocked.value = true
  stopAutoAdvance()
}

// ── Auto-advance ───────────────────────────────────────────────────────────
const ADVANCE_MS = 5000
const TICK_MS = 50
const progressPct = ref(0)
let advanceTimer: ReturnType<typeof setTimeout> | null = null
let tickTimer: ReturnType<typeof setInterval> | null = null
let elapsed = 0

function stopAutoAdvance() {
  if (advanceTimer) clearTimeout(advanceTimer)
  if (tickTimer) clearInterval(tickTimer)
  advanceTimer = null
  tickTimer = null
}

function scheduleAdvance() {
  elapsed = 0
  progressPct.value = 0

  tickTimer = setInterval(() => {
    elapsed += TICK_MS
    progressPct.value = Math.min((elapsed / ADVANCE_MS) * 100, 100)
  }, TICK_MS)

  advanceTimer = setTimeout(() => {
    const idx = PERSONA_KEYS.indexOf(activePersona.value)
    activePersona.value = PERSONA_KEYS[(idx + 1) % PERSONA_KEYS.length]
    if (tickTimer) clearInterval(tickTimer)
    scheduleAdvance()
  }, ADVANCE_MS)
}

onMounted(() => { scheduleAdvance() })
onUnmounted(() => { stopAutoAdvance() })

// ── Persona data ───────────────────────────────────────────────────────────
const personaMap = {
  teacher: { problem: copy.problems.teacher, solution: copy.solutions.teacher },
  navigator: { problem: copy.problems.navigator, solution: copy.solutions.navigator },
  builder: { problem: copy.problems.builder, solution: copy.solutions.builder },
} as const

// ── Static capability map mockup ──────────────────────────────────────────
const mockNodes = [
  { id: 'kollaborativ-schreiben', title: 'Kollaborativ schreiben', statusLabel: 'Fehlend', count: 'Noch kein Tool', statusClass: 'bg-red-50 border-red-200', badgeClass: 'bg-red-100 text-red-700' },
  { id: 'daten-visualisieren', title: 'Daten visualisieren', statusLabel: 'Teilweise', count: '1 Tool', statusClass: 'bg-amber-50 border-amber-200', badgeClass: 'bg-amber-100 text-amber-700' },
  { id: 'quellen-bewerten', title: 'Quellen bewerten', statusLabel: 'Fehlend', count: 'Noch kein Tool', statusClass: 'bg-red-50 border-red-200', badgeClass: 'bg-red-100 text-red-700' },
  { id: 'praesentation-erstellen', title: 'Präsentation erstellen', statusLabel: 'Gut abgedeckt', count: '3 Tools', statusClass: 'bg-green-50 border-green-200', badgeClass: 'bg-green-100 text-green-700' },
  { id: 'code-schreiben', title: 'Programmieren lernen', statusLabel: 'Gut abgedeckt', count: '2 Tools', statusClass: 'bg-green-50 border-green-200', badgeClass: 'bg-green-100 text-green-700' },
  { id: 'feedback-geben', title: 'Feedback geben & empfangen', statusLabel: 'Fehlend', count: 'Noch kein Tool', statusClass: 'bg-red-50 border-red-200', badgeClass: 'bg-red-100 text-red-700' },
]
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
