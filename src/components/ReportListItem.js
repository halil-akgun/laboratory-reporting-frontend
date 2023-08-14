import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ReportListItem = (props) => {

    const { report, searchTerm } = props;
    const { fileNumber, id, dateOfReport, patientName, patientSurname, laborantNameSurname, diagnosisTitle, diagnosisDetails } = report;
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };


    let searchTermTrim = searchTerm.trim();

    return (

        <tr
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
            id='reportsTable'
            className='list-group list-group-flush'>
            <OverlayTrigger
                placement="bottom"
                show={showTooltip}
                overlay={
                    <Tooltip style={{ position: "fixed" }}>
                        {/* position:"fixed" => For the problem of scrollbar appearing and disappearing suddenly on the right side */}
                        <div className='tooltip-inner'>
                            <p> <strong>Diagnosis Title: </strong>
                                {diagnosisTitle.split(' ').map((word, index) => (
                                    <span
                                        key={index}
                                        className={
                                            searchTermTrim.length > 0 &&
                                                searchTermTrim.split(' ').some(searchWord =>
                                                    word.toLowerCase().includes(searchWord.toLowerCase())
                                                )
                                                ? 'highlighted'
                                                : ''
                                        }
                                    >
                                        {word}{' '}
                                    </span>
                                ))}
                            </p>
                            <p> <strong>Diagnosis Details: </strong>
                                {diagnosisDetails.split(' ').map((word, index) => (
                                    <span
                                        key={index}
                                        className={
                                            searchTermTrim.length > 0 &&
                                                searchTermTrim.split(' ').some(searchWord =>
                                                    word.toLowerCase().includes(searchWord.toLowerCase())
                                                )
                                                ? 'highlighted'
                                                : ''
                                        }
                                    >
                                        {word}{' '}
                                    </span>
                                ))}
                            </p>

                        </div>
                    </Tooltip>}
            >
                <td className='p-0'>
                    <Link to={`/reports/${id}`} className='list-group-item list-group-item-action p-1 d-flex justify-content-around' >
                        <span id='reportsTableCol1'> {fileNumber} </span>
                        <span id='reportsTableCol2'> {dateOfReport} </span>
                        <span id='reportsTableCol3'> {patientName} </span>
                        <span id='reportsTableCol4'> {patientSurname} </span>
                        <span id='reportsTableCol5'> {laborantNameSurname} </span>
                    </Link>
                </td>
            </OverlayTrigger>
        </tr>

    );
};

export default ReportListItem;
