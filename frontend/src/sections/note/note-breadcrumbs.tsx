import { Card, Link, Stack } from "@mui/material";
import { TNote } from "src/types/notes";

import { useGetBreadcrambsNoteQuery } from "src/store/notes/api";
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function NoteBreadcrumbs({ note }: TProps) {
  const { data: breadcrumbs } = useGetBreadcrambsNoteQuery(note.id);

  return (
    <Card sx={{ my: 3, p: 2 }}>
      <Stack direction={"row"} spacing={0.5} flexWrap={"wrap"}>
        <Link
          component={RouterLink}
          href={paths.notes}
          sx={{
            textDecoration: "none",
            "&::after": { content: '"/"', ml: 0.5 },
          }}
        >
          My notes
        </Link>
        {breadcrumbs?.map((breadcrumb) => {
          if (breadcrumb.id === note.id) {
            return <span key={breadcrumb.id}>{breadcrumb.title}</span>;
          }
          return (
            <Link
              component={RouterLink}
              key={breadcrumb.id}
              href={paths.note(breadcrumb.id)}
              sx={{
                textDecoration: "none",
                "&::after": { content: '"/"', ml: 0.5 },
              }}
            >
              {breadcrumb.title}
            </Link>
          );
        })}
      </Stack>
    </Card>
  );
}
