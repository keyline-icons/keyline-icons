import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageDot({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 2 C12.2407 2 12.4816 2.0067 12.7217 2.0195 C13.273 2.0492 13.6965 2.5199 13.667 3.0713 C13.649 3.4071 13.5 3.5 13.2021 3.8613 L13.5 3.5 C13.2789 4.1256 13 5.2987 13 6 C13 9.3138 15.6862 12 19 12 C19.7284 12 20.6518 11.7979 21.2978 11.5601 L21.1348 11.6934 C21.3683 11.4574 21.7143 11.3429 22.0625 11.4199 C22.6017 11.5394 22.9426 12.0731 22.8232 12.6123 C21.8456 17.0254 17.1645 20 12 20 C11.2351 20 10.4723 19.9337 9.7236 19.8047 L5.4385 21.8984 C5.1434 22.0425 4.7961 22.0329 4.5098 21.8721 C4.2235 21.7112 4.0344 21.4197 4.0039 21.0928 L3.6084 16.8252 C1.9521 15.2269 1 13.1718 1 11 C1 5.8327 6.1447 2 12 2 Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 3 C20.6569 3 22 4.3431 22 6 C22 7.6569 20.6569 9 19 9 C17.3431 9 16 7.6569 16 6 C16 4.3431 17.3431 3 19 3 Z"/>
    </svg>
  )
}
