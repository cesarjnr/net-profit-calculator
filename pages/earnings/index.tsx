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
  const [totalEarnings, setTotalEarnings] = useState(earnings?.length ? earnings.reduce((currentTotalEarning: number, previousEarning: IEarning) => {
    return currentTotalEarning + previousEarning.value;
  }, 0) : 0);
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
  const tableHeaders: Header[] = [
    { name: 'Date', columnProperty: 'date' },
    { name: 'Earning', columnProperty: 'value' }
  ];
  const tableRows = earnings?.length ? earnings.map((earning) => {
    return {
      ...earning,
      date: formatDate(earning.date),
      value: formatCurrency(earning.value)
    };
  }) : [];
  const tableFooter = earnings?.length && ['Total', formatCurrency(totalEarnings)];
  // const handleChangePage = (currentPageRows: object[]) => {
  //   const currentPageEarnings = currentPageRows as { [key in keyof IEarning]: string }[];
  //   const newTotalEarnings = currentPageEarnings.reduce((currentTotalEarning: number, previousEarning: { [key in keyof IEarning]: string }) => {
  //     const previousEarningValue = previousEarning.value.replace(/(R\$)(\s\d*)(\.|)(\d*)(,)(\d*)/, '$2$4.$6');

  //     return currentTotalEarning + Number(previousEarningValue);
  //   }, 0);

  //   setTotalEarnings(newTotalEarnings);
  // };

  return (
    <Fragment>
      <div className="flex justify-end">
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
        // footers={tableFooter}
        // onChangePage={handleChangePage}
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
