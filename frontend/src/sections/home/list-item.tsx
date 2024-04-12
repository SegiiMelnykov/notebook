import { TNote } from "src/types/notes";
import HomeList from "./list";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import { Typography, useTheme } from "@mui/material";

type Props = {
  item: TNote & {
    children?: TNote[];
  };
};

export default function HomeListItem({ item }: Props) {
  const theme = useTheme();
  const title =
    item.title.slice(0, 1).toUpperCase() +
    item.title.slice(1, item.title.length);
  return (
    <>
      <li
        style={{
          color: theme.palette.primary.main,
          marginBottom: "3px",
        }}
      >
        <Link to={paths.note(item.id)} style={{ textDecoration: "none" }}>
          <Typography color={"primary"} variant="h6">
            {title}
          </Typography>
        </Link>
        {!!item.children?.length && <HomeList list={item.children} />}
      </li>
    </>
  );
}
