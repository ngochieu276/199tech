import React, { useState } from 'react';
import { ArrowDownUp, Settings } from 'lucide-react';
import { useSwap } from '../../hooks/useSwap';
import { useToast } from '../ui/Toast';
import { TokenInput } from './TokenInput';
import { Button } from '../ui/Button';
import { TokenModal } from './TokenModal';
import { OrderDetails } from './OrderDetails';
import { MOCK_TOKENS } from '../../constants/tokens';
import { Token } from '../../types';
import { Modal } from '../ui/Modal';

export const SwapCard: React.FC = () => {
  const {
    fromToken, setFromToken,
    toToken, setToToken,
    fromAmount, setFromAmount,
    toAmount,
    exchangeRate,
    loading,
    slippage, setSlippage,
    handleSwitch
  } = useSwap();
  
  const { addToast } = useToast();
  
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [activeSide, setActiveSide] = useState<'from' | 'to'>('from');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tab, setTab] = useState<'market' | 'limit'>('market');

  const handleTokenSelect = (token: Token) => {
    if (activeSide === 'from') {
      if (token.symbol === toToken.symbol) {
        handleSwitch();
      } else {
        setFromToken(token);
      }
    } else {
      if (token.symbol === fromToken.symbol) {
        handleSwitch();
      } else {
        setToToken(token);
      }
    }
  };

  const openTokenModal = (side: 'from' | 'to') => {
    setActiveSide(side);
    setIsTokenModalOpen(true);
  };

  const handleSwap = () => {
    // Validation
    if (!fromAmount || Number(fromAmount) <= 0) {
      addToast('Please enter an amount', 'error');
      return;
    }
    if (Number(fromAmount) > fromToken.balance) {
      addToast('Insufficient balance', 'error');
      return;
    }
    
    setIsConfirmModalOpen(true);
  };

  const executeSwap = () => {
    setIsConfirmModalOpen(false);
    // Simulate API call
    setTimeout(() => {
      addToast(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`, 'success');
      setFromAmount('');
    }, 500);
  };

  return (
    <div className="w-full max-w-[480px]">
      <div className="bg-background-secondary rounded-3xl p-4 md:p-6 shadow-xl border border-gray-800">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex gap-6">
             <button 
               onClick={() => setTab('market')}
               className={`font-bold text-lg transition-colors relative ${tab === 'market' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
             >
               Market
               {tab === 'market' && <div className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"></div>}
             </button>
             <button 
               onClick={() => setTab('limit')}
               className={`font-bold text-lg transition-colors relative ${tab === 'limit' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
             >
               Limit
               {tab === 'limit' && <div className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"></div>}
             </button>
          </div>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`text-text-secondary hover:text-text-primary transition-colors ${settingsOpen ? 'text-primary' : ''}`}>
            <Settings size={20} />
          </button>
        </div>

        {settingsOpen && (
           <div className="mb-4 p-4 bg-gray-800/50 rounded-xl animate-in slide-in-from-top-2 border border-gray-700">
             <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-text-primary">Slippage Tolerance</span>
                <span className="text-xs text-text-secondary">Your transaction will revert if the price changes unfavorably by more than this percentage.</span>
             </div>
             <div className="flex gap-2">
               {[0.1, 0.5, 1.0].map((val) => (
                 <button
                   key={val}
                   onClick={() => setSlippage(val)}
                   className={`flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-all ${slippage === val ? 'bg-primary text-background' : 'bg-gray-700 text-text-primary hover:bg-gray-600'}`}
                 >
                   {val}%
                 </button>
               ))}
             </div>
           </div>
        )}

        <div className="space-y-1 relative">
          <TokenInput
            label="From"
            amount={fromAmount}
            token={fromToken}
            onAmountChange={setFromAmount}
            onTokenClick={() => openTokenModal('from')}
            balance={fromToken.balance}
            error={Number(fromAmount) > fromToken.balance ? "Insufficient balance" : undefined}
          />
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={handleSwitch}
              className="bg-background-secondary p-2 rounded-xl border-4 border-background text-primary hover:rotate-180 transition-transform duration-300 shadow-lg hover:shadow-primary/20"
            >
              <ArrowDownUp size={20} />
            </button>
          </div>

          <TokenInput
            label="To (Estimate)"
            amount={toAmount}
            token={toToken}
            onTokenClick={() => openTokenModal('to')}
            readOnly
            loading={loading}
          />
        </div>

        <OrderDetails 
          exchangeRate={exchangeRate}
          fromSymbol={fromToken.symbol}
          toSymbol={toToken.symbol}
          fee={0.001} 
          minReceived={toAmount ? (Number(toAmount) * (1 - slippage / 100)).toFixed(6) : '0.00'}
          priceImpact={0.05} 
        />

        <Button 
          className="w-full mt-6 rounded-xl text-lg font-bold py-6" 
          size="lg" 
          onClick={handleSwap}
          disabled={loading || !fromAmount || Number(fromAmount) <= 0 || Number(fromAmount) > fromToken.balance}
        >
          {loading ? 'Calculating...' : !fromAmount ? 'Enter Amount' : Number(fromAmount) > fromToken.balance ? 'Insufficient Balance' : 'Swap'}
        </Button>
      </div>

      <TokenModal 
        isOpen={isTokenModalOpen} 
        onClose={() => setIsTokenModalOpen(false)} 
        onSelect={handleTokenSelect}
        tokens={MOCK_TOKENS}
      />

      <Modal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        title="Confirm Swap"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700">
               <div className="flex items-center gap-3">
                 <img src={fromToken.icon} className="w-10 h-10 rounded-full"/>
                 <div>
                    <div className="text-xl font-bold text-text-primary">{fromAmount}</div>
                    <div className="text-sm text-text-secondary">{fromToken.symbol}</div>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-center -my-3 z-10">
               <div className="bg-background-secondary p-1.5 rounded-full border border-gray-700">
                 <ArrowDownUp size={16} className="text-text-secondary" />
               </div>
            </div>

            <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700">
               <div className="flex items-center gap-3">
                 <img src={toToken.icon} className="w-10 h-10 rounded-full"/>
                 <div>
                    <div className="text-xl font-bold text-text-primary">{toAmount}</div>
                    <div className="text-sm text-text-secondary">{toToken.symbol}</div>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="space-y-3 py-2 border-t border-gray-800 pt-4">
            <div className="flex justify-between text-sm">
               <span className="text-text-secondary">Rate</span>
               <span className="text-text-primary font-medium">1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
               <span className="text-text-secondary">Network Fee</span>
               <span className="text-text-primary font-medium">0.001 {fromToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
               <span className="text-text-secondary">Price Impact</span>
               <span className="text-success font-medium">0.05%</span>
            </div>
          </div>

          <Button className="w-full py-6 text-lg" onClick={executeSwap}>Confirm Swap</Button>
        </div>
      </Modal>
    </div>
  );
};
