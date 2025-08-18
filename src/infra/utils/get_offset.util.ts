export default function getOffset(page: string | number, limit: string | number) {
    page = Number(page);
    limit = Number(limit);

    return (page -1) * limit;
}