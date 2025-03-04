export interface IPortofolio {
  redirect: {
    url: string;
    label: string;
    disabled?: boolean;
  };
  title: string;
  stack: string[];
  description: string;
  logo: {
    src: string;
    alt: string;
  };
  preview: {
    src: string;
    alt: string;
  };
}
