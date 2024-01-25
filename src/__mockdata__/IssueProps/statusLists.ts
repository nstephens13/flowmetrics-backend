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

/**
 * Function to get the category of an issue status
 * @param status issue status
 * @returns the category of the issue status or null if the status is not found in any category
 * @author Nived Stephen
 */
export function getCategory(status: string): Category | null {
  const foundCategory = Object.keys(statusLists).find((cat) =>
    (statusLists as any)[cat].includes(status)
  );
  return foundCategory as Category | null;
}
