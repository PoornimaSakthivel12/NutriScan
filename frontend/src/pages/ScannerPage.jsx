import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, Image as ImageIcon, RefreshCw, Zap, ScanLine, 
  FileText, CheckCircle, AlertCircle, ArrowLeft, Eye, Sparkles
} from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';
import { SAMPLE_FOODS } from '../data/foodsData';
import { SAMPLE_PACKAGED_OCR } from '../data/ocrData';
import { useHistoryStore } from '../store/historyStore';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const ScannerPage = () => {
  const [mode, setMode] = useState('food'); // 'food' or 'ocr'
  const [image, setImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFoodForAnalysis, setSelectedFoodForAnalysis] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();
  const addScan = useHistoryStore(state => state.addScan);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start real device camera
  const startCamera = async () => {
    setImage(null);
    setOcrResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Camera access denied or unavailable in this environment:", err);
      alert("Camera access was not available or allowed. You can upload an image or choose one of the demo samples below!");
      setIsCameraActive(false);
    }
  };

  // Capture frame from active camera
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setImage(dataUrl);

    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);

    // Default to Fried Rice or Apple for random camera snaps
    const randomFood = SAMPLE_FOODS[Math.floor(Math.random() * SAMPLE_FOODS.length)];
    setSelectedFoodForAnalysis(randomFood);
  };

  // Handle uploaded file
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsCameraActive(false);
      // Pick a representative food matching the file or random
      const randomFood = SAMPLE_FOODS[Math.floor(Math.random() * SAMPLE_FOODS.length)];
      setSelectedFoodForAnalysis(randomFood);
      if (mode === 'ocr') {
        setOcrResult(SAMPLE_PACKAGED_OCR[0]);
      }
    }
  };

  // Quick Demo Food Selector
  const handleSelectDemoFood = (foodItem) => {
    setSelectedFoodForAnalysis(foodItem);
    setImage(`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80`); // generic appetizing photo
    setIsCameraActive(false);
    setOcrResult(null);
  };

  // Handle OCR Packaged Food selection
  const handleSelectDemoOCR = (ocrItem) => {
    setOcrResult(ocrItem);
    setImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80');
    setIsCameraActive(false);
  };

  // Run AI Analysis
  const handleAnalyze = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (mode === 'ocr') {
        const ocrData = ocrResult || SAMPLE_PACKAGED_OCR[0];
        setOcrResult(ocrData);
        return;
      }

      const foodItem = selectedFoodForAnalysis || SAMPLE_FOODS[23]; // default Fried Rice
      
      // Save scan to history
      addScan({
        food_id: foodItem.id,
        food_name: foodItem.name,
        category: foodItem.category,
        confidence: 0.92,
        confidence_percent: '92%',
        freshness_status: foodItem.freshness?.status || 'Fresh',
        freshness_confidence: 0.91,
        emoji: foodItem.emoji,
        calories: foodItem.calories
      });

      navigate(`/analysis/${foodItem.id}`, { state: { food: foodItem } });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col relative pb-28">
      {/* Loading overlay */}
      {loading && <LoadingAnimation message={mode === 'ocr' ? "Extracting label text via OCR..." : "Analyzing your food..."} />}

      {/* Top Bar */}
      <div className="px-5 pt-4 pb-2 flex justify-between items-center z-20">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Mode Toggle: Fresh Food vs Packaged OCR */}
        <div className="bg-white/10 p-1 rounded-full flex gap-1 backdrop-blur-md border border-white/10">
          <button
            onClick={() => { setMode('food'); setOcrResult(null); }}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
              mode === 'food' ? 'bg-primary-green text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Camera size={13} /> Food Scanner
          </button>
          <button
            onClick={() => { setMode('ocr'); }}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
              mode === 'ocr' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <FileText size={13} /> Label OCR
          </button>
        </div>

        <div className="bg-amber-500/90 text-black px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
          <Zap size={12} /> DEMO
        </div>
      </div>

      {/* Main Viewfinder / Camera Screen */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-[380px]">
        {/* Hidden Canvas for Frame Grab */}
        <canvas ref={canvasRef} className="hidden" />

        {isCameraActive ? (
          <div className="relative w-full h-full max-h-[420px] rounded-3xl overflow-hidden border-2 border-primary-green/60 shadow-2xl bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover" 
            />
            {/* Target Reticle Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-56 h-56 border-2 border-dashed border-primary-green/80 rounded-3xl animate-pulse"></div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <button
                onClick={capturePhoto}
                className="w-16 h-16 bg-white rounded-full border-4 border-primary-green mx-auto shadow-xl active:scale-90 transition-transform"
                aria-label="Capture Photo"
              />
            </div>
          </div>
        ) : image ? (
          <div className="relative w-full h-full max-h-[420px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <img src={image} alt="Captured food" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <span>{selectedFoodForAnalysis?.emoji || '🥗'}</span>
              <span>{selectedFoodForAnalysis?.name || 'Detected Item'}</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full max-h-[380px] border-2 border-dashed border-gray-700/80 rounded-3xl flex flex-col items-center justify-center p-6 text-center bg-gray-900/60 backdrop-blur-sm">
            <div className="w-20 h-20 bg-gray-800/80 rounded-3xl flex items-center justify-center text-primary-green mb-4 shadow-inner">
              {mode === 'ocr' ? <FileText size={40} /> : <ScanLine size={40} />}
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1">
              {mode === 'ocr' ? 'Scan Packaged Food Label' : 'Ready to Scan Food'}
            </h3>
            <p className="text-xs text-gray-400 max-w-xs mb-4">
              {mode === 'ocr' 
                ? 'Point at the ingredient list, nutrition facts, and expiry dates on package packaging.'
                : 'Point camera at fresh produce, fruit, vegetables, or prepared meals.'}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={startCamera} 
                className="bg-primary-green text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-green-600 transition-colors active:scale-95"
              >
                <Camera size={16} /> Open Camera
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="bg-gray-800 text-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gray-700 transition-colors active:scale-95 border border-gray-700"
              >
                <ImageIcon size={16} /> Upload Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OCR Result Preview Card if OCR mode & result active */}
      {mode === 'ocr' && ocrResult && (
        <div className="mx-4 mb-4 bg-gray-900 border border-blue-500/40 rounded-3xl p-4 text-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400">OCR Label Extraction</span>
              <h4 className="font-bold text-sm text-white">{ocrResult.productName}</h4>
              <p className="text-[11px] text-gray-400">{ocrResult.brand}</p>
            </div>
            <div className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
              ocrResult.dateStatus === 'Valid' ? 'bg-green-950 text-green-400 border border-green-800' :
              ocrResult.dateStatus === 'Near Expiry' ? 'bg-yellow-950 text-yellow-400 border border-yellow-800' :
              'bg-red-950 text-red-400 border border-red-800'
            }`}>
              <span>{ocrResult.dateStatusEmoji}</span>
              <span>{ocrResult.dateStatus}</span>
            </div>
          </div>

          <div className="bg-black/40 p-2.5 rounded-xl space-y-1 text-[11px]">
            <p><strong>Expiry Date:</strong> {ocrResult.expiryDate} ({ocrResult.detectedDateType})</p>
            <p className="text-gray-400">{ocrResult.dateExplanation}</p>
          </div>

          <div>
            <span className="font-bold text-gray-300 block mb-1">Extracted Ingredient List:</span>
            <div className="space-y-1">
              {ocrResult.ingredientsList.map((ing, idx) => (
                <div key={idx} className="flex justify-between bg-gray-800/80 p-1.5 rounded-lg text-[11px]">
                  <span>{ing.name}</span>
                  <span className="font-mono font-semibold text-blue-300">{ing.percentage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl text-[10px] text-amber-300">
            <strong>Declared Allergens:</strong> {ocrResult.allergens.join(', ')}
          </div>
        </div>
      )}

      {/* Interactive Quick-Test Carousel */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Sparkles size={12} className="text-primary-green" /> Tap a Sample Food to Test
          </span>
          <span className="text-[10px] text-gray-500">27 foods available</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {mode === 'ocr' ? (
            SAMPLE_PACKAGED_OCR.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectDemoOCR(item)}
                className={`p-2.5 rounded-2xl bg-gray-900 border transition-all text-left shrink-0 max-w-[140px] ${
                  ocrResult?.id === item.id ? 'border-blue-500 bg-blue-950/30' : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <span className="text-xs font-bold text-white block truncate">{item.productName}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">{item.dateStatusEmoji} {item.dateStatus}</span>
              </button>
            ))
          ) : (
            SAMPLE_FOODS.slice(0, 10).map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectDemoFood(f)}
                className={`p-2 rounded-2xl bg-gray-900 border flex items-center gap-2 transition-all shrink-0 ${
                  selectedFoodForAnalysis?.id === f.id ? 'border-primary-green bg-green-950/40' : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <span className="text-2xl">{f.emoji}</span>
                <div className="text-left">
                  <span className="text-xs font-bold text-gray-200 block whitespace-nowrap">{f.name}</span>
                  <span className="text-[10px] text-gray-500 block">{f.category}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Bottom Action Drawer */}
      <div className="bg-gray-900 border-t border-gray-800 p-5 rounded-t-3xl mt-auto space-y-3">
        {image ? (
          <div className="space-y-2">
            <button 
              onClick={handleAnalyze} 
              className="w-full bg-primary-green hover:bg-green-600 text-white py-3.5 rounded-2xl font-bold text-base shadow-xl shadow-green-900/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              <span>{mode === 'ocr' ? 'Extract Nutrition & Expiry via OCR' : 'Analyze Food with AI'}</span>
            </button>
            <button 
              onClick={() => { setImage(null); setOcrResult(null); }} 
              className="w-full bg-gray-800 text-gray-300 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <RefreshCw size={15} /> Retake / Clear Image
            </button>
          </div>
        ) : (
          <div className="flex justify-around items-center py-2">
            {/* Upload Button */}
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 active:scale-95 transition-all border border-gray-700">
                <ImageIcon size={22} />
              </div>
              <span className="text-[11px] font-medium">Upload</span>
            </button>

            {/* Shutter Button */}
            <button 
              onClick={isCameraActive ? capturePhoto : startCamera}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-18 h-18 bg-primary-green rounded-full flex items-center justify-center text-white border-4 border-gray-800 shadow-2xl shadow-green-500/30 active:scale-90 transition-all">
                <Camera size={30} />
              </div>
            </button>

            {/* Packaged OCR Mode Switch */}
            <button 
              onClick={() => setMode(mode === 'food' ? 'ocr' : 'food')} 
              className={`flex flex-col items-center gap-1 transition-colors ${mode === 'ocr' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-all border ${
                mode === 'ocr' ? 'bg-blue-900/60 border-blue-500 text-blue-300' : 'bg-gray-800 border-gray-700 text-gray-300'
              }`}>
                <FileText size={22} />
              </div>
              <span className="text-[11px] font-medium">{mode === 'ocr' ? 'Food Mode' : 'OCR Mode'}</span>
            </button>
          </div>
        )}

        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
        />
      </div>
    </div>
  );
};

export default ScannerPage;
