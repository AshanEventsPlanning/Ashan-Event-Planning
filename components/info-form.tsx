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
    date: string,
    time: string
  }

  const infoForm = useForm<InfoFormData>({
    mode: "onChange",
  });

  const handleInfoSubmit: SubmitHandler<InfoFormData> = async (data) => {
    console.log(data)
    let { table, chair, arrangement, lengthStr, widthStr, location, date, time } = data
    setType(arrangement);
    const length = parseInt(lengthStr)
    const width = parseInt(widthStr)
    const result = await calculateChairsTables({table, chair, arrangement, length, width, location, date, time });
    console.log(result)
    setNoOfArrangements(result);
  };



  return (
    <FormProvider {...infoForm}>
      <form className="flex flex-col background" onSubmit={infoForm.handleSubmit(handleInfoSubmit)}>
        <div className="py-2 lg:px-8  rounded-md mt-8">
          <h1 className="text-lg font-semibold ">Select a chair</h1>
          <SelectInput name="chair" label="" placeholder="Select a chair">
            <ChairOptions />
          </SelectInput>
        </div>
        <div className="py-2 lg:px-8  rounded-md mt-2">
          <h1 className="text-lg font-semibold ">Select a table</h1>
          <SelectInput name="table" label="" placeholder="Select a table">
            <TableOptions />
          </SelectInput>
        </div>
        <div className="py-2 lg:px-8  rounded-md mt-2">
          <h1 className="text-lg font-semibold ">Select an arrangement</h1>
          <SelectInput name="arrangement" label="" placeholder="Select an arrangement">
            <ArrangementOptions />
          </SelectInput>
        </div>
        <div className="py-2 lg:px-8   rounded-md grid lg:grid-cols-2 gap-x-6 lg:mt-2">
          <h1 className="text-xl font-semibold mb-6">Space information</h1>
          <h1></h1>
          <TextInput name="lengthStr" label="Length(m*m)" />
          <TextInput name="widthStr" label="Width(m*m)" />
          <TextInput name="location" label="Location" />
        </div>
        <div className="py-2 lg:px-8   rounded-md mt-2 grid lg:grid-cols-2 gap-x-6 ">
          <h1 className="text-lg font-semibold mb-6">Date & Time</h1>
          <h1></h1>
          <div>
            <label htmlFor='date' className="block text-base font-medium py-2">
              Date
            </label>
            <input type='date'  id='date'className="border border-gray-400 rounded-md text-base py-2 px-4 w-full" {...infoForm.register('date')} />
          </div>
          <div>
            <label htmlFor='time' className="block text-base font-medium py-2">
              Time
            </label>
            <input type='time' id='time' className="border border-gray-400 rounded-md text-base py-2 px-4 w-full" {...infoForm.register('time')} />
          </div>
        </div>
        <button
          type="submit"
          disabled={false}
          className="block border py-2 text-black rounded-md bg-lime-500 mb-2 mt-8  border-white"
        >
          Proceed
        </button>
      </form>
      <div>{noOfArrangements !== null && <Report noOfArrangements={noOfArrangements} type={type} />}</div>
    </FormProvider>
  );
}

export default InfoForm;
