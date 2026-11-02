export type WorkSlide = { src: string; key: string };

export type WorkProject = {
  slug: string;
  slides: WorkSlide[];
};

export const workProjects: WorkProject[] = [
  {
    slug: 'platinum',
    slides: [
      { src: '/work/platinum/shift.png', key: 'shift' },
      { src: '/work/platinum/sales.png', key: 'sales' },
      { src: '/work/platinum/warehouse.png', key: 'warehouse' },
    ],
  },
  {
    slug: 'tisei',
    slides: [
      { src: '/work/tisei/dashboard.jpg', key: 'dashboard' },
      { src: '/work/tisei/map.jpg', key: 'map' },
      { src: '/work/tisei/users.jpg', key: 'users' },
    ],
  },
];

export function getWorkProject(slug: string) {
  return workProjects.find((p) => p.slug === slug);
}

export function getWorkSlugs() {
  return workProjects.map((p) => p.slug);
}
