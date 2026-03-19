import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Study Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'string',
      options: {
        list: [
          { title: 'SAT', value: 'SAT' },
          { title: 'IELTS', value: 'IELTS' },
          { title: 'Extracurriculars', value: 'Extracurriculars' },
          { title: 'General', value: 'General' },
        ],
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'description',
      title: 'Overview Content (Section 00)',
      description: 'The introduction text that appears in the first tab.',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'sections',
      title: 'Resource Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Sub-Section',
          fields: [
            {
              name: 'subCategoryName',
              title: 'Sub-Category Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'contentBlocks',
              title: 'Section Content',
              description: 'Add bullet lists, roadmaps, text, images, and links here',
              type: 'blockContent',
              validation: Rule => Rule.required()
            },
          ],
          preview: {
            select: {
              title: 'subCategoryName',
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled Section',
                subtitle: 'Section Content',
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),

    defineField({
      name: 'subCategories',
      title: 'Search Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Add tags like "Reading", "Listening", "Math" for better search'
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      slug: 'slug.current',
    },
    prepare({ title, category, slug }) {
      return {
        title: title,
        subtitle: `${category} • /${slug}`,
      }
    }
  }
})