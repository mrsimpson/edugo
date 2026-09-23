import { defineConfig, presetWind4 } from 'unocss'
import presetTypography from '@unocss/preset-typography'

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography(),
  ],
})
