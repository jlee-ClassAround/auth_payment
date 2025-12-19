'use server';

import { ALIMTALK_API_ENDPOINT, ALIMTALK_PROFILE_ID } from './constants';

interface Props {
    sendType: 'payment-confirm' | 'free-course-apply';
    phone: string;
    // templateCode?: string;
    username: string;
    courseName: string;
    courseDate?: string;
    // location?: string;
    roomLink?: string;
    roomCode?: string;
}

export const sendAlimtalk = async ({
    sendType,
    phone,
    // templateCode,
    username,
    courseName,
    courseDate,
    // location,
    roomLink,
    roomCode,
}: Props) => {
    try {
        const bodyData = JSON.stringify({
            '#{lecture}': courseName,
            '#{phone}': formatPhone(phone),
            '#{productTime}': courseDate,
            '#{profile}': ALIMTALK_PROFILE_ID,
            '#{고객명}': username,
            '#{강좌명}': courseName,

            ...(sendType === 'payment-confirm' && {
                // '#{templateCode}': 'cjb_buy',
                '#{강의시간}': courseDate,
                '#{입장코드}': roomCode,
                '#{링크명}': roomLink,
            }),
            ...(sendType === 'free-course-apply' && {
                // '#{templateCode}': 'cjb_free_comp',
                // '#{장소}': location,
                '#{링크명}': roomLink,
                '#{입장코드}': roomCode,
                '#{강의시간}': courseDate,
            }),
        });
        console.log(bodyData);
        const response = await fetch(ALIMTALK_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bodyData,
        });

        if (!response.ok) {
            console.log(response);
            return {
                success: false,
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};

function formatPhone(value: string) {
    const onlyNumber = value.replace(/[^0-9]/g, '');

    if (onlyNumber.length >= 11) {
        return onlyNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    // 10자리 대응
    if (onlyNumber.length === 10) {
        return onlyNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    return onlyNumber;
}
