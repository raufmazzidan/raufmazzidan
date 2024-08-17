import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const classFusion = (...classes: ClassValue[]) => twMerge(clsx(classes));

export default classFusion;
