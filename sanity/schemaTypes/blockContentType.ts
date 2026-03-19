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
        {title: 'Bullet', value: 'bullet'}, 
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
          /* TEXT COLOR SUPPORT */
          {
            title: 'Text Color',
            name: 'textColor',
            type: 'object',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    {title: 'Blue', value: 'blue'},
                    {title: 'Red', value: 'red'},
                    {title: 'Green', value: 'green'},
                    {title: 'Yellow', value: 'yellow'},
                    {title: 'Purple', value: 'purple'},
                  ]
                }
              }
            ]
          },
        ],
      },
    }),

    /* ===== PROFESSIONAL BULLET POINT LIST ===== */
    defineArrayMember({
      name: 'bulletList',
      type: 'object',
      title: 'Professional Bullet List',
      fields: [
        {
          name: 'items',
          type: 'array',
          title: 'List Items',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Item Text',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Style',
                  options: {
                    list: [
                      {title: '● Circle', value: 'circle'},
                      {title: '✓ Checkmark', value: 'checkmark'},
                      {title: '→ Arrow', value: 'arrow'},
                      {title: '◆ Diamond', value: 'diamond'},
                      {title: '★ Star', value: 'star'},
                    ]
                  },
                  initialValue: 'circle'
                },
                {
                  name: 'highlight',
                  type: 'boolean',
                  title: 'Highlight this item',
                  initialValue: false
                }
              ],
              preview: {
                select: {
                  title: 'text',
                  icon: 'icon'
                },
                prepare({title, icon}) {
                  return {
                    title: title,
                    subtitle: `Icon: ${icon}`,
                  }
                }
              }
            }
          ]
        }
      ],
      preview: {
        select: {
          items: 'items'
        },
        prepare({items}) {
          return {
            title: 'Bullet List',
            subtitle: `${items?.length || 0} items`
          }
        }
      }
    }),

    /* ===== ENHANCED ROADMAP TIMELINE ===== */
    defineArrayMember({
      name: 'roadmap',
      type: 'object',
      title: 'Roadmap Timeline',
      icon: MasterDetailIcon,
      fields: [
        {
          name: 'steps',
          type: 'array',
          title: 'Timeline Steps',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'year',
                  type: 'string',
                  title: 'Year/Grade',
                  placeholder: 'e.g., 10th Grade, Year 1',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Step Title',
                  placeholder: 'e.g., SAT Preparation',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'color',
                  type: 'string',
                  title: 'Step Color',
                  options: {
                    list: [
                      {title: 'Blue', value: 'blue'},
                      {title: 'Green', value: 'green'},
                      {title: 'Purple', value: 'purple'},
                      {title: 'Orange', value: 'orange'},
                      {title: 'Red', value: 'red'},
                    ]
                  },
                  initialValue: 'blue'
                },
                {
                  name: 'tasks',
                  type: 'array',
                  title: 'Tasks/Milestones',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'task',
                          type: 'string',
                          title: 'Task',
                          validation: Rule => Rule.required()
                        },
                        {
                          name: 'completed',
                          type: 'boolean',
                          title: 'Mark as Completed',
                          initialValue: false
                        }
                      ],
                      preview: {
                        select: {
                          title: 'task',
                          completed: 'completed'
                        },
                        prepare({title, completed}) {
                          return {
                            title: title,
                            subtitle: completed ? '✓ Completed' : '○ Pending'
                          }
                        }
                      }
                    }
                  ]
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  year: 'year'
                },
                prepare({title, year}) {
                  return {
                    title: title,
                    subtitle: year
                  }
                }
              }
            }
          ]
        }
      ],
      preview: {
        select: {
          steps: 'steps'
        },
        prepare({steps}) {
          return {
            title: 'Roadmap Timeline',
            subtitle: `${steps?.length || 0} steps`
          }
        }
      }
    }),

    /* IMAGES */
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

    /* FILE DOWNLOADS */
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