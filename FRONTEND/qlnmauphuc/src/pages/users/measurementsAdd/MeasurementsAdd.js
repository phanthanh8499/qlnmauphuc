import React from 'react'
import AccountLayout from "../../../components/accountLayout/AccountLayout";
import MeasurementAddForm from '../../../components/uMeasurements/addForm/MeasurementAddForm';
import UMeasurements from '../../../components/uMeasurements/UMeasurements';

export default function MeasurementsAdd (){
    return (
      <AccountLayout>
        <UMeasurements>
          <MeasurementAddForm></MeasurementAddForm>
        </UMeasurements>
      </AccountLayout>
    )
}
