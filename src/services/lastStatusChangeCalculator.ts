/**
 * checks if the ingoing object has the right type structure
 * @return: true if object type matches
 * @param object
 */
function isRightType(object: object): boolean {
  return (
    'expand' in object &&
    'id' in object &&
    'self' in object &&
    'key' in object &&
    'renderedFields' in object &&
    'names' in object &&
    'schema' in object &&
    'operations' in object &&
    'editmeta' in object &&
    'changelog' in object &&
    'versionedRepresentations' in object
  );
}

/**
 * extracts the last status change from a json string
 * @param json json string to analyze
 * @return Date of last status change
 */
function extractLastStatusChange(json: string): Date {
  const parsed = JSON.parse(json);
  // check if parsed Json is right type, if not return 0
  if (!isRightType(parsed)) {
    return new Date(0);
  }
  const noStatusChange: Date = new Date(1); // if no status change is detected return 1
  for (let i: number = parsed.changelog.total - 1; i >= 0; i--) {
    for (let j: number = parsed.changelog.histories[i].items.length - 1; j >= 0; j--) {
      if (parsed.changelog.histories[i].items[j].field === 'status') {
        return new Date(parsed.changelog.histories[i].created);
      }
    }
  }
  return noStatusChange;
}

export default extractLastStatusChange;
