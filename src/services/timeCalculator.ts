import { DateTime, DurationLikeObject } from 'luxon';
import { ChangeLogIF } from '@/model/Issue/ChangeLogIF';

/**
 * @description function to calculate the time difference between the current time and the time the changeLog was created
 *
 * @param changeLog changeLog to calculate the time difference
 * @returns {DurationLikeObject | null} will return the time difference as a DurationLikeObject or null if changeLog is null
 */
export default function getTimeDifference(changeLog: ChangeLogIF): DurationLikeObject | null {
  if (changeLog?.created == null) {
    return null;
  }
  const startDateTime = DateTime.fromISO(changeLog.created.toISOString());
  const endDateTime = DateTime.now();
  return endDateTime
    .diff(startDateTime, ['weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'])
    .toObject();
}
