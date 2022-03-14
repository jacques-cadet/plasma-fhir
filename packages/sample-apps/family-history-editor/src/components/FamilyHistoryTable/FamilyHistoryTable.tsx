import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useTable, useSortBy, Column } from "react-table";
import { CodeableConcept } from "../../plasma-fhir/api/FHIRResourceHelpers";

/** 
 * Definition of columns for the table 
 * Property names should match the "accessor" in the table columns
*/
export interface FamilyHistoryTableColumns { 
    delete: JSX.Element;
    edit: JSX.Element;
    relationship: JSX.Element;
    name: string;
    sex: string;
    age: string;
    conditions: string;
};

/** Props for the table component */
export interface ITableProps {
    data: FamilyHistoryTableColumns[];
}

export default function FamilyHistoryTable({ data }: ITableProps) {
    // Sort a column by codeable concept value...
    const sortCode = React.useMemo(() => {
        return (rowA: any, rowB: any, columnId: string, desc: boolean) => { 
            const cca = rowA.values[columnId].props.codeableConcept;
            const ccb = rowB.values[columnId].props.codeableConcept;
            return CodeableConcept.sortByDisplayText(cca, ccb);
        };
    }, []);

    const columns: Column<FamilyHistoryTableColumns>[] = React.useMemo(() => { 
        return [
            { Header: '', accessor: 'delete', canSort: false },
            { Header: '', accessor: 'edit', canSort: false },
            { Header: 'Relationship', accessor: 'relationship', sortType: sortCode },
            { Header: 'Name', accessor: 'name', sortType: "string" },
            { Header: 'Sex', accessor: 'sex', sortType: "string" },
            { Header: 'Age', accessor: 'age', sortType: "string" },
            { Header: 'Conditions', accessor: 'conditions', sortType: "string" },
        ];
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <table {...getTableProps()} className="FamilyHistoryTable">
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