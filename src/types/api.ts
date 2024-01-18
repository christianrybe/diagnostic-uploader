export interface UploadApiResponse {
  data?: {
    id: string;
  };
  error?: {
    message: string;
    code: number;
  };
}

export interface File {
  id: string;
  url: string;
}
export interface ListFilesApiResponse {
  data?: {
    files?: File[];
  };
  error?: {
    message: string;
    code: number;
  };
}
