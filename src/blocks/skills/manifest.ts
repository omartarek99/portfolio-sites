import { loc, type Localized } from '@/schemas/fields'
import { defineManifest } from '../types'
import { skillsSchema, type SkillItem, type SkillsContent } from './schema'

const DESIGN = loc('Design', 'التصميم')
const TOOLS = loc('Tools', 'الأدوات')
const LANGUAGES = loc('Languages', 'اللغات')

const skill = (id: string, name: Localized, level: number, icon: string, group: Localized): SkillItem => ({ id, name, level, icon, group })

export const manifest = defineManifest<SkillsContent>({
  type: 'skills',
  name: loc('Skills', 'المهارات'),
  description: loc('What you are good at, with an optional level for each skill.', 'ما تتقنه، مع مستوى اختياري لكل مهارة.'),
  icon: 'zap',
  category: 'about',
  variants: [
    {
      id: 'tags',
      name: loc('Tags', 'وسوم'),
      description: loc('A cloud of pills, optionally grouped.', 'مجموعة من الوسوم، مع إمكانية تقسيمها إلى فئات.'),
      tier: 'free',
    },
    {
      id: 'bars',
      name: loc('Bars', 'أشرطة'),
      description: loc('A labelled proficiency bar for each skill.', 'شريط يوضّح مستوى الإتقان لكل مهارة.'),
      tier: 'free',
    },
    {
      id: 'icon-grid',
      name: loc('Icon grid', 'شبكة أيقونات'),
      description: loc('An icon and a label for each skill.', 'أيقونة وتسمية لكل مهارة.'),
      tier: 'free',
    },
    {
      id: 'radial',
      name: loc('Radial', 'دوائر'),
      description: loc('A circular dial for each skill.', 'مؤشر دائري لكل مهارة.'),
      tier: 'free',
    },
  ],
  schema: skillsSchema,
  defaultContent: {
    eyebrow: loc('Skills', 'المهارات'),
    heading: loc('What I bring to a project', 'ما أضيفه إلى كل مشروع'),
    intro: loc('The craft, the tools and the languages I work in.', 'الحِرفة والأدوات واللغات التي أعمل بها.'),
    items: [
      skill('s1', loc('Brand identity', 'الهوية البصرية'), 5, 'palette', DESIGN),
      skill('s2', loc('Art direction', 'الإخراج الفني'), 4, 'compass', DESIGN),
      skill('s3', loc('Arabic typography', 'الخطوط العربية'), 5, 'pen-tool', DESIGN),
      skill('s4', loc('Packaging', 'تصميم العبوات'), 3, 'gift', DESIGN),
      skill('s5', loc('Figma', 'Figma'), 5, 'layout-grid', TOOLS),
      skill('s6', loc('Illustrator', 'Illustrator'), 5, 'brush', TOOLS),
      skill('s7', loc('After Effects', 'After Effects'), 3, 'film', TOOLS),
      skill('s8', loc('Webflow', 'Webflow'), 2, 'monitor', TOOLS),
      skill('s9', loc('Arabic', 'العربية'), 5, 'languages', LANGUAGES),
      skill('s10', loc('English', 'الإنجليزية'), 4, 'globe', LANGUAGES),
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Skills', 'المهارات'),
      itemLabel: loc('Skill', 'مهارة'),
      titlePath: 'name',
      fields: [
        { kind: 'text', path: 'name', label: loc('Name', 'الاسم') },
        {
          kind: 'number',
          path: 'level',
          label: loc('Level (1–5)', 'المستوى (1–5)'),
          help: loc('Optional. Leave empty to show the skill without a level.', 'اختياري. اتركه فارغًا لعرض المهارة دون مستوى.'),
          min: 1,
          max: 5,
          step: 1,
        },
        { kind: 'icon', path: 'icon', label: loc('Icon', 'الأيقونة') },
        {
          kind: 'text',
          path: 'group',
          label: loc('Group', 'الفئة'),
          help: loc('Skills with the same group name are shown together.', 'تُعرض المهارات التي تحمل اسم الفئة نفسه معًا.'),
        },
      ],
      defaultItem: { name: loc('New skill', 'مهارة جديدة') },
    },
  ],
})
