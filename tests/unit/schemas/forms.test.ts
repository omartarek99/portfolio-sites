import { describe, expect, it } from 'vitest'
import {
  defaultContactForm,
  formDefinitionSchema,
  FORM_FIELD_TYPES,
  MAX_FORM_FIELDS,
  submissionSchemaFor,
  type FormField,
  type FormFieldType,
} from '@/schemas/forms'

function field(type: FormFieldType, overrides: Partial<FormField> = {}): FormField {
  return {
    id: type,
    type,
    label: { en: type, ar: type },
    required: false,
    ...overrides,
  }
}

const schemaFor = (fields: FormField[]) => submissionSchemaFor({ fields })

describe('defaultContactForm', () => {
  it('is a valid form definition with bilingual labels', () => {
    const form = defaultContactForm()
    expect(formDefinitionSchema.safeParse(form).success).toBe(true)
    for (const f of form.fields) {
      expect(f.label.en).toBeTruthy()
      expect(f.label.ar).toBeTruthy()
    }
  })

  it('validates a realistic submission and rejects a bad email', () => {
    const schema = submissionSchemaFor(defaultContactForm())
    expect(
      schema.safeParse({ name: 'Layla Haddad', email: 'layla@example.com', message: 'Hello' }).success,
    ).toBe(true)
    expect(schema.safeParse({ name: 'Layla', email: 'not-an-email', message: 'Hello' }).success).toBe(false)
    expect(schema.safeParse({ name: '', email: 'layla@example.com', message: 'Hello' }).success).toBe(false)
  })
})

describe('formDefinitionSchema', () => {
  it('needs at least one field and caps the count', () => {
    const settings = defaultContactForm().settings
    expect(formDefinitionSchema.safeParse({ name: 'Empty', fields: [], settings }).success).toBe(false)
    const many = Array.from({ length: MAX_FORM_FIELDS + 1 }, (_, i) => field('text', { id: `f${i}` }))
    expect(formDefinitionSchema.safeParse({ name: 'Too many', fields: many, settings }).success).toBe(false)
  })
})

describe('submissionSchemaFor — every field type', () => {
  it('covers every type in FORM_FIELD_TYPES', () => {
    const fields = FORM_FIELD_TYPES.map((type) =>
      field(type, { options: [{ value: 'a', label: { en: 'A' } }] }),
    )
    // Builds a schema for all of them without throwing.
    expect(() => schemaFor(fields)).not.toThrow()
  })

  it('text: any string when optional, non-empty when required', () => {
    expect(schemaFor([field('text')]).safeParse({ text: '' }).success).toBe(true)
    expect(schemaFor([field('text')]).safeParse({}).success).toBe(true)
    expect(schemaFor([field('text', { required: true })]).safeParse({ text: '' }).success).toBe(false)
    expect(schemaFor([field('text', { required: true })]).safeParse({}).success).toBe(false)
    expect(schemaFor([field('text', { required: true })]).safeParse({ text: 'Layla' }).success).toBe(true)
    expect(schemaFor([field('text')]).safeParse({ text: 'a'.repeat(501) }).success).toBe(false)
  })

  it('textarea: long text allowed, required means non-empty', () => {
    expect(schemaFor([field('textarea')]).safeParse({ textarea: 'a'.repeat(5000) }).success).toBe(true)
    expect(schemaFor([field('textarea')]).safeParse({ textarea: 'a'.repeat(5001) }).success).toBe(false)
    expect(schemaFor([field('textarea', { required: true })]).safeParse({ textarea: '' }).success).toBe(false)
  })

  it('email: must look like an email; optional allows empty', () => {
    const required = schemaFor([field('email', { required: true })])
    expect(required.safeParse({ email: 'layla@example.com' }).success).toBe(true)
    expect(required.safeParse({ email: 'layla@' }).success).toBe(false)
    expect(required.safeParse({ email: '' }).success).toBe(false)
    expect(required.safeParse({}).success).toBe(false)

    const optional = schemaFor([field('email')])
    expect(optional.safeParse({ email: '' }).success).toBe(true)
    expect(optional.safeParse({}).success).toBe(true)
    expect(optional.safeParse({ email: 'nope' }).success).toBe(false)
  })

  it('phone: international formats accepted, letters rejected', () => {
    const required = schemaFor([field('phone', { required: true })])
    for (const value of ['+962 79 123 4567', '0791234567', '+1 (555) 010-9999', '079-123.456']) {
      expect(required.safeParse({ phone: value }).success).toBe(true)
    }
    for (const value of ['123', 'call me', '', '+962 79 abc 4567']) {
      expect(required.safeParse({ phone: value }).success).toBe(false)
    }
  })

  it('checkbox: required must be true, optional accepts either', () => {
    const required = schemaFor([field('checkbox', { required: true })])
    expect(required.safeParse({ checkbox: true }).success).toBe(true)
    expect(required.safeParse({ checkbox: false }).success).toBe(false)
    expect(required.safeParse({}).success).toBe(false)

    const optional = schemaFor([field('checkbox')])
    expect(optional.safeParse({ checkbox: false }).success).toBe(true)
    expect(optional.safeParse({ checkbox: true }).success).toBe(true)
    expect(optional.safeParse({ checkbox: 'yes' }).success).toBe(false)
  })

  it('date: ISO yyyy-mm-dd only', () => {
    const required = schemaFor([field('date', { required: true })])
    expect(required.safeParse({ date: '2026-03-01' }).success).toBe(true)
    expect(required.safeParse({ date: '01/03/2026' }).success).toBe(false)
    expect(required.safeParse({ date: '' }).success).toBe(false)

    const optional = schemaFor([field('date')])
    expect(optional.safeParse({ date: '' }).success).toBe(true)
    expect(optional.safeParse({ date: 'tomorrow' }).success).toBe(false)
  })

  it.each(['select', 'radio', 'budget'] as const)('%s: only declared option values are accepted', (type) => {
    const options = [
      { value: 'small', label: { en: 'Under $1k', ar: 'أقل من 1000$' } },
      { value: 'large', label: { en: 'Over $5k', ar: 'أكثر من 5000$' } },
    ]
    const required = schemaFor([field(type, { required: true, options })])
    expect(required.safeParse({ [type]: 'small' }).success).toBe(true)
    expect(required.safeParse({ [type]: 'medium' }).success).toBe(false)
    expect(required.safeParse({ [type]: '' }).success).toBe(false)

    const optional = schemaFor([field(type, { options })])
    expect(optional.safeParse({ [type]: '' }).success).toBe(true)
    expect(optional.safeParse({ [type]: 'large' }).success).toBe(true)
    expect(optional.safeParse({ [type]: 'medium' }).success).toBe(false)
  })

  it('select without options falls back to a bounded string', () => {
    const schema = schemaFor([field('select', { required: true })])
    expect(schema.safeParse({ select: 'anything' }).success).toBe(true)
    expect(schema.safeParse({ select: 'a'.repeat(201) }).success).toBe(false)
  })

  it('file: expects the reference the upload endpoint returns', () => {
    const required = schemaFor([field('file', { required: true })])
    expect(
      required.safeParse({ file: { url: '/api/media/abc.pdf', name: 'cv.pdf', bytes: 1024 } }).success,
    ).toBe(true)
    expect(required.safeParse({ file: '/api/media/abc.pdf' }).success).toBe(false)
    expect(required.safeParse({ file: { url: '/a.pdf', name: 'a.pdf', bytes: -1 } }).success).toBe(false)
    expect(required.safeParse({}).success).toBe(false)
  })

  it('unknown keys in a submission are ignored, so spam fields cannot widen the schema', () => {
    const schema = schemaFor([field('text', { required: true })])
    const parsed = schema.safeParse({ text: 'Layla', injected: '<script>' })
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data).toEqual({ text: 'Layla' })
  })

  it('validates every field of a multi-field form together', () => {
    const schema = schemaFor([
      field('text', { id: 'name', required: true }),
      field('email', { id: 'email', required: true }),
      field('select', {
        id: 'budget',
        required: true,
        options: [{ value: 'small', label: { en: 'Small' } }],
      }),
      field('checkbox', { id: 'consent', required: true }),
    ])
    expect(
      schema.safeParse({ name: 'Layla', email: 'layla@example.com', budget: 'small', consent: true }).success,
    ).toBe(true)
    expect(
      schema.safeParse({ name: 'Layla', email: 'layla@example.com', budget: 'small', consent: false })
        .success,
    ).toBe(false)
  })
})
