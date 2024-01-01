"use client"
import { useEffect, useState } from "react";
import { getCookie, setCookie } from 'cookies-next';
import Link from "next/link";

const TICKET_EXPIRE = 60 * 60 * 24 * 365 // 1 ANO

export function generateRandomValue(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomValue = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomValue += characters.charAt(randomIndex);
    }
    return randomValue;
}

export function PopupCookieConsent() {



    const [cookieConsent, setCookieConsent] = useState(false);
    const [hidden, setHidden] = useState(true);


    function acceptCookie() {
        try {
            const ticketValue = generateRandomValue(32);
            setCookie('_ticket', ticketValue, {
                maxAge: TICKET_EXPIRE
            });
            setCookieConsent(true)
        } catch (error) {
            setCookieConsent(false)
        }
    }

    useEffect(() => {
        if (getCookie('_ticket')) {
            setCookieConsent(true)
            setHidden(true)
        } else {
            setCookieConsent(false)
            setHidden(false)
        }

        const state = cookieConsent ? 'granted' : 'denied'

        if (typeof window.gtag !== 'undefined') {
            window.gtag("consent", 'update', {
                'analytics_storage': state,
                'ad_storage': state
            });
        }

    }, [cookieConsent])

    return (
        <>
            {(!cookieConsent && !hidden) &&
                <div id="cookie-consent" className="fixed flex flex-col lg:flex-row py-10 lg:py-5  px-10 items-center justify-center lg:justify-between gap-5 w-full bottom-0  bg-primary  text-neutral-700 min-h-[80px]">
                    <p className="flex-1">
                        Este site utiliza cookies para garantir a melhor experiência possível. Ao continuar navegando, você concorda com nossa <Link href="politica-de-privacidade" className="underline"> Política de privacidade</Link>.
                    </p>
                    <div className="flex gap-5 items-center h-full">
                        <Link
                            href="politica-de-privacidade"
                            className="underline"
                        >
                            Política de privacidade
                        </Link>
                        <Link
                            href="termos-de-uso"
                            className="underline"
                        >
                            Termos de uso
                        </Link>
                        <button
                            className="bg-neutral-900 h-12 rounded-[4px] px-5 text-white"
                            onClick={acceptCookie}
                        >
                            Aceitar
                        </button>
                    </div>

                </div>
            }
        </>
    )
}


