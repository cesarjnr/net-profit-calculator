import { Fragment, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Modal from '../../components/modal';
import Table from '../../components/table';
import Button, { ButtonVariant, ButtonType } from '../../components/button';
import Input, { InputType } from '../../components/input';

export default function Earning() {
  const { handleSubmit, ...rest } = useForm();
  const [showModal, setShowModal] = useState(false);
  const tableHeaders = ['Date', 'Earning'];
  const tableRows = [
    { id: 1, date: '01/2022', value: 'R$12.000,00' },
    { id: 2, date: '02/2022', value: 'R$12.000,00' },
    { id: 3, date: '03/2022', value: 'R$18.000,00' },
    { id: 4, date: '04/2022', value: 'R$8.000,00' },
  ];
  const tableFooter = { 'Total': 'R$50.000,00' };
  const componentHandleSubmit = (data) => {
    console.log(data);
  };

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

      <Table headers={tableHeaders} bodyRows={tableRows} footerRow={tableFooter} />

      <Modal open={showModal} title="New Earning" onClose={() => setShowModal(false)}>
        <FormProvider handleSubmit={handleSubmit} {...rest}>
          <form onSubmit={handleSubmit(componentHandleSubmit)}>
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
        </FormProvider>
      </Modal>
    </Fragment>
  );
}
