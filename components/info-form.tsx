import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "./select-input";
import ChairOptions from "./chair-options";
import TableOptions from './table-options'
import ArrangementOptions from "./arrangement-options";
import TextInput from "./text-input";


function InfoForm() {
  // const queryClient = useQueryClient();
  type InfoFormData = {
    chair: string
  }

  const infoForm = useForm<InfoFormData>({
    mode: "onChange",
  });


  const handleInfoSubmit: SubmitHandler<InfoFormData> = (data) => {
    console.log(data)
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
            <TextInput name="length" label="Length" />
            <TextInput name="breadth" label="Breadth" />
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
