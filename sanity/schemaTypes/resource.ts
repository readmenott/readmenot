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
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
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
    }),

    // --- ADDED: OVERVIEW SECTION ---
    defineField({
      name: 'description',
      title: 'Overview Content (Section 00)',
      description: 'The introduction text that appears in the first tab.',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
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
            },
            {
              name: 'contentBlocks',
              title: 'Section Content',
              type: 'array',
              of: [
                { type: 'block' }, 
                // ENHANCED IMAGE: Control alignment and size
                {
                  type: 'image',
                  title: 'Professional Image',
                  options: { hotspot: true },
                  fields: [
                    { name: 'caption', type: 'string', title: 'Caption' },
                    { 
                      name: 'layout', 
                      type: 'string', 
                      title: 'Layout Style',
                      initialValue: 'full',
                      options: {
                        list: [
                          { title: 'Full Width', value: 'full' },
                          { title: 'Center (Standard)', value: 'center' },
                          { title: 'Float Left', value: 'left' },
                        ]
                      }
                    }
                  ]
                },
                // ENHANCED PDF: Better labels
                {
                  name: 'fileDownload',
                  type: 'object',
                  title: 'PDF Download',
                  fields: [
                    { name: 'title', type: 'string', title: 'File Label (e.g. Math Practice Pack)' },
                    { 
                      name: 'file', 
                      type: 'file', 
                      title: 'Upload PDF',
                      options: { accept: '.pdf' }
                    }
                  ]
                },
                // ADDED: EXTERNAL LINKS
                {
                  name: 'externalLink',
                  type: 'object',
                  title: 'External Link',
                  fields: [
                    { name: 'label', type: 'string', title: 'Link Text (e.g. Visit CollegeBoard)' },
                    { name: 'url', type: 'url', title: 'URL' }
                  ]
                }
              ],
            },
          ]
        }
      ]
    }),

    defineField({
      name: 'subCategories',
      title: 'Search Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})