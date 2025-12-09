export const getUsers = async () => {
  const response = await fetch('/api/admin/users');
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch users');
  }
  const data = await response.json();
  return data;
};
