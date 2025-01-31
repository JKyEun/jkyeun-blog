export const PAGE_ROUTES = {
  POSTS: {
    id: '187ee792-570f-8026-b379-d08f35d30859',
    title: 'Posts',
  },
  NOTES: {
    id: '187ee792-570f-8059-8ed4-c0f5d372306a',
    title: 'Notes',
  },
} as const;

export const NAVIGATION_ITEMS = Object.values(PAGE_ROUTES);
