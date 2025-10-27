const PHONE_NUMBER_REGEX = /^\d{9}$/

export function validatePhoneNumber(phoneNumber: string): boolean {
    return PHONE_NUMBER_REGEX.test(phoneNumber);
}

export function validateVerificationCode(code: string, correctCode : string): boolean {
    return code === correctCode
}