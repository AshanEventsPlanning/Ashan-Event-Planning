import { getChairByName, getTableByName, getArrangementByName} from "@/server/infrastructure/repositories/calulate-repository";

type CalculateCommand = {
    chair: string;
    table: string;
    arrangement: string;
    length: number;
    width: number,
    location: string,
    date: Date
  };

export default async function calculateTablesChairsCommandHandler (command : CalculateCommand) {
    const { chair, table, arrangement, length, width, location, date} = command
    const chairData = await getChairByName( chair )
    const tableData = await getTableByName( table )
    const arrangementData = await getArrangementByName( arrangement )

    const noOfArragements = (length*width)/(tableData.length*tableData.width + chairData.length*chairData.width*arrangementData.chairspertable)
    return noOfArragements;
}
