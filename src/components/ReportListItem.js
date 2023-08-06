import React from 'react';
import { Link } from 'react-router-dom';

const ReportListItem = (props) => {

    const { report } = props;
    const { fileNumber, patientName, patientSurname, laborantNameSurname } = report;

    return (
        <Link to={`/reports/${fileNumber}`} className='list-group-item list-group-item-action' >
            <table>
                <tr>
                    <td>
                        <span className='fs-5 ps-2'>
                            {patientName} {patientSurname}
                        </span><br />
                        <span className='fs-6 ps-2'>
                            {laborantNameSurname}
                        </span>
                    </td>
                </tr>
            </table>
        </Link>
    );
};

export default ReportListItem;