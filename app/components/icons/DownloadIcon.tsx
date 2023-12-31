import { SVGProps } from 'react';

export default function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.2em'
      height='1.2em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.275-.275-.275-.7t.275-.7q.275-.275.713-.287t.712.262L11 12.15V5q0-.425.288-.713T12 4q.425 0 .713.288T13 5v7.15l1.875-1.875q.275-.275.713-.263t.712.288q.275.275.275.7t-.275.7l-3.6 3.6q-.15.15-.325.213t-.375.062ZM6 20q-.825 0-1.413-.588T4 18v-2q0-.425.288-.713T5 15q.425 0 .713.288T6 16v2h12v-2q0-.425.288-.713T19 15q.425 0 .713.288T20 16v2q0 .825-.588 1.413T18 20H6Z'
      ></path>
    </svg>
  );
}
