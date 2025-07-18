'use client'

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Users, 
  FileText, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Download,
  Filter
} from 'react-feather';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    userActivity: [],
    fileActivity: [],
    systemStats: {},
    trends: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch user analytics
      const userResponse = await fetch(`/api/admin/users?limit=100`, {
        headers: getAuthHeaders()
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user analytics');
      }
      
      const userData = await userResponse.json();
      
      // Fetch file analytics
      const fileResponse = await fetch(`/api/admin/files?limit=100`, {
        headers: getAuthHeaders()
      });
      
      if (!fileResponse.ok) {
        throw new Error('Failed to fetch file analytics');
      }
      
      const fileData = await fileResponse.json();
      
      // Process analytics data
      const processedData = processAnalyticsData(userData.users, fileData.files);
      setAnalyticsData(processedData);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (users, files) => {
    const now = new Date();
    const timeRanges = {
      '7days': 7,
      '30days': 30,
      '90days': 90
    };
    
    const daysBack = timeRanges[timeRange];
    
    // User activity analysis
    const userActivity = [];
    const userStats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      newUsers: users.filter(u => {
        const createdDate = new Date(u.createdAt);
        const daysAgo = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
        return daysAgo <= daysBack;
      }).length,
      recentLogins: users.filter(u => {
        if (!u.lastLogin) return false;
        const loginDate = new Date(u.lastLogin);
        const daysAgo = Math.floor((now - loginDate) / (1000 * 60 * 60 * 24));
        return daysAgo <= daysBack;
      }).length
    };

    // Role distribution
    const roleDistribution = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    // File activity analysis
    const fileActivity = [];
    const fileStats = {
      totalFiles: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0),
      newFiles: files.filter(f => {
        const createdDate = new Date(f.createdAt);
        const daysAgo = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
        return daysAgo <= daysBack;
      }).length,
      imageFiles: files.filter(f => f.fileType === 'image').length,
      documentFiles: files.filter(f => f.fileType === 'document').length
    };

    // File type distribution
    const fileTypeDistribution = files.reduce((acc, file) => {
      acc[file.fileType] = (acc[file.fileType] || 0) + 1;
      return acc;
    }, {});

    // Folder distribution
    const folderDistribution = files.reduce((acc, file) => {
      acc[file.folder] = (acc[file.folder] || 0) + 1;
      return acc;
    }, {});

    // Daily activity for the past week
    const dailyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayUsers = users.filter(u => {
        const createdDate = new Date(u.createdAt);
        return createdDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      const dayFiles = files.filter(f => {
        const createdDate = new Date(f.createdAt);
        return createdDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      dailyActivity.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: dayUsers,
        files: dayFiles
      });
    }

    return {
      userActivity: dailyActivity,
      fileActivity: dailyActivity,
      systemStats: {
        ...userStats,
        ...fileStats,
        roleDistribution,
        fileTypeDistribution,
        folderDistribution
      },
      trends: {
        userGrowth: ((userStats.newUsers / userStats.totalUsers) * 100).toFixed(1),
        fileGrowth: ((fileStats.newFiles / fileStats.totalFiles) * 100).toFixed(1),
        activeUserRate: ((userStats.recentLogins / userStats.totalUsers) * 100).toFixed(1)
      }
    };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Error loading analytics: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BarChart className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.systemStats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+{analyticsData.trends.userGrowth}%</span>
            <span className="text-sm text-gray-600 ml-2">from last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.systemStats.totalFiles}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+{analyticsData.trends.fileGrowth}%</span>
            <span className="text-sm text-gray-600 ml-2">from last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.systemStats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-purple-600">{analyticsData.trends.activeUserRate}%</span>
            <span className="text-sm text-gray-600 ml-2">activity rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">{formatFileSize(analyticsData.systemStats.totalSize)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <BarChart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-orange-600">{analyticsData.systemStats.newFiles}</span>
            <span className="text-sm text-gray-600 ml-2">new files</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Activity</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1"
            >
              <option value="users">Users</option>
              <option value="files">Files</option>
            </select>
          </div>
          <div className="h-64">
            <div className="flex items-end justify-between h-full">
              {analyticsData.userActivity.map((day, index) => {
                const value = selectedMetric === 'users' ? day.users : day.files;
                const maxValue = Math.max(...analyticsData.userActivity.map(d => 
                  selectedMetric === 'users' ? d.users : d.files
                ));
                const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-8 bg-gray-200 rounded-t">
                      <div 
                        className={`w-full rounded-t transition-all duration-300 ${
                          selectedMetric === 'users' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      <div>{day.date}</div>
                      <div className="font-semibold">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.systemStats.roleDistribution || {}).map(([role, count]) => {
              const percentage = (count / analyticsData.systemStats.totalUsers) * 100;
              const colors = {
                admin: 'bg-red-500',
                manager: 'bg-blue-500',
                staff: 'bg-green-500'
              };
              
              return (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${colors[role]} mr-3`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{role}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{count}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className={`h-full rounded ${colors[role]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* File Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* File Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">File Type Distribution</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.systemStats.fileTypeDistribution || {}).map(([type, count]) => {
              const percentage = (count / analyticsData.systemStats.totalFiles) * 100;
              const colors = {
                image: 'bg-blue-500',
                document: 'bg-green-500'
              };
              
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${colors[type]} mr-3`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{type}s</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{count}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className={`h-full rounded ${colors[type]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Folder Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Folder Distribution</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.systemStats.folderDistribution || {}).map(([folder, count]) => {
              const percentage = (count / analyticsData.systemStats.totalFiles) * 100;
              const colors = ['bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'];
              const colorIndex = Object.keys(analyticsData.systemStats.folderDistribution).indexOf(folder);
              
              return (
                <div key={folder} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${colors[colorIndex % colors.length]} mr-3`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{folder}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{count}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className={`h-full rounded ${colors[colorIndex % colors.length]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{analyticsData.systemStats.newUsers}</div>
            <div className="text-sm text-gray-600">New Users</div>
            <div className="text-xs text-gray-500">Last {timeRange.replace('days', ' days')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analyticsData.systemStats.newFiles}</div>
            <div className="text-sm text-gray-600">New Files</div>
            <div className="text-xs text-gray-500">Last {timeRange.replace('days', ' days')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{analyticsData.systemStats.recentLogins}</div>
            <div className="text-sm text-gray-600">Recent Logins</div>
            <div className="text-xs text-gray-500">Last {timeRange.replace('days', ' days')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;