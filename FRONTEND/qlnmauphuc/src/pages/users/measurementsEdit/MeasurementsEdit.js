import React from 'react'
import AccountLayout from "../../../components/accountLayout/AccountLayout";
import MeasurementEditForm from '../../../components/uMeasurements/editForm/MeasurementEditForm';
import UMeasurements from '../../../components/uMeasurements/UMeasurements';

export default function MeasurementsEdit (){
    return (
      <AccountLayout>
        <UMeasurements>
          <MeasurementEditForm></MeasurementEditForm>
        </UMeasurements>
      </AccountLayout>
    )
}
