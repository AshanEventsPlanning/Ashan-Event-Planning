import { getChairByName, getTableByName } from "@/server/infrastructure/repositories/calulate-repository";

type CalculateCommand = {
    chair: string;
    table: string;
    arrangement: string;
    length: number;
    width: number
  };

export default async function calculateTablesChairsCommandHandler (command : CalculateCommand) {
    const { chair, table, arrangement, length, width} = command
    const chairData = await getChairByName( chair )
    const tableData = await getTableByName( table )

    if(arrangement == "Type 1"){
        const noOfArragements = (length*width)/(tableData.length*tableData.width + chairData.length*chairData.width*2)
        return noOfArragements;
    }
    else if(arrangement == "Type 2"){
        const noOfArragements = (length*width)/(tableData.length*tableData.width + chairData.length*chairData.width*4)
        return noOfArragements;
    }
}
