export default {
    name: 'featured',
    title: 'Featured Menu Categories',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Featured Category name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'short_description',
        title: 'Short description',
        type: 'string',
        validation: (Rule) => Rule.max(200),
      },
      {
        name: 'price',
        title: 'Price of the dish in GBP',
        type: 'number',
      },
      {
        name: 'restuarants',
        type: 'array',
        title: 'Restaurants',
        of: [{ type: 'reference', to: [{type: 'restuarant' }] }],
      },
    ]
  }
  