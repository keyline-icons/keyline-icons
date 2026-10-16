import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointerDown({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.0719 22.956C9.4692 23.2209 10.7466 22.2535 10.9908 20.8955L11.6588 17.177L12.1715 17.2258L12.1734 17.2258C13.0528 17.3091 13.8542 16.9398 14.3815 16.3177C14.788 16.5532 15.2677 16.6729 15.7799 16.6243C16.7139 16.5355 17.4711 15.9045 17.7828 15.0609C18.0831 15.1646 18.4302 15.2069 18.8043 15.1273C19.3582 15.0093 19.8193 14.6585 20.1861 14.1801C20.4435 13.8443 20.6053 13.3945 20.7145 12.9722C20.8305 12.5231 20.9141 11.9947 20.9596 11.4234C21.0504 10.2816 20.9962 8.8988 20.7066 7.5203C20.1365 4.8061 18.5577 1.7797 15.0162 1.1075C14.9976 1.104 14.9784 1.1012 14.9596 1.0988C13.8062 0.9482 12.1112 0.8577 10.2545 1.7052C8.402 2.5508 6.5227 4.2679 4.8434 7.4627L3.3307 10.0279C2.7212 11.0619 2.9704 12.4205 3.9449 13.1469C4.8696 13.836 6.1417 13.721 6.9352 12.8931L7.3766 12.4321L6.0621 19.9767C5.8261 21.3314 6.682 22.6922 8.0719 22.956Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.8379 16.0924L11.5179 12.3077M14.1648 13.8166L14.4512 12.0244M17.1966 12.9871L17.4338 11.7497"/>
    </svg>
  )
}
