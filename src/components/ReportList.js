import React, { useState, useEffect } from 'react';
import { getAllReports, searchInReports } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import ReportListItem from './ReportListItem';
import { useSelector } from 'react-redux';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';

const ReportList = (props) => {

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

    let myReports = '';
    if (props.isMyReports) {
        myReports = username;
    }

    const pendingApiCall = useApiProgress('get', '/reports/getAllReports?page');
    const [search, setSearch] = useState({
        searchTerm: '',
        startDate: '',
        endDate: ''
    });
    const { t } = useTranslation();
    const { content: reports, last, number, totalElements } = page;
    const { searchTerm, startDate, endDate } = search;
    let IsItFiltered = searchTerm || startDate || endDate;


    useEffect(() => {
        loadReports();
    }, []); // Infinite loop occurs when we don't add "[]"

    const loadReports = async (pageNumber, sortOrder, columnName) => {
        setLoadFailure(false);
        try {
            if (pageNumber === undefined) {
                const response = await getAllReports(0, columnName, sortOrder, myReports, username, password);
                setPage(response.data);
            } else {
                const response = await getAllReports(pageNumber, order.sortColumn, order.sortOrder, myReports, username, password);
                setPage(previousPage => ({
                    ...response.data,
                    content: [...previousPage.content, ...response.data.content]
                }));
            }
        } catch {
            setLoadFailure(true);
        }
    };

    const filterReports = async (pageNumber, sortOrder, columnName) => {
        setLoadFailure(false);
        try {
            if (pageNumber === undefined) {
                const response = await searchInReports(0, columnName, sortOrder, search.searchTerm, search.startDate, search.endDate, myReports, username, password);
                setPage(response.data);
            } else {
                const response = await searchInReports(pageNumber, order.sortColumn, order.sortOrder, search.searchTerm, search.startDate, search.endDate, myReports, username, password);
                setPage(previousPage => ({
                    ...response.data,
                    content: [...previousPage.content, ...response.data.content]
                }));
            }
        } catch {
            setLoadFailure(true);
        }
    };

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setSearch(prevSearch => ({
            ...prevSearch,
            [name]: value
        }));
    };

    const handleSort = (columnName) => {
        const newSortOrder = order.sortColumn === columnName ? (order.sortOrder === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
        if (order.sortColumn === columnName) {
            setOrder({ ...order, sortOrder: newSortOrder });
        } else {
            setOrder({ sortColumn: columnName, sortOrder: newSortOrder });
        }

        if (IsItFiltered) {
            filterReports(undefined, newSortOrder, columnName);
        } else {
            loadReports(undefined, newSortOrder, columnName);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!pendingApiCall) {
            filterReports(undefined, order.sortOrder, order.sortColumn);
        }
    };

    let actionDiv = (
        <div
            id='showMoreReports'
            onClick={(pendingApiCall || last) ? () => { } :
                IsItFiltered ? () => filterReports((number + 1), order.sortOrder, order.sortColumn) :
                    () => loadReports((number + 1), order.sortOrder, order.sortColumn)}
            className='mt-1 py-2 alert alert-secondary text-center'
            style={{ cursor: (pendingApiCall || last) ? 'not-allowed' : 'pointer' }}>
            {pendingApiCall ? <Spinner size="24px" /> :
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
            <div className='col-md-1 col-lg-2'></div>
            <div id='reports' className='col-md-10 col-lg-8'>
                <div className='mb-2 mt-3'>
                    <div className='d-flex gap-1'>
                        <div className='input-group text-center'>
                            <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
                                <span className='mx-auto'>{t('Phrase to Search')}</span>
                                <div className='input-group'>
                                    <input
                                        className='py-1 form-control'
                                        type='text'
                                        name='searchTerm'
                                        placeholder={t('Search in Reports')}
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                    <button
                                        type="submit"
                                        className="py-1 btn btn-primary"
                                        disabled={pendingApiCall}
                                    >
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='text-center input-group'>
                            <span className='mx-auto'>{t('Date Range')}</span>
                            <div className='input-group'>
                                <input
                                    className='py-1 form-control filterByDateFontSize'
                                    type='date'
                                    name='startDate'
                                    value={startDate}
                                    onChange={handleSearch}
                                />
                                <input
                                    className='py-1 form-control filterByDateFontSize'
                                    type='date'
                                    name='endDate'
                                    value={endDate}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id='reports' className='card table-responsive'>
                    <div className='card-header py-0 px-2 list-group list-group-flush p-1 pb-2'>
                        <table className='table mb-0'>
                            <thead>
                                <tr className='d-flex justify-content-around'>
                                    <th onClick={() => handleSort('fileNumber')} id='reportsTableH1'>
                                        {t('File Number')}
                                        {order.sortColumn === 'fileNumber' ? (order.sortOrder === 'ASC' ? sortAsc : sortDesc) : ('')}
                                    </th>
                                    <th onClick={() => handleSort('dateOfReport')} id='reportsTableH2'>
                                        {t('Date of Report')}
                                        {order.sortColumn === 'dateOfReport' ? (order.sortOrder === 'ASC' ? sortAsc : sortDesc) : ('')}
                                    </th>
                                    <th onClick={() => handleSort('patientName')} id='reportsTableH3'>
                                        <span>{t('Patient Name')}</span>
                                        <span id='orderIcon'>{order.sortColumn === 'patientName' ? (order.sortOrder === 'ASC' ? sortAsc : sortDesc) : ('')}</span>
                                    </th>
                                    <th onClick={() => handleSort('patientSurname')} id='reportsTableH4'>
                                        {t('Patient Surname')}
                                        {order.sortColumn === 'patientSurname' ? (order.sortOrder === 'ASC' ? sortAsc : sortDesc) : ('')}
                                    </th>
                                    <th onClick={() => handleSort('laborant')} id='reportsTableH5'>
                                        {t('Laborant Name Surname')}
                                        {order.sortColumn === 'laborant' ? (order.sortOrder === 'ASC' ? sortAsc : sortDesc) : ('')}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <table className='table mb-0'>
                        <tbody>
                            {
                                reports.map(report => (
                                    <ReportListItem key={report.fileNumber} report={report} searchTerm={searchTerm} />
                                )
                                )
                            }
                        </tbody>
                    </table>
                    {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
                </div>
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                        {actionDiv}
                    </div>
                    <div className='col-2 text-end'>
                        <span>{reports.length}/{totalElements || 0}</span>
                    </div>
                </div>
            </div>
            <div className='col-md-1 col-lg-2'></div>
        </div>
    );
}

export default ReportList;
