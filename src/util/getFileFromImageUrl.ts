
export const getFileFromImageUrl = async (imageUrl: string) => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image (status ${response.status})`);
        }
        const blob = await response.blob();
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        const file = new File([blob], filename, { type: blob.type });
        return file;
    } 
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}