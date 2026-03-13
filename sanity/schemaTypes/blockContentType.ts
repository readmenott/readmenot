import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, LinkIcon} from '@sanity/icons'

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
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
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
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Text that appears below the image.',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and screen readers.',
        },
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
      // This preview logic forces the Studio to show a tidy, small thumbnail
      preview: {
        select: {
          title: 'caption',
          media: 'asset',
        },
        prepare({title, media}) {
          return {
            title: title || 'Untitled Image',
            subtitle: 'Image Block',
            media,
          }
        },
      },
    }),
    defineArrayMember({
      name: 'externalLink',
      type: 'object',
      title: 'External Link/Button',
      icon: LinkIcon,
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Link Label',
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL',
        },
      ],
    }),
  ],
})