import { getChairByName, getTableByName, getArrangementByName, createOrder} from "@/server/infrastructure/repositories/calulate-repository";

type CalculateCommand = {
    chair: string;
    table: string;
    arrangement: string;
    length: number;
    width: number,
    location: string,
    date: string,
    time : string,
    userId: string
  };

export default async function calculateTablesChairsCommandHandler (command : CalculateCommand) {
    const { chair, table, arrangement, length, width, location, date, time, userId} = command
    const chairData = await getChairByName( chair )
    const tableData = await getTableByName( table )
    const arrangementData = await getArrangementByName( arrangement )

    const noOfArrangements = (length*width)/(tableData.length*tableData.width + chairData.length*chairData.width*arrangementData.chairspertable)

    const newNoOfArrangements = await createOrder({chair, table, arrangement, length, width, location, date, time, noOfArrangements, userId})

    return newNoOfArrangements;
}
