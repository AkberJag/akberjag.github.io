import { createRouter, createWebHistory } from 'vue-router'
import i18n, { SUPPORTED_LOCALES } from '@/i18n'
import productRoutes from '@/features/products/product-routes'

// Helper function for language validation
const isValidLocale = lang => SUPPORTED_LOCALES.includes(lang)

// Extract language detection logic to a reusable function
const detectLanguage = (urlLang, storedLang, browserLang) => {
  const defaultLang = 'en'
  const detectedLangs = [urlLang, storedLang, browserLang]

  for (const lang of detectedLangs) {
    if (isValidLocale(lang)) {
      return lang
    }
  }

  return defaultLang
}

// Create a function to normalize paths
const normalizePath = path => {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}

const routes = [
  {
    path: '/:lang([a-z]{2})?', // Only match 2-letter language codes
    children: [
      {
        path: ':section?',
        name: 'portfolio-section',
        component: () => import('@/views/PortfolioView.vue'),
      },
      ...productRoutes,
    ],
  },
  // Fallback route for invalid paths
  {
    path: '/:pathMatch(.*)*',
    redirect: to => {
      // Handle pathMatch as either string or array
      const pathSegment = Array.isArray(to.params.pathMatch)
        ? to.params.pathMatch[0]
        : to.params.pathMatch?.split('/')[0]
      const lang = isValidLocale(pathSegment) ? pathSegment : 'en'
      return `/${lang}`
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  },
})

// Add error tracking
const trackRouteError = (error, route) => {
  console.error(`Route error (${route.fullPath}):`, error)
  // You could add more sophisticated error tracking here
}

router.beforeEach(async (to, from, next) => {
  try {
    const urlLang = to.params.lang
    const storedLang = localStorage.getItem('preferredLocale')
    const browserLang = navigator.language?.split('-')[0]

    // 1. Determine target language with fallback
    const targetLang = detectLanguage(urlLang, storedLang, browserLang)

    // 2. Check if redirect is needed
    const needsRedirect =
      // Case 1: Invalid language in URL
      (urlLang && !isValidLocale(urlLang)) ||
      // Case 2: Language mismatch (non-default language should be in URL)
      (targetLang !== 'en' && urlLang !== targetLang) ||
      // Case 3: English with lang prefix (if you want to keep English URLs clean)
      (targetLang === 'en' && urlLang !== undefined)

    if (needsRedirect) {
      // Clean path from any language prefix
      const basePath = to.fullPath
        .replace(/^\/[a-z]{2}(\/|$)/, '/') // Remove valid lang prefix (only 2 letters)
        .replace(/^\/\//, '/') // Fix double slashes

      // Build new path based on target language
      let newPath = targetLang === 'en' ? basePath : `/${targetLang}${basePath}`
      newPath = normalizePath(newPath)

      // Normalize paths to prevent redirect loops
      const currentPathNormalized = normalizePath(to.path)
      const newPathNormalized = normalizePath(newPath.split('#')[0])

      if (newPathNormalized !== currentPathNormalized) {
        return next({
          path: newPath.split('#')[0],
          query: to.query,
          hash: to.hash,
          replace: true,
        })
      }
    }

    // 3. Update application state
    if (i18n.global.locale.value !== targetLang) {
      i18n.global.locale.value = targetLang
    }

    if (localStorage.getItem('preferredLocale') !== targetLang) {
      localStorage.setItem('preferredLocale', targetLang)
    }

    // 4. Load dynamic components with proper error handling
    await Promise.all(
      to.matched.map(record => {
        const component = record.components?.default
        if (typeof component === 'function') {
          return component().catch(error => {
            trackRouteError(error, to)
            throw error
          })
        }
        return Promise.resolve()
      }),
    )

    next()
  } catch (error) {
    trackRouteError(error, to)
    next({ name: 'error', query: { from: to.fullPath } }) // Redirect to error page
  }
})

export default router
