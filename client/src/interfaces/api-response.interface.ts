
export interface ApiResponse<T> {
  metadata: IMetadata;
  record: T;
}

interface IMetadata {
  createdAt: Date;
  id: string;
  name: string;
  private: boolean;
}