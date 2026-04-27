'use client';
import { useEffect, useState } from 'react';
import Footer from '@/components/layout/Footer';
import * as config from '@/lib/config/site';
import SettingsButtonMobile from '../../Settings/SettingsButtonMobile';
import MessageBoxLoading from './ChatMessageLoadingSkeleton';
import { GradientBlur } from '@/components/ui/gradient-blur';
import ChatInputBox from '../MessageComposer/ChatInputBox';
import { useChat } from '@/components/ResearchAgent/hooks/useChat';
import { getBackgroundArtwork } from './background-art';
const { listFooterLinks } = config;

/**
 * The homepage component for the chat interface.
 * Displays a background artwork (image or video), a settings button,
 * and the main chat input box. Detects the user's operating system
 * for customized download links.
 * 
 * @returns {JSX.Element} The rendered chat homepage
 */
export default function ChatHomepage() {
  const { sendMessage } = useChat();
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState({ os: '' });

  useEffect(() => {
    const showBg = localStorage.getItem('showBackgroundArt');
    if (showBg !== 'false') {
      setBackgroundUrl(getBackgroundArtwork());
    }
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('win')) {
        setDeviceInfo({ os: 'Windows' });
      } else if (userAgent.includes('mac')) {
        setDeviceInfo({ os: 'MacOS' });
      } else {
        setDeviceInfo({ os: 'Other' });
      }
    }
  }, []);



  /**
   * Handles sending a message from the homepage input.
   * 
   * @param data - The message data including text and attachments
   */
  const handleSendMessage = (data: {
    message: string;
    files: any[];
    pastedContent: any[];
    model: string;
    isThinkingEnabled: boolean;
  }) => {
    if (data.message.trim()) {
      sendMessage(data.message);
    }
  };

  const isVideo = backgroundUrl && (backgroundUrl.endsWith('.webm') || backgroundUrl.endsWith('.mp4'));

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-0">
        {backgroundUrl && (
          isVideo ? (
            <video
              src={backgroundUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <img
              src={backgroundUrl}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
          )
        )}
        <GradientBlur />
      </div>

      <div className="relative z-10">
        <div className="absolute w-full flex flex-row items-center justify-end pr-5 pt-2 sm:pt-5">
          <SettingsButtonMobile />
        </div>
        <div className="flex flex-col items-center justify-start pt-16 sm:justify-center sm:pt-0 min-h-screen max-w-screen-sm mx-auto p-2 space-y-4">
          <div className="flex flex-col items-center justify-center w-full space-y-8">
            <MessageBoxLoading />

            <div className="w-full space-y-2">
              <ChatInputBox />
              <div className="flex justify-center">
              </div>
              <p className="text-lg text-gray-500 text-center justify-center mt-4">
                <a
                  aria-label="Chrome Web Store"
                  className="download-chrome download-btn text-center justify-center"
                  target="_blank"
                  href={config.DOWNLOAD_CHROME_URL}
                >
                </a>

                <a
                  aria-label="Microsoft Store"
                  className="download-windows download-btn text-center justify-center"
                  target="_blank"
                  href={deviceInfo.os == "Windows"
                    ? `ms-windows-store://pdp/?productid=${config.DOWNLOAD_WINDOWS_STORE_ID}`
                    : `https://apps.microsoft.com/detail/${config.DOWNLOAD_WINDOWS_STORE_ID}?rtc=1`
                  }
                >
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer listFooterLinks={listFooterLinks} />
    </div>
  );
};
