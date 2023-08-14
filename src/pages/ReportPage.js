import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getReport } from '../api/apiCalls'
import { useApiProgress } from "../shared/ApiProgress";
import Report from "../components/Report";
import Spinner from "../components/Spinner";

const SaveReportPage = props => {

    const [report, setReport] = useState({});
    const { id } = props.match.params;
    const { t } = useTranslation();
    const [notFound, setNotFound] = useState(false);
    const pendingApiCall = useApiProgress('get', '/reports/getReport/' + id);

    useEffect(() => {
        const loadReport = async () => {
            try {
                const response = await getReport(id);
                setReport(response.data);
                setNotFound(false);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadReport();
    }, [id]);


    if (pendingApiCall) {
        return (
            <Spinner />
        )
    }

    if (notFound) {
        return (
            <div className='container'>
                <div className="text-center alert alert-danger" role="alert">
                    <div className='mb-3 mt-2'>
                        <i className="fa-solid fa-circle-exclamation fa-2xl" style={{ color: '#9f2325' }}></i>
                    </div>
                    {t("Report not found.")}
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <Report report={report} history={props.history} />
        </div>
    );
};

export default SaveReportPage;
