export interface IPortofolio {
  id: string;
  redirect?: {
    url: string;
    label: string;
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
  longDescription: string;
  features: string[];
  overviewImage: {
    front: {
      src: string;
      alt: string;
    };
    back: {
      src: string;
      alt: string;
    };
  };
  projectShowcase: {
    src: string;
    alt: string;
  }[];
}
