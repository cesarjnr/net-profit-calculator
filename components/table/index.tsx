type BodyRow<T> = {
  id: string;
} & {
  [K in keyof T]: string | number;
}

type FooterRow = {
  [key: string]: string | number
}

type Props<T> = {
  headers: string[];
  bodyRows: BodyRow<T>[];
  footerRow?: FooterRow;
}

export default function Table<T>({ headers, bodyRows, footerRow }: Props<T>) {
  const renderHeaders = () => {
    return headers.map((header) => (
      <th key={header} className="border border-primary-800 p-3 font-medium">
        {header}
      </th>
    ));
  };
  const renderBodyRows = () => {
    return bodyRows.map((row) => {
      const { id, ...rest } = row;

      return (
        <tr key={id}>
          {Object.entries(rest).map(([key, value]) => (
            <td key={id + key} className="border border-primary-100 p-2">
              {String(value)}
            </td>
          ))}
        </tr>
      );
    });
  };
  const renderFooterRow = () => {
    const [footerKeyValue] = Object.entries(footerRow);

    return (
      <tfoot>
        <tr className="bg-primary-50 text-primary-800 text-sm font-medium">
          {footerKeyValue.map((keyOrValue) => (
            <td key={keyOrValue} className="border border-primary-100 p-2">
              {keyOrValue}
            </td>
          ))}
        </tr>
      </tfoot>
    );
  };

  return (
    <table className="table-auto border border-primary-800 w-full">
      <thead>
        <tr className="bg-primary-800 text-secondary-400 text-sm">
          {renderHeaders()}
        </tr>
      </thead>

      <tbody className="text-primary-800 text-sm">
        {renderBodyRows()}
      </tbody>

      {footerRow && renderFooterRow()}
    </table>
  );
}
