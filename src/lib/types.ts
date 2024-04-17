/**
 * This file contains all types that are shared between the API and the Frontend
 */


// Get types from api components to use in the frontend

// Import API files
import { authFunctions } from "@api/auth";
import { taskFunctions } from "@api/task";

// Extract function list from each API files
export const functions = { ...authFunctions, ...taskFunctions };

// Global interface to dynamically share every available body functions
export interface Body {
    function: keyof typeof functions;
    param: any; // todo: type param for each function ?
};

export interface Data {
    message: string,
    content: object | null,
};

// Notification types
export type NotificationVariante = "success" | "info" | "warning" | "danger" | "";