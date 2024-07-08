import { TNote } from '@/types/notes';
import HomeListItem from './list-item';

type Props = { list: TNote[] };

export default function HomeList({ list }: Props) {
  return (
    <ul
      style={{
        paddingLeft: '25px',
        paddingBottom: '5px',
        listStyleType: 'none',
      }}
    >
      {list.map((note) => (
        <HomeListItem key={note.id} item={note} />
      ))}
    </ul>
  );
}
