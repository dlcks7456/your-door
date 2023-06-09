import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import 'animate.css';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import GoogleAd from '@/components/GoogleAdv';

interface imageProps{
  image : string|null;
  dec : string|null;
  alt : string|null;
  downloadUrl : string|null;
  imageHtml: string|null;
  userName : string|null,
  userHtml : string|null,
  err? : any|null;
}

interface Data{
  data : imageProps[];
}

export default function Home({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  const [over, setOver] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [into, setInto] = useState<boolean>(false);
  const [musicOff, setMusicOff] = useState<boolean>(false);
  
  const [lock, setLock] = useState<boolean>(false);
  
  useEffect(() => {
    const bgm = new Audio('/cutmusic.mp3');
    bgm.loop = false;
    if( into && !musicOff ){
      bgm.play();
      setMusicOff(true);
    }
  }, [into]);

  
  const [downloading, setDownloading] = useState<boolean>(false);

  const downloadClick = async ()=>{
    if( data.downloadUrl === null || data.downloadUrl === undefined ) return;
    const download = await fetch(data.downloadUrl);
    const blob = await download.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', `${data.imageName}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=>{
      setDownloading(false);
    }, 2000)
  }


  return (
    <>
      <Head>
        <title>My-Door</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<style jsx>
{`
.door{
  transform-origin: 56.5%;
}
.open .door-raw{
  animation: growAndDisappear 1s forwards 1s;
}

.open .door{
  animation: doorGrowAndDisappear 1s forwards;
}

.over .door{
  animation: doorDisappear 1s forwards;
}

.close .door{
  animation: closeDoor 1s forwards;
}

@keyframes growAndDisappear {
  0% {
      opacity: 1;
  }
  100% {
      transform: scale(2);
      opacity: 0;
      display : none;
  }
}

@keyframes doorGrowAndDisappear{
  0% {
      transform: perspective(800px) rotateY(-45deg);
      opacity: 1;
  }
  100% {
      transform: perspective(800px) rotateY(-90deg);
      opacity: 0;
      display : none;
  }
}

@keyframes doorDisappear{
  0% {
      transform: rotateY(0deg);
  }
  100% {
      transform: perspective(800px) rotateY(-45deg);
  }
}

@keyframes closeDoor{
  0% {
      transform: perspective(800px) rotateY(-45deg);
  }
  100% {
      transform: rotateY(0deg);
  }
}

.suzume {
  animation: suzumeAnimate 5s forwards;
}


@keyframes suzumeAnimate{
  0% {
    opacity : 1;
  }
  30% {
    transform: scaleY(0.7);
    opacity : 1;
  }
  35%{
    transform-origin: 50%;
    transform: scaleY(0.7) scaleX(0.02);
    opacity : 1;
  }
  90%{
    transform-origin: 50%;
    transform: scaleY(0.7) scaleX(0.0005);
    opacity : 1;
  }
  100%{
    transform-origin: 50%;
    transform: scaleY(0.7) scaleX(0);
    opacity : 0;
  }
}

.show-title{
  font-size : 3rem;
  animation: slowDown 6s forwards;
}

@keyframes slowDown{
  0% {
    transform: scale(1);
    opacity : 0;
  }
  100% {
    transform: scale(0.7);
    opacity : 1;
  }
}

.suzume-font {
  font-family: 'Nanum Myeongjo', serif;
}

.into-button{
  animation : intoAnimate 0.5s forwards;
}
@keyframes intoAnimate {
  0%{
    opacity : 1;
  }
  100%{
    // transform : scaleY(0);
    opacity : 0;
  }
}
`}
</style>
      <div className="relative w-full">
        <div className="w-full h-full pt-20 md:pt-32 mt-14">
          <div className={["fixed flex items-center justify-center top-0 w-full h-full bg-white", into ? "suzume" : ""].join(" ")}></div>
            <div className={["fixed w-full flex justify-center animate__animated", !into ? "animate__fadeInDown" : "into-button"].join(" ")}>
                <div className="flex flex-col gap-5 items center">
                  <div className="relative flex items-center justify-center">
                    <Image src={"/cat.jpg"} alt="cats" width={200} height={200} className="rounded-lg shadow-lg"/>
                  </div>
                  <button onMouseOver={()=>{setLock(true);}} onMouseOut={()=>{setLock(false);}} className="flex items-center justify-center gap-2 p-2 text-white transition-colors bg-gray-500 rounded-md shadow-md hover:bg-black" onClick={()=>{setInto(true); }}>
                    OPEN
                    {lock ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                      </>
                    ) }
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                    <div>Nothing that would be a spoiler</div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                    </svg>
                    <div>The music plays</div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <div>A random landscape photo will appear</div>
                  </div>
                  <div className="w-full">
                    <GoogleAd/>
                  </div>
                  <div className="pt-3 mt-10 flex flex-col items-center justify-center gap-4 border-t-[1px] border-gray-300">
                    <div className="text-xs text-center">
                      Copyright ⓒ 2023 Waymond(Chan.lee) all right reserved.
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <div>duron7456@gmail.com</div>
                    </div>
                  </div>
                </div>
            </div>
            {into ? (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-center justify-center gap-10 mb-10 text-white pointer-events-none show-title suzume-font"><div>당신의</div><div>문단속</div></div>
                <div className={["animate__animated animate__fadeInUp animate__delay-3s w-[400px] h-[188px] md:w-[640px] md:h-[280px] rounded-lg shadow-slate-800 shadow-2xl overflow-hidden relative", over ? "over" : "", close ? "close" : "", open ? "open" : ""].join(" ")}
                  onMouseOver={()=>{
                    if(open) return
                    setOver(true);
                    setClose(false);
                  }}
                  onMouseOut={()=>{
                    if(open) return
                    setOver(false);
                    setClose(true);
                  }}
                  onClick={()=>{setOpen(true);setOver(false);setClose(false);}}>
                  <a className="w-[400px] h-[188px] md:w-[640px] md:h-[280px] absolute" href={data.imageHtml} target="_blank">
                    {typeof data.image === 'string' ? (
                        <Image src={data.image} fill alt={data.alt} priority/>
                    ) : null}
                  </a>
                  <div className="w-[400px] h-[188px] md:w-[640px] md:h-[280px] door-raw absolute pointer-events-none">
                    <Image src={'/door-raw_640.png'} fill alt={'door_raw'}/>
                  </div>
                  <div className="w-[400px] h-[188px] md:w-[640px] md:h-[280px] door absolute cursor-pointer">
                    <Image src={'/only-door_640.png'} fill alt={'door_raw'}/>
                  </div>
                </div>
                {open ? null : (
                    <div className="animate__animated animate__fadeIn animate__delay-5s">
                      <div className="flex items-center justify-center gap-1 mt-5 text-white animate__animated animate__pulse animate__infinite">
                        <div>Click on the door</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                        </svg>
                      </div>
                    </div>
                )}
                {open ? (
                    <>
                      <div className="flex flex-col items-center justify-center animate__animated animate__fadeInUp">
                        { data.userName ? (
                        <div className="flex items-center justify-center gap-2 mt-3 text-xs font-bold text-white ">
                          <a className="flex items-center justify-center gap-1 p-1 transition-colors rounded-md hover:bg-white hover:text-black" href={data.userHtml} target="_blank" rel="noopener noreferrer">
                            <div>{data.userName}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                          </a>
                          <div>on</div>
                          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 p-1 transition-colors rounded-md hover:bg-white hover:text-black">
                            <div>Unsplash</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                          </a>
                        </div>
                        ) : null}
                        <div className="px-2 mt-3 font-bold text-center text-white">{data.dec}</div>
                        <div className={["mt-7", downloading ? "" : "peer"].join(" ")}>
                        {downloading ? (
                          <div className="w-8 h-8 border-4 border-t-4 border-white rounded-full border-t-black animate-spin"></div>
                        ) : 
                        data.downloadUrl ? (
                          <>
                            <div
                              onClick={()=>{
                                setDownloading(true);
                                downloadClick();
                              }}
                              className="text-white cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 hover:animate-bounce">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                              </svg>
                            </div>
                          </>
                        ) : null
                        }
                        </div>
                        <div className="items-center justify-center hidden text-xs text-white peer-hover:flex animate__animated animate__rubberBand">
                          Download
                        </div>
                      </div>
                    </>
                  ) : null}
            </div>
            ) : null  }
          </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ data:any }> = async ()=>{
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=landscape`);
    const data = await res.json();
    
    const { alt_description, urls, links } = data;
    const { regular } = urls;
    const {name, id, links:{html} } = data.user;
    const imageName = `${name}-${id}.jpg`;
    const { html:imageHtml, download_location } = links;

    const download = await fetch(`${download_location}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const downloadData = await download.json();

    return {
      props: { data : {
        image : regular,
        dec : alt_description,
        alt : data.description || 'Unsplash Image',
        downloadUrl : downloadData.url,
        imageName,
        imageHtml,
        userName : name,
        userHtml : html
      } },
    }
  } catch (error){
    return {
      props: { data : {
        image : '/other_world.png',
        dec : 'Sorry, that didn\'t work, please check back later 😭',
        alt : 'default image',
        downloadUrl : null,
        imageName: null,
        imageHtml: null,
        userName : null,
        userHtml : null,
      } },
    }
  }
}