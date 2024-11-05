import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FormInput from '../components/FormInput';
import { useNotification } from '../context/NotificationContext'; // Import useNotification hook

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: '$999', status: 'In Stock' },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: '$799', status: 'Out of Stock' },
    { id: 3, name: 'Headphones', category: 'Accessories', price: '$199', status: 'In Stock' },
  ]);

  const [open, setOpen] = useState(false);
  const [productForm, setProductForm] = useState({ id: '', name: '', category: '', price: '', status: '' });
  const { addNotification } = useNotification(); // Use useNotification hook

  const handleDialogOpen = (product) => {
    setProductForm(product || { id: '', name: '', category: '', price: '', status: '' });
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setProductForm({ id: '', name: '', category: '', price: '', status: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSaveProduct = () => {
    if (productForm.id) {
      // Update existing product
      setProducts((prevProducts) =>
        prevProducts.map((prod) => (prod.id === productForm.id ? productForm : prod))
      );
      addNotification('Product updated successfully', 'success'); // Trigger notification for update
    } else {
      // Add new product with a unique ID
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prevProducts) => [...prevProducts, { ...productForm, id: newId }]);
      addNotification('Product created successfully', 'success'); // Trigger notification for creation
    }
    handleDialogClose();
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    addNotification('Product deleted successfully', 'success'); // Trigger notification for deletion
  };

  const columns = [
    { field: 'name', headerName: 'Product Name' },
    { field: 'category', headerName: 'Category' },
    { field: 'price', headerName: 'Price' },
    { field: 'status', headerName: 'Status' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <>
          <Button variant="outlined" color="primary" onClick={() => handleDialogOpen(row)}>Edit</Button>
          <Button variant="outlined" color="secondary" onClick={() => handleDeleteProduct(row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleDialogOpen(null)}>Add Product</Button>

      <DataTable columns={columns} data={products} />

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{productForm.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <FormInput name="name" label="Product Name" value={productForm.name} onChange={handleFormChange} />
          <FormInput name="category" label="Category" value={productForm.category} onChange={handleFormChange} />
          <FormInput name="price" label="Price" value={productForm.price} onChange={handleFormChange} />
          <FormInput name="status" label="Status" value={productForm.status} onChange={handleFormChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleSaveProduct} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
