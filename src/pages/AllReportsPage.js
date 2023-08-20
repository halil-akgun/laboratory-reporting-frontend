import React from 'react';
import ReportList from '../components/ReportList';
import { useTranslation } from 'react-i18next';

const AllReportsPage = () => {
    const { t } = useTranslation();
    return (
        <div className='container'>
            <h1 className="text-center mb-2 mt-4">{t('All Reports')}</h1>
            <ReportList />
        </div>
    );
};

export default AllReportsPage;