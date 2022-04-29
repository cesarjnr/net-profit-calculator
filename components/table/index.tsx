import { useMemo } from 'react';
import { useTable, usePagination, Column } from 'react-table';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

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
  onChangePageSize?: (pageSize: number) => void
}

export default function Table<T>({ headers, data, footers, onChangePageSize }: Props<T>) {
  const tableHeaders: Column[] = useMemo(
    () => headers.map((header, index) => ({
      Header: header.name,
      Footer: footers?.length ? footers[index] : undefined,
      accessor: header.columnProperty,
    })),
    [headers, footers]
  );
  const tableBodyRows: any = useMemo(() => data, [data]);
  const table = useTable({ columns: tableHeaders, data: tableBodyRows, initialState: { pageSize: 10 } }, usePagination);
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
    return table.page.map((row) => {
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
    <>
      <table
        className="w-full my-8 table-auto border border-primary-800 shadow-md"
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

      <div className="flex justify-end gap-20">
        <select
          className="py-0 border-l-0 border-t-0 border-r-0 border-b-1 border-[rgb(107,114,128)] text-[rgb(107,114,128)] focus:border-[rgb(107,114,128)] focus:shadow-none focus:ring-transparent"
          onChange={(e) => {
            const newPageSize = Number(e.target.value);

            table.setPageSize(newPageSize);
            onChangePageSize && onChangePageSize(newPageSize);
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="text-[rgb(107,114,128)]">
              {pageSize}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-6">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MdKeyboardArrowLeft size="1.5em" color="rgb(107, 114, 128)" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MdKeyboardArrowRight size="1.5em" color="rgb(107, 114, 128)" />
          </button>
        </div>
      </div>
    </>
  );
}
