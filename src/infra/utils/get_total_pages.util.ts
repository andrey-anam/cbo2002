export default function getTotalPages(totalItems: number, limit: string | number) {
    
    return Math.ceil(totalItems / Number(limit));
}
