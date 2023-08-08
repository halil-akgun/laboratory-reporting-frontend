import React, { useState, useEffect } from 'react';
import { getReports } from '../api/apiCalls';
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
        console.log('useEffect')
        loadReports();
    }, []);

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadReports(nextPage);
    };

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadReports(previousPage);
    };

    const loadReports = async pageNumber => {
        setLoadFailure(false);
        try {
            const response = await getReports(pageNumber, page.size, username, password, order.sortColumn, order.sortOrder);
            setPage(response.data);
        } catch {
            setLoadFailure(true);
        }
    };

    const handleSort = (columnName) => {
        const sortOrder = order.sortColumn === columnName ? (order.sortOrder === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
        if (order.sortColumn === columnName) {
            setOrder({ ...order, sortOrder });
        } else {
            setOrder({ sortColumn: columnName, sortOrder });
        }

        loadReports();
    };

    const { t } = useTranslation();
    const { content: reports, first, last } = page;
    let actionDiv = (
        <div>
            {first === false && (<button className='btn btn-sm btn-light' onClick={onClickPrevious}>{t("Previous")}</button>)}
            {last === false && (<button className='btn btn-sm btn-light float-end' onClick={onClickNext}>{t("Next")}</button>)}
        </div>
    );
    if (pendingApiCall) {
        actionDiv = (
            <Spinner />
        );
    };
    return (
        <div className='row'>
            <h1 className="text-center mb-4">{t('Reports')}</h1>
            <div className='col-md-1 col-lg-2'></div>
            <div className='col-md-10 col-lg-8'>
                <div className='card'>
                    <div className='card-header list-group list-group-flush p-1'>
                        <table className='table mb-0'>
                            <tr className='d-flex justify-content-around'>
                                <th onClick={() => handleSort('fileNumber')} id='reportsTableH1'>File Number</th>
                                <th id='reportsTableH2'>Date of Report</th>
                                <th id='reportsTableH3'>Patient Name</th>
                                <th id='reportsTableH4'>Patient Surname</th>
                                <th id='reportsTableH5'>Laborant Name Surname</th>
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
                    {actionDiv}
                    {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
                </div>
            </div>
            <div className='col-md-1 col-lg-2'></div>
        </div>
    );
}

export default ReportList;

