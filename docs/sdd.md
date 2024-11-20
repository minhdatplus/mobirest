# Software Design Document - Mobile REST Client

## 1. Architecture Overview

### 1.1 Tech Stack
- Frontend: React + Vite
- State Management: 
  - React Query (server state)
  - Zustand (client state)
- UI Components: Shadcn/Radix UI
- Styling: Tailwind CSS

### 1.2 Core Components
typescript
App (Root component)
├── ThemeProvider
├── QueryClientProvider
├── AppShell
├── Header
├── SwipeView
│ ├── RequestForm
│ ├── ResponseView
│ ├── CollectionSidebar
│ └── SettingsPanel
└── BottomNav


## 2. Data Flow

### 2.1 State Management
- Request State: React Query
- UI State: Local React state
- App Settings: Zustand
- Collections: Zustand + LocalStorage
- History: Zustand + LocalStorage

### 2.2 Data Models
typescript
interface RequestData {
method: string;
url: string;
headers: Record<string, string>;
}
interface ApiResponse {
status: number;
data: any;
time?: number;
}
interface Collection {
id: string;
name: string;
requests: Request[];
createdAt: string;
updatedAt: string;
}

## 3. Features Implementation

### 3.1 Request Handling
- Validation trước khi gửi request
- Caching responses
- Error handling
- Analytics tracking

### 3.2 Data Persistence
- LocalStorage cho collections và history
- Service Worker cho offline support
- Export/Import functionality
