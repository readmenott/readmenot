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
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'string',
      description: 'The main tab (e.g., SAT, IELTS, Extracurriculars)',
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'string',
      description: 'The label on the card (e.g., Major Related, Research, Reading)',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' } 
      ],
    }),
    defineField({
      name: 'fileUpload',
      title: 'PDF Upload',
      type: 'file',
    }),
  ],
})