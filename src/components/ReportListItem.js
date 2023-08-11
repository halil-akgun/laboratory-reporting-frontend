import React from 'react';
import { Link } from 'react-router-dom';

const ReportListItem = (props) => {

    const { report } = props;
    const { fileNumber, dateOfReport, patientName, patientSurname, laborantNameSurname } = report;

    return (

        <tr id='reportsTable' className='list-group list-group-flush'>
            <td className='p-0'>
                <Link to={`/reports/${fileNumber}`} className='list-group-item list-group-item-action p-1 d-flex justify-content-around' >
                    <span id='reportsTableCol1'> {fileNumber} </span>
                    <span id='reportsTableCol2'> {dateOfReport} </span>
                    <span id='reportsTableCol3'> {patientName} </span>
                    <span id='reportsTableCol4'> {patientSurname} </span>
                    <span id='reportsTableCol5'> {laborantNameSurname} </span>
                </Link>
            </td>
        </tr>

    );
};

export default ReportListItem;