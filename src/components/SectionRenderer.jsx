import TextBox from '@/components/sections/TextBox';
import ExplanationBox from '@/components/sections/ExplanationBox';
import Note from '@/components/sections/Note';
import Paragraphs from '@/components/sections/Paragraphs';
import Calendar from '@/components/sections/Calendar';
import ImageGrid from '@/components/sections/ImageGrid';
import ImageTextLayout from '@/components/sections/ImageTextLayout';
import IdentityList from '@/components/sections/IdentityList';
import ArticleSection from '@/components/sections/ArticleSection';
import SectionWithTitle from '@/components/sections/SectionWithTitle';
import CenteredPortrait from '@/components/sections/CenteredPortrait';
import SubsectionTitle from '@/components/sections/SubsectionTitle';

const COMPONENT_MAP = {
  'text-box': TextBox,
  'explanation-box': ExplanationBox,
  'note': Note,
  'paragraphs': Paragraphs,
  'calendar': Calendar,
  'image-grid': ImageGrid,
  'image-text-layout': ImageTextLayout,
  'identity-list': IdentityList,
  'article-section': ArticleSection,
  'section-with-title': SectionWithTitle,
  'centered-portrait': CenteredPortrait,
  'subsection-title': SubsectionTitle,
};

export default function SectionRenderer({ section }) {
  const Component = COMPONENT_MAP[section.type];

  if (!Component) {
    console.warn('Type de section inconnu:', section.type);
    return null;
  }

  return <Component section={section} />;
}
