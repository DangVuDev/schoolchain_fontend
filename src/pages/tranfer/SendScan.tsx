// src/pages/transfer/SendScan.tsx
import { Html5Qrcode } from "html5-qrcode"
import { ArrowLeft, Bug, Flashlight, Image as ImageIcon, ScanLine } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

export default function SendScan() {
  const navigate = useNavigate()
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [flashOn, setFlashOn] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showDebug, setShowDebug] = useState(false)
  const [, setError] = useState<string | null>(null)

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 8))
    console.log(`[SCANNER]: ${msg}`)
  }

  useEffect(() => {
    let isMounted = true
    console.log(isMounted)

    const initScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras()
        if (!cameras || cameras.length === 0) {
          setError("Không tìm thấy camera")
          return
        }

        const backCamera = cameras.find(c => c.label.toLowerCase().includes('back')) || cameras[cameras.length - 1]
        const scanner = new Html5Qrcode("qr-reader")
        scannerRef.current = scanner

        await scanner.start(
          backCamera.id,
          {
            fps: 20,
            qrbox: (w) => ({ width: w * 0.8, height: w * 0.8 }),
            aspectRatio: 1.0,
          },
          (text) => handleParsedText(text),
          () => {} 
        )
        addLog("🟢 Camera đang chạy...")
      } catch (err) {
        addLog(`💥 Lỗi: ${err}`)
      }
    }

    initScanner();

  return () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().then(() => {
        scannerRef.current?.clear()
      }).catch(() => {})
    }
  }
  }, [])

const handleParsedText = async (text: string, isFromFile = false) => {
  const cleanText = text.trim();
  addLog(`🔍 Phát hiện: ${cleanText.slice(0, 30)}...`);

  let recipientAddress = cleanText;
  let preFilledAmount = "";

  if (cleanText.includes("?")) {
    const [addr, query] = cleanText.split("?");
    recipientAddress = addr;
    const params = new URLSearchParams(query);
    preFilledAmount = params.get("amount") || "";
  }

  if (/^0x[a-fA-F0-9]{40}$/i.test(recipientAddress)) {
    addLog("✅ Khớp ví hợp lệ!");

    // CHỈ stop camera nếu KHÔNG PHẢI quét từ file và camera đang chạy
    if (!isFromFile && scannerRef.current?.isScanning) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        addLog("🛑 Camera đã dừng");
      } catch (err) {
        console.warn("Lỗi khi dừng camera:", err);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    navigate("/send/amount", {
      replace: isMobile,
      state: {
        recipient: { address: recipientAddress.trim() },
        amount: preFilledAmount.trim(),
      },
    });
  } else {
    addLog("❌ QR không chứa địa chỉ ví hợp lệ");
  }
};
  // Tính năng chọn ảnh từ máy
const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  addLog(`📂 Đang đọc file: ${file.name}`);
  
  // Quan trọng: Sử dụng một ID ảo hoặc ẩn nếu không muốn ảnh file đè lên view camera
  const fileScanner = new Html5Qrcode("qr-reader"); 

  try {
    // Scan file (để false nếu không muốn nó render ảnh đè lên DOM đang chạy camera)
    const result = await fileScanner.scanFile(file, false); 
    addLog("✅ Scan file thành công");

    // Xử lý kết quả với tham số isFromFile = true
    await handleParsedText(result, true);

  } catch (err) {
    addLog("❌ Không tìm thấy mã QR trong ảnh");
    alert("Không tìm thấy mã QR trong ảnh.");
  } finally {
    // Luôn dọn dẹp fileScanner
    try { await fileScanner.clear(); } catch (_) {}
  }
};

  const toggleTorch = async () => {
    try {
      const videoTrack = (scannerRef.current as any)._videoElement?.srcObject?.getVideoTracks()[0]
      if (videoTrack) {
        const newState = !flashOn
        await videoTrack.applyConstraints({ advanced: [{ torch: newState }] })
        setFlashOn(newState)
      }
    } catch (e) {
      addLog("💡 Thiết bị không hỗ trợ đèn pin")
    }
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden flex flex-col font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50">
        <button onClick={() => navigate(-1)} className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 active:scale-90 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button onClick={() => setShowDebug(!showDebug)} className={`p-3 rounded-2xl transition-all ${showDebug ? 'bg-green-500 text-black' : 'bg-white/10'}`}>
            <Bug size={24} />
          </button>
          <button onClick={toggleTorch} className={`p-3 rounded-2xl transition-all ${flashOn ? 'bg-yellow-500 text-black' : 'bg-white/10'}`}>
            <Flashlight size={24} />
          </button>
        </div>
      </div>

      {/* Debug Logs */}
      {showDebug && (
        <div className="absolute top-24 left-6 right-6 z-50 bg-black/90 p-4 rounded-2xl border border-green-500/30 font-mono text-[10px] text-green-400">
          {logs.map((log, i) => <div key={i} className="mb-1 border-b border-white/5 pb-1">{`> ${log}`}</div>)}
        </div>
      )}

      {/* Scanner Viewport */}
      <div className="relative flex-1">
        <div id="qr-reader" className="w-full h-full" />
        
        {/* Scan UI Frame */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
            <div className="top-10 w-[75vw] h-[75vw] max-w-[350px] max-h-[350px] relative">
                {/* <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-purple-500 rounded-tl-3xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-purple-500 rounded-tr-3xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-purple-500 rounded-bl-3xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-purple-500 rounded-br-3xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                 */}
                <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_20px_rgba(168,85,247,1)] animate-scan" />
            </div>
            <p className="mt-8 text-white/60 font-medium tracking-widest text-sm uppercase">Đang tìm mã QR...</p>
        </div>

        {/* Footer Actions */}
      <div className="absolute bottom-20 inset-x-0 p-8 z-50 bg-gradient-to-t from-black to-transparent space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Nút chọn ảnh */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-2 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all active:scale-95"
          >
            <ImageIcon className="text-blue-400" size={28} />
            <span className="text-xs font-bold uppercase tracking-tighter">Chọn ảnh QR</span>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </button>

          {/* Nút nhập tay */}
          <button 
            onClick={() => navigate("/send")}
            className="flex flex-col items-center gap-2 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all active:scale-95"
          >
            <ScanLine className="text-purple-400" size={28} />
            <span className="text-xs font-bold uppercase tracking-tighter">Nhập tay</span>
          </button>
        </div>

        <div className="h-1 w-20 bg-white/20 mx-auto rounded-full" />
      </div>
      </div>

      

      <style>{`
        #qr-reader video { object-fit: cover !important; width: 100% !important; height: 100% !important; }
        #qr-reader__dashboard { display: none !important; }
        @keyframes scan {
          0%, 100% { top: 5%; opacity: 0; }
          50% { top: 95%; opacity: 1; }
        }
        .animate-scan { animation: scan 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}