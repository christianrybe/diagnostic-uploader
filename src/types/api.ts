export interface ApiError {
  message: string;
  code: number;
}

export interface UploadApiResponse {
  data?: {
    id: string;
  };
  error?: ApiError;
}

export interface File {
  id: string;
  url: string;
}
export interface ListFilesApiResponse {
  data?: {
    files?: File[];
  };
  error?: ApiError;
}
