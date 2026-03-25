'use client';

import * as React from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/category.service';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any | null>(null);
  const [categoryName, setCategoryName] = React.useState('');

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data || []);
  };

  React.useEffect(() => {
    fetchCategories();

    const channel = supabase
      .channel('categories-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, (payload) => {
        fetchCategories();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSave = async () => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, categoryName);
      } else {
        await createCategory(categoryName);
      }
      fetchCategories(); // Manually refresh the list
      setIsDialogOpen(false);
      setSelectedCategory(null);
      setCategoryName('');
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category.');
    }
  };

  const openForm = (category: any | null = null) => {
    setSelectedCategory(category);
    setCategoryName(category?.name || '');
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openForm()}>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category Name" />
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => openForm(category)} className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCategoriesPage;
