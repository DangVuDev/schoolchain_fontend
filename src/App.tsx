// src/App.tsx – LIQUID GLASS 2025 + CAMPUS EMULATION FULL INTEGRATION
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import AuthProvider, { useAuth } from './context/AuthContext'

// === CÁC PAGE HIỆN TẠI ===
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterSuccess from './pages/auth/RegisterSuccess'
import BuyTicketConfirmPage from './pages/event/BuyTicketConfirmPage'
import EventDetailPage from './pages/event/EventDetailPage'
import EventMarketplacePage from './pages/event/EventMarketplacePage'
import MyTicketsPage from './pages/event/MyTicketsPage'
import PaymentFailedPage from './pages/event/PaymentFailedPage'
import PaymentSuccessPage from './pages/event/PaymentSuccessPage'
import TicketDetailPage from './pages/event/TicketDetailPage'
import Home from './pages/Home'
import Receive from './pages/receive/Receive'
import Splash from './pages/Splash'
import Security from './pages/tranfer/Security'
import SendAmount from './pages/tranfer/SendAmount'
import SendConfirm from './pages/tranfer/SendConfirm'
import SendReceipt from './pages/tranfer/SendReceipt'
import SendScan from './pages/tranfer/SendScan'
import SendSearch from './pages/tranfer/SendSearch'

// === THÊM MỚI: 7 PAGE CAMPUS EMULATION ===
import EmulationLeaderboardPage from './pages/emulation/EmulationLeaderboardPage'
import EmulationRewardGuidePage from './pages/emulation/EmulationRewardGuidePage'
import EmulationRewardShopPage from './pages/emulation/EmulationRewardShopPage'
import EmulationTasksPage from './pages/emulation/EmulationTasksPage'
import ShopHomePage from './pages/shop/ShopHomePage'
import WalletDetail from './pages/wallet/WalletDetail'
import Profile from './pages/setting/Profile'
import TransactionHistoryPage from './pages/wallet/TransactionHistoryPage'
import TransferFailed from './pages/tranfer/TransferFailed'
import Notifications from './pages/setting/Notifications'
import PersonalInfo from './pages/setting/PersonalInfo'

// Danh sách các trang KHÔNG HIỆN BottomNav
const NO_BOTTOM_NAV_ROUTES = [
  '/',
  '/login',
  '/register',
  '/passphrase',
  '/success',
]

function AppContent() {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  // Hiện BottomNav khi đã login + không phải trang công khai
  const shouldShowBottomNav = isLoggedIn && !NO_BOTTOM_NAV_ROUTES.includes(location.pathname)

  return (
    <>
      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<RegisterSuccess />} />

        {/* ==================== PROTECTED ROUTES – CŨ ==================== */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/events" element={isLoggedIn ? <EventMarketplacePage /> : <Navigate to="/login" replace />} />
        <Route path="/my-tickets" element={isLoggedIn ? <MyTicketsPage /> : <Navigate to="/login" replace />} />
        <Route path="/wallet-detail" element={isLoggedIn ? <WalletDetail /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/transactions" element={isLoggedIn ? <TransactionHistoryPage /> : <Navigate to="/login" replace />} />

        {/* Transfer Flow */}
        <Route path="/send" element={isLoggedIn ? <SendSearch /> : <Navigate to="/login" />} />
        <Route path="/send/scan" element={isLoggedIn ? <SendScan /> : <Navigate to="/login" />} />
        <Route path="/send/amount" element={isLoggedIn ? <SendAmount /> : <Navigate to="/login" />} />
        <Route path="/send/confirm" element={isLoggedIn ? <SendConfirm /> : <Navigate to="/login" />} />
        <Route path="/send/receipt" element={isLoggedIn ? <SendReceipt /> : <Navigate to="/login" />} />
        <Route path="/send/failed" element={isLoggedIn ? <TransferFailed /> : <Navigate to="/login" />} />

        <Route path="/receive" element={isLoggedIn ? <Receive /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/personal-info" element={isLoggedIn ? <PersonalInfo /> : <Navigate to="/login" />} />
        <Route path="/security" element={isLoggedIn ? <Security /> : <Navigate to="/login" />} />
  
        {/* Event Flow */}
        <Route path="/events/:id" element={isLoggedIn ? <EventDetailPage /> : <Navigate to="/login" />} />
        <Route path="/ticket/:tokenId" element={isLoggedIn ? <TicketDetailPage /> : <Navigate to="/login" />} />
        <Route path="/events/buy" element={isLoggedIn ? <BuyTicketConfirmPage /> : <Navigate to="/login" />} />
        <Route path="/payment-success" element={isLoggedIn ? <PaymentSuccessPage /> : <Navigate to="/login" />} />
        <Route path="/payment-failed" element={isLoggedIn ? <PaymentFailedPage /> : <Navigate to="/login" />} />

        {/* ==================== MỚI: CAMPUS EMULATION ROUTES (ĐÃ LOGIN → CÓ BOTTOMNAV) ==================== */}
        <Route path="/campus" element={isLoggedIn ? <EmulationLeaderboardPage /> : <Navigate to="/login" />} />
        <Route path="/campus/tasks" element={isLoggedIn ? <EmulationTasksPage /> : <Navigate to="/login" />} />
        <Route path="/campus/rewards" element={isLoggedIn ? <EmulationRewardShopPage /> : <Navigate to="/login" />} />
        <Route path="/campus/guide" element={isLoggedIn ? <EmulationRewardGuidePage /> : <Navigate to="/login" />} />

        <Route path="/shop" element={isLoggedIn ? <ShopHomePage /> : <Navigate to="/login" />} />

        {/* Redirect mặc định */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} replace />} />
      </Routes>

      {/* BottomNav hiện đúng 100% ở mọi trang đã login */}
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