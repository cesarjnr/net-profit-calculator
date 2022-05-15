import useSwr from 'swr';
import { Fragment, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Modal from '../../components/modal';
import Table, { Header } from '../../components/table';
import Button, { ButtonVariant, ButtonType } from '../../components/button';
import Input, { InputType } from '../../components/input';
import { getCompensations, createCompensation, sortCompensationsByDate } from '../../lib/compensations';
import { formatDate } from '../../lib/date';
import { formatCurrency } from '../../lib/currency';
import { ICompensation } from '../../interfaces/compensation';

interface ICompensationForm {
  date: string;
  value: string;
}

export default function Compensation() {
  const { data: compensations, mutate } = useSwr('/api/compensations', getCompensations);
  const { handleSubmit, reset, ...rest } = useForm<ICompensationForm>();
  const [showModal, setShowModal] = useState(false);
  const componentHandleSubmit = async (formData: ICompensationForm): Promise<void> => {
    const newCompensation = await createCompensation(
      '/api/compensations',
      { date: formData.date, value: Number(formData.value) }
    );

    setShowModal(false);
    await mutate([...compensations, newCompensation].sort(sortCompensationsByDate), false);
    reset();
  }
  const tableHeaders: Header[] = [
    { name: 'Date', columnProperty: 'date' },
    { name: 'Compensation', columnProperty: 'value' }
  ];
  const tableRows = compensations?.length ? compensations.map((compensation) => {
    return {
      ...compensation,
      date: formatDate(compensation.date),
      value: formatCurrency(compensation.value)
    };
  }) : [];

  return (
    <Fragment>
      <div className="flex justify-end">
        <Button
          variant={ButtonVariant.Contained}
          type={ButtonType.Button}
          text="New Compensation"
          onClick={() => setShowModal(true)}
        />
      </div>

      <Table<ICompensation>
        headers={tableHeaders}
        data={tableRows}
      />

      <Modal
        open={showModal}
        title="New Compensation"
        onClose={() => setShowModal(false)}
      >
        <FormProvider handleSubmit={handleSubmit} reset={reset} {...rest}>
          <form onSubmit={handleSubmit(componentHandleSubmit)}>
            <Input name="date" label="Date" type={InputType.Date} />
            <Input name="value" label="Value (R$)" type={InputType.Number} />

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
