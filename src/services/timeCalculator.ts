import { DateTime, DurationLikeObject } from "luxon";
import { ChangeLogIF } from "../model/ChangeLogIF";

/**
 * @description function to calculate the time difference between the current time and the time the issue was created
 *
 * @param changeLog changeLog to calculate the time difference
 * @returns {DurationLikeObject | null} will return the time difference as a DurationLikeObject or null if changeLog is null
 */
export function getTimeDifference(changeLog: ChangeLogIF): DurationLikeObject | null {
  if (changeLog.created == null) {
    return null;
  }
  var startDateTime = DateTime.fromISO(changeLog.created.toISOString());
  var endDateTime = DateTime.now();
  return endDateTime.diff(startDateTime, [
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds'
  ]).toObject();
}
