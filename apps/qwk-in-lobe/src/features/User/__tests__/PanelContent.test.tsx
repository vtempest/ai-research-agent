import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import PanelContent from '../UserPanel/PanelContent';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/components/Menu', () => ({
  default: vi.fn(({ items, onClick }) => (
    <div>
      Mocked Menu
      {items.map((item: any) => (
        <button key={item.key} type={'button'} onClick={() => onClick({ key: item.key })}>
          {item.label}
        </button>
      ))}
    </div>
  )),
}));

vi.mock('../UserInfo', () => ({
  default: vi.fn(({ onClick }) => (
    <button type={'button'} onClick={onClick}>
      Mocked UserInfo
    </button>
  )),
}));

vi.mock('../UserPanel/useMenu', () => ({
  useMenu: vi.fn(() => ({
    mainItems: [
      { key: 'item1', label: 'Main Item 1' },
      { key: 'item2', label: 'Main Item 2' },
    ],
  })),
}));

vi.mock('../UserPanel/LangButton', () => ({
  default: () => <div>Language chooser</div>,
}));

vi.mock('../DataStatistics', () => ({
  default: vi.fn(() => <div>Mocked DataStatistics</div>),
}));

vi.mock('@/const/version', () => ({
  isDeprecatedEdition: false,
  isDesktop: false,
}));

vi.mock('@/store/serverConfig', () => ({
  serverConfigSelectors: {
    enableBusinessFeatures: () => false,
  },
  useServerConfigStore: (selector: (s: unknown) => unknown) => selector({}),
}));

describe('PanelContent', () => {
  const closePopover = vi.fn();

  // Helper function to render component with Router provider
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it('always shows the local user, since there is no sign-in', () => {
    renderWithRouter(<PanelContent closePopover={closePopover} />);

    expect(screen.getByText('Mocked UserInfo')).toBeInTheDocument();
    expect(screen.getByText('Mocked DataStatistics')).toBeInTheDocument();
    expect(screen.getAllByText('Mocked Menu')).toHaveLength(1);
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render Menu with main items', () => {
    renderWithRouter(<PanelContent closePopover={closePopover} />);

    expect(screen.getAllByText('Mocked Menu').length).toBeGreaterThan(0);
    expect(screen.queryByText('Language chooser')).not.toBeInTheDocument();
  });
});
