import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import ReportImageWithDefault from '../components/ReportImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import { deleteReport, updateReport } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Modal from './Model';


const Report = props => {

    const [updatedFileNumber, setUpdatedFileNumber] = useState("");
    const [updatedPatientName, setUpdatedPatientName] = useState("");
    const [updatedPatientSurname, setUpdatedPatientSurname] = useState("");
    const [updatedPatientIdNumber, setUpdatedPatientIdNumber] = useState("");
    const [updatedDiagnosisTitle, setUpdatedDiagnosisTitle] = useState("");
    const [updatedDiagnosisDetails, setUpdatedDiagnosisDetails] = useState("");
    const [updatedDateOfReport, setUpdatedDateOfReport] = useState("");
    const [currentImageOfReport, setCurrentImageOfReport] = useState();
    const [updatedImageOfReport, setUpdatedImageOfReport] = useState();
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const [report, setReport] = useState({});
    const [editable, setEditable] = useState(false);
    const [inEditMode, setInEditMode] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [modelVisible, setModelVisible] = useState(false);
    const { t } = useTranslation();
    let removeImage = false;


    const { id, fileNumber, patientName, patientSurname, patientIdNumber, diagnosisTitle,
        diagnosisDetails, dateOfReport, imageOfReport, laborantUsername } = report || {};


    useEffect(() => {
        setReport(props.report);
    }, [props.report])

    useEffect(() => {
        setEditable(laborantUsername === loggedInUsername || loggedInUsername === 'admin');
    }, [laborantUsername, loggedInUsername])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => {
            const updatedErrors = { ...previousValidationErrors };

            if (updatedFileNumber) {
                delete updatedErrors['fileNumberWithId'];
            }
            if (updatedPatientName) {
                delete updatedErrors['patientName'];
            }
            if (updatedPatientSurname) {
                delete updatedErrors['patientSurname'];
            }
            if (updatedPatientIdNumber) {
                delete updatedErrors['patientIdNumber'];
            }
            if (updatedDiagnosisTitle) {
                delete updatedErrors['diagnosisTitle'];
            }
            if (updatedDiagnosisDetails) {
                delete updatedErrors['diagnosisDetails'];
            }
            if (updatedDateOfReport) {
                delete updatedErrors['dateOfReport'];
            }
            if (updatedImageOfReport) {
                delete updatedErrors['imageOfReport'];
            }
            return updatedErrors;
        });
    }, [updatedFileNumber, updatedPatientName, updatedPatientSurname, updatedPatientIdNumber, updatedDiagnosisTitle, updatedDiagnosisDetails, updatedDateOfReport, updatedImageOfReport])

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedFileNumber(undefined);
            setUpdatedPatientName(undefined);
            setUpdatedPatientSurname(undefined);
            setUpdatedPatientIdNumber(undefined);
            setUpdatedDiagnosisTitle(undefined);
            setUpdatedDiagnosisDetails(undefined);
            setUpdatedDateOfReport(undefined);
            setCurrentImageOfReport(imageOfReport);
        } else {
            setUpdatedFileNumber(fileNumber);
            setUpdatedPatientName(patientName);
            setUpdatedPatientSurname(patientSurname);
            setUpdatedPatientIdNumber(patientIdNumber);
            setUpdatedDiagnosisTitle(diagnosisTitle);
            setUpdatedDiagnosisDetails(diagnosisDetails);
            setUpdatedDateOfReport(dateOfReport);
            setCurrentImageOfReport(imageOfReport);
        }
    }, [inEditMode, fileNumber, patientName, patientSurname, patientIdNumber,
        diagnosisTitle, diagnosisDetails, dateOfReport, imageOfReport])

    const onClickSave = async () => {
        let imageTemp;
        removeImage = false;
        if (updatedImageOfReport) {
            imageTemp = updatedImageOfReport.split(',')[1];
        } else if (currentImageOfReport === null || currentImageOfReport === undefined) {
            removeImage = true;
        }

        const body = {
            imageOfReport: imageTemp,
            fileNumberWithId: updatedFileNumber + '-' + id,
            patientName: updatedPatientName,
            patientSurname: updatedPatientSurname,
            patientIdNumber: updatedPatientIdNumber,
            diagnosisTitle: updatedDiagnosisTitle,
            diagnosisDetails: updatedDiagnosisDetails,
            dateOfReport: updatedDateOfReport,
        };

        try {
            const response = await updateReport(id, removeImage, body);
            setInEditMode(false);
            setReport(response.data);
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }
    }

    const onClickDelete = async () => {
        await deleteReport(id);
        props.history.goBack();
    }

    const onClickCancel = async () => {
        setModelVisible(false);
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setUpdatedImageOfReport(fileReader.result);
        }
        fileReader.readAsDataURL(file);
        removeImage = false;
    }

    const pendingApiCall = useApiProgress('put', '/reports/' + id);
    const pendingApiCallDelete = useApiProgress('delete', '/reports/delete/' + id);

    const onClearImage = () => {
        setUpdatedImageOfReport(null);
        setCurrentImageOfReport(null);
        removeImage = true;
    }

    const { fileNumberWithId: fileNumberError, patientName: patientNameError,
        patientSurname: patientSurnameError, patientIdNumber: patientIdNumberError,
        diagnosisTitle: diagnosisTitleError, diagnosisDetails: diagnosisDetailsError,
        dateOfReport: dateOfReportError, imageOfReport: imageOfReportError } = validationErrors;

    let typeOfInput = !inEditMode ? 'NonInput' : '';
    let typeOfTextArea = !inEditMode ? 'NonInput' : 'textarea';
    let typeOfDate = !inEditMode ? 'NonInput' : 'date';

    return (
        <>
            <div className="container" style={{ marginBottom: '77px' }}>
                <div className="row">
                    <h1 className="text-center mb-3 mt-3">{t('Report')}</h1>
                    <div className="col-md-6 mb-3">
                        <form>
                            <Input
                                name="dateOfReport"
                                type={typeOfDate}
                                text={dateOfReport}
                                label={t('Date of Report')}
                                defaultValue={dateOfReport}
                                error={dateOfReportError}
                                onChange={event => { setUpdatedDateOfReport(event.target.value); }} />
                            <Input
                                name="fileNumber"
                                type={typeOfInput}
                                text={fileNumber}
                                label={t('File Number')}
                                defaultValue={fileNumber}
                                error={fileNumberError}
                                onChange={event => { setUpdatedFileNumber(event.target.value); }} />
                            <Input
                                name="patientName"
                                type={typeOfInput}
                                text={patientName}
                                label={t('Patient Name')}
                                defaultValue={patientName}
                                error={patientNameError}
                                onChange={event => { setUpdatedPatientName(event.target.value); }} />
                            <Input
                                name="patientSurname"
                                type={typeOfInput}
                                text={patientSurname}
                                label={t('Patient Surname')}
                                defaultValue={patientSurname}
                                error={patientSurnameError}
                                onChange={event => { setUpdatedPatientSurname(event.target.value); }} />
                            <Input
                                name="patientIdNumber"
                                type={typeOfInput}
                                text={patientIdNumber}
                                label={t('Patient Id Number')}
                                defaultValue={patientIdNumber}
                                error={patientIdNumberError}
                                onChange={event => { setUpdatedPatientIdNumber(event.target.value); }} />
                            <Input
                                name="diagnosisTitle"
                                type={typeOfInput}
                                text={diagnosisTitle}
                                label={t('Diagnosis Title')}
                                defaultValue={diagnosisTitle}
                                error={diagnosisTitleError}
                                onChange={event => { setUpdatedDiagnosisTitle(event.target.value); }} />
                            <Input
                                name="diagnosisDetails"
                                type={typeOfTextArea}
                                text={diagnosisDetails}
                                label={t('Diagnosis Details')}
                                defaultValue={diagnosisDetails}
                                error={diagnosisDetailsError}
                                onChange={event => { setUpdatedDiagnosisDetails(event.target.value); }} />
                            {inEditMode &&
                                <Input
                                    label={t('Image of Report')}
                                    type='file'
                                    error={imageOfReportError}
                                    onChange={onChangeFile} />
                            }
                        </form>
                    </div>
                    <div className="col-md-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                        <ReportImageWithDefault
                            width={"73%"}
                            image={currentImageOfReport}
                            tempimage={updatedImageOfReport}
                        />
                        {((updatedImageOfReport || currentImageOfReport) && inEditMode) && <button
                            className='btn btn-light mb-2 text-danger p-1  mt-2'
                            onClick={onClearImage}>
                            <i className="fa-regular fa-trash-can fa-sm me-2"></i>
                            {t("Remove Image")}
                        </button>}
                    </div>
                </div>
                <div className="text-center mt-2">
                    {!editable ? '' : inEditMode ?
                        <>
                            <ButtonWithProgress
                                className='btn btn-primary'
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={
                                    <>
                                        <i className="ms-2 me-2 fa-solid fa-floppy-disk fa-sm"></i>
                                        {t("Save")}
                                    </>
                                }
                            />
                            <button
                                className='btn btn-light ms-2'
                                onClick={() => setInEditMode(false)}
                                disabled={pendingApiCall}>
                                <i className="me-2 fa-solid fa-xmark fa-sm"></i>
                                {t("Cancel")}
                            </button>
                        </>
                        :
                        <>
                            <button
                                className='btn btn-primary'
                                onClick={() => setInEditMode(true)} >                                <i className="me-2 fa-sharp fa-solid fa-pen fa-sm"></i>
                                {t("Update")}
                            </button>
                            {loggedInUsername === 'admin' && <button
                                className='btn btn-danger ms-2'
                                onClick={() => setModelVisible(true)}
                                disabled={pendingApiCall}>
                                <i className="me-2 fa-trash-can fa-sharp fa-solid fa-sm"></i>
                                {t("Delete")}
                            </button>}
                        </>
                    }
                </div>
            </div>


            <Modal
                onClickOk={onClickDelete}
                title={t('Delete Report')}
                onClickCancel={onClickCancel}
                visible={modelVisible}
                pendingApiCall={pendingApiCallDelete}
                okButton={t('Delete Report')}
                message={
                    <div>
                        <div>
                            <strong>{t('Are you sure you want to delete the report?')}</strong>
                        </div>
                    </div>
                } />
        </>
    );
};

export default Report;


