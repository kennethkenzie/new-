'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Upload, Search, Filter, Download, Trash2, Eye, Grid, List, FolderOpen, Image } from 'react-feather';

const FileManagement = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterFolder, setFilterFolder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [viewingFile, setViewingFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    imageFiles: 0,
    documentFiles: 0,
    recentUploads: 0,
    publicFiles: 0
  });

  const [uploadData, setUploadData] = useState({
    description: '',
    folder: 'general',
    isPublic: false,
    tags: '',
    files: []
  });

  const folders = [
    { value: 'general', label: 'General' },
    { value: 'rooms', label: 'Rooms' },
    { value: 'events', label: 'Events' },
    { value: 'gallery', label: 'Gallery' },
    { value: 'documents', label: 'Documents' },
    { value: 'profiles', label: 'Profiles' }
  ];

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchFiles = async (page = 1, search = '', fileType = '', folder = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
        ...(fileType && { fileType }),
        ...(folder && { folder })
      });

      const response = await fetch(`/api/admin/files?${params}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data.files);
      setTotalPages(data.pagination.totalPages);
      
      // Calculate stats
      const totalSize = data.files.reduce((sum, file) => sum + file.size, 0);
      const stats = {
        totalFiles: data.pagination.totalFiles,
        totalSize: totalSize,
        imageFiles: data.files.filter(f => f.fileType === 'image').length,
        documentFiles: data.files.filter(f => f.fileType === 'document').length,
        recentUploads: data.files.filter(f => {
          const uploadDate = new Date(f.createdAt);
          const dayAgo = new Date();
          dayAgo.setDate(dayAgo.getDate() - 1);
          return uploadDate > dayAgo;
        }).length,
        publicFiles: data.files.filter(f => f.isPublic).length
      };
      setStats(stats);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    if (uploadData.files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises = uploadData.files.map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', uploadData.description);
        formData.append('folder', uploadData.folder);
        formData.append('isPublic', uploadData.isPublic.toString());
        formData.append('tags', uploadData.tags);

        const response = await fetch('/api/admin/files', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to upload file');
        }

        // Update progress
        const progress = ((index + 1) / uploadData.files.length) * 100;
        setUploadProgress(progress);

        return response.json();
      });

      await Promise.all(uploadPromises);
      
      setShowUploadModal(false);
      setUploadData({ description: '', folder: 'general', isPublic: false, tags: '', files: [] });
      fetchFiles(currentPage, searchTerm, filterType, filterFolder);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/admin/files/${fileId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete file');
      }

      fetchFiles(currentPage, searchTerm, filterType, filterFolder);
    } catch (error) {
      setError(error.message);
    }
  };

  const bulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedFiles.length} files?`)) return;

    try {
      const promises = selectedFiles.map(fileId => 
        fetch(`/api/admin/files/${fileId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        })
      );

      await Promise.all(promises);
      setSelectedFiles([]);
      fetchFiles(currentPage, searchTerm, filterType, filterFolder);
    } catch (error) {
      setError(error.message);
    }
  };

  const viewFile = async (fileId) => {
    try {
      const response = await fetch(`/api/admin/files/${fileId}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      const fileData = await response.json();
      setViewingFile(fileData);
      setShowFileViewer(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = `data:${file.mimeType};base64,${file.data}`;
    link.download = file.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(file => file.id));
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setUploadData(prev => ({ ...prev, files: [...prev.files, ...droppedFiles] }));
    setShowUploadModal(true);
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploadData(prev => ({ ...prev, files: [...prev.files, ...selectedFiles] }));
  };

  const removeUploadFile = (index) => {
    setUploadData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.fileType === 'image') {
      return <Image className="w-6 h-6 text-blue-600" />;
    } else {
      return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const getFileTypeColor = (fileType) => {
    switch (fileType) {
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchFiles(currentPage, searchTerm, filterType, filterFolder);
  }, [currentPage, searchTerm, filterType, filterFolder]);

  useEffect(() => {
    const handleGlobalDragOver = (e) => e.preventDefault();
    const handleGlobalDrop = (e) => e.preventDefault();

    document.addEventListener('dragover', handleGlobalDragOver);
    document.addEventListener('drop', handleGlobalDrop);

    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver);
      document.removeEventListener('drop', handleGlobalDrop);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterFolder = (e) => {
    setFilterFolder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Drag and Drop Overlay */}
      {isDragging && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here</h3>
            <p className="text-gray-600">Release to upload files</p>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">File Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Total Files</div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalFiles}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Total Size</div>
          <div className="text-2xl font-bold text-blue-600">{formatFileSize(stats.totalSize)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Images</div>
          <div className="text-2xl font-bold text-green-600">{stats.imageFiles}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Documents</div>
          <div className="text-2xl font-bold text-purple-600">{stats.documentFiles}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Recent Uploads</div>
          <div className="text-2xl font-bold text-orange-600">{stats.recentUploads}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Public Files</div>
          <div className="text-2xl font-bold text-red-600">{stats.publicFiles}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={handleFilterType}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
              </select>
            </div>
            <div className="relative">
              <FolderOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterFolder}
                onChange={handleFilterFolder}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Folders</option>
                {folders.map(folder => (
                  <option key={folder.value} value={folder.value}>
                    {folder.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={bulkDelete}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Files Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading files...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No files found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleSelectFile(file.id)}
                  className="absolute top-2 left-2 z-10 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
                  {file.fileType === 'image' ? (
                    <img 
                      src={`data:${file.mimeType};base64,${file.data}`} 
                      alt={file.originalName}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <FileText className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFileTypeColor(file.fileType)}`}>
                    {file.fileType}
                  </span>
                  <span className="text-xs text-gray-500">{file.formattedSize}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1 truncate" title={file.originalName}>
                  {file.originalName}
                </h3>
                <p className="text-sm text-gray-600 mb-2 truncate" title={file.description}>
                  {file.description || 'No description'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => viewFile(file.id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => downloadFile(file)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === files.length && files.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          {getFileIcon(file)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{file.originalName}</div>
                          <div className="text-sm text-gray-500">{file.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFileTypeColor(file.fileType)}`}>
                        {file.fileType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.formattedSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.folder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(file.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">{file.uploadedByName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewFile(file.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadFile(file)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm font-medium border rounded-md ${
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
            <form onSubmit={uploadFiles} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Files
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {uploadData.files.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Files ({uploadData.files.length})
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeUploadFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Folder
                </label>
                <select
                  value={uploadData.folder}
                  onChange={(e) => setUploadData({...uploadData, folder: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {folders.map(folder => (
                    <option key={folder.value} value={folder.value}>
                      {folder.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={uploadData.tags}
                  onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={uploadData.isPublic}
                  onChange={(e) => setUploadData({...uploadData, isPublic: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
                  Make files public
                </label>
              </div>

              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadData({ description: '', folder: 'general', isPublic: false, tags: '', files: [] });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={uploadData.files.length === 0 || isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Files'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Viewer Modal */}
      {showFileViewer && viewingFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{viewingFile.originalName}</h3>
              <button
                onClick={() => setShowFileViewer(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {viewingFile.fileType === 'image' ? (
                <img 
                  src={`data:${viewingFile.mimeType};base64,${viewingFile.data}`}
                  alt={viewingFile.originalName}
                  className="max-w-full h-auto mx-auto"
                />
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Document preview not available</p>
                  <button
                    onClick={() => downloadFile(viewingFile)}
                    className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </button>
                </div>
              )}
              <div className="mt-6 text-sm text-gray-600">
                <p><strong>Description:</strong> {viewingFile.description || 'No description'}</p>
                <p><strong>Size:</strong> {viewingFile.formattedSize}</p>
                <p><strong>Uploaded:</strong> {new Date(viewingFile.createdAt).toLocaleString()}</p>
                <p><strong>By:</strong> {viewingFile.uploadedByName}</p>
                {viewingFile.tags && viewingFile.tags.length > 0 && (
                  <p><strong>Tags:</strong> {viewingFile.tags.join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManagement;