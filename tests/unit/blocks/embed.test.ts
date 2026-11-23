import { describe, expect, it } from 'vitest'
import { hasScriptTag, matchEmbed, providerOf } from '@/blocks/embed/allow-list'

const src = (input: string) => {
  const m = matchEmbed(input)
  return m.ok ? m.src : `ERR:${m.error}`
}

describe('embed allow-list', () => {
  it('accepts every allowed service and builds a canonical https embed URL', () => {
    expect(src('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&start=42')
    expect(src('youtu.be/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0')
    expect(src('https://m.youtube.com/shorts/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0')
    expect(src('https://vimeo.com/76979871')).toBe('https://player.vimeo.com/video/76979871?dnt=1')
    expect(src('https://vimeo.com/76979871/abc123')).toBe('https://player.vimeo.com/video/76979871?dnt=1&h=abc123')
    expect(src('https://open.spotify.com/intl-ar/track/4uLU6hMCjMI75M1A2tKUQC?si=x')).toBe('https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC')
    expect(src('https://soundcloud.com/studio-noor/night-drive')).toBe(
      'https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fstudio-noor%2Fnight-drive&visual=false&show_comments=false',
    )
    expect(src('https://www.google.com/maps/place/Alserkal+Avenue/@25.14,55.22,17z')).toBe('https://www.google.com/maps?q=Alserkal%20Avenue&output=embed')
    expect(src('https://maps.google.com/?q=25.14,55.22')).toBe('https://www.google.com/maps?q=25.14%2C55.22&output=embed')
    expect(src('https://calendly.com/rania-studio/30min?month=2025-03')).toBe('https://calendly.com/rania-studio/30min?hide_gdpr_banner=1')
    expect(src('https://www.figma.com/design/AbCdEf1234567890/Tutorly-app')).toBe(
      'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FAbCdEf1234567890%2FTutorly-app',
    )
    expect(src('https://www.behance.net/gallery/123456/Brand-identity')).toBe('https://www.behance.net/embed/project/123456?ilo0=1')
    expect(src('https://dribbble.com/shots/9876543-Coffee-app')).toBe('https://dribbble.com/shots/9876543/embed')
    const gist = matchEmbed('https://gist.github.com/noura-dev/0a1b2c3d4e5f')
    expect(gist.ok && gist.srcDoc).toContain('<script src="https://gist.github.com/noura-dev/0a1b2c3d4e5f.js">')
  })

  it('upgrades http and gives players a natural size', () => {
    expect(src('http://www.youtube.com/watch?v=dQw4w9WgXcQ')).toMatch(/^https:\/\//)
    const track = matchEmbed('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC')
    expect(track.ok && track.height).toBe(152)
    const video = matchEmbed('https://youtu.be/dQw4w9WgXcQ')
    expect(video.ok && video.ratio).toBe('16/9')
  })

  it('parses pasted iframe and widget snippets', () => {
    expect(src('<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=abc" title="YouTube" allowfullscreen></iframe>')).toBe(
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    )
    expect(src('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12&amp;x=1" width="600"></iframe>')).toBe(
      'https://www.google.com/maps/embed?pb=!1m18!1m12',
    )
    expect(src("<iframe src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&color=%23ff5500'></iframe>")).toBe(
      'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293&visual=false&show_comments=false',
    )
    expect(src('<div class="calendly-inline-widget" data-url="https://calendly.com/rania-studio" style="height:700px"></div><script src="https://assets.calendly.com/widget.js"></script>')).toBe(
      'https://calendly.com/rania-studio?hide_gdpr_banner=1',
    )
    expect(src('<script src="https://gist.github.com/noura-dev/0a1b2c3d4e5f.js"></script>')).toBe('https://gist.github.com/noura-dev/0a1b2c3d4e5f')
    expect(src('<iframe src="https://player.vimeo.com/video/76979871?h=abc123&badge=0"></iframe>')).toBe('https://player.vimeo.com/video/76979871?dnt=1&h=abc123')
  })

  it('rejects hosts that are not on the list, including look-alikes', () => {
    for (const bad of [
      'https://example.com/video',
      'https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ',
      'https://evilyoutube.com/watch?v=dQw4w9WgXcQ',
      'https://docs.google.com/maps?q=x',
      'https://github.com/noura-dev/repo',
      '<iframe src="https://evil.example/embed"></iframe>',
    ]) {
      expect(matchEmbed(bad)).toMatchObject({ ok: false, error: 'host' })
    }
    expect(providerOf('player.vimeo.com')).toBe('vimeo')
    expect(providerOf('notvimeo.com')).toBeUndefined()
  })

  it('reports empty, invalid and unsupported input', () => {
    expect(matchEmbed('  ')).toEqual({ ok: false, error: 'empty' })
    expect(matchEmbed(undefined)).toEqual({ ok: false, error: 'empty' })
    expect(matchEmbed('<p>hello</p>')).toEqual({ ok: false, error: 'invalid' })
    expect(matchEmbed('https://www.youtube.com/feed/trending')).toEqual({ ok: false, error: 'unsupported', provider: 'youtube' })
    expect(matchEmbed('https://user:pw@www.youtube.com/watch?v=dQw4w9WgXcQ')).toEqual({ ok: false, error: 'invalid' })
  })

  it('never lets javascript: or data: through', () => {
    const attacks = [
      'javascript:alert(1)',
      'JaVaScRiPt:alert(document.cookie)',
      ' java\tscript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<iframe src="data:text/html;base64,PHNjcmlwdD4="></iframe>',
      '<iframe src="javascript&colon;alert(1)"></iframe>',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ"><script>alert(1)</script>',
      'https://w.soundcloud.com/player/?url=javascript:alert(1)',
      'https://www.figma.com/embed?url=javascript:alert(1)',
    ]
    for (const attack of attacks) {
      const m = matchEmbed(attack)
      if (m.ok) {
        expect(m.src.startsWith('https://')).toBe(true)
        expect(m.src).not.toMatch(/javascript:|data:|<|>|"/i)
      } else {
        expect(['invalid', 'host', 'unsupported']).toContain(m.error)
      }
    }
  })

  it('detects script tags in HTML snippets', () => {
    expect(hasScriptTag('<p>ok</p>')).toBe(false)
    expect(hasScriptTag('<SCRIPT>alert(1)</SCRIPT>')).toBe(true)
    expect(hasScriptTag('< script src=x>')).toBe(true)
    expect(hasScriptTag('<p>hi</p></script >')).toBe(true)
  })
})
