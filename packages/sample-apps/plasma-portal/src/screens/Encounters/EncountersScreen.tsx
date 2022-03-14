import React, { useContext } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { FHIRr4 } from "plasma-fhir-react-components";

import { Encounter, CodeableConcept } from "../../plasma-fhir/api/FHIRResourceHelpers";
import { getEncounters } from "../../plasma-fhir/api/FHIRClientHelper";
import { FHIRClientContext } from "../../plasma-fhir/FHIRClient";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function EncountersScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: encounters, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<Encounter>({
        context: context,
        getData: getEncounters
    });

    // TODO: Figure out how to use react-table datetime sorting
    const sortDateTimeView = React.useMemo(() => {
        return (rowA: any, rowB: any, columnId: string, desc: boolean) => { 
            const sa = rowA.values[columnId].props.datetime;
            const sb = rowB.values[columnId].props.datetime;
            const da = new Date(sa);
            const db = new Date(sb);
            return da.getTime() - db.getTime();
        };
    }, []);

    const sortEncounterType = React.useMemo(() => {
        return (rowA: any, rowB: any, columnId: string, desc: boolean) => { 
            const cca = rowA.values[columnId].props.codeableConcept;
            const ccb = rowB.values[columnId].props.codeableConcept;
            return CodeableConcept.sortByDisplayText(cca, ccb);
        };
    }, []);

    const data = React.useMemo(() => {
        return encounters.map((encounter, idx) => {
            return {
                date: (encounter.period && encounter.period.start) ? <FHIRr4.DateView datetime={encounter.period.start} /> : <span>{"Unknown"}</span>,
                type: (encounter.type && encounter.type.length > 0) ? <FHIRr4.CodeableConceptView codeableConcept={encounter.type[0]} /> : <span>{"Unknown"}</span>,
                reason: "N/A"
            };
        });
    }, [encounters]);

    const columns: Column<TableColumns>[] = React.useMemo(() => { 
        return [
            { Header: 'Date', accessor: 'date', sortType: sortDateTimeView },
            { Header: 'Type', accessor: 'type', sortType: sortEncounterType },
            { Header: 'Reason', accessor: 'reason', sortType: "string" }
        ];
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold pb-5">Encounters</h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Encounters */}
            {isDataLoaded && !hasErrorLoading ? 
            <div className="g-4">
                <Table columns={columns} data={data} />
            </div> : null}
        </div>
    );
}

/** 
 * Definition of columns for the table 
 * Property names should match the "accessor" in the table columns
*/
type TableColumns = { 
    date: JSX.Element;
    type: JSX.Element;
    reason: string;
};

/** Props for the table component */
interface ITableProps {
    columns: Column<TableColumns>[];
    data: TableColumns[];
}

function Table({ columns, data }: ITableProps) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <table {...getTableProps()} className="LabsTable">
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>{column.isSorted ? column.isSortedDesc ? ' ▾' : ' ▴' : ''}</span>
                    </th>
                    ))}
                </tr>
                ))}
            </thead>


            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    );
}