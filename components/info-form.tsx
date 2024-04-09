import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "./select-input";
import ChairOptions from "./chair-options";
import TableOptions from './table-options'
import ArrangementOptions from "./arrangement-options";
import TextInput from "./text-input";
import NumberInput from "./number-input";
import { calculateChairsTables } from "@/lib/api/calculate";
import Report from "./report";
import { useEffect, useState } from "react";


function InfoForm() {

  const [noOfArrangements, setNoOfArrangements] = useState<number | null | unknown>(null);
  const [type, setType] = useState<any>(null);


  // const queryClient = useQueryClient();
  type InfoFormData = {
    chair: string,
    table: string,
    arrangement: string,
    lengthStr: string,
    widthStr: string,
    location: string,
    date: Date
  }

  const infoForm = useForm<InfoFormData>({
    mode: "onChange",
  });

  const handleInfoSubmit: SubmitHandler<InfoFormData> = async (data) => {
    let { table, chair, arrangement, lengthStr, widthStr, location, date } = data
    setType(arrangement);
    console.log(type)
    const length = parseInt(lengthStr)
    const width = parseInt(widthStr)
    const result = await calculateChairsTables({ table, chair, arrangement, length, width, location, date });
    console.log(result)
    setNoOfArrangements(result);
  };



  return (
    <FormProvider {...infoForm}>
      <form className="flex flex-col gap-y-4" onSubmit={infoForm.handleSubmit(handleInfoSubmit)}>
        <div className="py-4 lg:px-8 bg-white  rounded-md mt-4">
          <h1 className="text-lg font-semibold ">Select a chair</h1>
          <SelectInput name="chair" label="" placeholder="Select a chair">
            <ChairOptions />
          </SelectInput>
        </div>
        <div className="py-4 lg:px-8 bg-white  rounded-md mt-4">
          <h1 className="text-lg font-semibold ">Select a table</h1>
          <SelectInput name="table" label="" placeholder="Select a table">
            <TableOptions />
          </SelectInput>
        </div>
        <div className="py-4 lg:px-8 bg-white  rounded-md mt-4">
          <h1 className="text-lg font-semibold ">Select an arrangement</h1>
          <SelectInput name="arrangement" label="" placeholder="Select an arrangement">
            <ArrangementOptions />
          </SelectInput>
        </div>
        <div className="py-6 lg:px-8 bg-white  rounded-md grid lg:grid-cols-2 gap-x-6 lg:mt-4">
          <h1 className="text-xl font-semibold mb-6">Space information</h1>
          <h1></h1>
          <TextInput name="lengthStr" label="Length" />
          <TextInput name="widthStr" label="Width" />
          <TextInput name="location" label="Location" />
        </div>
        <div className="py-4 lg:px-8 bg-white  rounded-md mt-4 grid lg:grid-cols-2 gap-x-6 ">
          <h1 className="text-lg font-semibold ">Date & Time</h1>
          <h1></h1>
          <div>
            <label htmlFor='date' className="block text-base font-medium py-2">
              Date
            </label>
            <input type='date' id='date'className="border border-gray-400 rounded-md text-base py-2 px-4 w-full" />
          </div>
        </div>
        <button
          type="submit"
          disabled={false}
          className="block border py-2 text-white rounded-md bg-blue-600"
        >
          Proceed
        </button>
      </form>
      <div>{noOfArrangements !== null && <Report noOfArrangements={noOfArrangements} type={type} />}</div>
    </FormProvider>
  );
}

export default InfoForm;
