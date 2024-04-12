const ROOT = {
  NOTES: "/notes",
};

export const paths = {
  auth: {
    register: "/register",
    login: "/login",
  },
  maintenance: "/maintenance",
  comingSoon: "/coming-soon",
  "403": "/403",
  "404": "/404",
  "500": "/500",
  notes: ROOT.NOTES,
  note: (id: string) => `${ROOT.NOTES}/${id}`,
};
