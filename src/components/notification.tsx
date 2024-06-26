import styles from '@styles/Notification.module.css';
import { NotificationVariante } from '@lib/types';
import { ReactNode } from "react";

/**
 * Notification component. It is used to display a notification at the bottom of the screen. The notification can be of different colors and can be displayed with a fade-in effect.
 * @param className permits to add or override the default style
 * @param variante permits to choose the color of the notification. The possible values are "success", "info", "warning", "danger" and undefined
 * @param children is the text content of the notification
 * @returns 
 */
export default function Notification({ className, id, variante, children }:
    {
        className?: string,
        id?: string,
        variante?: NotificationVariante,
        children: ReactNode,
    }) {

    let classVariante = "";
    let classVarianteDot = "";

    switch (variante) {
        case "success":
            classVariante = "bg-green-300 border-green-500";
            classVarianteDot = "bg-green-500 border-green-200";
            break;

        case "info":
            classVariante = "bg-blue-300 border-blue-500";
            classVarianteDot = "bg-blue-500 border-blue-200";
            break;

        case "warning":
            classVariante = "bg-orange-300 border-orange-500";
            classVarianteDot = "bg-orange-500 border-orange-200";
            break;

        case "danger":
            classVariante = "bg-red-300 border-red-500";
            classVarianteDot = "bg-red-500 border-red-200";
            break;

        case undefined:
            classVariante = "bg-white border-gray-500";
            classVarianteDot = "bg-gray-500 border-gray-200";
            break;
    }

    return <div id={id} className={`fixed flex flex-row items-center justify-center gap-2 rounded-md border px-2 text-sm shadow-md ${styles.notificationAnimation} ${classVariante} ${className}`}>
        <div className={`size-[8px] rounded-full border ${classVarianteDot}`}></div>
        <div>{children}</div>
    </div>
}