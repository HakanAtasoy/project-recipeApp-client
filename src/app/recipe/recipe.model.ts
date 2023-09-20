export interface Recipe{
    id: number;
    name: string;
    description: string;
    createDate: Date | null;
    updateDate: Date | null;
    deleteDate: Date | null;
    categoryId: number;
    categoryName: string;
    userId: number;
    userName: string;
    deleted: boolean;
    status: number;
    imageData: Blob | null;
    preparationTime: string
    servingSize: string;
    imageUrl?: string; // Add this property for the image URL

}