import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, DownloadIcon, MasterDetailIcon} from '@sanity/icons'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet (Boxed Square)', value: 'bullet'}, 
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true 
              }
            ],
          },
        ],
      },
    }),

    // ADDITION: THE ROADMAP OBJECT (Matches Image 3)
    defineArrayMember({
      name: 'roadmap',
      type: 'object',
      title: 'Roadmap Timeline',
      icon: MasterDetailIcon,
      fields: [
        {
          name: 'steps',
          type: 'array',
          title: 'Roadmap Steps',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'year', type: 'string', title: 'Year/Grade (e.g. 10th Grade)' },
                { name: 'title', type: 'string', title: 'Step Title (e.g. Testing)' },
                { 
                  name: 'tasks', 
                  type: 'array', 
                  title: 'Tasks', 
                  of: [{ type: 'string' }] 
                }
              ]
            }
          ]
        }
      ]
    }),

    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        { name: 'caption', type: 'string', title: 'Caption' },
        { name: 'alt', type: 'string', title: 'Alternative Text' },
        {
          name: 'size',
          type: 'string',
          title: 'Display Size',
          options: {
            list: [
              {title: 'Standard (Centered)', value: 'center'},
              {title: 'Full Bleed (Wide)', value: 'full'},
              {title: 'Compact (Small)', value: 'small'},
            ],
          },
          initialValue: 'center',
        },
      ],
    }),

    defineArrayMember({
      name: 'fileDownload',
      type: 'object',
      title: 'File Download',
      icon: DownloadIcon,
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Download Title',
          placeholder: 'e.g., IELTS Practice Test PDF'
        },
        {
          name: 'file',
          type: 'file',
          title: 'Upload File',
          options: {
            accept: '.pdf,.doc,.docx,.zip'
          }
        }
      ]
    }),
  ],
})