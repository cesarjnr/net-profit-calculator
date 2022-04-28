import { useMemo } from 'react';
import { useTable, Column } from 'react-table';

type Data<T> = {
  [K in keyof T]: string | number;
}

export type Header = {
  name: string;
  columnProperty: string;
}

type Props<T> = {
  headers: Header[];
  data: Data<T>[];
  footers?: string[];
}

export default function Table<T>({ headers, data, footers }: Props<T>) {
  const tableHeaders: Column[] = useMemo(
    () => headers.map((header, index) => ({
      Header: header.name,
      Footer: footers?.length ? footers[index] : undefined,
      accessor: header.columnProperty,
    })),
    [headers, footers]
  );
  const tableBodyRows: any = useMemo(() => data, [data]);
  const table = useTable({ columns: tableHeaders, data: tableBodyRows });
  const renderHeadersRow = () => {
    return table.headerGroups.map((headerGroup) => (
      <tr
        className="bg-primary-800 text-secondary-400 text-sm"
        {...headerGroup.getHeaderGroupProps()}
      >
        {headerGroup.headers.map((column) => (
          <th
            className="border border-primary-800 p-3 font-medium"
            {...column.getHeaderProps()}
          >
            {column.render('Header')}
          </th>
        ))}
      </tr>
    ))
  };
  const renderBodyRows = () => {
    return table.rows.map((row) => {
      table.prepareRow(row);

      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => (
            <td className="border border-primary-100 p-2" {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          ))}
        </tr>
      )
    });
  };
  const renderFooterRow = () => (
    <tfoot>
      {table.footerGroups.map((footerGroup) => (
        <tr
          className="bg-primary-50 text-primary-800 text-sm font-medium"
          {...footerGroup.getFooterGroupProps()}
        >
          {footerGroup.headers.map((column) => (
            <td
              className="border border-primary-100 p-2"
              {...column.getFooterProps()}
            >
              {column.render('Footer')}
            </td>
          ))}
        </tr>
      ))}
    </tfoot>
  );

  return data && (
    <table
      className="table-auto border border-primary-800 w-full"
      {...table.getTableBodyProps()}
    >
      <thead>
        {renderHeadersRow()}
      </thead>

      <tbody className="text-primary-800 text-sm" {...table.getTableBodyProps()}>
        {renderBodyRows()}
      </tbody>

      {footers?.length && renderFooterRow()}
    </table>
  );
}
