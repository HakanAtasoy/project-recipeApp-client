export interface Review{
    id: number;
    description: string;
    rating: number;
    createDate: Date | null;
    updateDate: Date | null;
    deleteDate: Date | null;
    recipeId: number;
    userId: number;
    userName: string;
    deleted: boolean;
}



