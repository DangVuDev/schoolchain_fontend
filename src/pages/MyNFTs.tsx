export default function MyNFTs() {
  const nfts = [1, 2, 3, 4]

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <h1 className="text-3xl font-bold mb-8">NFT của tôi</h1>
      <div className="grid grid-cols-2 gap-6">
        {nfts.map(i => (
          <div key={i} className="card-glass text-center">
            <div className="bg-gradient-to-br from-purple-500 to-orange-500 h-40 rounded-2xl mb-4" />
            <p className="font-bold">Vé EDM Campus #{i}</p>
            <p className="text-sm text-gray-400">20/12/2025</p>
          </div>
        ))}
      </div>
    </div>
  )
}