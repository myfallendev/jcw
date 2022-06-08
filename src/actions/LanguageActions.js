import _filter from 'lodash/filter';
import axiosWrapper from '../utils/axiosWrapper';

function changeLang(language) {
    localStorage.setItem("local_lang", language);
    return {
        language: language,
        type: 'CHANGE_LANGUAGE',
    }
}

export function changeLanguage(language, userid) {
    return (dispatch) => {
        let languageUserSettingsId = 15; // 15 - id настройки языка в бд (Settings)
        let userSettingsLang = null;
        if (userid !== undefined) { // Запрос от неавторизованного пользователя с лэндинга
            axiosWrapper('/api/UserSettings?page=1&itemsPerPage=15',
                {
                    method: 'GET',
                    credentials: 'same-origin',
                })
                .then(response => {
                    let filter = _filter(response.data, function (o) {
                        return o.settingId === languageUserSettingsId;
                    });
                    if (filter.length) userSettingsLang = response.data[0].value;
                    let output = null;
                    if (language !== null && language !== undefined) output = language;
                    if (language !== null && userSettingsLang !== null && language !== userSettingsLang) output = language;
                    if (language !== null && userSettingsLang !== null && language === userSettingsLang) output = language;
                    if (language === null && userSettingsLang !== null && language !== userSettingsLang) output = userSettingsLang;
                    if (language === null && userSettingsLang === null) output = 'en';
                    if (output === null) output = 'en';
                    dispatch(changeLang(output));
                    let queryType = (filter.length) ? 'PUT' : 'POST';
                    axiosWrapper('/api/UserSettings',
                        {
                            method: queryType,
                            credentials: 'same-origin',
                            headers: {
                                'Accept': 'application/json;',
                                'Content-Type': 'application/json-patch+json; charset=utf-8'
                            },
                            data: JSON.stringify({
                                'userId': userid,
                                'settingId': languageUserSettingsId,
                                'value': output
                            })
                        })
                });
        } else {
            if (language === null || language === undefined) {
                language = 'en';
            }
            dispatch(changeLang(language));
        }
    }

}