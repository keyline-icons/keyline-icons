import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6364 9.9908C21.5033 10.7505 22.0003 11.8473 22 13L22 17.7574L7.6724 3.4298C8.2316 3.147 8.8495 2.9998 9.4762 3L14.5238 3C16.1226 3 17.5678 3.952 18.1989 5.421L19.3069 8L20.5 8C21.0523 8 21.5 8.4477 21.5 9.0001C21.5 9.4997 21.1313 9.9226 20.6364 9.9908ZM17.977 20.8055C17.1883 20.5044 16.5653 19.8814 16.2642 19.0927L16.1715 19L7.7694 19C7.3578 20.1974 6.2314 21.0013 4.9652 21.0013C3.327 21.0013 1.9992 19.6728 2 18.0346L2 13C1.9996 11.499 2.8397 10.1241 4.1755 9.4396L4.3941 8.7122C4.405 8.6758 4.418 8.6402 4.433 8.6053L5.6869 5.6869L20.5715 20.5716C20.1081 20.8522 19.5766 21.0005 19.0349 21.0005C18.6733 21.0005 18.3148 20.9344 17.977 20.8055Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19.8316 19.8316C19.588 19.9399 19.3183 20 19.0346 20C18.1327 20 17.3465 19.3862 17.1278 18.5113L17 18L7 18L6.8722 18.5113C6.6535 19.3862 5.8673 20 4.9654 20C3.88 20 3 19.12 3 18.0346L3 13C3 11.6937 3.8348 10.5825 5 10.1707C5.3128 10.0602 5.6494 10 6 10L10 10M5 10.1707L5.3518 9L6.4482 6.4482M5.3518 9L3.5 9M8 13.5L8 14.5M2 2L22 22" fill="none"/>
    </svg>
  )
}
