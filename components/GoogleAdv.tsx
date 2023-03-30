import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {
  // useEffect(() => {
  //   (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  return (
    <>
      <ins className="adsbygoogle"
          style={{display:"block"}}
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
          data-ad-slot="7960104622"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
    </>
  );
};

export default GoogleAd;