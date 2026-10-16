import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cctv({ size = 24, ...props }: IconProps) {
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
      <path d="M7.4669 2.0729L17.6659 6.1935C18.0439 6.3462 18.2913 6.7131 18.2913 7.1207C18.2913 7.2491 18.2666 7.3763 18.2185 7.4953L15.5963 13.9856C15.4435 14.3636 15.0767 14.611 14.6691 14.611C14.5407 14.611 14.4135 14.5863 14.2945 14.5382L4.0954 10.4175C3.7175 10.2648 3.47 9.898 3.47 9.4903C3.47 9.362 3.4948 9.2348 3.5429 9.1157L6.1651 2.6254C6.3178 2.2475 6.6847 2 7.0923 2C7.2207 2 7.3479 2.0248 7.4669 2.0729ZM18.0754 7.8495L20.9205 7.6223C20.9469 7.6202 20.9735 7.6191 21.0001 7.6191C21.5523 7.6191 22.0001 8.0669 22.0001 8.6191C22.0001 8.7475 21.9753 8.8747 21.9272 8.9938L19.305 15.484C19.1523 15.862 18.7854 16.1094 18.3778 16.1094C18.091 16.1094 17.8179 15.9863 17.6281 15.7712L15.7393 13.6315L18.0754 7.8495Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.0923 3L17.2913 7.1207L14.6691 13.611L4.47 9.4903L7.0923 3ZM16.5421 8.9751L21.0001 8.6191L18.3778 15.1094L15.4183 11.7566M6.788 10.4269L6.788 17L3 17M3 12L3 22"/>
    </svg>
  )
}
