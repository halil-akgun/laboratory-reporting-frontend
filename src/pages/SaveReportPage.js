import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from "../shared/ApiProgress";
import { saveReport } from "../api/apiCalls";
import ReportImageWithDefault from '../components/ReportImageWithDefault';

const SaveReportPage = props => {

    const [form, setForm] = useState({
        fileNumber: null,
        patientName: null,
        patientSurname: null,
        patientIdNumber: null,
        diagnosisTitle: null,
        diagnosisDetails: null,
        dateOfReport: null,
        imageOfReport: null
    })
    const [errors, setErrors] = useState({});
    const [newImage, setNewImage] = useState();

    const onChange = event => {

        const { name, value } = event.target;

        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    const onClickSaveReport = async event => {
        event.preventDefault();
        // The browser's automatic sending of form content is blocked.
        // The content should be taken from the state, not the form.

        const { fileNumber, patientName, patientSurname, patientIdNumber, diagnosisTitle, diagnosisDetails, dateOfReport } = form;

        let imageTemp;
        if (newImage) {
            imageTemp = newImage.split(',')[1];
        }

        const body = {
            // username: username,
            // If the variable names of key and value are the same, it is sufficient to write one of them.
            fileNumber,
            patientName,
            patientSurname,
            patientIdNumber,
            diagnosisTitle,
            diagnosisDetails,
            dateOfReport,
            imageOfReport: imageTemp
        };

        try {
            await saveReport(body);
            props.history.goBack();
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        } // "await" is used because axios.post works asynchronously. "then/catch" could also be used.
    }

    const onClearImage = () => {
        setNewImage(null);
        setForm((previousForm) => ({ ...previousForm, imageOfReport: null }));
    }

    const { t } = useTranslation();

    const { fileNumber: fileNumberError, patientName: patientNameError, patientSurname: patientSurnameError, patientIdNumber: patientIdNumberError, diagnosisTitle: diagnosisTitleError, diagnosisDetails: diagnosisDetailsError, dateOfReport: dateOfReportError, imageOfReport: imageOfReportError } = errors;
    const pendingApiCall = useApiProgress('post', "/reports/save");

    return (
        <div className="container mt-4">
            <div className="row">
                <h1 className="text-center mb-3">{t('Save Report')}</h1>
                <div className="col-md-6 mb-3">
                    <form>

                        <Input type='date' name="dateOfReport" label={t('Date of Report')} error={dateOfReportError} onChange={onChange} />
                        <Input name="fileNumber" label={t('File Number')} error={fileNumberError} onChange={onChange} />
                        <Input name="patientName" label={t('Patient Name')} error={patientNameError} onChange={onChange} />
                        <Input name="patientSurname" label={t('Patient Surname')} error={patientSurnameError} onChange={onChange} />
                        <Input name="patientIdNumber" label={t('Patient Id Number')} error={patientIdNumberError} onChange={onChange} />
                        <Input name="diagnosisTitle" label={t('Diagnosis Title')} error={diagnosisTitleError} onChange={onChange} />
                        <Input type='textarea' name="diagnosisDetails" label={t('Diagnosis Details')} error={diagnosisDetailsError} onChange={onChange} />
                        <Input
                            label={t('Image of Report')}
                            type='file'
                            onChange={onChangeFile}
                            error={imageOfReportError} />

                    </form>
                </div>
                <div className="col-md-6 mb-3 d-flex flex-column align-items-center justify-content-center">
                    <ReportImageWithDefault
                        width={(newImage || form.imageOfReport) ? "100%" : "67%"}
                        image={form.imageOfReport}
                        tempimage={newImage} />
                    {newImage && <button
                        className='btn btn-light mb-2 text-danger p-0  mt-1'
                        onClick={onClearImage}>
                        <i class="fa-regular fa-trash-can fa-sm me-2"></i>
                        {t("Remove Image")}
                    </button>}
                </div>
            </div>
            <div className="text-center mb-3 mt-2">
                <ButtonWithProgress
                    className='btn btn-primary'
                    onClick={onClickSaveReport}
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
                    onClick={(e) => { e.preventDefault(); props.history.goBack(); }}
                    disabled={pendingApiCall}>
                    <i className="me-2 fa-solid fa-xmark fa-sm"></i>
                    {t("Cancel")}
                </button>
            </div>
        </div>
    )
}

export default SaveReportPage;
