import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { saveReport } from "../api/apiCalls";

const SaveReport = props => {

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

    const dispatch = useDispatch();

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
            // setNewImage(fileReader.result);
            setForm(prevForm => ({
                ...prevForm,
                imageOfReport: fileReader.result
            }));
        }
        fileReader.readAsDataURL(file);
    }

    const onClickRegister = async event => {
        event.preventDefault();
        // The browser's automatic sending of form content is blocked.
        // The content should be taken from the state, not the form.

        const { history } = props;
        const { push } = history;
        const { fileNumber, patientName, patientSurname, patientIdNumber, diagnosisTitle, diagnosisDetails, dateOfReport, imageOfReport } = form;

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
            imageOfReport
        };

        try {
            await saveReport(body);
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        } // "await" is used because axios.post works asynchronously. "then/catch" could also be used.
    }

    const { t } = useTranslation();

    const { fileNumber: fileNumberError, patientName: patientNameError, patientSurname: patientSurnameError, patientIdNumber: patientIdNumberError, diagnosisTitle: diagnosisTitleError, diagnosisDetails: diagnosisDetailsError, dateOfReport: dateOfReportError, imageOfReport: imageOfReportError } = errors;
    const pendingApiCall = useApiProgress('post', "/reports/save");

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Save Report')}</h1>

                <Input name="fileNumber" label={t('File Number')} error={fileNumberError} onChange={onChange} />
                <Input name="patientName" label={t('Patient Name')} error={patientNameError} onChange={onChange} />
                <Input name="patientSurname" label={t('Patient Surname')} error={patientSurnameError} onChange={onChange} />
                <Input name="patientIdNumber" label={t('Patient Id Number')} error={patientIdNumberError} onChange={onChange} />
                <Input name="diagnosisTitle" label={t('Diagnosis Title')} error={diagnosisTitleError} onChange={onChange} />
                <Input name="diagnosisDetails" label={t('Diagnosis Details')} error={diagnosisDetailsError} onChange={onChange} />
                <Input name="dateOfReport" label={t('Date of Report')} error={dateOfReportError} onChange={onChange} />
                <Input
                    label={t('Image of Report')}
                    type='file'
                    onChange={onChangeFile}
                    error={imageOfReportError} />
                <br />
                <br />
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickRegister}
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Save')}
                    />
                </div>
            </form>
        </div>
    )
}

export default SaveReport;