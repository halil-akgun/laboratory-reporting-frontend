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
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const { username, password } = useSelector(store => ({
        username: store.username,
        password: store.password
    }));

    const pendingApiCall = useApiProgress('get', '/reports/getAllReports?page');

    useEffect(() => {
        loadReports();
    }, [])

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
            const response = await getReports(pageNumber, page.size, username, password);
            setPage(response.data);
        } catch {
            setLoadFailure(true);
        }
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
        <div className='card'>
            <h3 className='card-header text-center'>
                {t("Reports")}
            </h3>
            <div className='list-group list-group-flush'>
                {
                    reports.map(report => (
                        <ReportListItem key={report.fileNumber} report={report} />
                    )
                    )
                }
            </div>
            {actionDiv}
            {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
        </div>
    );
}

export default ReportList;

