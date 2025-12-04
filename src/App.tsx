// src/App.tsx – LIQUID GLASS 2025 FINAL EDITION (BOTTOMNAV HIỆN ĐÚNG 100%)
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AuthProvider, { useAuth } from './context/AuthContext'

import BottomNav from './components/BottomNav'

// === PAGES ===
import Splash from './pages/Splash'
import Register from './pages/auth/Register'
import Passphrase from './pages/Passphrase'
import RegisterSuccess from './pages/auth/RegisterSuccess'
import Login from './pages/auth/Login'

import Home from './pages/Home'
import EventMarketplacePage from './pages/event/EventMarketplacePage'
import WalletDetail from './pages/WalletDetail'
import MyTicketsPage from './pages/event/MyTicketsPage'
import Profile from './pages/Profile'

import SendSearch from './pages/tranfer/SendSearch'
import SendScan from './pages/tranfer/SendScan'
import SendAmount from './pages/tranfer/SendAmount'
import SendConfirm from './pages/tranfer/SendConfirm'
import SendReceipt from './pages/tranfer/SendReceipt'
import TransferFailed from './pages/TransferFailed'

import Receive from './pages/receive/Receive'
import Notifications from './pages/Notifications'
import PersonalInfo from './pages/PersonalInfo'
import MyNFTs from './pages/MyNFTs'
import Security from './pages/tranfer/Security'

import EventDetailPage from './pages/event/EventDetailPage'
import TicketDetailPage from './pages/event/TicketDetailPage'
import BuyTicketConfirmPage from './pages/event/BuyTicketConfirmPage'
import PurchaseSuccessPage from './pages/event/PurchaseSuccessPage'

// Danh sách các trang KHÔNG HIỆN BottomNav (chỉ các trang công khai hoặc onboarding)
const NO_BOTTOM_NAV_ROUTES = [
  '/',
  '/register',
  '/register',
  '/passphrase',
  '/success',
  '/login',
]

function AppContent() {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  // Logic mới: ĐÃ ĐĂNG NHẬP → hiện BottomNav ở MỌI trang (trừ các trang công khai)
  const shouldShowBottomNav = isLoggedIn && !NO_BOTTOM_NAV_ROUTES.includes(location.pathname)

  return (
    <>
      <Routes>
        {/* ==================== PUBLIC ROUTES – Không có BottomNav ==================== */}
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passphrase" element={<Passphrase />} />
        <Route path="/success" element={<RegisterSuccess />} />
        <Route path="/login" element={<Login />} />

        {/* ==================== PROTECTED ROUTES – Đã login → Có BottomNav ==================== */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/events"
          element={isLoggedIn ? <EventMarketplacePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/wallet-detail"
          element={isLoggedIn ? <WalletDetail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-tickets"
          element={isLoggedIn ? <MyTicketsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Transfer Flow – Đều có BottomNav */}
        <Route path="/send" element={isLoggedIn ? <SendSearch /> : <Navigate to="/login" />} />
        <Route path="/send/scan" element={isLoggedIn ? <SendScan /> : <Navigate to="/login" />} />
        <Route path="/send/amount" element={isLoggedIn ? <SendAmount /> : <Navigate to="/login" />} />
        <Route path="/send/confirm" element={isLoggedIn ? <SendConfirm /> : <Navigate to="/login" />} />
        <Route path="/send/receipt" element={isLoggedIn ? <SendReceipt /> : <Navigate to="/login" />} />
        <Route path="/send/failed" element={isLoggedIn ? <TransferFailed /> : <Navigate to="/login" />} />

        {/* Các trang khác – Vẫn có BottomNav khi đã login */}
        <Route path="/receive" element={isLoggedIn ? <Receive /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/personal-info" element={isLoggedIn ? <PersonalInfo /> : <Navigate to="/login" />} />
        <Route path="/security" element={isLoggedIn ? <Security /> : <Navigate to="/login" />} />
        <Route path="/nfts" element={isLoggedIn ? <MyNFTs /> : <Navigate to="/login" />} />

        {/* Event Flow – Có BottomNav */}
        <Route path="/events/:id" element={isLoggedIn ? <EventDetailPage /> : <Navigate to="/login" />} />
        <Route path="/ticket/:tokenId" element={isLoggedIn ? <TicketDetailPage /> : <Navigate to="/login" />} />
        <Route path="/events/buy" element={isLoggedIn ? <BuyTicketConfirmPage /> : <Navigate to="/login" />} />
        <Route path="/purchase-success" element={isLoggedIn ? <PurchaseSuccessPage /> : <Navigate to="/login" />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} replace />} />
      </Routes>

      {/* HIỆN BOTTOMNAV Ở TẤT CẢ CÁC TRANG SAU KHI ĐĂNG NHẬP */}
      {shouldShowBottomNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}