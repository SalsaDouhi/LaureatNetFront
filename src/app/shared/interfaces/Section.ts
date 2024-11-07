import { sectionItemDTO } from './SectionItem';

export interface Section {
  id: number;
  title: String;
  items: sectionItemDTO[];
}
