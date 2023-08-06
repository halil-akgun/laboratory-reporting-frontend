import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Register': 'Register',
                'Password mismatch.': 'Password mismatch.',
                'Name': 'Name',
                'Surname': 'Surname',
                'Username': 'Username',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Hospital ID Number': 'Hospital ID Number',
                'I accept the accuracy of the above information.': 'I accept the accuracy of the above information.',
                'Login': 'Login',
                'Logout': 'Logout',
                'Next': 'Next >',
                'Previous': '< Previous',
                'Load Failure': 'Load Failure',
                'User not found.': 'User not found.',
                'Edit': 'Edit',
                'Save': 'Save',
                'Choose A Profile Picture': 'Choose A Profile Picture',
                'Cancel': 'Cancel',
                'My Profile': 'My Profile',
                'Save Report': 'Save Report',
                'File Number': 'File Number',
                'Patient Name': 'Patient Name',
                'Patient Surname': 'Patient Surname',
                'Patient Id Number': 'Patient Id Number',
                'Diagnosis Title': 'Diagnosis Title',
                'Diagnosis Details': 'Diagnosis Details',
                'Date of Report': 'Date of Report',
                'Image of Report': 'Image of Report',
                'Reports': 'Reports',
                'Users': 'Users'
            }
        },
        tr: {
            translations: {
                'Register': 'Kayıt Ol',
                'Password mismatch.': 'Aynı şifreyi giriniz.',
                'Name': 'İsim',
                'Surname': 'Soyisim',
                'Username': 'Kullanıcı İsmi',
                'Password': 'Şifre',
                'Password Repeat': 'Şifreyi Tekrarlayın',
                'Hospital ID Number': 'Hastane ID Numarası',
                'I accept the accuracy of the above information.': 'Yukarıdaki bilgilerin doğruluğunu kabul ediyorum.',
                'Login': 'Giriş',
                'Logout': 'Çıkış',
                'Next': 'Sonraki >',
                'Previous': '< Önceki',
                'Load Failure': 'Liste Alınamadı',
                'User not found.': 'Kullanıcı bulunamadı.',
                'Edit': 'Düzenle',
                'Save': 'Kaydet',
                'Choose A Profile Picture': 'Profil Resmi Seçin',
                'Cancel': 'İptal',
                'My Profile': 'Hesabım',
                'Save Report': 'Rapor Kaydet',
                'File Number': 'Dosya Numarası',
                'Patient Name': 'Hasta Adı',
                'Patient Surname': 'Hasta Soyadı',
                'Patient Id Number': 'Hasta TC Numarası',
                'Diagnosis Title': 'Teşhis Başlığı',
                'Diagnosis Details': 'Teşhis Ayrıntıları',
                'Date of Report': 'Rapor Tarihi',
                'Image of Report': 'Raporun Resmi',
                'Reports': 'Raporlar',
                'Users': 'Kullanıcılar'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;