import { describe, expect, it } from 'vitest'
import { createInterestLog } from './interest-log'

describe('InterestLog', () => {
  it('records an Interest without a message body or Seeker phone', () => {
    const log = createInterestLog({
      now: () => new Date('2026-08-19T10:00:00.000Z'),
      id: () => 'int-1',
    })
    const interest = log.record({
      listingId: 'j1',
      employerId: 'c1',
      listingTitle: 'Front Desk Receptionist',
      seekerName: 'Mereoni',
      actorKey: 'actor-a',
    })
    expect(interest).toMatchObject({
      id: 'int-1',
      listingId: 'j1',
      employerId: 'c1',
      listingTitle: 'Front Desk Receptionist',
      seekerName: 'Mereoni',
      recordedAt: '2026-08-19T10:00:00.000Z',
    })
    expect(interest).not.toHaveProperty('message')
    expect(log.listByEmployer('c1')).toHaveLength(1)
    expect(log.listByListing('j1')).toHaveLength(1)
    expect(log.listByEmployer('other')).toEqual([])
  })

  it('rate-limits a fourth Express Interest on the same Listing from the same actor within an hour', () => {
    let n = 0
    const log = createInterestLog({
      now: () => new Date('2026-08-19T10:00:00.000Z'),
      id: () => `int-${++n}`,
    })
    const input = {
      listingId: 'j1',
      employerId: 'c1',
      listingTitle: 'Front Desk Receptionist',
      actorKey: 'actor-a',
    }
    log.record(input)
    log.record(input)
    log.record(input)
    expect(() => log.record(input)).toThrow(/Too many Express Interest/)
    const other = createInterestLog({
      now: () => new Date('2026-08-19T10:00:00.000Z'),
      store: log.listByListing('j1'),
    })
    expect(
      other.record({ ...input, actorKey: 'actor-b' }).actorKey,
    ).toBe('actor-b')
  })
})
