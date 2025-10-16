interface UserCredentials {
    email: string;
    password: string;
}

export interface ValidationResult {
    errorCode: number;
    errorMessage: string;
}

const passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]|:;"'<,>.?/])(?=.{8,})/;
const emailRegex: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
    return passwordRegex.test(password);
}

export function validateSignIn(props: UserCredentials): ValidationResult {
    let binaryErrorCodeString: string = "";
    let errorMessage: string;

    const isEmailValid: boolean = validateEmail(props.email);
    const isPasswordValid: boolean = validatePassword(props.password);

    binaryErrorCodeString += isEmailValid ? "0" : "1";
    binaryErrorCodeString += isPasswordValid ? "0" : "1";

    const errorCode: number = parseInt(binaryErrorCodeString, 2);

    switch (errorCode) {
        case 1:
            errorMessage = "Invalid password!";
            break;
        case 2:
            errorMessage = "Invalid e-mail address!";
            break;
        case 3:
            errorMessage = "Invalid e-mail and password!";
            break
        default:
            errorMessage = "";
    }

    return {
        errorCode: errorCode,
        errorMessage: errorMessage
    }
}