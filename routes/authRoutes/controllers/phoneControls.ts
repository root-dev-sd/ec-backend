// // Types for validation result
// interface ValidationResult {
//   isValid: boolean;
//   error?: ValidationError;
// }

// // Enum for validation error types
// enum ValidationError {
//   INVALID_INPUT = "Input must be a non-empty string",
//   TOO_SHORT = "Name must be at least 5 characters long",
//   TOO_LONG = "Name must not exceed 60 characters",
//   INVALID_CHARACTERS = "Name can only contain letters and spaces (English and Arabic)",
// }

// /**
//  * Validates a full name according to specified rules.
//  * Rules:
//  * - Must be between 5 and 60 characters
//  * - Can only contain English letters, Arabic characters, and spaces
//  * - Multiple spaces are normalized to single spaces
//  * - Leading and trailing spaces are removed
//  *
//  * @param fullName - The full name to validate
//  * @returns ValidationResult object containing isValid boolean and optional error
//  */
// const isValidFullName = (
//   fullName: string | null | undefined
// ): ValidationResult => {
//   // Check for null/undefined and type
//   if (!fullName || typeof fullName !== "string") {
//     return {
//       isValid: false,
//       error: ValidationError.INVALID_INPUT,
//     };
//   }

//   // Normalize spaces and trim
//   const normalizedName = fullName.replace(/\s+/g, " ").trim();

//   // Check minimum length (5 characters)
//   if (normalizedName.length < 5) {
//     return {
//       isValid: false,
//       error: ValidationError.TOO_SHORT,
//     };
//   }

//   // Check maximum length (60 characters)
//   if (normalizedName.length > 60) {
//     return {
//       isValid: false,
//       error: ValidationError.TOO_LONG,
//     };
//   }

//   // Regular expression for valid name characters
//   // Includes:
//   // - English letters (a-z, A-Z)
//   // - Arabic characters ranges:
//   //   - Basic Arabic (\u0600-\u06FF)
//   //   - Arabic Supplement (\u0750-\u077F)
//   //   - Arabic Extended-A (\u08A0-\u08FF)
//   //   - Arabic Presentation Forms-A (\uFB50-\uFDFF)
//   //   - Arabic Presentation Forms-B (\uFE70-\uFEFF)
//   // - Spaces
//   const nameRegex =
//     /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]+$/;

//   if (!nameRegex.test(normalizedName)) {
//     return {
//       isValid: false,
//       error: ValidationError.INVALID_CHARACTERS,
//     };
//   }

//   return {
//     isValid: true,
//   };
// };

// // Type guard to check if an error is a ValidationError
// const isValidationError = (error: any): error is ValidationError => {
//   return Object.values(ValidationError).includes(error);
// };

// // generates a XXXXXX verification code to be sent to the user
// const generateVerificationCode = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // checks whether the phone number given by the user is a sudanes number or not. Retuns true or false.
// const isValidPhoneNumber = (phoneNumber: string) => {
//   const phoneRegex = /^\+?249?0?\d{9,10}$/;
//   return phoneRegex.test(phoneNumber);
// };

// export {
//   isValidFullName,
//   ValidationResult,
//   ValidationError,
//   isValidationError,
//   generateVerificationCode,
//   isValidPhoneNumber,
// };
