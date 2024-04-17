// Dynamic types imports for the FetchMethod

// Import API files
import { authFunctions } from "@api/auth";
import { taskFunctions } from "@api/task";

// Extract function list from each API files
export const functions = { ...authFunctions, ...taskFunctions };

// Global interface to dynamically share every available body functions
export interface Body {
    function: keyof typeof functions;
    param: any;
};

export interface Data {
    message: string,
    content: object | null,
};

export type NotificationVariante = "success" | "info" | "warning" | "danger" | "";

export interface AddParams {
    userId: number,
    id: number,
    title: string,
    desc: string,
    status:"todo" | "pending" |"inprogress" | "done",
}

export interface UpdateParams {
    id: number,
    title: string,
    desc: string,
    status:"todo" | "pending" |"inprogress" | "done",
}