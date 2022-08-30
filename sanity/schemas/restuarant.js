export default {
  name: 'restuarant',
  title: 'Restuarant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: "Restuarant name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: "Image of the restuarant",
    },
    {
      name: 'lat',
      type: 'number',
      title: "Latitude of the restuarant",
    },
    {
      name: 'long',
      type: 'number',
      title: "Longitude of the restuarant",
    },
    {
      name: 'address',
      type: 'string',
      title: "Restuarant address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: "Enter a Rating from (1-5 Stars)",
      validation: (Rule) => Rule.required()
      .min(1)
      .max(5)
      .error("Please enter a value between 1 and 5"),
    },
    {
      name: 'type',
      type: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{ type: 'category'}],
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{type: 'dish' }] }],
    },
  ],
}
