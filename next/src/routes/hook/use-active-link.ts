import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();
  const normalActive = path ? pathname.includes(path) : false;

  const deepActive = path ? pathname === path : false;

  return deep ? deepActive : normalActive;
}
