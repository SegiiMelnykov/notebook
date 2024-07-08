import {
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { TFilter } from '@/types/notes';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import {
  perPageLimit,
  filter as pageFilter,
  notesPerPageOptions,
} from '@/utils/consts';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useAppSelector } from '@/hooks/use-redux';
import { useStoreActions } from '@/hooks/use-store-actions';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// sections

// ----------------------------------------------------------------------

type Props = {
  isChild?: boolean;
};

export default function NoteListTollbar({ isChild = false }: Props) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const { filterToggle } = useAppSelector((state) => state.note);
  const { toggleFilter } = useStoreActions();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [limit, setLimit] = useState(searchParams.get('limit') ?? perPageLimit);
  const [filter, setFilter] = useState<TFilter>(
    (searchParams.get('filter') as TFilter) ?? pageFilter,
  );
  const filterArr = ['all', 'active', 'completed', 'deleted'];

  const handleChange = (name: string, value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, String(value));
    newSearchParams.delete('page');
    router.push(pathname + '?' + newSearchParams);
  };
  useEffect(() => {
    setLimit(searchParams.get('limit') ?? perPageLimit);
    setFilter((searchParams.get('filter') as TFilter) ?? pageFilter);
  }, [searchParams]);

  return (
    <Stack position={'relative'} justifyContent={'flex-end'}>
      {filterToggle && (
        <Stack
          spacing={2}
          direction={isMobile ? 'column-reverse' : 'row'}
          justifyContent={'flex-end'}
          my={isMobile ? 2 : 1}
        >
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <TextField
                select
                fullWidth
                SelectProps={{
                  sx: { textTransform: 'capitalize' },
                }}
                size='small'
                label='Group'
                value={filter}
                onChange={(e) => handleChange('filter', e.target.value)}
              >
                {filterArr.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <TextField
                select
                fullWidth
                SelectProps={{
                  sx: { textTransform: 'capitalize' },
                }}
                size='small'
                value={limit}
                label='Limit'
                onChange={(e) => handleChange('limit', +e.target.value)}
              >
                {notesPerPageOptions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
        </Stack>
      )}
      <Box position={'absolute'} top={isChild ? -53 : -40} right={0}>
        {filterToggle ? (
          <IconButton onClick={() => toggleFilter(false)}>
            <FilterAltOffIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleFilter(true)}>
            <FilterAltIcon />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
}
