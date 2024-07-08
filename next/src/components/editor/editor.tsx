import { useMemo } from 'react';

// Importing core components
import QuillEditor from 'react-quill';

// Importing styles
import 'react-quill/dist/quill.snow.css';
import './styles.css';
//
import { EditorProps } from './types';

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  simple = false,
  helperText,
  label,
  ...other
}: EditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'clean',
  ];

  return (
    <div className={'wrapper'}>
      {label && <label className={'label'}>Editor Content</label>}
      <QuillEditor
        className={'editor'}
        theme='snow'
        formats={formats}
        modules={modules}
        {...other}
      />
    </div>
  );
}
