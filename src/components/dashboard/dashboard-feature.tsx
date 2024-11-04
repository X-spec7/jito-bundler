'use client';

import { useEffect, useState } from 'react';

function TokenSelectionModal({ isOpen, onClose, onSelect, tokens }) {
  const [selectedToken, setSelectedToken] = useState('');

  const handleSelect = () => {
    if (selectedToken) {
      onSelect(selectedToken);
      setSelectedToken('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedToken('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className="bg-white rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Select Base Token</h2>
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a token</option>
          {tokens.map((token) => (
            <option key={token} value={token}>{token}</option>
          ))}
        </select>
        <div className="flex justify-end">
          <button onClick={handleClose} className="mr-2 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition">Cancel</button>
          <button onClick={handleSelect} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Select Token</button>
        </div>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, onSubmit }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  const handleSubmit = () => {
    if (walletAddress && Number(tokenAmount) > 0) {
      onSubmit({ address: walletAddress, sol: tokenAmount });
      setWalletAddress('');
      setTokenAmount('');
      onClose();
    }
  };

  const handleClose = () => {
    setWalletAddress('');
    setTokenAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Snipe Wallet</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Token Amount"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handleClose} className="mr-2 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Add Wallet</button>
        </div>
      </div>
    </div>
  );
}

const quoteToken = 'SOLANA';

export default function Home() {
  const [baseToken, setBaseToken] = useState('');
  const [baseAmount, setBaseAmount] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [priceRatio, setPriceRatio] = useState<number | null>(null);

  const [baseTokenForSell, setBaseTokenForSell] = useState('');
  const [baseTokenAmountForSell, setBaseTokenAmountForSell] = useState('');

  const [isSelectForLiquidity, setIsSelectForLiquidity] = useState(true);

  const [snipeWallets, setSnipeWallets] = useState<{ address: string; sol: number }[]>([]);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  const availableTokens = ['CustomToken1', 'CustomToken2', 'CustomToken3', 'CustomToken4', 'CustomToken5'];

  useEffect(() => {
    if (Number(baseAmount) > 0 && Number(quoteAmount) > 0) {
      setPriceRatio(Number(quoteAmount) / Number(baseAmount));
    } else {
      setPriceRatio(null);
    }
  }, [baseAmount, quoteAmount]);

  const handleAddWallet = (wallet) => {
    setSnipeWallets([...snipeWallets, wallet]);
  };

  return (
    <div className='flex justify-center w-full bg-gray-50 min-h-screen'>
      <div className="max-w-[1400px] flex flex-col items-center w-full px-8 pt-16 shadow-lg rounded-lg bg-white">
        <h1 className="text-xl text-center md:text-4xl font-bold mb-4 text-blue-600">Raydium Liquidity Pool Management Tool</h1>
        <p className="mt-2 text-lg text-gray-700">Manage your liquidity pools efficiently.</p>

        <div className='flex flex-col md:w-[540px] break-words'>          
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row space-x-0 md:space-x-12 mt-12">
            <div className="flex flex-col w-full">
              <label className='pl-2 text-gray-700 font-semibold'>Base Token</label>
              <div className="relative flex items-center mt-2">
                <span className="absolute left-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M9 16a7 7 0 100-14 7 7 0 000 14z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={baseToken}
                  onClick={
                    () => {
                      setIsSelectForLiquidity(true)
                      setIsTokenModalOpen(true)
                    }}
                  readOnly
                  className="pl-10 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-150 ease-in-out w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className='pl-2 text-gray-700 font-semibold'>Quote Token</label>
              <div className="relative flex items-center mt-2">
                <span className="absolute left-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M9 16a7 7 0 100-14 7 7 0 000 14z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={quoteToken}
                  onClick={() => {/* Show modal for token selection */ }}
                  readOnly
                  className="pl-10 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-150 ease-in-out w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-0 md:flex-row space-x-0 md:space-x-12 mt-12">
            <div className="flex flex-col w-full">
              <label className='text-gray-700 pl-2 font-semibold'>Base Token Amount</label>
              <input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
                className="px-6 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out mt-2 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className='text-gray-700 pl-2 font-semibold'>Quote Token Amount</label>
              <input
                type="number"
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
                className="px-6 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out mt-2 w-full"
              />
            </div>
          </div>

          <p className="text-lg text-gray-800 my-6 font-semibold">
            Price Ratio: {priceRatio !== null ? `$${priceRatio.toFixed(4)}` : 'N/A'}
          </p>

          {
            snipeWallets.length > 0 && (
              <div className="mt-4 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-4">
                {snipeWallets.map((wallet, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-600 w-full">
                    <span>{wallet.address}</span>
                    <div className='flex flex-row justify-end gap-2'>
                      <span>{wallet.sol} SOL</span>
                      <button onClick={() => setSnipeWallets(snipeWallets.filter((_, i) => i !== index))} className="text-red-500">
                        🗑️ {/* Trash icon */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          }

          <div className='flex flex-col md:flex-row md:justify-center md:gap-12'>
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full"
            >
              Add New Snipe Wallet
            </button>
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition w-full"
              onClick={() => {}}
            >
              Execute Bundled Transaction
            </button>
          </div>

          <p className='mt-16 text-2xl italic font-medium text-center'>Token Sell Panel</p>

          <div className='flex justify-center gap-12 mt-6'>
            <div className="flex flex-col w-full">
              <label className='pl-2 text-gray-700 font-semibold'>Base Token For Sell</label>
              <div className="relative flex items-center mt-2">
                <span className="absolute left-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M9 16a7 7 0 100-14 7 7 0 000 14z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={baseTokenForSell}
                  onClick={() => {
                    setIsSelectForLiquidity(false);
                    setIsTokenModalOpen(true);
                  }}
                  readOnly
                  className="pl-10 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-150 ease-in-out w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className='text-gray-700 pl-2 font-semibold'>Base Token Amount</label>
              <input
                type="number"
                value={baseTokenAmountForSell}
                onChange={(e) => setBaseTokenAmountForSell(e.target.value)}
                className="px-6 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out mt-2 w-full"
              />
            </div>
          </div>

          <button
              onClick={() => setIsWalletModalOpen(true)}
              className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full"
            >
            Sell Token
          </button>

        </div>

      </div>

      <Modal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSubmit={handleAddWallet}
      />

      <TokenSelectionModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        onSelect={isSelectForLiquidity ? setBaseToken : setBaseTokenForSell}
        tokens={availableTokens}
      />
    </div>
  );
}
