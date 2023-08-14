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
                'All Reports': 'All Reports',
                'Other Users': 'Other Users',
                'Show More Reports': 'Show More Reports',
                'All Reports Displayed': 'All Reports Displayed',
                'File Number': 'File Number',
                'Date of Report': 'Date of Report',
                'Patient Name': 'Patient Name',
                'Patient Surname': 'Patient Surname',
                'Laborant Name Surname': 'Laborant Name Surname',
                'Delete User': 'Delete User',
                'Phrase to Search': 'Phrase to Search',
                'Search by Date Range': 'Search by Date Range',
                'Search in Reports': 'Search in Reports',
                'Delete User and Reports': 'Delete User and Reports',
                'Keep the reports. (All reports belonging to the user will be passed to the admin)': 'Keep the reports. (All reports belonging to the user will be passed to the admin)',
                'Are you sure you want to delete the user?': 'Are you sure you want to delete the user?',
                'Are you sure you want to delete the report?': 'Are you sure you want to delete the report?',
                'Delete': 'Delete',
                'Delete Report': 'Delete Report',
                'OK': 'OK',
                'Report': 'Report',
                'Update': 'Update',
                'Report not found.': 'Report not found.',
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
                'All Reports': 'Tüm Raporlar',
                'Other Users': 'Diğer Kullanıcılar',
                'Show More Reports': 'Daha Fazla Rapor Göster',
                'All Reports Displayed': 'Tüm Raporlar Görüntülendi',
                'File Number': 'Dosya Numarası',
                'Date of Report': 'Rapor Tarihi',
                'Patient Name': 'Hasta Adı',
                'Patient Surname': 'Hasta Soyadı',
                'Delete User': 'Kullanıcıyı Sil',
                'Phrase to Search': 'Aranacak İfade',
                'Search by Date Range': 'Tarih Aralığına Göre Arayın',
                'Laborant Name Surname': 'Laborant Adı Soyadı',
                'Search in Reports': 'Raporlarda Arayın',
                'Delete User and Reports': 'Kullanıcıyı ve Raporları Sil',
                'Keep the reports. (All reports belonging to the user will be passed to the admin)': 'Raporları saklayın. (Kullanıcıya ait tüm raporlar admine geçecektir)',
                'Are you sure you want to delete the user?': 'Kullanıcıyı silmek istediğinizden emin misiniz?',
                'Are you sure you want to delete the report?': 'Raporu silmek istediğinizden emin misiniz?',
                'Delete': 'Sil',
                'OK': 'Tamam',
                'Delete Report': 'Raporu Sil',
                'Report not found.': 'Rapor bulunamadı.',
                'Report': 'Rapor',
                'Update': 'Güncelle',
                'Users': 'Kullanıcılar'
            }
        }
    },
    fallbackLng: localStorage.getItem('lang') || 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    }
});

export default i18n;
