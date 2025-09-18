export const stockData = 
  [
    {
      name: "INFY",
      price: 1555.45,
      percent: "-1.60%",
      isDown: true,
    },
    {
      name: "ONGC",
      price: 116.8,
      percent: "-0.09%",
      isDown: true,
    },
    {
      name: "TCS",
      price: 3194.8,
      percent: "-0.25%",
      isDown: true,
    },
    {
      name: "KPITTECH",
      price: 266.45,
      percent: "3.54%",
      isDown: false,
    },
    {
      name: "QUICKHEAL",
      price: 308.55,
      percent: "-0.15%",
      isDown: true,
    },
    {
      name: "WIPRO",
      price: 577.75,
      percent: "0.32%",
      isDown: false,
    },
    {
      name: "M&M",
      price: 779.8,
      percent: "-0.01%",
      isDown: true,
    },
    {
      name: "RELIANCE",
      price: 2112.4,
      percent: "1.44%",
      isDown: false,
    },
    {
      name: "HUL",
      price: 512.4,
      percent: "1.04%",
      isDown: false,
    },
    {
      name: "BAJAJ-FINANCE",
      price: 6895.25,
      percent: "0.85%",
      isDown: false,
    },
    {
      name: "ICICI-BANK",
      price: 978.35,
      percent: "-0.52%",
      isDown: true,
    },
    {
      name: "HDFC",
      price: 2712.6,
      percent: "0.20%",
      isDown: false,
    },
    {
      name: "ITC",
      price: 412.15,
      percent: "-0.35%",
      isDown: true,
    },
    {
      name: "ADANI-PORTS",
      price: 754.45,
      percent: "2.10%",
      isDown: false,
    },
    {
      name: "SBIN",
      price: 628.2,
      percent: "-0.70%",
      isDown: true,
    },
    {
      name: "POWERGRID",
      price: 264.3,
      percent: "1.12%",
      isDown: false,
    },
    {
      name: "HINDALCO",
      price: 439.8,
      percent: "-0.28%",
      isDown: true,
    },
    {
      name: "BPCL",
      price: 386.75,
      percent: "0.65%",
      isDown: false,
    },
    {
      name: "MARUTI",
      price: 1015.5,
      percent: "0.15%",
      isDown: false,
    },
    {
      name: "TITAN",
      price: 3265.7,
      percent: "1.55%",
      isDown: false,
    },
    {
      name: "HDFC-LIFE",
      price: 655.4,
      percent: "-0.45%",
      isDown: true,
    },
    {
      name: "ULTRATECH",
      price: 7150.3,
      percent: "2.25%",
      isDown: false,
    },
    {
      name: "ASIAN-PAINTS",
      price: 2840.5,
      percent: "0.75%",
      isDown: false,
    },
    {
      name: "DR-REDDY'S",
      price: 5230.1,
      percent: "-1.10%",
      isDown: true,
    },
    {
      name: "NTPC",
      price: 148.65,
      percent: "0.30%",
      isDown: false,
    },
  ]


export const updateStockPrice = (data)=>{
    return data.map((stock)=>({
        ...stock,
        price : Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
        percent :`${Math.random() < 0.5 ? Math.floor(Math.random() * 10) : Number((Math.random() * 10).toFixed(2))}%`
    }));
}