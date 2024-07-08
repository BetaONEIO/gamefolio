export interface DynamicObject {
  [key: string]: any;
}

export type HttpMethods = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

export type Accept = "application/json";
export type ContentType = "application/json" | "multipart/form-data";

export type Headers = {
  Accept?: Accept;
  "Content-Type"?: ContentType;
  Authorization?: string;
  [key: string]: string;
};

export interface ActionParams {
  [index: string]: any;
  payload?: {};
  successCallback?: (response?: any) => void;
  errorCallback?: (response?: any) => void;
}

export type APIParams = {
  method: string;
  endpoint?: string;
  baseURL?: string;
  payload?: any;
  isToken?: boolean;
  isFormData?: boolean;
  file?: string;
  headers?: HeadersInit;
  toJSON?: boolean;
};

export type APIOption = {
  method: string;
  headers: HeadersInit;
  credentials?: RequestCredentials;
  body?: string | FormData | Blob;
  signal?: AbortSignal;
};
