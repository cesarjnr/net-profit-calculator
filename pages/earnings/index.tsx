import useSwr from 'swr';
import { Fragment, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Modal from '../../components/modal';
import Table, { Header } from '../../components/table';
import Button, { ButtonVariant, ButtonType } from '../../components/button';
import Input, { InputType } from '../../components/input';
import { getEarnings, createEarning } from '../../lib/earnings';
import { formatDate } from '../../lib/date';
import { formatCurrency } from '../../lib/currency';
import { IEarning } from '../../interfaces/earning';

export default function Earning() {
  const { data: earnings, mutate } = useSwr('/api/earnings', getEarnings);
  const { handleSubmit, reset, ...rest } = useForm();
  const [showModal, setShowModal] = useState(false);
  const componentHandleSubmit = async (formData) => {
    const newEarning = await createEarning('/api/earnings', { date: formData.date, value: Number(formData.value) });

    setShowModal(false);
    mutate(
      [...earnings, newEarning].sort(sortEarningsByDate),
      false
    );
    reset();
  };
  const sortEarningsByDate = (a: IEarning, b: IEarning): number => {
    const aTimestamp = new Date(a.date).getTime();
    const bTimestamp = new Date(b.date).getTime();

    if (aTimestamp < bTimestamp) {
      return -1;
    } else if (aTimestamp > bTimestamp) {
      return 1;
    } else {
      return 0;
    }
  };
  let totalEarnings = 0;
  const tableHeaders: Header[] = [
    { name: 'Date', columnProperty: 'date' },
    { name: 'Earning', columnProperty: 'value' }
  ];
  const tableRows = earnings?.length ? earnings.map((earning) => {
    totalEarnings += earning.value;

    return {
      ...earning,
      date: formatDate(earning.date),
      value: formatCurrency(earning.value)
    };
  }) : [];
  const tableFooter = earnings?.length && ['Total', formatCurrency(totalEarnings)];

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
        data={tableRows}
        footers={tableFooter}
      />

      <Modal open={showModal} title="New Earning" onClose={() => setShowModal(false)}>
        <FormProvider handleSubmit={handleSubmit} reset={reset} {...rest}>
          <form onSubmit={handleSubmit(componentHandleSubmit)}>
            <Input name='date' label='Date' type={InputType.Date} />
            <Input name='value' label='Value (R$)' type={InputType.Number} />

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
