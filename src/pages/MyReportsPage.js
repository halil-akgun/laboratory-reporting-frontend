import React from 'react';
import ReportList from '../components/ReportList';
import { useTranslation } from 'react-i18next';

const MyReportsPage = () => {
    const { t } = useTranslation();
    return (
        <div className='container mt-4'>
            <h1 className="text-center mb-2">{t('My Reports')}</h1>
            <ReportList isMyReports={true} />
        </div>
    );
};

export default MyReportsPage;