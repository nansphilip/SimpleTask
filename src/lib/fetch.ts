'use server'

const serverAddress = 'http://localhost:3000';

interface Body {
    function: string,
    param: any,
};

/**
 * Sends an HTTP request to the specified address.
 * 
 * @param {string} address - The address to send the request to.
 * @param {object} body - The request body.
 * @param {string} [method='POST'] - The HTTP method to use (default: 'POST').
 * @param {HeadersInit} [headers={'Content-Type': 'application/json'}] - The headers to include in the request (default: {'Content-Type': 'application/json'}).
 * @returns {Promise<any>} - A promise that resolves to the response data.
 */
export default async function FetchMethod(
    body: Body,
    address: string = '/api', // API router address
    method: string = 'POST',
    headers: HeadersInit = { 'Content-Type': 'application/json' },
): Promise<any> {

    const response = await fetch(serverAddress + address, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    });

    return await response.json();
}