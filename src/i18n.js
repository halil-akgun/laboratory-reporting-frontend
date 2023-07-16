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
                'Logout': 'Logout'
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
                'Logout': 'Çıkış'
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