export enum Category {
  planning = 'planning',
  development = 'development',
  testing = 'testing',
  nonDisplayed = 'nonDisplayed',
}
export const statusLists = {
  [Category.planning]: ['planned', 'design', 'open'],
  [Category.development]: ['in work', 'review', 'in progress'],
  [Category.testing]: ['unit test', 'e2e'],
  [Category.nonDisplayed]: ['resolved', 'closed'],
};
