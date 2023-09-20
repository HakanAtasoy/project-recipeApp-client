export interface Category{
    id: number;
    name: String;
    description: String;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
    deleted: boolean;
    imageData: Blob;
}