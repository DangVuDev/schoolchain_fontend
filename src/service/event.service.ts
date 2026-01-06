import axios from 'axios'


export interface EventTicketType {
  name: string
  priceVndc: number
  maxQuantity: number
  soldQuantity: number
  benefits: string[]
  isActive: boolean
  seatingSection?: string
}

export interface EventResponse {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  fullDescription: string

  thumbnail: string
  banner?: string
  gallery: string[]

  dateStart: string
  dateEnd: string
  registrationDeadline?: string

  location: string
  locationDetail?: string
  googleMapsUrl?: string
  checkinRadiusMeters: number

  ticketTypes: EventTicketType[]

  totalTicketsSold: number
  totalRevenueVndc: number

  isActive: boolean
  isFeatured: boolean
  allowOnlineCheckin: boolean
  requireStudentId: boolean

  category:
    | 'concert'
    | 'seminar'
    | 'workshop'
    | 'festival'
    | 'sport'
    | 'party'
    | 'other'

  tags: string[]

  organizerName: string
  organizerContact?: string

  createdBy: string
  createdAt: string
  updatedAt: string

  // virtuals
  totalMaxTickets: number
  isSoldOut: boolean
  isOngoing: boolean
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface EventListResponse {
  success: boolean
  data: {
    items: EventResponse[]
    pagination: Pagination
  }
}


interface GetEventsParams {
  page?: number
  limit?: number
}

export const getListEvents = async (
  params: GetEventsParams
): Promise<EventListResponse | null> => {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) {
    console.warn('Không tìm thấy access_token')
    return null
  }

  try {
    const response = await axios.get<EventListResponse>(
      'http://localhost:3000/api/v1/event/list',
      {
        params,
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.success ? response.data : null
  } catch (error: any) {
    console.error(
      'Error fetching event list:',
      error.response?.data || error.message
    )
    return null
  }
}

/* ================== TICKET ================== */
export interface EventTicketType {
  name: string
  priceVndc: number
  maxQuantity: number
  benefits: string[]
}

/* ================== CREATE PAYLOAD ================== */
export interface CreateEventPayload {
  title: string
  slug: string

  shortDescription?: string
  fullDescription?: string

  thumbnail?: string
  banner?: string
  gallery?: string[]

  dateStart: string
  dateEnd: string

  location: string
  locationDetail?: string
  googleMapsUrl?: string
  checkinRadiusMeters?: number

  ticketTypes: EventTicketType[]

  category: string
  tags?: string[]

  organizerName?: string
  organizerContact?: string
}

/* ================== RESPONSE ================== */
export interface CreateEventResponse {
  success: boolean
  message?: string
  error?: string
  data?: {
    eventId: string
    slug: string
  }
}

export const createEvent = async (
  payload: CreateEventPayload
): Promise<CreateEventResponse> => {
  const accessToken = localStorage.getItem('access_token')

  if (!accessToken) {
    return {
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Chưa đăng nhập'
    }
  }

  try {
    const res = await axios.post<CreateEventResponse>(
      'http://localhost:3000/api/v1/event/create',
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return res.data
  } catch (err: any) {
    return {
      success: false,
      error: err.response?.data?.error || 'CREATE_EVENT_FAILED',
      message: err.response?.data?.message || 'Tạo sự kiện thất bại'
    }
  }
}
