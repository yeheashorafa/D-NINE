import { describe, it, expect } from 'vitest';
import DashboardLayout, { metadata } from './layout';
import { render } from '@testing-library/react';

describe('DashboardLayout', () => {
  it('has noindex metadata', () => {
    expect(metadata.robots.index).toBe(false);
    expect(metadata.robots.follow).toBe(false);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <DashboardLayout>
        <div data-testid="test-child">Child Content</div>
      </DashboardLayout>
    );
    expect(getByText('Child Content')).toBeInTheDocument();
  });
});
