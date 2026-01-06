import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent, type EventTicketType } from '../../service/event.service'

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function CreateEventPage() {
  const navigate = useNavigate()

  /* ================= BASIC INFO ================= */
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')

  /* ================= MEDIA ================= */
  const [thumbnail, setThumbnail] = useState('')
  const [banner, setBanner] = useState('')
  const [gallery, setGallery] = useState<string[]>([])

  /* ================= TIME & LOCATION ================= */
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [location, setLocation] = useState('')
  const [locationDetail, setLocationDetail] = useState('')
  const [googleMapsUrl, setGoogleMapsUrl] = useState('')
  const [checkinRadiusMeters] = useState(200)

  /* ================= META ================= */
  const [category] = useState('festival')
  const [tags] = useState('')

  /* ================= ORGANIZER ================= */
  const [organizerName] = useState('')
  const [organizerContact] = useState('')

  /* ================= TICKETS ================= */
  const [ticketTypes, setTicketTypes] = useState<EventTicketType[]>([
    { name: '', priceVndc: 0, maxQuantity: 0, benefits: [], soldQuantity: 0, isActive: true }
  ])

  /* ================= SLUG AUTO ================= */
  useEffect(() => {
    setSlug(generateSlug(title))
  }, [title])

  /* ================= HANDLERS ================= */
  const addTicket = () => {
    setTicketTypes([
      ...ticketTypes,
      { name: '', priceVndc: 0, maxQuantity: 0, benefits: [], soldQuantity: 0, isActive: true }
    ])
  } 

  const removeTicket = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index))
  }

  const updateTicket = (
    index: number,
    field: keyof EventTicketType,
    value: any
  ) => {
    const updated = [...ticketTypes]
    updated[index] = { ...updated[index], [field]: value }
    setTicketTypes(updated)
  }

  const handleSubmit = async () => {
    const payload = {
      title,
      slug,
      shortDescription,
      fullDescription,
      thumbnail,
      banner,
      gallery,
      dateStart,
      dateEnd,
      location,
      locationDetail,
      googleMapsUrl,
      checkinRadiusMeters,
      ticketTypes,
      category,
      tags: tags.split(',').map(t => t.trim()),
      organizerName,
      organizerContact
    }

    const res = await createEvent(payload)

    if (!res.success) {
      alert(res.message || 'Tạo sự kiện thất bại')
      return
    }

    navigate(`/events/${res.data!.slug}`)
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        <h1 className="text-4xl font-black">Tạo sự kiện mới</h1>

        {/* BASIC INFO */}
        <section className="space-y-4">
          <input
            placeholder="Tiêu đề sự kiện"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input"
          />
          <input
            placeholder="Slug"
            value={slug}
            disabled
            className="input opacity-60"
          />
          <textarea
            placeholder="Mô tả ngắn"
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            className="input h-24"
          />
          <textarea
            placeholder="Mô tả chi tiết"
            value={fullDescription}
            onChange={e => setFullDescription(e.target.value)}
            className="input h-40"
          />
        </section>

        {/* MEDIA */}
        <section className="space-y-4">
          <h2 className="section-title">Hình ảnh</h2>
          <input placeholder="Thumbnail URL" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="input" />
          <input placeholder="Banner URL" value={banner} onChange={e => setBanner(e.target.value)} className="input" />
          <input
            placeholder="Gallery URLs (cách nhau bằng dấu ,)"
            onChange={e => setGallery(e.target.value.split(','))}
            className="input"
          />
        </section>

        {/* TIME & LOCATION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="datetime-local" value={dateStart} onChange={e => setDateStart(e.target.value)} className="input" />
          <input type="datetime-local" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="input" />
          <input placeholder="Địa điểm" value={location} onChange={e => setLocation(e.target.value)} className="input" />
          <input placeholder="Chi tiết địa điểm" value={locationDetail} onChange={e => setLocationDetail(e.target.value)} className="input" />
          <input placeholder="Google Maps URL" value={googleMapsUrl} onChange={e => setGoogleMapsUrl(e.target.value)} className="input col-span-2" />
        </section>

        {/* TICKETS */}
        <section className="space-y-6">
          <h2 className="section-title">Vé</h2>

          {ticketTypes.map((t, i) => (
            <div key={i} className="border border-white/10 p-4 rounded-xl space-y-3">
              <div className="flex justify-between">
                <span className="font-bold">Vé #{i + 1}</span>
                {ticketTypes.length > 1 && (
                  <Trash2 onClick={() => removeTicket(i)} className="cursor-pointer text-red-400" />
                )}
              </div>

              <input placeholder="Tên vé" value={t.name} onChange={e => updateTicket(i, 'name', e.target.value)} className="input" />
              <input type="number" placeholder="Giá VNDC" value={t.priceVndc} onChange={e => updateTicket(i, 'priceVndc', +e.target.value)} className="input" />
              <input type="number" placeholder="Số lượng tối đa" value={t.maxQuantity} onChange={e => updateTicket(i, 'maxQuantity', +e.target.value)} className="input" />
              <input
                placeholder="Quyền lợi (cách nhau bằng ,)"
                onChange={e => updateTicket(i, 'benefits', e.target.value.split(','))}
                className="input"
              />
            </div>
          ))}

          <button onClick={addTicket} className="flex items-center gap-2 text-emerald-400">
            <Plus /> Thêm vé
          </button>
        </section>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-orange-600 py-4 rounded-xl font-bold text-xl"
        >
          Tạo sự kiện
        </button>
      </div>
    </div>
  )
}
