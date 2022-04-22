import useSwr, { mutate } from 'swr';
import { Fragment, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Modal from '../../components/modal';
import Table from '../../components/table';
import Button, { ButtonVariant, ButtonType } from '../../components/button';
import Input, { InputType } from '../../components/input';
import { getEarnings, createEarning } from '../../lib/earnings';
import { IEarning } from '../../interfaces/earning';

export default function Earning() {
  const { data: earnings, mutate } = useSwr('/api/earnings', getEarnings);
  const { handleSubmit, ...rest } = useForm();
  const [showModal, setShowModal] = useState(false);
  const tableHeaders = ['Date', 'Earning'];
  // const tableFooter = { 'Total': 'R$50.000,00' };
  const componentHandleSubmit = async (data) => {
    const newEarning = await createEarning('/api/earnings', data);

    mutate([...earnings, newEarning], false);
  };
  const tableRows = earnings?.length ? earnings : [];

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

      <Table<IEarning>
        headers={tableHeaders}
        bodyRows={tableRows}
        // footerRow={tableFooter}
      />

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
