import React from 'react';
import { Link } from 'react-router-dom';

const ReportListItem = (props) => {

    const { report } = props;
    const { fileNumber, dateOfReport, patientName, patientSurname, laborantNameSurname } = report;

    return (
        <Link to={`/reports/${fileNumber}`} className='list-group-item list-group-item-action ' >
            <table id='reportsTable' className='table mb-0'>
                <tr className='d-flex justify-content-around'>
                    <td id='reportsTableCol1'> {fileNumber} </td>
                    <td id='reportsTableCol2'> {dateOfReport} </td>
                    <td id='reportsTableCol3'> {patientName} </td>
                    <td id='reportsTableCol4'> {patientSurname} </td>
                    <td id='reportsTableCol5'> {laborantNameSurname} </td>
                </tr>
            </table>
        </Link>
    );
};

export default ReportListItem;