import { render, screen } from '@testing-library/react';
import SectionRenderer from '@/components/SectionRenderer';
import { describe, it, expect, vi } from 'vitest';

describe('SectionRenderer', () => {
    it('renders a TextBox section', () => {
        const section = {
            type: 'text-box',
            content: 'Hello World',
            style: 'color-1'
        };
        render(<SectionRenderer section={section} />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders a SubsectionTitle section', () => {
        const section = {
            type: 'subsection-title',
            title: 'Chapter 1'
        };
        render(<SectionRenderer section={section} />);
        expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    });

    it('returns null and logs warning for unknown section type', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
        const section = {
            type: 'unknown-type'
        };
        const { container } = render(<SectionRenderer section={section} />);
        expect(container.firstChild).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Type de section inconnu:', 'unknown-type');
        consoleSpy.mockRestore();
    });
});
