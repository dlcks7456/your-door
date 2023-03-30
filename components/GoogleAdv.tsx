import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {

  // useEffect(() => {
  //   try {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   } catch (err) {
  //     console.log(err);
  //   }
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