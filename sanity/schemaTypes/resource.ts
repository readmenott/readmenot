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

    // FIXED: Linking to 'blockContent' preserves your text and fixes image previews
    defineField({
      name: 'description',
      title: 'Overview Content (Section 00)',
      description: 'The introduction text that appears in the first tab.',
      type: 'blockContent', 
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
              type: 'blockContent', // Centralized type for stability
            },
            // Specific utility fields for file downloads
            {
              name: 'fileDownload',
              type: 'object',
              title: 'PDF Download',
              fields: [
                { name: 'title', type: 'string', title: 'File Label' },
                { 
                  name: 'file', 
                  type: 'file', 
                  title: 'Upload PDF',
                  options: { accept: '.pdf' }
                }
              ]
            },
            // External links preserved
            {
              name: 'externalLink',
              type: 'object',
              title: 'External Link',
              fields: [
                { name: 'label', type: 'string', title: 'Link Text' },
                { name: 'url', type: 'url', title: 'URL' }
              ]
            }
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