export interface TechItem {
  name: string;
  category: string;
  version: string;
  description: string;
  icon: string;
  color: string;
  docsUrl: string;
}

export interface DemoTab {
  id: string;
  label: string;
  iconName: string;
  description: string;
}

export interface CodeSnippet {
  title: string;
  filename: string;
  language: string;
  code: string;
}
