const ROOT = {
  NOTES: '/notes',
};

export const paths = {
  auth: {
    register: '/registration',
    login: '/login',
  },
  maintenance: '/maintenance',
  comingSoon: '/coming-soon',
  '403': '/403',
  '404': '/404',
  '500': '/500',
  profile: '/profile',
  notes: ROOT.NOTES,
  note: (id: string) => `${ROOT.NOTES}/${id}`,
};
