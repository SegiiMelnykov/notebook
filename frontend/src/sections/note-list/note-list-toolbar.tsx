import {
  IconButton,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { TFilter } from "src/types/notes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pageLimit, filter as pageFilter } from "src/utils/consts";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useAppSelector } from "src/hooks/use-redux";
import { useStoreActions } from "src/hooks/use-store-actions";

// sections

// ----------------------------------------------------------------------

type Props = {
  isChild?: boolean;
};

export default function NoteListTollbar({ isChild = false }: Props) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { filterToggle } = useAppSelector((state) => state.note);
  const { toggleFilter } = useStoreActions();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(searchParams.get("limit") ?? pageLimit);
  const [filter, setFilter] = useState<TFilter>(
    (searchParams.get("filter") as TFilter) ?? pageFilter,
  );
  const limitArr = [5, 10, 20, 30];
  const filterArr = ["all", "active", "completed", "deleted"];

  const handleChange = (name: string, value: string | number) => {
    setSearchParams((prev: any) => {
      const newSearchParams = new URLSearchParams(prev);
      newSearchParams.set(name, String(value));
      newSearchParams.delete("page");
      return newSearchParams;
    });
  };
  useEffect(() => {
    setLimit(searchParams.get("limit") ?? pageLimit);
    setFilter((searchParams.get("filter") as TFilter) ?? pageFilter);
  }, [searchParams]);

  return (
    <Stack position={"relative"} justifyContent={"flex-end"}>
      {filterToggle && (
        <Stack
          spacing={2}
          direction={isMobile ? "column-reverse" : "row"}
          justifyContent={"flex-end"}
          my={isMobile ? 2 : 1}
        >
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Group</InputLabel>
              <Select
                size="small"
                value={filter}
                onChange={(e) => handleChange("filter", e.target.value)}
              >
                {filterArr.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Limit</InputLabel>
              <Select
                size="small"
                value={limit}
                onChange={(e) => handleChange("limit", +e.target.value)}
              >
                {limitArr.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      )}
      <Box position={"absolute"} top={isChild ? -53 : -40} right={0}>
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
