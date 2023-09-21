export interface Category{
    id: number;
    name: String;
    description: String;
    createDate: Date | null;
    updateDate: Date | null;
    deleteDate: Date | null;
    deleted: boolean;
    imageData: Blob | null;
    imageUrl?: string; // Add this property for the image URL

}