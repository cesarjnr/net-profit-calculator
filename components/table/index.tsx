interface Props {
  headers: string[];
  bodyRows: {
    id: number;
    [key: string]: string | number;
  }[];
  footerRow?: { [key: string]: string | number };
}

export default function Table({ headers, bodyRows, footerRow }: Props) {
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
          {Object.values(rest).map((rowValue) => (
            <td key={String(id) + rowValue} className="border border-primary-100 p-2">
              {rowValue}
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
