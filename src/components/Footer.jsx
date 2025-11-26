import { useEffect, useState, useRef } from 'react'

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/30 text-white hover:bg-white/15 transition-colors"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true)
            } else {
              setVisible(false)
            }
          })
        },
        { threshold: 0.05 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }

    function checkBottom() {
      const scrollPos = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      if (scrollPos >= docHeight - 80) setVisible(true)
    }
    checkBottom()
    window.addEventListener('scroll', checkBottom)
    window.addEventListener('resize', checkBottom)
    return () => {
      window.removeEventListener('scroll', checkBottom)
      window.removeEventListener('resize', checkBottom)
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`mt-10 text-white bg-gradient-to-r from-[#0b3d91] to-[#0e56bd] rounded-t-xl overflow-hidden relative ${visible ? 'footer-reveal' : 'footer-pre'} `}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wide text-xs font-semibold">Acompanhe:</span>
            <div className="flex items-center gap-2">
              <SocialIcon href="#" label="LinkedIn">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.62-1.18 2.14-2.42 4.41-2.42 4.72 0 5.6 3.11 5.6 7.15V24h-5v-7.1c0-1.69-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V24H7.5V8z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                  <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.325 24h11.5v-9.294H9.69V11.01h3.135V8.41c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.765v2.31h3.587l-.467 3.695h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="X">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                  <path d="M18.244 2H21l-6.52 7.457L22 22h-6.828l-5.34-7.062L3.6 22H1l7.033-8.043L2 2h6.914l4.83 6.437L18.244 2zm-2.388 18h1.764L8.22 4H6.36l9.496 16z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                  <path d="M23.498 6.186a2.995 2.995 0 0 0-2.111-2.121C19.373 3.5 12 3.5 12 3.5s-7.373 0-9.387.565A2.995 2.995 0 0 0 .502 6.186C0 8.22 0 12 0 12s0 3.78.502 5.814a2.995 2.995 0 0 0 2.111 2.121C4.627 20.5 12 20.5 12 20.5s7.373 0 9.387-.565a2.995 2.995 0 0 0 2.111-2.121C24 15.78 24 12 24 12s0-3.78-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.153 1.78c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.153c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.153-1.78c-.163-.457-.347-1.257-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 0 1 1.153-1.78 4.92 4.92 0 0 1 1.78-1.153c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.16 0-3.532.012-4.777.069-1.027.047-1.584.216-1.957.36-.492.19-.844.417-1.214.787-.37.37-.597.722-.787 1.214-.144.373-.313.93-.36 1.957-.057 1.245-.069 1.617-.069 4.777s.012 3.532.069 4.777c.047 1.027.216 1.584.36 1.957.19.492.417.844.787 1.214.37.37.722.597 1.214.787.373.144.93.313 1.957.36 1.245.057 1.617.069 4.777.069s3.532-.012 4.777-.069c1.027-.047 1.584-.216 1.957-.36.492-.19.844-.417 1.214-.787.37-.37.597-.722.787-1.214.144-.373.313-.93.36-1.957.057-1.245.069-1.617.069-4.777s-.012-3.532-.069-4.777c-.047-1.027-.216-1.584-.36-1.957a3.083 3.083 0 0 0-.787-1.214 3.083 3.083 0 0 0-1.214-.787c-.373-.144-.93-.313-1.957-.36-1.245-.057-1.617-.069-4.777-.069zm0 3.5a4.5 4.5 0 1 1 0 9.001 4.5 4.5 0 0 1 0-9zM18.406 5.594a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="TikTok">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
                  <path d="M16.5 3.5c.96 1.23 2.234 2.12 3.75 2.46V9c-1.93-.06-3.69-.77-5.1-1.93v6.91c0 3.41-2.77 6.18-6.18 6.18S2.79 17.39 2.79 13.98c0-3.41 2.77-6.18 6.18-6.18.44 0 .87.05 1.28.15v3.33a3.34 3.34 0 0 0-1.28-.26 2.85 2.85 0 1 0 2.85 2.85V2h4.68v1.5z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="opacity-90 text-xs text-right leading-tight">
            <div>Projeto ContraGolpe</div>
            <div>Brasil • Segurança e Educação Digital</div>
          </div>
        </div>

        <div className="mt-3 border-t border-white/20 pt-3 text-[10px] md:text-xs">
          <nav className="flex items-center justify-center gap-x-3 text-white/80">
            <a href="#" className="hover:underline">Sobre</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Preferências de Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

