import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
  const [isLainnyaFocused, setIsLainnyaFocused] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState(null);
  const [cumulativeTotal, setCumulativeTotal] = useState(0);

  const [brsStatus, setBRSStatus] = useState(null);
  const [brsCount, setBRSCount] = useState(null); 
  const [totalBRS, setBrsTotal] = useState(0);

  const [publikasiStatus, setPublikasiStatus] = useState(null);
  const [publikasiCount, setPublikasiCount] = useState(null); 
  const [totalPublikasi, setPublikasiTotal] = useState(0);

  const [tabelStatus, setTabelStatus] = useState(null);
  const [tabelCount, setTabelCount] = useState(null); 
  const [totalTabel, setTabelTotal] = useState(0);

  const [beritaStatus, setBeritaStatus] = useState(null);
  const [beritaCount, setBeritaCount] = useState(null); 
  const [totalBerita, setBeritaTotal] = useState(0);

  const setLainnyaFocused = (value) => {
    setIsLainnyaFocused(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Publikasi
        const response1 = await fetch('https://webapi.bps.go.id/v1/api/list/?model=publication&domain=7400&key=1f5ea27aa195656fa79ee36110bda985');
        const data1 = await response1.json();
        const total1 = data1['data'][0]['total'];

        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=7400&key=1f5ea27aa195656fa79ee36110bda985`;
  
        const responsePub = await fetch(API_URL_PUBLIKASI);
        const resultPub = await responsePub.json();
  
          const currentDatePub = new Date();
          const currentMonthPub = currentDatePub.getMonth() + 1; 
          const currentYearPub = currentDatePub.getFullYear();
          const uniqueItemsPub = new Map();
  
          resultPub.data[1].forEach((item) => {
            const itemDatePub = new Date(item.rl_date);
            const itemMonthPub = itemDatePub.getMonth() + 1;
            const itemYearPub = itemDatePub.getFullYear();
            const keyPub = `${itemMonthPub}_${itemYearPub}_${item.pub_id}`;
  
            if (itemMonthPub === currentMonthPub && itemYearPub === currentYearPub && !uniqueItemsPub.has(keyPub)) {
              uniqueItemsPub.set(keyPub, item);
            }
          });
          const totalPublikasi = uniqueItemsPub.size;
          setBrsTotal(totalPublikasi);
        const currentPublikasiTotalString = await AsyncStorage.getItem('currentPublikasiTotal');
        const currentPublikasiTotal = parseInt(currentPublikasiTotalString) || 0;

        if (totalPublikasi > currentPublikasiTotal) {
          setPublikasiStatus('error');
          setPublikasiCount(totalPublikasi - currentPublikasiTotal);
        }

        if(totalPublikasi == 0) 
        {
          AsyncStorage.setItem('currentPublikasiTotal', String(0)); 
        }

        //BRS
        const response2 = await fetch('https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=7400&key=1f5ea27aa195656fa79ee36110bda985');
        const data2 = await response2.json();
        const total2 = data2['data'][0]['total'];
        
        const API_URL_BRS = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=7400&key=1f5ea27aa195656fa79ee36110bda985`;
  
        const response = await fetch(API_URL_BRS);
        const result = await response.json();
  
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; 
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.brs_id}`;
  
            if (itemMonth === currentMonth && itemYear === currentYear && !uniqueItems.has(key)) {
              uniqueItems.set(key, item);
            }
          });
          const totalBRS = uniqueItems.size;
          setBrsTotal(totalBRS);
        const currentBRSTotalString = await AsyncStorage.getItem('currentBRSTotal');
        const currentBRSTotal = parseInt(currentBRSTotalString) || 0;
        
        if (totalBRS > currentBRSTotal) {
          setBRSStatus('error');
          setBRSCount(totalBRS - currentBRSTotal);
        }
        
        if(totalBRS == 0) 
        {
          AsyncStorage.setItem('currentBRSTotal', String(0)); 
        }
        
        //Berita

        const response3 = await fetch('https://webapi.bps.go.id/v1/api/list/?model=news&domain=7400&key=1f5ea27aa195656fa79ee36110bda985');
        const data3 = await response3.json();
        const total3 = data3['data'][0]['total'];
        
        const API_URL_BERITA = `https://webapi.bps.go.id/v1/api/list/?model=news&domain=7400&key=1f5ea27aa195656fa79ee36110bda985`;
  
        const responseBerita = await fetch(API_URL_BERITA);
        const resultBerita = await responseBerita.json();
  
          const currentDateBerita = new Date();
          const currentMonthBerita = currentDateBerita.getMonth() + 1; 
          const currentYearBerita = currentDateBerita.getFullYear();
          const uniqueItemsBerita = new Map();
  
          resultBerita.data[1].forEach((item) => {
            const itemDateBerita = new Date(item.rl_date);
            const itemMonthBerita = itemDateBerita.getMonth() + 1;
            const itemYearBerita = itemDateBerita.getFullYear();
            const keyBerita = `${itemMonthBerita}_${itemYearBerita}_${item.news_id}`;
  
            if (itemMonthBerita === currentMonthBerita && itemYearBerita === currentYearBerita && !uniqueItemsBerita.has(keyBerita)) {
              uniqueItemsBerita.set(keyBerita, item);
            }
          });
          const totalBerita = uniqueItemsBerita.size;
          setTabelTotal(totalBerita);
        const currentBeritaTotalString = await AsyncStorage.getItem('currentBeritaTotal');
        const currentBeritaTotal = parseInt(currentBeritaTotalString) || 0;

        if (totalBerita > currentBeritaTotal) {
          setBeritaStatus('error');
          setBeritaCount(totalBerita - currentBeritaTotal);
        }

        if(totalBerita == 0) 
        {
          AsyncStorage.setItem('currentBeritaTotal', String(0)); 
        }
        
        //Tabel
        const response4 = await fetch('https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=7400&key=1f5ea27aa195656fa79ee36110bda985');
        const data4 = await response4.json();
        const total4 = data4['data'][0]['total'];

        const API_URL_TABEL = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=7400&key=1f5ea27aa195656fa79ee36110bda985`;
  
        const responseTabel = await fetch(API_URL_TABEL);
        const resultTabel = await responseTabel.json();
  
          const currentDateTabel = new Date();
          const currentMonthTabel = currentDateTabel.getMonth() + 1; 
          const currentYearTabel = currentDateTabel.getFullYear();
          const uniqueItemsTabel = new Map();
  
          resultTabel.data[1].forEach((item) => {
            const itemDateTabel = new Date(item.rl_date);
            const itemMonthTabel = itemDateTabel.getMonth() + 1;
            const itemYearTabel = itemDateTabel.getFullYear();
            const keyTabel = `${itemMonthTabel}_${itemYearTabel}_${item.table_id}`;
  
            if (itemMonthTabel === currentMonthTabel && itemYearTabel === currentYearTabel && !uniqueItemsTabel.has(keyTabel)) {
              uniqueItemsTabel.set(keyTabel, item);
            }
          });
          const totalTabel = uniqueItemsTabel.size;
          setTabelTotal(totalTabel);
        const currentTabelTotalString = await AsyncStorage.getItem('currentTabelTotal');
        const currentTabelTotal = parseInt(currentTabelTotalString) || 0;

        if (totalTabel > currentTabelTotal) {
          setTabelStatus('error');
          setTabelCount(totalTabel - currentTabelTotal);
        }

        if(totalTabel == 0) 
        {
          AsyncStorage.setItem('currentTabelTotal', String(0)); 
        }

        const cumulativeTotal = total1+total2+total3+total4;
        setCumulativeTotal(cumulativeTotal);

        const currentTotalString = await AsyncStorage.getItem('currentTotal');
        const currentTotal = parseInt(currentTotalString) || 0;
       

        if (cumulativeTotal > currentTotal) {
          setBadgeStatus('error');
        }
        
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setBadgeStatus, setCumulativeTotal, setBRSCount, setBRSStatus, setBrsTotal
    ,setPublikasiCount, setPublikasiStatus, setPublikasiTotal
    ,setTabelCount, setTabelStatus, setTabelTotal
    ,setBeritaCount, setBeritaStatus, setBeritaTotal]);

  return (
    <FocusContext.Provider value={{ isLainnyaFocused, setLainnyaFocused, badgeStatus, setBadgeStatus, cumulativeTotal,
    brsStatus, setBRSStatus, brsCount, setBRSCount, totalBRS,
    publikasiStatus, setPublikasiStatus, publikasiCount, setPublikasiCount, totalPublikasi,
    tabelStatus, setTabelStatus, tabelCount, setTabelCount, totalTabel,
    beritaStatus, setBeritaStatus, beritaCount, setBeritaCount, totalBerita }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return useContext(FocusContext);
};