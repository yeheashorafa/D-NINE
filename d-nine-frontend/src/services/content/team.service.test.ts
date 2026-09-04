import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTeamMembers } from './team.service';
import { STATIC_TEAM_MEMBERS } from '@/features/home/data/team.data';
import * as envModule from '@/sanity/env';

// Mock env module to control contentSource
vi.mock('@/sanity/env', () => ({
  contentSource: 'static',
  assertSanityConfig: vi.fn(),
}));

describe('team.service in static mode', () => {
  beforeEach(() => {
    // @ts-expect-error - overriding readonly for testing
    envModule.contentSource = 'static';
  });

  it('getTeamMembers should return STATIC_TEAM_MEMBERS', async () => {
    const result = await getTeamMembers();
    expect(result).toEqual(STATIC_TEAM_MEMBERS);
  });
});
