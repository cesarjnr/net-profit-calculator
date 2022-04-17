import { Fragment, useState } from 'react';

import Modal from '../../components/modal';
import Button, { ButtonVariant, ButtonType } from '../../components/button';
import Input, { InputType } from '../../components/input';

export default function Earning() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button
          variant={ButtonVariant.Contained}
          type={ButtonType.Button}
          text='New Earning'
          onClick={() => setShowModal(true) }
        />
      </div>

      <table className="table-auto border border-primary-800 w-full">
        <thead>
          <tr className="bg-primary-800 text-secondary-400 text-sm">
            <th className="border border-primary-800 p-3 font-medium">Date</th>
            <th className="border border-primary-800 p-3 font-medium">Earning</th>
          </tr>
        </thead>
        <tbody className="text-primary-800 text-sm">
          <tr>
            <td className="border border-primary-100 p-2">01/2022</td>
            <td className="border border-primary-100 p-2">R$12.000,00</td>
          </tr>
          <tr>
            <td className="border border-primary-100 p-2">02/2022</td>
            <td className="border border-primary-100 p-2">R$12.000,00</td>
          </tr>
          <tr>
            <td className="border border-primary-100 p-2">03/2022</td>
            <td className="border border-primary-100 p-2">R$18.000,00</td>
          </tr>
          <tr>
            <td className="border border-primary-100 p-2">04/2022</td>
            <td className="border border-primary-100 p-2">R$8.000,00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-primary-50 text-primary-800 text-sm font-medium">
            <td className="border border-primary-100 p-2">Total</td>
            <td className="border border-primary-100 p-2">R$50.000,00</td>
          </tr>
        </tfoot>
      </table>

      <Modal open={showModal} title="New Earning" onClose={() => setShowModal(false)}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input name='date' label='Date' type={InputType.Date} />
          <Input name='value' label='Value (R$)' type={InputType.Text} />

          <div className="flex gap-5">
            <Button
              variant={ButtonVariant.Contained}
              type={ButtonType.Submit}
              text='Create'
              fullWidth
            />
            <Button
              variant={ButtonVariant.Outlined}
              type={ButtonType.Button}
              text='Cancel'
              onClick={() => setShowModal(false)}
              fullWidth
            />
          </div>
        </form>
      </Modal>
    </Fragment>
  );
}
