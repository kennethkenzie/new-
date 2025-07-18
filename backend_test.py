#!/usr/bin/env python3
"""
Backend API Testing for La Brezi Suites Hotel Application
Tests admin authentication system and file upload functionality
"""

import requests
import json
import base64
import os
import time
from io import BytesIO
from PIL import Image

# Configuration
BASE_URL = "http://localhost:3000"
API_BASE = f"{BASE_URL}/api"

# Test credentials from seedDatabase.js
TEST_USERS = {
    "admin": {"username": "admin", "password": "labrezi123"},
    "manager": {"username": "manager", "password": "manager123"},
    "staff": {"username": "staff", "password": "staff123"},
    "invalid": {"username": "invalid", "password": "invalid123"}
}

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

def create_test_image(filename="test_image.jpg", size=(100, 100)):
    """Create a small test image"""
    img = Image.new('RGB', size, color='red')
    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)
    return img_bytes.getvalue()

def create_test_document(filename="test_document.txt", content="This is a test document for file upload testing."):
    """Create a small test document"""
    return content.encode('utf-8')

def test_database_initialization():
    """Test database initialization endpoint"""
    print_test_header("Database Initialization")
    
    try:
        # Test GET request first
        response = requests.get(f"{API_BASE}/admin/init-db", timeout=10)
        print_info(f"GET /api/admin/init-db - Status: {response.status_code}")
        
        if response.status_code == 200:
            print_success("Database initialization endpoint is accessible")
        
        # Test POST request to initialize database
        print_info("Initializing database with seed data...")
        response = requests.post(f"{API_BASE}/admin/init-db", timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            print_success("Database initialized successfully")
            print_info(f"Users created: {data.get('data', {}).get('usersCreated', 'N/A')}")
            print_info(f"Rooms created: {data.get('data', {}).get('roomsCreated', 'N/A')}")
            print_info(f"Bookings created: {data.get('data', {}).get('bookingsCreated', 'N/A')}")
            print_info(f"Messages created: {data.get('data', {}).get('messagesCreated', 'N/A')}")
            return True
        elif response.status_code == 403:
            print_warning("Database seeding not allowed in production environment")
            return True  # This is expected in production
        else:
            print_error(f"Database initialization failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Database initialization request failed: {str(e)}")
        return False

def test_admin_login():
    """Test admin authentication system"""
    print_test_header("Admin Authentication System")
    
    results = {}
    
    for role, credentials in TEST_USERS.items():
        print_info(f"Testing login for {role}: {credentials['username']}")
        
        try:
            response = requests.post(
                f"{API_BASE}/admin/auth/login",
                json=credentials,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if role == "invalid":
                if response.status_code == 401:
                    print_success(f"Invalid credentials correctly rejected")
                    results[role] = {"success": True, "token": None}
                else:
                    print_error(f"Invalid credentials should return 401, got {response.status_code}")
                    results[role] = {"success": False, "token": None}
            else:
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and data.get("token"):
                        print_success(f"{role.capitalize()} login successful")
                        print_info(f"User: {data.get('user', {}).get('username')}")
                        print_info(f"Role: {data.get('user', {}).get('role')}")
                        print_info(f"Token received: {data.get('token')[:20]}...")
                        results[role] = {"success": True, "token": data.get("token"), "user": data.get("user")}
                    else:
                        print_error(f"{role.capitalize()} login failed - missing token or success flag")
                        results[role] = {"success": False, "token": None}
                else:
                    print_error(f"{role.capitalize()} login failed: {response.status_code}")
                    print_error(f"Response: {response.text}")
                    results[role] = {"success": False, "token": None}
                    
        except requests.exceptions.RequestException as e:
            print_error(f"{role.capitalize()} login request failed: {str(e)}")
            results[role] = {"success": False, "token": None}
    
    return results

def test_file_upload_with_auth(auth_token, role_name):
    """Test file upload functionality with authentication"""
    print_test_header(f"File Upload Testing - {role_name.capitalize()}")
    
    if not auth_token:
        print_error(f"No auth token available for {role_name}")
        return False
    
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    # Test 1: Upload image file to /api/admin/files
    print_info("Testing image upload to /api/admin/files")
    try:
        image_data = create_test_image()
        files = {
            'file': ('test_image.jpg', image_data, 'image/jpeg')
        }
        data = {
            'description': 'Test image upload',
            'folder': 'gallery',
            'isPublic': 'true',
            'tags': 'test,image'
        }
        
        response = requests.post(
            f"{API_BASE}/admin/files",
            files=files,
            data=data,
            headers=headers,
            timeout=15
        )
        
        if response.status_code == 200:
            result = response.json()
            print_success("Image upload to /api/admin/files successful")
            print_info(f"File ID: {result.get('file', {}).get('id')}")
            print_info(f"Filename: {result.get('file', {}).get('filename')}")
        elif response.status_code == 403:
            print_warning(f"{role_name.capitalize()} doesn't have file upload permissions")
        else:
            print_error(f"Image upload failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"Image upload request failed: {str(e)}")
    
    # Test 2: Upload image file to /api/admin/upload
    print_info("Testing image upload to /api/admin/upload")
    try:
        image_data = create_test_image()
        files = {
            'file': ('test_image2.jpg', image_data, 'image/jpeg')
        }
        data = {
            'category': 'gallery',
            'description': 'Test image upload to upload endpoint',
            'alt': 'Test image'
        }
        
        response = requests.post(
            f"{API_BASE}/admin/upload",
            files=files,
            data=data,
            headers=headers,
            timeout=15
        )
        
        if response.status_code == 200:
            result = response.json()
            print_success("Image upload to /api/admin/upload successful")
            print_info(f"File ID: {result.get('file', {}).get('id')}")
            print_info(f"URL: {result.get('file', {}).get('url')}")
        elif response.status_code == 401:
            print_warning(f"{role_name.capitalize()} authentication failed for upload endpoint")
        else:
            print_error(f"Image upload to /upload failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"Image upload to /upload request failed: {str(e)}")
    
    # Test 3: Upload document file to /api/admin/files
    print_info("Testing document upload to /api/admin/files")
    try:
        doc_data = create_test_document()
        files = {
            'file': ('test_document.txt', doc_data, 'text/plain')
        }
        data = {
            'description': 'Test document upload',
            'folder': 'documents',
            'isPublic': 'false',
            'tags': 'test,document'
        }
        
        response = requests.post(
            f"{API_BASE}/admin/files",
            files=files,
            data=data,
            headers=headers,
            timeout=15
        )
        
        if response.status_code == 200:
            result = response.json()
            print_success("Document upload successful")
            print_info(f"File ID: {result.get('file', {}).get('id')}")
            print_info(f"File Type: {result.get('file', {}).get('fileType')}")
        elif response.status_code == 403:
            print_warning(f"{role_name.capitalize()} doesn't have file upload permissions")
        else:
            print_error(f"Document upload failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"Document upload request failed: {str(e)}")
    
    # Test 4: Test file size validation (create large file)
    print_info("Testing file size validation")
    try:
        # Create a file larger than 10MB for /api/admin/files
        large_data = b'0' * (11 * 1024 * 1024)  # 11MB
        files = {
            'file': ('large_file.txt', large_data, 'text/plain')
        }
        data = {
            'description': 'Large file test',
            'folder': 'documents'
        }
        
        response = requests.post(
            f"{API_BASE}/admin/files",
            files=files,
            data=data,
            headers=headers,
            timeout=20
        )
        
        if response.status_code == 400:
            print_success("File size validation working correctly (rejected large file)")
        else:
            print_warning(f"Large file upload returned unexpected status: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"Large file upload test failed: {str(e)}")
    
    return True

def test_file_management(auth_token, role_name):
    """Test file management endpoints"""
    print_test_header(f"File Management Testing - {role_name.capitalize()}")
    
    if not auth_token:
        print_error(f"No auth token available for {role_name}")
        return False
    
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    # Test 1: Get file list
    print_info("Testing file list retrieval")
    try:
        response = requests.get(
            f"{API_BASE}/admin/files",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print_success("File list retrieved successfully")
            print_info(f"Total files: {result.get('pagination', {}).get('totalFiles', 'N/A')}")
            files = result.get('files', [])
            if files:
                print_info(f"First file: {files[0].get('originalName', 'N/A')}")
        elif response.status_code == 403:
            print_warning(f"{role_name.capitalize()} doesn't have file management permissions")
        else:
            print_error(f"File list retrieval failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"File list request failed: {str(e)}")
    
    # Test 2: Get files from /api/admin/upload endpoint
    print_info("Testing file list from upload endpoint")
    try:
        response = requests.get(
            f"{API_BASE}/admin/upload",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print_success("Upload endpoint file list retrieved successfully")
            print_info(f"Total files: {result.get('pagination', {}).get('total', 'N/A')}")
        elif response.status_code == 401:
            print_warning(f"{role_name.capitalize()} authentication failed for upload endpoint")
        else:
            print_error(f"Upload endpoint file list failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"Upload endpoint file list request failed: {str(e)}")
    
    return True

def test_user_management(auth_token, role_name):
    """Test user management endpoints"""
    print_test_header(f"User Management Testing - {role_name.capitalize()}")
    
    if not auth_token:
        print_error(f"No auth token available for {role_name}")
        return False
    
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    # Test 1: Get user list
    print_info("Testing user list retrieval")
    try:
        response = requests.get(
            f"{API_BASE}/admin/users",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print_success("User list retrieved successfully")
            print_info(f"Total users: {result.get('pagination', {}).get('totalUsers', 'N/A')}")
            users = result.get('users', [])
            if users:
                print_info(f"First user: {users[0].get('username', 'N/A')} ({users[0].get('role', 'N/A')})")
        elif response.status_code == 403:
            print_warning(f"{role_name.capitalize()} doesn't have user management permissions")
        else:
            print_error(f"User list retrieval failed: {response.status_code}")
            print_error(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print_error(f"User list request failed: {str(e)}")
    
    # Test 2: Create new user (only test with admin)
    if role_name == "admin":
        print_info("Testing user creation")
        try:
            new_user_data = {
                "username": f"testuser_{int(time.time())}",
                "email": f"testuser_{int(time.time())}@labrezisuites.com",
                "password": "testpassword123",
                "firstName": "Test",
                "lastName": "User",
                "role": "staff"
            }
            
            response = requests.post(
                f"{API_BASE}/admin/users",
                json=new_user_data,
                headers={**headers, "Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                print_success("User creation successful")
                print_info(f"Created user: {result.get('user', {}).get('username')}")
            else:
                print_error(f"User creation failed: {response.status_code}")
                print_error(f"Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print_error(f"User creation request failed: {str(e)}")
    
    return True

def test_unauthorized_access():
    """Test endpoints without authentication"""
    print_test_header("Unauthorized Access Testing")
    
    endpoints = [
        "/api/admin/files",
        "/api/admin/upload", 
        "/api/admin/users"
    ]
    
    for endpoint in endpoints:
        print_info(f"Testing unauthorized access to {endpoint}")
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=10)
            if response.status_code == 401:
                print_success(f"Unauthorized access correctly blocked for {endpoint}")
            else:
                print_error(f"Unauthorized access should return 401, got {response.status_code} for {endpoint}")
                
        except requests.exceptions.RequestException as e:
            print_error(f"Request to {endpoint} failed: {str(e)}")

def main():
    """Main test execution"""
    print(f"{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("LA BREZI SUITES - BACKEND API TESTING")
    print("Testing Admin Authentication & File Upload Functionality")
    print("=" * 80)
    print(f"{Colors.ENDC}")
    
    # Step 1: Initialize database
    db_init_success = test_database_initialization()
    
    # Step 2: Test authentication
    auth_results = test_admin_login()
    
    # Step 3: Test unauthorized access
    test_unauthorized_access()
    
    # Step 4: Test functionality with different roles
    for role in ["admin", "manager", "staff"]:
        if auth_results.get(role, {}).get("success"):
            token = auth_results[role]["token"]
            
            # Test file upload
            test_file_upload_with_auth(token, role)
            
            # Test file management
            test_file_management(token, role)
            
            # Test user management
            test_user_management(token, role)
        else:
            print_warning(f"Skipping functionality tests for {role} due to authentication failure")
    
    # Summary
    print_test_header("Test Summary")
    
    successful_logins = sum(1 for role, result in auth_results.items() 
                          if role != "invalid" and result.get("success"))
    
    print_info(f"Database initialization: {'✅ Success' if db_init_success else '❌ Failed'}")
    print_info(f"Successful logins: {successful_logins}/3 roles")
    print_info(f"Invalid credentials properly rejected: {'✅ Yes' if auth_results.get('invalid', {}).get('success') else '❌ No'}")
    
    if successful_logins == 3:
        print_success("All authentication tests passed!")
    else:
        print_error("Some authentication tests failed!")
    
    print(f"\n{Colors.BOLD}Testing completed!{Colors.ENDC}")

if __name__ == "__main__":
    main()