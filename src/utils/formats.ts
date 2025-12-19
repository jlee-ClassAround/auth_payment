export function dateWithoutWeekFormat(date: Date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function dateFormat(date: Date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }).format(date);
}

export function dateTimeFormat(date: Date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(date);
}

export function dateDashFormat(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat('ko-KR', {
        style: 'decimal',
    }).format(price);
}

export const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[^0-9]/g, '').slice(0, 11);
};

export const normalizeKRPhoneNumber = (phone: string) => {
    return phone.replace(/[^0-9]/g, '').replace(/^82/, '0');
};
