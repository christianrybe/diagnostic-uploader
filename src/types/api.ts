export interface UploadApiResponse {
  data?: {
    id: string;
  };
  error?: {
    message: string;
    code: number;
  };
}
