import { describe, expect, it } from '@jest/globals';
import { DateTime } from 'luxon';
import { ChangeLogIF } from '../../model/ChangeLogIF';
import { getTimeDifference } from '../timeCalculator';
import exp from 'constants';

describe('getTimeDifference', () => {
  it('returns null if changeLog.created is null', () => {
    const changeLog: ChangeLogIF = {
      id: 1,
      created: null,
      author: null,
      changes: null,
    };

    expect(getTimeDifference(changeLog)).toBeNull();
  });

  it('returns time difference if changeLog.created it not null', () => {
    const changeLog: ChangeLogIF = {
      id: 2,
      created: DateTime.now().minus({ hours: 1 }).toJSDate(),
      author: null,
      changes: null,
    };

    const difference = getTimeDifference(changeLog);

    expect(difference).toBeDefined();
    expect(difference?.hours).toBe(1);
  });
});
