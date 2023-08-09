import React, { useState, useEffect } from 'react';
import { getReports, getReportsSortedByLaborant } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import ReportListItem from './ReportListItem';
import { useSelector } from 'react-redux';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';

const ReportList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0,
        last: true
    });

    const [order, setOrder] = useState({
        sortColumn: 'fileNumber',
        sortOrder: 'ASC'
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const { username, password } = useSelector(store => ({
        username: store.username,
        password: store.password
    }));

    const pendingApiCall = useApiProgress('get', '/reports/getAllReports?page');

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async (page, sortOrder, columnName) => {
        setLoadFailure(false);
        try {
            if (columnName === 'laborant' || order.sortColumn === 'laborant') {
                if (page === undefined) {
                    const response = await getReportsSortedByLaborant(0, sortOrder, username, password);
                    setPage(response.data);
                } else {
                    const response = await getReportsSortedByLaborant(page, order.sortOrder, username, password);
                    setPage(previousPage => ({
                        ...response.data,
                        content: [...previousPage.content, ...response.data.content]
                    }));
                }
            } else {
                if (page === undefined) {
                    const response = await getReports(0, columnName, sortOrder, username, password);
                    setPage(response.data);
                } else {
                    const response = await getReports(page, order.sortColumn, order.sortOrder, username, password);
                    setPage(previousPage => ({
                        ...response.data,
                        content: [...previousPage.content, ...response.data.content]
                    }));
                }
            }
        } catch {
            setLoadFailure(true);
        }
    };

    const handleSort = (columnName) => {
        const newSortOrder = order.sortColumn === columnName ? (order.sortOrder === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
        if (order.sortColumn === columnName) {
            setOrder({ ...order, sortOrder: newSortOrder });
        } else {
            setOrder({ sortColumn: columnName, sortOrder: newSortOrder });
        }

        loadReports(undefined, newSortOrder, columnName);
    };

    const { t } = useTranslation();
    const { content: reports, last, number } = page;
    let actionDiv = (
        <div onClick={pendingApiCall ? () => { } : () => loadReports(number + 1)} className='mt-1 p-4 alert alert-secondary text-center' style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer' }}>
            {pendingApiCall ? <Spinner size="23px" /> :
                last ? t("All Reports Displayed") :
                    t("Show More Reports")}
        </div>
    );

    const sortDesc = (
        <div className="icon-container">
            <svg id='sortDesc' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" /></svg>
        </div>
    )
    const sortAsc = (
        <div className="icon-container">
            <svg id='sortAsc' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
        </div>
    )

    return (
        <div className='row'>
            <h1 className="text-center mb-4">{t('Reports')}</h1>
            <div className='col-md-1 col-lg-2'></div>
            <div id='reports' className='col-md-10 col-lg-8'>
                <div className='card table-responsive'>
                    <div className='card-header px-2 list-group list-group-flush p-1 pb-2'>
                        <table className='table mb-1'>
                            <tr className='d-flex justify-content-around'>
                                <th onClick={() => handleSort('fileNumber')} id='reportsTableH1'>
                                    File Number
                                    {sortDesc} </th>
                                <th onClick={() => handleSort('dateOfReport')} id='reportsTableH2'>
                                    Date of Report
                                    {sortAsc}</th>
                                <th onClick={() => handleSort('patientName')} id='reportsTableH3'>Patient Name</th>
                                <th onClick={() => handleSort('patientSurname')} id='reportsTableH4'>Patient Surname</th>
                                <th onClick={() => handleSort('laborant')} id='reportsTableH5'>Laborant Name Surname</th>
                            </tr>
                        </table>
                    </div>
                    <table className='table mb-0'>
                        <tbody>
                            {/* <tr className='list-group list-group-flush'> */}
                            <div className='list-group list-group-flush'>
                                {
                                    reports.map(report => (
                                        <ReportListItem key={report.fileNumber} report={report} />
                                    )
                                    )
                                }
                            </div>
                            {/* </tr> */}
                        </tbody>
                    </table>
                    {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
                </div>
                {actionDiv}
            </div>
            <div className='col-md-1 col-lg-2'></div>
        </div>
    );
}

export default ReportList;
