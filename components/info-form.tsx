import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "./select-input";
import ChairOptions from "./chair-options";
import TableOptions from './table-options'
import ArrangementOptions from "./arrangement-options";
import TextInput from "./text-input";
import NumberInput from "./number-input";
import { calculateChairsTables } from "@/lib/api/calculate";


function InfoForm() {
  // const queryClient = useQueryClient();
  type InfoFormData = {
    chair: string,
    table: string,
    arrangement: string,
    lengthStr: string,
    widthStr: string,
  }

  const infoForm = useForm<InfoFormData>({
    mode: "onChange",
  });


  const handleInfoSubmit: SubmitHandler<InfoFormData> = async (data) => {
    let {table,chair,arrangement,lengthStr, widthStr} = data
    const length = parseInt(lengthStr)
    const width = parseInt(widthStr)
    const noOfArrangements = await calculateChairsTables({table,chair,arrangement,length, width})
    console.log(noOfArrangements)
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
        </div>
        <button
          type="submit"
          disabled={false}
          className="block border py-2 text-white rounded-md bg-blue-600"
        >
          Proceed
        </button>
      </form>
    </FormProvider>
  );
}

export default InfoForm;
