export const formatDate = (date) => new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toLocaleDateString();
