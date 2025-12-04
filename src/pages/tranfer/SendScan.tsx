// src/pages/tranfer/SendScan.tsx
import { ArrowLeft, Flashlight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

export default function SendScan() {
  const navigate = useNavigate()
  const qrRef = useRef<Html5Qrcode | null>(null)
  const [flashOn, setFlashOn] = useState(false)
  const [cameraId, setCameraId] = useState<string | null>(null)
  const [torchSupported, setTorchSupported] = useState<boolean | null>(null)

  // Lấy danh sách camera khi component mount
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          // chọn camera sau (nếu cần logic chọn camera sau)
          setCameraId(devices[0].id)
        }
      })
      .catch(() => {
        console.warn("Không tìm thấy camera")
      })
  }, [])

  // Khởi động scanner mỗi khi cameraId thay đổi
  useEffect(() => {
    if (!cameraId) return

    const elementId = "qr-reader"
    const html5Qr = new Html5Qrcode(elementId, { verbose: false })
    qrRef.current = html5Qr

    // Thử detect torch support (nếu trình duyệt cho phép truy cập track)
    const detectTorch = async () => {
      try {
        // bật camera tạm để kiểm tra capabilities
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: cameraId } },
        })
        const track = stream.getVideoTracks()[0]
        const capabilities: any = (track.getCapabilities && track.getCapabilities()) || {}
        // Nếu device hỗ trợ 'torch' trong capabilities
        if (capabilities && "torch" in capabilities) {
          setTorchSupported(true)
        } else {
          setTorchSupported(false)
        }
        // stop stream ngay
        track.stop()
      } catch {
        setTorchSupported(false)
      }
    }

    detectTorch().catch(() => setTorchSupported(false))

    // Start scanning
    html5Qr
      .start(
        { deviceId: { exact: cameraId } },
        {
          fps: 30,
          qrbox: { width: 280, height: 280 },
          aspectRatio: 1.0,
          videoConstraints: {
            facingMode: "environment",
          },
        } as any,
        (decodedText) => {
          const addr = decodedText.trim()
          if (addr) {
            // stop scanner then navigate
            html5Qr
              .stop()
              .catch(() => {})
              .finally(() => {
                navigate("/send/amount", { state: { recipientAddress: addr } })
              })
          }
        },
        (errorMessage) => {
          // ignore frequent "no QR found" messages
          console.debug("scan err", errorMessage)
        }
      )
      .catch((e) => {
        console.warn("Không thể khởi động scanner:", e)
      })

    return () => {
      html5Qr.stop().catch(() => {})
    }
  }, [cameraId, navigate])

  // Toggle torch (nếu supported)
  const toggleTorch = async () => {
    if (!torchSupported) {
      // Nếu không hỗ trợ, chỉ đổi trạng thái UI
      setFlashOn((p) => !p)
      return
    }

    const html5Qr = qrRef.current
    if (!html5Qr) {
      setFlashOn((p) => !p)
      return
    }

    try {
      // Để bật/ tắt torch an toàn: lấy track và applyConstraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: cameraId ? { exact: cameraId } : undefined },
      })
      const track = stream.getVideoTracks()[0]
      // @ts-ignore - applyConstraints may accept { advanced: [{ torch: true }] } on supported browsers
      await (track.applyConstraints as any)({
        advanced: [{ torch: !flashOn }],
      })
      // Cập nhật state và tắt track sau khi set (browser giữ torch cho track hiện tại)
      setFlashOn((p) => !p)
      // Không stop track ngay lập tức nếu muốn torch giữ, nhưng để an toàn stop
      setTimeout(() => {
        try {
          track.stop()
        } catch {}
      }, 500)
    } catch (e) {
      console.warn("Không thể thay đổi torch:", e)
      setFlashOn((p) => !p) // chỉ đổi UI nếu thất bại
    }
  }

  // ... (phần import và logic JS giữ nguyên hoàn toàn)

return (
  <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 pointer-events-none" />

    {/* HEADER */}
    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
      <button
        onClick={() => navigate(-1)}
        className="p-4 rounded-full bg-white/20 backdrop-blur-2xl hover:bg-white/30 active:scale-95 transition-all shadow-2xl"
      >
        <ArrowLeft size={32} />
      </button>

      <button
        onClick={toggleTorch}
        className={`px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 transition-all active:scale-95 shadow-xl ${
          flashOn
            ? "bg-yellow-500 text-black shadow-yellow-500/70 animate-pulse"
            : "bg-white/25 backdrop-blur-xl border border-white/30 hover:bg-white/35"
        }`}
      >
        <Flashlight size={28} />
        {flashOn ? "TẮT ĐÈN" : "BẬT ĐÈN"}
      </button>
    </div>

    {/* CAMERA CONTAINER - ĐÃ FIX HOÀN HẢO */}
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="relative w-80 h-80">
        <div id="qr-reader" className="absolute inset-0 w-full h-full" />

        {/* CSS ÉP CHẾT VIDEO RA GIỮA */}
        <style>{`
          #qr-reader video {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            min-width: 100% !important;
            min-height: 100% !important;
            width: auto !important;
            height: auto !important;
            object-fit: cover !important;
          }
        `}</style>
      </div>
    </div>

    {/* KHUNG QUÉT QR SIÊU ĐẸP 2025 - NHƯ APP XỊN */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
  <div className="relative w-90 h-90">

    {/* 4 GÓC SCAN HIỆN ĐẠI - MỎNG, SÁNG, CÓ HIỆU ỨNG NEON */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="absolute w-24 h-24 border-t-4 border-l-4 border-purple-400 
                   shadow-lg shadow-purple-500/50 
                   animate-[cornerPulse_3s_ease-in-out_infinite]"
        style={{
          top: i < 2 ? "0" : "auto",
          bottom: i >= 2 ? "0" : "auto",
          left: i % 2 === 0 ? "0" : "auto",
          right: i % 2 === 1 ? "0" : "auto",
          borderTop: i < 2 ? "4px solid" : "none",
          borderLeft: i % 2 === 0 ? "4px solid" : "none",
          borderRight: i % 2 === 1 ? "4px solid transparent" : "none",
          borderBottom: i >= 2 ? "4px solid transparent" : "none",
          borderRadius: 
            i === 0 ? "20px 0 0 0" :
            i === 1 ? "0 20px 0 0" :
            i === 2 ? "0 0 0 20px" : "0 0 20px 0",
        }}
      >
        {/* Hiệu ứng phát sáng nhỏ ở góc */}
        <div className="absolute w-8 h-8 bg-purple-400 rounded-full blur-xl opacity-60 
                        animate-ping -top-2 -left-2" 
             style={{ animationDelay: `${i * 0.3}s` }} />
      </div>
    ))}

    {/* LASER QUÉT - MỀM MẠI, ĐỘC, ĐẸP LUNG LINH */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 
                    bg-gradient-to-r from-transparent via-purple-400 to-transparent
                    shadow-lg shadow-purple-500/80
                    opacity-80">
      <div className="absolute inset-x-0 h-full bg-purple-300 blur-md animate-[laserScan_2.8s_ease-in-out_infinite]" />
      <div className="absolute inset-x-10 h-0.5 bg-white/80 blur-sm animate-[laserScan_2.8s_ease-in-out_infinite]" 
           style={{ animationDelay: "0.1s" }} />
    </div>

    {/* VÒNG TRÒN NHỎ GIỮA - HIỆU ỨNG BREATHING */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-2 h-2 bg-purple-400 rounded-full 
                    shadow-2xl shadow-purple-500/80 
                    animate-ping" />
  </div>
</div>

    {/* Nút nhập tay */}
    <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-full max-w-md px-8 z-50">
      <button
        onClick={() => navigate("/send")}
        className="w-full py-6 bg-gradient-to-r from-purple-600/60 to-orange-600/60 backdrop-blur-3xl rounded-3xl border-2 border-white/30 font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
      >
        Nhập địa chỉ ví thủ công
      </button>
    </div>

    {/* LASER KEYFRAMES */}
    <style>{`
      @keyframes laser {
        0%, 100% { transform: translateY(-160px); opacity: 0; }
        50%      { transform: translateY(160px); opacity: 1; }
      }
    `}</style>
  </div>
)
}
