export default function Earning() {
    return (
        <div className="h-full flex justify-center items-center">
            <table className="table-auto border border-primary w-4/5">
                <thead>
                    <tr className="bg-primary text-secondary">
                        <th className="border border-primary p-2">Date</th>
                        <th className="border border-primary p-2">Earning</th>
                    </tr>
                </thead>
                <tbody className="text-primary">
                    <tr>
                        <td className="border border-primary p-2">01/2022</td>
                        <td className="border border-primary p-2">R$12.000,00</td>
                    </tr>
                    <tr>
                        <td className="border border-primary p-2">02/2022</td>
                        <td className="border border-primary p-2">R$12.000,00</td>
                    </tr>
                    <tr>
                        <td className="border border-primary p-2">03/2022</td>
                        <td className="border border-primary p-2">R$18.000,00</td>
                    </tr>
                    <tr>
                        <td className="border border-primary p-2">04/2022</td>
                        <td className="border border-primary p-2">R$8.000,00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
