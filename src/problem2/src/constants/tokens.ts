import { Token } from '../types';

export const MOCK_TOKENS: Token[] = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029', 
    balance: 0.05, 
    price: 52000 
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029', 
    balance: 1.5, 
    price: 2900 
  },
  { 
    symbol: 'USDT', 
    name: 'Tether', 
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=029', 
    balance: 5000, 
    price: 1 
  },
  { 
    symbol: 'BNB', 
    name: 'Binance Coin', 
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029', 
    balance: 10, 
    price: 380 
  },
  { 
    symbol: 'SOL', 
    name: 'Solana', 
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029', 
    balance: 25, 
    price: 110 
  },
];
