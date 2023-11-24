import {IssueIF} from "../model/IssueIF";
import {ChangeLogIF} from "../model/ChangeLogIF";

/**
 * @description function to calculate the time difference between the current time and the time the issue was created
 * 
 * @param changeLog changeLog to calculate the time difference
 * @returns time difference as a string
 */
export function getTimeDifference(changeLog: ChangeLogIF): string {
  const targetDate = new Date(changeLog.created?.toString() as string);
  const targetDateTime = new Date(targetDate);
  const now = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = targetDateTime.getTime() - now.getTime();

  // Calculate weeks, days, hours, and minutes
  const weeks = Math.abs(Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7)));
  const days = Math.abs(Math.round((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.round((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.abs(Math.round((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));

  // Create a string representation of the time difference
  return `${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes`;
}