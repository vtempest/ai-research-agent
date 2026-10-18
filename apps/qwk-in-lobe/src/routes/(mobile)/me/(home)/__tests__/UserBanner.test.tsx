import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import UserBanner from '../features/UserBanner';

// Mock dependencies
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => mockNavigate,
}));

vi.mock('@/features/User/UserInfo', () => ({
  default: vi.fn(() => <div>Mocked UserInfo</div>),
}));

vi.mock('@/features/User/DataStatistics', () => ({
  default: vi.fn(() => <div>Mocked DataStatistics</div>),
}));

vi.mock('@/const/version', () => ({
  isDeprecatedEdition: false,
  isDesktop: false,
}));

afterEach(() => {
  mockNavigate.mockReset();
});

describe('UserBanner', () => {
  it('always shows the local user, since there is no sign-in', () => {
    render(<UserBanner />);

    expect(screen.getByText('Mocked UserInfo')).toBeInTheDocument();
    expect(screen.getByText('Mocked DataStatistics')).toBeInTheDocument();
  });
});
