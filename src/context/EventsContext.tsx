import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react'
import { getListEvents, type EventResponse, type Pagination } from '../service/event.service'

/* ================= TYPES ================= */

interface EventsContextValue {
  events: EventResponse[]
  loading: boolean
  pagination: Pagination
  fetchPage: (page: number) => void
  refresh: () => void
}

interface EventsProviderProps {
  children: ReactNode
}

/* ================= CONTEXT ================= */

const EventsContext = createContext<EventsContextValue | undefined>(undefined)

/* ================= PROVIDER ================= */

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<EventResponse[]>([])
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0
  })

  /**
   * Cache dữ liệu theo page
   * key = page number
   */
  const pageCache = useRef<Map<number, EventResponse[]>>(new Map())

  /* ============== FETCH LOGIC ============== */

  const fetchPage = async (page: number) => {
    // 👉 Nếu đã có cache → dùng lại
    if (pageCache.current.has(page)) {
      setEvents(pageCache.current.get(page)!)
      setPagination(prev => ({ ...prev, page }))
      return
    }

    setLoading(true)
    try {
      const res = await getListEvents({
        page,
        limit: pagination.limit
      })

      if (res?.success) {
        const { items, pagination: pg } = res.data

        pageCache.current.set(page, items)
        setEvents(items)
        setPagination(pg)
      }
    } finally {
      setLoading(false)
    }
  }

  /* ============== REFRESH ============== */

  const refresh = async () => {
    pageCache.current.clear()
    await fetchPage(1)
  }

  /* ============== INIT LOAD (ONCE) ============== */

  useEffect(() => {
    if (!pageCache.current.has(1)) {
      fetchPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ============== CONTEXT VALUE ============== */

  const value: EventsContextValue = {
    events,
    loading,
    pagination,
    fetchPage,
    refresh
  }

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  )
}

/* ================= HOOK ================= */

export const useEvents = () => {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEvents must be used within EventsProvider')
  }
  return context
}
