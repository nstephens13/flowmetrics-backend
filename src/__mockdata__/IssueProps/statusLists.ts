export enum Category {
  planning = 'Planning',
  development = 'Development',
  testing = 'Testing',
  nonDisplayed = 'Non-displayed',
}

export const statusLists = {
  [Category.planning]: ['Planned', 'Design', 'Open'],
  [Category.development]: ['In work', 'Review', 'In progress'],
  [Category.testing]: ['Unit test', 'E2E'],
  [Category.nonDisplayed]: ['Resolved', 'Closed'],
};

export const statusListsColors = {
  [Category.planning]: getComputedStyle(document.documentElement)
    .getPropertyValue('--flowMetricsBlue-1')
    .trim(),
  [Category.development]: getComputedStyle(document.documentElement)
    .getPropertyValue('--flowMetricsBlue-2')
    .trim(),
  [Category.testing]: getComputedStyle(document.documentElement)
    .getPropertyValue('--flowMetricsBlue-3')
    .trim(),
  [Category.nonDisplayed]: getComputedStyle(document.documentElement)
    .getPropertyValue('--flowMetricsBlue-4')
    .trim(),
};

export function getCategory(status: string): Category | null {
  const foundCategory = Object.keys(statusLists).find((cat) =>
    (statusLists as any)[cat].includes(status)
  );
  return foundCategory as Category | null;
}

export function getColorsforStatuses(status: string[]): string[] {
  const colors: string[] = [];
  status.forEach((stat) => {
    const category = getCategory(stat);
    if (category) {
      colors.push(statusListsColors[category]);
    }
  });
  return colors;
}
